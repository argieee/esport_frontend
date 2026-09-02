require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const timeout = require('connect-timeout');
const NodeCache = require('node-cache');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const { generatePrediction } = require('./utils/predictor');
const stats = require('./utils/statsCalculator');
const app = express();


app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(timeout('10s'));
app.use((req, res, next) => {
  if (!req.timedout) next();
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 20000, 
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '10kb' })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabase = null;
if (supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_project_url') {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });
  console.log('database connected');
}
app.get('/', (req, res) => {
  res.json({ message: 'Esports Backend is running!' });
});
const apiCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
const cacheMiddleware = (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }
  const key = `__express__${req.originalUrl || req.url}`;
  const cachedBody = apiCache.get(key);
  if (cachedBody) {
    return res.json(JSON.parse(cachedBody));
  } else {
    const originalSend = res.json;
    res.json = function (body) {
      apiCache.set(key, JSON.stringify(body));
      originalSend.call(this, body);
    };
    next();
  }
};
const idempotencyCache = new NodeCache({ stdTTL: 2, checkperiod: 2 });
const preventDuplicates = (req, res, next) => {
  if (req.method !== 'POST') return next();
  const hash = crypto.createHash('sha256')
    .update(req.ip + req.originalUrl + JSON.stringify(req.body || {}))
    .digest('hex');
  if (idempotencyCache.has(hash)) {
    return res.status(409).json({ error: 'Duplicate request detected. Please wait a moment.' });
  }
  idempotencyCache.set(hash, true);
  next();
};
app.use(preventDuplicates);
const logAudit = async (action_type, description, details, game = null) => {
  if (!supabase) return;
  try {
    const defaultDetails = { ign: 'System', ...details };
    await supabase.from('audit_logs').insert([{ action_type, description, details: defaultDetails, game }]);
  } catch (err) {
    console.error('Failed to log audit event:', err);
  }
};
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }
    req.user = data.user;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error during authentication.' });
  }
};
const isAdmin = async (req, res, next) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    let { data, error } = await supabase
      .from('users')
      .select('is_super_admin, permissions, role')
      .eq('user_id', req.user.id)
      .single();
    if (error || !data) {
      console.error('isAdmin query failed, attempting auto-recovery:', { error: error?.message, userId: req.user.id });
      const { data: newData, error: insertError } = await supabase.from('users').insert([{
        user_id: req.user.id,
        username: req.user.email ? req.user.email.split('@')[0] : 'admin',
        password: 'auto_recovery_placeholder',
        role: 'Central Super Admin',
        permissions: { full: true, edit: true },
        is_super_admin: true
      }]).select('is_super_admin, permissions, role').single();
      if (insertError || !newData) {
        console.error('Auto-recovery failed:', insertError);
        return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
      }
      data = newData;
    }
    if (data.is_super_admin || data.permissions?.full || data.permissions?.edit) {
      req.adminUser = data;
      next();
    } else {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error during authorization.' });
  }
};
app.get('/api/audit-logs', authenticateToken, isAdmin, cacheMiddleware, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { data, error } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(200);
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/users', authenticateToken, isAdmin, cacheMiddleware, async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized. Check your .env file.' });
  }
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.post('/api/login', async (req, res) => {
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized.' });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    const authClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
    });
    const { data, error } = await authClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    res.json({ message: 'Login successful', user: data.user, session: data.session });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/admin/create-user', authenticateToken, isAdmin, async (req, res) => {
  if (!req.adminUser.is_super_admin) {
    return res.status(403).json({ error: 'Access denied. Only Super Admins can create new accounts.' });
  }
  if (!supabase) {
    return res.status(500).json({ error: 'Supabase client not initialized.' });
  }
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required.' });
  }
  try {
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role }
    });
    if (authError) {
      return res.status(400).json({ error: authError.message });
    }
    const userId = authData.user.id;
    const username = email.split('@')[0];
    const { error: dbError } = await supabase
      .from('users')
      .insert([
        { user_id: userId, username: username, password: password, role: role, is_super_admin: role === 'Super Admin', permissions: { view: true, edit: false, full: false, manage_folders: false } }
      ]);
    if (dbError) {
      console.error("Error inserting into public.users:", dbError.message);
      return res.status(500).json({ error: 'User created in auth, but failed to add to public.users table: ' + dbError.message });
    }
    await logAudit('USER_CREATED', `Account created for ${email} with role ${role}`, { email, role });
    res.status(201).json({ message: 'User created successfully', user: { id: userId, email, role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error during user creation.' });
  }
});
app.put('/api/admin/user/:id/permissions', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  const { id } = req.params;
  const { permissions } = req.body;
  if (!permissions) return res.status(400).json({ error: 'Permissions object required.' });
  try {
    const { data: userCheck } = await supabase.from('users').select('is_super_admin').eq('user_id', id).single();
    if (userCheck && userCheck.is_super_admin) {
      return res.status(403).json({ error: 'Cannot manually alter permissions for the Super Admin.' });
    }
    const { data, error } = await supabase
      .from('users')
      .update({ permissions })
      .eq('user_id', id)
      .select();
    if (error) throw error;
    await logAudit('PERMISSIONS_UPDATED', `Permissions updated for user ${id}`, { userId: id, permissions });
    res.json(data[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/admin/transfer-ownership', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  const { currentOwnerId, newOwnerId } = req.body;
  if (!currentOwnerId || !newOwnerId) {
    return res.status(400).json({ error: 'Both current and new owner IDs are required.' });
  }
  try {
    const { data: checkOwner } = await supabase.from('users').select('is_super_admin').eq('user_id', currentOwnerId).single();
    if (!checkOwner || !checkOwner.is_super_admin) {
      return res.status(403).json({ error: 'Current user is not the super admin.' });
    }
    const { error: err1 } = await supabase
      .from('users')
      .update({ is_super_admin: true, permissions: { view: true, edit: true, full: true } })
      .eq('user_id', newOwnerId);
    if (err1) throw err1;
    const { error: err2 } = await supabase
      .from('users')
      .update({ is_super_admin: false })
      .eq('user_id', currentOwnerId);
    if (err2) throw err2;
    await logAudit('OWNERSHIP_TRANSFERRED', `Super Admin ownership transferred`, { from: currentOwnerId, to: newOwnerId });
    res.json({ message: 'Ownership transferred successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/stats/player', async (req, res) => {
  try {
    const { kills, deaths, assists, headshots, totalRounds, role } = req.body;
    if (kills === undefined || deaths === undefined || totalRounds === undefined) {
      return res.status(400).json({ error: 'Missing required player data.' });
    }
    const { data: formulas } = await supabase.from('evaluation_formulas').select('*');
    const performanceScore = stats.calculatePerformanceScore(kills, deaths, assists, totalRounds, role, formulas);
    const tc = stats.calculateTC(performanceScore);
    const finalRating = stats.calculateFinalRating(performanceScore, formulas, role);
    const kd = stats.calculateKD(kills, deaths);
    const kr = stats.calculatePerRoundMetric(kills, totalRounds);
    const survivalRate = stats.calculateSurvivalRate(totalRounds, deaths);
    res.json({
      kd,
      kr,
      survivalRate,
      performanceScore,
      tc,
      finalRating
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/tournaments', async (req, res) => {
  const { data, error } = await supabase.from('tournaments').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});
app.post('/api/tournaments', authenticateToken, isAdmin, async (req, res) => {
  if (!req.adminUser.is_super_admin && !req.adminUser.permissions?.manage_folders) {
    return res.status(403).json({ error: 'Access denied. You do not have permission to create folders.' });
  }
  const { name, game } = req.body;
  if (!name) return res.status(400).json({ error: 'Tournament name required' });
  const { data, error } = await supabase.from('tournaments').insert([{ name, game: game || 'VALORANT' }]).select();
  if (error) return res.status(500).json({ error: error.message });
  await logAudit('SYSTEM', `Created new tournament: ${name} (${game || 'VALORANT'})`, { name, game }, 'System');
  res.json({ message: 'Tournament created successfully', data: data[0] });
});
app.put('/api/tournaments', authenticateToken, isAdmin, async (req, res) => {
  if (!req.adminUser.is_super_admin && !req.adminUser.permissions?.manage_folders) {
    return res.status(403).json({ error: 'Access denied. You do not have permission to edit folders.' });
  }
  const { name, game } = req.body;
  if (!name || !game) return res.status(400).json({ error: 'Tournament name and game required' });
  const { data, error } = await supabase
    .from('tournaments')
    .update({ game })
    .eq('name', name)
    .select();
  if (error) return res.status(500).json({ error: error.message });
  await logAudit('SYSTEM', `Updated tournament game for ${name} to ${game}`, { name, game }, 'System');
  res.json({ message: 'Tournament updated successfully', data: data[0] });
});
app.get('/api/stats/crossfire', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const tournamentName = req.query.tournament || 'Default';
    const { data, error } = await supabase
      .from('crossfire_player_stats')
      .select('*')
      .eq('tournament_name', tournamentName);
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/stats/crossfire/match', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { players, rawEntries, matchHeader, tournamentName = 'Default' } = req.body;
    if (!players || !Array.isArray(players)) {
      return res.status(400).json({ error: 'Invalid payload: expected an array of players.' });
    }
    const { data: formulas } = await supabase.from('evaluation_formulas').select('*');
    const igns = players.map(p => p.ign);
    const { data: existingData, error: fetchError } = await supabase
      .from('crossfire_player_stats')
      .select('*')
      .eq('tournament_name', tournamentName)
      .in('ign', igns);
    if (fetchError) throw fetchError;
    const existingMap = {};
    if (existingData) {
      existingData.forEach(row => {
        existingMap[row.ign] = row;
      });
    }
    const updates = players.map(p => {
      const existing = existingMap[p.ign] || {
        total_kills: 0,
        total_deaths: 0,
        total_assists: 0,
        total_headshots: 0,
        total_rounds_played: 0
      };
      const newTotalKills = existing.total_kills + (Number(p.kills) || 0);
      const newTotalDeaths = existing.total_deaths + (Number(p.deaths) || 0);
      const newTotalAssists = existing.total_assists + (Number(p.assists) || 0);
      const newTotalHeadshots = existing.total_headshots + (Number(p.headshots) || 0);
      const newTotalRounds = existing.total_rounds_played + (Number(p.rounds) || 0);
      const ps = stats.calculatePerformanceScore(newTotalKills, newTotalDeaths, newTotalAssists, newTotalRounds, 'Rifler', formulas);
      const finalRating = stats.calculateFinalRating(ps, formulas, 'Rifler');
      return {
        ign: p.ign,
        tournament_name: tournamentName,
        total_kills: newTotalKills,
        total_deaths: newTotalDeaths,
        total_assists: newTotalAssists,
        total_headshots: newTotalHeadshots,
        total_rounds_played: newTotalRounds,
        performance_score: isNaN(ps) ? 0 : ps,
        final_rating: isNaN(finalRating) ? 0 : finalRating
      };
    });
    const { data: upsertData, error: upsertError } = await supabase
      .from('crossfire_player_stats')
      .upsert(updates, { onConflict: 'ign,tournament_name' })
      .select();
    if (upsertError) throw upsertError;
    const recordsSource = (rawEntries && Array.isArray(rawEntries) && rawEntries.length > 0) ? rawEntries : players;
    const matchRecords = recordsSource.map(p => ({
      tournament_name: tournamentName,
      game: 'Crossfire',
      week: matchHeader?.week || null,
      day: matchHeader?.day || null,
      match: matchHeader?.match || null,
      set_num: matchHeader?.setNum || null,
      map: matchHeader?.mapName || null,
      team_name: p.team_name || null,
      ign: p.ign,
      win: p.win !== undefined ? p.win : null,
      kills: Number(p.kills) || 0,
      deaths: Number(p.deaths) || 0,
      assists: Number(p.assists) || 0,
      headshots: Number(p.headshots) || 0,
      rounds: Number(p.rounds) || 0
    }));
    const { error: matchRecordsError } = await supabase
      .from('match_records')
      .insert(matchRecords);
    if (matchRecordsError) console.error('Failed to insert match records:', matchRecordsError);
    await logAudit('MATCH', `Submitted Crossfire match stats for ${players.length} players`, { players, matchHeader, ign: 'Admin(Argie)' }, 'Crossfire');
    res.json({ message: 'Stats successfully updated!', data: upsertData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/stats/valorant', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const tournamentName = req.query.tournament || 'Default';
    const { data, error } = await supabase
      .from('valorant_player_stats')
      .select('*')
      .eq('tournament_name', tournamentName);
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/stats/valorant/match', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { players, matchHeader, tournamentName = 'Default' } = req.body;
    if (!players || !Array.isArray(players)) {
      return res.status(400).json({ error: 'Invalid payload: expected an array of players.' });
    }
    const { data: formulas } = await supabase.from('evaluation_formulas').select('*');
    const igns = players.map(p => p.ign);
    const { data: existingData, error: fetchError } = await supabase
      .from('valorant_player_stats')
      .select('*')
      .eq('tournament_name', tournamentName)
      .in('ign', igns);
    if (fetchError) throw fetchError;
    const existingMap = {};
    if (existingData) {
      existingData.forEach(row => {
        existingMap[row.ign] = row;
      });
    }
    const updates = players.map(p => {
      const existing = existingMap[p.ign] || {
        total_kills: 0,
        total_deaths: 0,
        total_assists: 0,
        total_acs: 0,
        total_econ: 0,
        total_rounds_played: 0,
        matches_played: 0
      };
      const newTotalKills = existing.total_kills + (Number(p.kills) || 0);
      const newTotalDeaths = existing.total_deaths + (Number(p.deaths) || 0);
      const newTotalAssists = existing.total_assists + (Number(p.assists) || 0);
      const newTotalAcs = existing.total_acs + (Number(p.acs) || 0);
      const newTotalEcon = existing.total_econ + (Number(p.econ) || 0);
      const newTotalRounds = existing.total_rounds_played + (Number(p.rounds) || 0);
      const newMatchesPlayed = existing.matches_played + 1;
      const ps = stats.calculatePerformanceScore(newTotalKills, newTotalDeaths, newTotalAssists, newTotalRounds, p.agentRole || 'Rifler', formulas);
      const finalRating = stats.calculateFinalRating(ps, formulas, p.agentRole || 'Rifler');
      return {
        ign: p.ign,
        tournament_name: tournamentName,
        total_kills: newTotalKills,
        total_deaths: newTotalDeaths,
        total_assists: newTotalAssists,
        total_acs: newTotalAcs,
        total_econ: newTotalEcon,
        total_rounds_played: newTotalRounds,
        matches_played: newMatchesPlayed,
        performance_score: isNaN(ps) ? 0 : ps,
        final_rating: isNaN(finalRating) ? 0 : finalRating
      };
    });
    const { data: upsertData, error: upsertError } = await supabase
      .from('valorant_player_stats')
      .upsert(updates, { onConflict: 'ign,tournament_name' })
      .select();
    if (upsertError) throw upsertError;
    const matchRecords = players.map(p => ({
      tournament_name: tournamentName,
      game: 'Valorant',
      week: matchHeader?.week || null,
      day: matchHeader?.day || null,
      match: matchHeader?.match || null,
      set_num: matchHeader?.setNum || null,
      map: matchHeader?.mapName || null,
      team_name: p.team_name || null,
      ign: p.ign,
      win: p.win !== undefined ? p.win : null,
      kills: Number(p.kills) || 0,
      deaths: Number(p.deaths) || 0,
      assists: Number(p.assists) || 0,
      acs: Number(p.acs) || 0,
      econ: Number(p.econ) || 0,
      rounds: Number(p.rounds) || 0
    }));
    const { error: matchRecordsError } = await supabase
      .from('match_records')
      .insert(matchRecords);
    if (matchRecordsError) console.error('Failed to insert match records:', matchRecordsError);
    await logAudit('MATCH', `Submitted Valorant match stats for ${players.length} players`, { players, matchHeader, ign: 'Admin(Argie)' }, 'Valorant');
    res.json({ message: 'Stats successfully updated!', data: upsertData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/match-records', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const tournamentName = req.query.tournament || 'Default';
    const { data, error } = await supabase
      .from('match_records')
      .select('*')
      .eq('tournament_name', tournamentName)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/stats/heatmap', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { data, error } = await supabase.from('match_heatmap').select('*');
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/stats/heatmap', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { events } = req.body;
    if (!events || !Array.isArray(events)) {
      return res.status(400).json({ error: 'Invalid payload: expected an array of events.' });
    }
    if (events.length === 0) {
      return res.json({ message: 'No events to insert.', data: [] });
    }
    const { data, error } = await supabase
      .from('match_heatmap')
      .insert(events)
      .select();
    if (error) throw error;
    await logAudit('HEATMAP', `Submitted ${events.length} heatmap events`, { events: events.length, sample: events[0] });
    res.json({ message: 'Heatmap data successfully saved!', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/vetoes', cacheMiddleware, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const tournamentName = req.query.tournament || 'Default';
    const game = req.query.game; 
    let query = supabase.from('map_vetoes').select('*').eq('tournament_name', tournamentName).order('created_at', { ascending: false });
    if (game) {
      query = query.eq('game', game);
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/vetoes', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const payload = req.body;
    if (!payload.tournament_name) {
      payload.tournament_name = 'Default';
    }
    const { data, error } = await supabase.from('map_vetoes').insert([payload]).select();
    if (error) throw error;
    await logAudit('VETO', `Submitted map veto for ${payload.team_a} vs ${payload.team_b}`, { payload }, payload.game);
    res.json({ message: 'Veto data successfully saved!', data: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/teams', cacheMiddleware, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { game, tournament } = req.query;
    let query = supabase.from('teams').select('*').order('team_name', { ascending: true });
    if (game) query = query.eq('game', game);
    if (tournament) query = query.eq('tournament_name', tournament);
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/teams', authenticateToken, isAdmin, upload.single('logo'), async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { team_name, tournament_name } = req.body;
    if (!team_name) return res.status(400).json({ error: 'Team name is required.' });
    const tName = tournament_name || 'Default';
    const payload = { team_name, tournament_name: tName };
    if (req.file) {
      payload.logo_url = `http://localhost:5000/uploads/${req.file.filename}`;
    } else if (req.body.logo_url) {
      payload.logo_url = req.body.logo_url;
    }
    const { data, error } = await supabase.from('teams').insert([payload]).select();
    if (error) throw error;
    await logAudit('TEAM', `Created new team: ${team_name} in ${tName}`, { team_name, tournament_name: tName, data: data[0] });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/teams/:id', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { id } = req.params;
    await supabase.from('players').delete().eq('team_id', id);
    const { error } = await supabase.from('teams').delete().eq('team_id', id);
    if (error) throw error;
    await logAudit('TEAM', `Deleted team with ID: ${id}`, { team_id: id });
    res.json({ message: 'Team deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/players', cacheMiddleware, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const tournamentName = req.query.tournament || 'Default';
    const { data, error } = await supabase.from('players').select('*, teams!inner(team_name, tournament_name)').eq('teams.tournament_name', tournamentName).order('player_name');
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/players', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { team_id, player_name, role_in_game } = req.body;
    if (!player_name || !team_id) return res.status(400).json({ error: 'Player name and team ID are required.' });
    const { data, error } = await supabase.from('players').insert([{ team_id, player_name, role_in_game: role_in_game || '' }]).select('*, teams(team_name)');
    if (error) throw error;
    // Log this action
    await logAudit('PLAYER', `Added player ${player_name} to team`, { player_name, team_id, role_in_game });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/players/:id', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { id } = req.params;
    const { error } = await supabase.from('players').delete().eq('player_id', id);
    if (error) throw error;
    await logAudit('PLAYER', `Deleted player with ID: ${id}`, { player_id: id });
    res.json({ message: 'Player deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/matches', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { tournament, status } = req.query;
    let query = supabase.from('matches').select('*, team_a:teams!matches_team_a_id_fkey(*), team_b:teams!matches_team_b_id_fkey(*)').order('created_at', { ascending: false });
    if (tournament) query = query.eq('tournament_name', tournament);
    if (status) query = query.in('status', status.split(','));
    const { data, error } = await query;
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/matches', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { tournament_name, team_a_id, team_b_id, map_name, game_title, status, match_day, match_time, match_timezone } = req.body;
    const { data, error } = await supabase
      .from('matches')
      .insert([{ tournament_name, team_a_id, team_b_id, map_name, game_title, status: status || 'scheduled', match_day, match_time, match_timezone }])
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/matches/:id', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { id } = req.params;
    const { team_a_score, team_b_score, status, map_name } = req.body;
    const updates = {};
    if (team_a_score !== undefined) updates.team_a_score = team_a_score;
    if (team_b_score !== undefined) updates.team_b_score = team_b_score;
    if (status !== undefined) updates.status = status;
    if (map_name !== undefined) updates.map_name = map_name;
    const { data, error } = await supabase
      .from('matches')
      .update(updates)
      .eq('match_id', id)
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/matches/:id', authenticateToken, isAdmin, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { id } = req.params;
    const { error } = await supabase.from('matches').delete().eq('match_id', id);
    if (error) throw error;
    res.json({ message: 'Match deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/predictions/matches', cacheMiddleware, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const tournamentName = req.query.tournament || 'Default';
    const { data, error } = await supabase
      .from('matches')
      .select(`
        match_id, match_schedule, status,
        team_a:teams!matches_team_a_id_fkey(team_id, team_name, logo_url),
        team_b:teams!matches_team_b_id_fkey(team_id, team_name, logo_url)
      `)
      .eq('status', 'scheduled')
      .not('match_schedule', 'is', null)
      .order('match_schedule', { ascending: true });
    if (error) throw error;
    let filtered = (data || []).filter(m => 
      (m.team_a && m.team_a.tournament_name === tournamentName) || 
      (m.team_b && m.team_b.tournament_name === tournamentName) ||
      true 
    );
    filtered = await Promise.all(filtered.map(async (match) => {
      const system_prediction = await generatePrediction(supabase, match.team_a, match.team_b);
      return { ...match, system_prediction };
    }));
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/predictions', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { username, match_id, predicted_winner_team_id } = req.body;
    if (!username || !match_id || !predicted_winner_team_id) {
      return res.status(400).json({ error: 'Missing required prediction data.' });
    }
    const payload = { username, match_id, predicted_winner_team_id, status: 'pending' };
    const { data, error } = await supabase
      .from('predictions')
      .upsert([payload], { onConflict: 'username,match_id' })
      .select();
    if (error) throw error;
    res.json({ message: 'Prediction saved successfully', data: data[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/predictions/user/:username', cacheMiddleware, async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { username } = req.params;
    const { data, error } = await supabase
      .from('predictions')
      .select('*, matches(team_a_id, team_b_id, match_schedule, status)')
      .eq('username', username)
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/predictions/leaderboard', async (req, res) => {
  if (!supabase) return res.status(500).json({ error: 'Supabase client not initialized.' });
  try {
    const { data, error } = await supabase
      .from('predictions')
      .select('username, points_awarded')
      .eq('status', 'evaluated');
    if (error) throw error;
    const leaderboardMap = {};
    (data || []).forEach(p => {
      if (!leaderboardMap[p.username]) leaderboardMap[p.username] = 0;
      leaderboardMap[p.username] += (p.points_awarded || 0);
    });
    const leaderboard = Object.keys(leaderboardMap).map(username => ({
      username,
      total_points: leaderboardMap[username]
    })).sort((a, b) => b.total_points - a.total_points);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 5000;

// GET brackets
app.get('/api/brackets', async (req, res) => {
  const { tournament, game_title } = req.query;
  try {
    let query = supabase.from('brackets').select(`
      id, tournament_name, game_title, round, best_of, score_a, score_b, map_info,
      team_a:team_a_id (team_name, logo_url),
      team_b:team_b_id (team_name, logo_url)
    `);
    
    if (tournament) query = query.eq('tournament_name', tournament);
    if (game_title) query = query.eq('game_title', game_title);

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST brackets
app.post('/api/brackets', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { tournament_name, game_title, round, best_of, team_a_id, team_b_id, score_a, score_b, map_info } = req.body;
    const { data, error } = await supabase
      .from('brackets')
      .insert([{
        tournament_name,
        game_title,
        round,
        best_of,
        team_a_id,
        team_b_id,
        score_a,
        score_b,
        map_info
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE brackets
app.delete('/api/brackets/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('brackets')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET bracket state
app.get('/api/bracket-state', async (req, res) => {
  const { tournament, game_title, format } = req.query;
  try {
    let query = supabase.from('bracket_states').select('*');
    if (tournament) query = query.eq('tournament_name', tournament);
    if (game_title) query = query.eq('game_title', game_title);
    if (format) query = query.eq('format', format);

    const { data, error } = await query;
    if (error) throw error;
    res.json(data[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST bracket state (upsert)
app.post('/api/bracket-state', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { tournament_name, game_title, format, team_pool, bracket_data } = req.body;
    
    // check if exists
    const { data: existing } = await supabase.from('bracket_states')
      .select('id')
      .eq('tournament_name', tournament_name)
      .eq('game_title', game_title)
      .eq('format', format);
      
    let query;
    if (existing && existing.length > 0) {
      query = supabase.from('bracket_states')
        .update({ team_pool, bracket_data, updated_at: new Date() })
        .eq('id', existing[0].id);
    } else {
      query = supabase.from('bracket_states')
        .insert([{ tournament_name, game_title, format, team_pool, bracket_data }]);
    }
    
    const { data, error } = await query.select();
    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Settings Endpoints (Admins, Reports, Bans) ---

app.get('/api/settings/admins', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').order('username');
    if (error) throw error;
    
    // Map to what Settings.jsx expects
    const mappedAdmins = data.map(user => ({
      id: user.user_id || user.id,
      name: user.username,
      role: user.role || (user.is_super_admin ? 'Super Admin' : 'Admin'),
      status: 'Online',
      lastActive: 'Active'
    }));
    
    res.json(mappedAdmins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admin/rulebook', async (req, res) => {
  try {
    const { data, error } = await supabase.from('rulebooks').select('*').order('created_at', { ascending: false }).limit(1);
    if (error) throw error;
    res.json(data[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admin/rulebook', upload.single('rulebook'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const file_url = `/uploads/${req.file.filename}`;
    const { data, error } = await supabase.from('rulebooks').insert([{ file_url }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/settings/formula', async (req, res) => {
  try {
    const { data, error } = await supabase.from('evaluation_formulas').select('*').order('role', { ascending: true });
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/settings/formula/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { kill_weight, death_weight, assist_weight, base_multiplier, base_rating } = req.body;
    const { data, error } = await supabase.from('evaluation_formulas').update({
      kill_weight, death_weight, assist_weight, base_multiplier, base_rating, updated_at: new Date()
    }).eq('id', id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/settings/reports', async (req, res) => {
  try {
    const { data, error } = await supabase.from('cheat_reports').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/settings/reports', upload.single('evidence'), async (req, res) => {
  try {
    const { reporter, reported, reason, statement } = req.body;
    let evidence_url = null;
    if (req.file) {
      evidence_url = `/uploads/${req.file.filename}`;
    }

    const { data, error } = await supabase.from('cheat_reports').insert([{
      reporter: reporter || 'Anonymous',
      reported,
      reason,
      statement,
      evidence_url,
      status: 'Pending'
    }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/settings/reports/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('cheat_reports').delete().eq('id', id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/settings/bans', async (req, res) => {
  try {
    const { data, error } = await supabase.from('bans').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/settings/bans', async (req, res) => {
  try {
    const { player_name, reason, duration, report_id } = req.body;
    
    const { data, error } = await supabase.from('bans').insert([{ player_name, reason, duration }]).select();
    if (error) throw error;

    if (report_id) {
      await supabase.from('cheat_reports').delete().eq('id', report_id);
    }
    
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/settings/health', async (req, res) => {
  try {
    const { data, error } = await supabase.from('regional_health').select('*').order('created_at', { ascending: false }).limit(1);
    if (error) throw error;
    res.json(data[0] || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });

  socket.on('cellEdit', async (data) => {
    const { room, user_id, field, new_value } = data;
    // Broadcast to everyone else in the room
    socket.to(room).emit('cellEdit', data);

    // Event Sourcing Log to DB
    if (supabase) {
      try {
        await supabase.from('data_entry_events').insert([{
          room_id: room,
          user_id: user_id || 'anonymous',
          event_type: 'cellEdit',
          field,
          new_value
        }]);
      } catch (e) {
        console.error('Failed to log event', e);
      }
    }
  });

  socket.on('disconnect', () => {});
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
