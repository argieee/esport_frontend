import React, { useState } from 'react';
import { apiFetch } from '../../utils/api';
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const ClipboardCheckIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const userDirectoryData = [
  { ign: 'Argie', team: 'Valorant', location: 'Quezon City', country: 'PH', contact: '09xx-xxx-xxxx', verified: true },
  { ign: 'Argie', team: 'Valorant', location: 'Cebu City', country: 'PH', contact: '09xx-xxx-xxxx', verified: false, pending: true },
  { ign: 'Crossfire', team: 'Crossfire', location: 'Cebu City', country: 'PH', contact: '09xx-xxx-xxxx', verified: false, rejected: true },
  { ign: 'Sarah', team: 'Crossfire', location: 'Davao City', country: 'PH', contact: '09xx-xxx-xxxx', verified: false, info: 'Linked PH ID/Facebook Profile' },
  { ign: 'EliteSniper', team: 'TNC South', location: 'Makati', country: 'PH', contact: '09xx-xxx-xxxx', verified: true },
];
const auditLogsData = [
  { time: '[14:15]', ign: 'System', type: 'Manual Type', details: "Verified 'TNC South' seedings list" },
  { time: '[14:15]', ign: 'Admin(Argie)', type: 'Action Overrides', details: "Updated Points Multiplier for TNC Community Cup" },
  { time: '[14:02]', ign: 'Admin(Sarah)', type: 'Approved', details: "Approved 'TNC Luzon' Valorant Points Multiplier" },
  { time: '[14:02]', ign: 'Admin(Sarah)', type: 'Audit Process', details: "Verified 5 new players" },
  { time: '[13:45]', ign: 'System', type: 'Automated Event', details: "Season 4 Round Robin Bracket generated" },
];
const modes = ['Single Elimination', 'Round Robin'];
const ToggleSwitch = ({ enabled, onChange }) => (
  <button 
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-cyan-500' : 'bg-[#1c2532] border border-[#2a3648]'}`}
    onClick={() => onChange(!enabled)}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);
const SelectDropdown = ({ label, options, defaultValue, value, onChange }) => (
  <div className="relative">
    <select 
      value={value !== undefined ? value : defaultValue} 
      onChange={onChange} 
      className="appearance-none w-full bg-[#121a25] border border-[#2a3648] text-gray-300 font-medium text-xs rounded py-2 pl-3 pr-8 focus:outline-none focus:border-cyan-500 transition-colors"
    >
      {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <ChevronDownIcon />
    </div>
  </div>
);
const LiveMatchManager = ({ globalTournament, globalGame, teams }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMatch, setNewMatch] = useState({ team_a_id: '', team_b_id: '', map_name: '' });
  const fetchMatches = async () => {
    if (!globalTournament) return;
    setLoading(true);
    try {
      const res = await apiFetch(`/api/matches?tournament=${encodeURIComponent(globalTournament)}`);
      if (res.ok) setMatches(await res.json());
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  React.useEffect(() => { fetchMatches(); }, [globalTournament]);
  const handleCreateMatch = async () => {
    if (!newMatch.team_a_id || !newMatch.team_b_id) return alert('Select both teams');
    try {
      const res = await apiFetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tournament_name: globalTournament,
          game_title: globalGame,
          team_a_id: newMatch.team_a_id,
          team_b_id: newMatch.team_b_id,
          map_name: newMatch.map_name || 'TBD',
          status: 'live'
        })
      });
      if (res.ok) {
        setNewMatch({ team_a_id: '', team_b_id: '', map_name: '' });
        fetchMatches();
      }
    } catch (e) { console.error(e); }
  };
  const updateScore = async (matchId, team, currentScore, delta) => {
    const field = team === 'a' ? 'team_a_score' : 'team_b_score';
    const newScore = Math.max(0, currentScore + delta);
    try {
      const res = await apiFetch(`/api/matches/${matchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: newScore })
      });
      if (res.ok) fetchMatches();
    } catch (e) { console.error(e); }
  };
  const updateStatus = async (matchId, status) => {
    try {
      const res = await apiFetch(`/api/matches/${matchId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchMatches();
    } catch (e) { console.error(e); }
  };
  return (
    <div className="mt-4 border border-[#2a3648] bg-[#151e2b] rounded-lg p-4 relative">
      <span className="absolute -top-2 left-3 bg-[#151e2b] px-1 text-[9px] font-bold text-cyan-400 uppercase tracking-widest">Live Match Controller</span>
      <div className="flex items-center gap-2 mb-4 mt-1">
        <select value={newMatch.team_a_id} onChange={e => setNewMatch({...newMatch, team_a_id: e.target.value})} className="flex-1 bg-[#0f1722] border border-[#2a3648] rounded px-2 py-1 text-xs text-white">
          <option value="">Select Team A</option>
          {teams.map(t => <option key={t.team_id} value={t.team_id}>{t.team_name}</option>)}
        </select>
        <span className="text-xs text-gray-500 font-black">VS</span>
        <select value={newMatch.team_b_id} onChange={e => setNewMatch({...newMatch, team_b_id: e.target.value})} className="flex-1 bg-[#0f1722] border border-[#2a3648] rounded px-2 py-1 text-xs text-white">
          <option value="">Select Team B</option>
          {teams.map(t => <option key={t.team_id} value={t.team_id}>{t.team_name}</option>)}
        </select>
        <input placeholder="Map..." value={newMatch.map_name} onChange={e => setNewMatch({...newMatch, map_name: e.target.value})} className="w-20 bg-[#0f1722] border border-[#2a3648] rounded px-2 py-1 text-xs text-white" />
        <button onClick={handleCreateMatch} className="bg-cyan-600 text-white font-bold text-xs px-3 py-1 rounded hover:bg-cyan-500">+</button>
      </div>
      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
        {loading && <div className="text-center text-xs text-gray-500">Loading matches...</div>}
        {matches.map(m => (
          <div key={m.match_id} className="bg-[#0f1722] border border-[#2a3648] rounded p-2 flex flex-col gap-2">
            <div className="flex justify-between items-center">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.map_name || 'TBD'}</span>
               <select value={m.status} onChange={e => updateStatus(m.match_id, e.target.value)} className="bg-transparent text-[10px] font-black uppercase outline-none border border-gray-700 rounded px-1" style={{ color: m.status === 'live' ? '#ef4444' : '#64748b' }}>
                 <option value="scheduled">Scheduled</option>
                 <option value="live">Live</option>
                 <option value="finished">Finished</option>
               </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => updateScore(m.match_id, 'a', m.team_a_score, -1)} className="text-gray-500 hover:text-white px-1">-</button>
                <span className="text-lg font-black w-6 text-center text-white">{m.team_a_score || 0}</span>
                <button onClick={() => updateScore(m.match_id, 'a', m.team_a_score, 1)} className="text-gray-500 hover:text-white px-1">+</button>
                <span className="text-xs font-bold w-24 truncate text-white">{m.team_a?.team_name || 'TBD'}</span>
              </div>
              <span className="text-xs text-gray-600 font-black">VS</span>
              <div className="flex items-center gap-2 flex-row-reverse">
                <button onClick={() => updateScore(m.match_id, 'b', m.team_b_score, -1)} className="text-gray-500 hover:text-white px-1">-</button>
                <span className="text-lg font-black w-6 text-center text-white">{m.team_b_score || 0}</span>
                <button onClick={() => updateScore(m.match_id, 'b', m.team_b_score, 1)} className="text-gray-500 hover:text-white px-1">+</button>
                <span className="text-xs font-bold w-24 truncate text-right text-white">{m.team_b?.team_name || 'TBD'}</span>
              </div>
            </div>
          </div>
        ))}
        {!loading && matches.length === 0 && <div className="text-center text-xs text-gray-500 italic py-2">No matches created for this tournament.</div>}
      </div>
    </div>
  );
};
const Admin = ({ globalGame, globalTournament }) => {
  const [adminGame, setAdminGame] = useState('Game (VAL/CF)');
  const effectiveGame = adminGame === 'Game (VAL/CF)' ? (globalGame || 'VALORANT') : adminGame;
  const maps = (effectiveGame.toUpperCase() === 'VALORANT')
    ? ['Ascent', 'Fracture', 'Pearl', 'Haven']
    : ['Crossfire', 'Crossfire(Luzon)', 'Crossfire(Visayas)'];
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('Tournament Mod');
  const [isCreating, setIsCreating] = useState(false);
  const handleCreateUser = async () => {
    if (!newEmail || !newPassword) return alert('Email and password required');
    setIsCreating(true);
    try {
      const res = await apiFetch('/api/admin/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, password: newPassword, role: newRole })
      });
      if (res.ok) {
        alert('User created successfully!');
        setShowCreateModal(false);
        setNewEmail('');
        setNewPassword('');
        // Refresh the accounts list (using timestamp to bypass the 60s backend cache)
        const resUsers = await apiFetch(`/api/users?t=${Date.now()}`);
        if (resUsers.ok) setAccounts(await resUsers.json());
      } else {
        const errorData = await res.json();
        alert('Error creating user: ' + (errorData.error || 'Unknown error'));
      }
    } catch (e) {
      console.error(e);
      alert('Failed to create user.');
    }
    setIsCreating(false);
  };
  const [isBroadcasting, setIsBroadcasting] = useState(() => {
    const saved = localStorage.getItem('isBroadcasting');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const handleBroadcastChange = (val) => {
    setIsBroadcasting(val);
    localStorage.setItem('isBroadcasting', JSON.stringify(val));
  };
  const [banOverride, setBanOverride] = useState(false);
  const [seasonReset, setSeasonReset] = useState(true);
  const [activeMap, setActiveMap] = useState('Ascent');
  const [teams, setTeams] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [rulebookUrl, setRulebookUrl] = useState(null);

  React.useEffect(() => {
    const fetchRulebook = async () => {
      try {
        const res = await fetch('/api/admin/rulebook');
        if (res.ok) {
          const data = await res.json();
          if (data && data.file_url) setRulebookUrl(data.file_url);
        }
      } catch (err) { console.error(err); }
    };
    fetchRulebook();
  }, []);

  const handleRulebookUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('rulebook', file);
    try {
      const res = await fetch('/api/admin/rulebook', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        setRulebookUrl(data.file_url);
        alert('Rulebook uploaded successfully!');
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };
  const activeTournamentObj = tournaments.find(t => t.id == globalTournament);
  const handleUpdateFolderGame = async (newGame) => {
    if (!activeTournamentObj) return;
    try {
      const res = await apiFetch('/api/tournaments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: activeTournamentObj.name, game: newGame })
      });
      if (res.ok) {
        window.location.reload(); 
      } else {
        const errorData = await res.json();
        alert('Error updating folder: ' + (errorData.error || 'Unknown error'));
      }
    } catch (e) {
      console.error(e);
      alert('Failed to update folder game title.');
    }
  };
  const [editingUser, setEditingUser] = useState(null);
  const [editPermissions, setEditPermissions] = useState({ view: false, edit: false, full: false, manage_folders: false });
  const [isUpdatingPermissions, setIsUpdatingPermissions] = useState(false);
  const handleOpenEdit = (user) => {
    if (user.is_super_admin) return alert("Cannot manually alter permissions for the Super Admin.");
    setEditingUser(user);
    setEditPermissions(user.permissions || { view: false, edit: false, full: false, manage_folders: false });
  };
  const handleUpdatePermissions = async () => {
    if (!editingUser) return;
    setIsUpdatingPermissions(true);
    try {
      const res = await apiFetch(`/api/admin/user/${editingUser.user_id}/permissions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissions: editPermissions })
      });
      if (res.ok) {
        alert('Permissions updated successfully!');
        setEditingUser(null);
        const resUsers = await apiFetch(`/api/users?t=${Date.now()}`);
        if (resUsers.ok) setAccounts(await resUsers.json());
      } else {
        const data = await res.json();
        alert('Error: ' + data.error);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to update permissions.');
    }
    setIsUpdatingPermissions(false);
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resTeams = await apiFetch('/api/teams');
        if (resTeams.ok) setTeams(await resTeams.json());
        const resUsers = await apiFetch(`/api/users?t=${Date.now()}`);
        if (resUsers.ok) setAccounts(await resUsers.json());
        const resTournaments = await apiFetch('/api/tournaments');
        if (resTournaments.ok) setTournaments(await resTournaments.json());
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex-1 bg-[#090e14] text-white overflow-y-auto flex flex-col h-full relative font-sans custom-scrollbar">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
      {}
      <div className="flex-1 px-8 md:px-12 py-6 pb-16 flex flex-col items-center">
        <div className="w-full max-w-[1400px] flex flex-col gap-6">
          {}
          {activeTournamentObj && (
            <div className="bg-[#0f1722] rounded-xl border border-cyan-700/50 shadow-[0_0_15px_rgba(0,208,235,0.15)] p-4 flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Active Folder:</span>
                <span className="text-cyan-400 font-black text-xl tracking-wider">{activeTournamentObj.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Game Title:</span>
                <select 
                  value={activeTournamentObj.game.toUpperCase()} 
                  onChange={(e) => handleUpdateFolderGame(e.target.value)}
                  className="bg-[#151e2b] border border-[#2a3648] text-cyan-400 text-sm font-bold rounded px-4 py-2 focus:outline-none focus:border-cyan-500 cursor-pointer hover:bg-[#1c2532] transition-colors"
                >
                  <option value="VALORANT">VALORANT</option>
                  <option value="CROSSFIRE">CROSSFIRE</option>
                </select>
              </div>
            </div>
          )}
          {}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {}
            <div className="xl:col-span-5 bg-[#0f1722] rounded-xl border border-[#1c2532] shadow-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#1c2532] bg-[#121a25]">
                 <h2 className="text-sm font-bold text-gray-300 tracking-wide">League Quick Stats (PH Local Context)</h2>
              </div>
              <div className="p-5 grid grid-cols-3 gap-4 flex-1">
                 {}
                 <div className="flex flex-col items-center justify-center bg-[#151e2b] border border-[#1c2532] rounded-lg p-3">
                    <span className="text-xs text-gray-400 mb-2">Total Registered Players</span>
                    <div className="flex items-center space-x-3 mb-1">
                       <UsersIcon />
                       <div className="flex flex-col">
                         <span className="text-2xl font-black text-cyan-400 leading-none">12,500</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Players</span>
                       </div>
                    </div>
                    <span className="text-[9px] text-gray-500 mt-2 text-center">Verified (PH: 98%)</span>
                 </div>
                 <div className="flex flex-col items-center justify-center bg-[#151e2b] border border-[#1c2532] rounded-lg p-3">
                    <span className="text-xs text-gray-400 mb-2">Total Teams</span>
                    <div className="flex items-center space-x-3 mb-1">
                       <TrophyIcon />
                       <div className="flex flex-col">
                         <span className="text-2xl font-black text-cyan-400 leading-none">620</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Teams</span>
                       </div>
                    </div>
                    <span className="text-[9px] text-gray-500 mt-2 text-center text-balance">Active Teams (Local Leagues)</span>
                 </div>
                 <div className="flex flex-col items-center justify-center bg-[#151e2b] border border-[#1c2532] rounded-lg p-3">
                    <span className="text-xs text-gray-400 mb-2">Active Tournaments</span>
                    <div className="flex items-center space-x-3 mb-1">
                       <CalendarIcon />
                       <div className="flex flex-col">
                         <span className="text-2xl font-black text-orange-400 leading-none">15</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Tournaments</span>
                       </div>
                    </div>
                    <span className="text-[9px] text-gray-500 mt-2 text-center text-balance">Ongoing (Metro Manila, Cebu, etc.)</span>
                 </div>
                 {}
                 <div className="col-span-2 flex flex-col items-center justify-center bg-[#151e2b] border border-[#1c2532] rounded-lg p-3">
                    <span className="text-xs text-gray-400 mb-2">Pending Verifications</span>
                    <div className="flex items-center space-x-4 mb-1">
                       <ClipboardCheckIcon />
                       <div className="flex flex-col">
                         <span className="text-2xl font-black text-orange-400 leading-none">45</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Verifications</span>
                       </div>
                    </div>
                    <span className="text-[9px] text-gray-500 mt-2">New Player IDs to review</span>
                 </div>
                 <div className="flex flex-col items-center justify-center bg-[#151e2b] border border-[#1c2532] rounded-lg p-3">
                    <span className="text-xs text-gray-400 mb-2">New Admin Logins</span>
                    <div className="flex items-center space-x-3 mb-1">
                       <LockIcon />
                       <div className="flex flex-col">
                         <span className="text-2xl font-black text-cyan-400 leading-none">12</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Admins</span>
                       </div>
                    </div>
                    <span className="text-[9px] text-gray-500 mt-2 text-center text-balance">Admins (Central & Local PH)</span>
                 </div>
              </div>
            </div>
            {}
            <div className="xl:col-span-7 bg-[#0f1722] rounded-xl border border-[#1c2532] shadow-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#1c2532] bg-[#121a25] flex justify-between items-center">
                 <div>
                   <h2 className="text-sm font-bold text-gray-300 tracking-wide">Admin Accounts & User Directory</h2>
                   <span className="text-[10px] text-gray-500 font-mono italic">(System Access Hub)</span>
                 </div>
                 <div className="flex space-x-2">
                    <div className="relative w-48">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <SearchIcon />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Search (IGN, Team, Location)" 
                        className="w-full bg-[#151e2b] border border-[#2a3648] text-gray-300 text-xs rounded py-1.5 pl-8 pr-2 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <SelectDropdown options={['Verification Status', 'Verified', 'Pending', 'Rejected']} />
                 </div>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151e2b] text-gray-500 sticky top-0 shadow-sm z-10 border-b border-[#1c2532]">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-1/5">Username</th>
                      <th className="px-4 py-3 font-semibold">Role</th>
                      <th className="px-4 py-3 font-semibold">Super Admin</th>
                      <th className="px-4 py-3 font-semibold">Permissions</th>
                      <th className="px-4 py-3 font-semibold text-center w-20">Active</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c2532]">
                    {accounts.length === 0 ? (
                      <tr><td colSpan="5" className="text-center py-4 text-gray-500 italic">No accounts found or loading...</td></tr>
                    ) : accounts.map((user, idx) => (
                      <tr key={idx} onClick={() => handleOpenEdit(user)} className="hover:bg-[#151e2b]/50 transition-colors cursor-pointer group">
                        <td className="px-4 py-3 text-gray-300 font-medium group-hover:text-cyan-400">
                           <div className="flex flex-col">
                             <span>{user.username}</span>
                             {!user.is_super_admin && <span className="text-[9px] text-cyan-600/70 hidden group-hover:block italic mt-0.5">Click to edit</span>}
                           </div>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{user.role || 'N/A'}</td>
                        <td className="px-4 py-3 text-gray-400">
                           {user.is_super_admin ? (
                             <span className="bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Yes</span>
                           ) : (
                             <span className="text-gray-600 font-bold text-[10px] uppercase">No</span>
                           )}
                        </td>
                        <td className="px-4 py-3 text-gray-400 font-mono text-[9px] tracking-wide max-w-[150px] truncate">
                           {user.permissions ? JSON.stringify(user.permissions) : 'None'}
                        </td>
                        <td className="px-4 py-3 text-center flex flex-col items-center justify-center">
                            <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {}
              <div className="p-3 border-t border-[#1c2532] bg-[#121a25] flex justify-between items-center">
                 <div className="flex items-center space-x-2 font-black text-xl italic tracking-wider text-orange-500 drop-shadow-md">
                    <svg viewBox="0 0 100 100" className="w-6 h-6 fill-orange-500"><path d="M50 0L90 20v50L50 100 10 70V20z"/></svg>
                    <span>TNC Hub</span>
                 </div>
                 <div className="flex space-x-3">
                    <button onClick={() => setShowCreateModal(true)} className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors shadow-lg shadow-cyan-900/20">Create Admin</button>
                    <button className="px-4 py-1.5 rounded bg-transparent border border-cyan-700/50 text-cyan-500 text-xs font-bold hover:bg-cyan-900/30 transition-colors">Create New Player</button>
                    <button className="px-4 py-1.5 rounded bg-transparent border border-cyan-700/50 text-cyan-500 text-xs font-bold hover:bg-cyan-900/30 transition-colors">Import Teams via CSV</button>
                 </div>
              </div>
            </div>
          </div>
          {}
          <div className="bg-[#0f1722] rounded-xl border border-[#1c2532] shadow-xl flex flex-col">
             <div className="p-4 border-b border-[#1c2532] bg-[#121a25] flex justify-between items-center">
                 <h2 className="text-sm font-bold text-gray-300 tracking-wide">Rulebook Viewer</h2>
                 <label className="px-3 py-1 rounded bg-transparent border border-[#2a3648] text-cyan-400 text-[10px] font-bold hover:bg-[#1c2532] transition-colors cursor-pointer">
                    Upload New Rulebook
                    <input type="file" className="hidden" accept="application/pdf,image/*" onChange={handleRulebookUpload} />
                 </label>
             </div>
             <div className="p-6">
                {rulebookUrl ? (
                  <iframe src={rulebookUrl} className="w-full h-[500px] rounded border border-[#1c2532] bg-[#121a25]" title="Rulebook Viewer"></iframe>
                ) : (
                  <div className="flex items-center justify-center h-[300px] text-gray-500 font-mono text-sm border-2 border-dashed border-[#1c2532] rounded">
                     No rulebook uploaded yet.
                  </div>
                )}
             </div>
          </div>
          {}
          <div className="bg-[#0f1722] rounded-xl border border-[#1c2532] shadow-xl flex flex-col">
             <div className="p-4 border-b border-[#1c2532] bg-[#121a25] flex justify-between items-center">
                 <h2 className="text-sm font-bold text-gray-300 tracking-wide">Admin and User Activity Audit Logs (PH Context)</h2>
                 <button className="px-4 py-1.5 rounded bg-[#1c2532] border border-[#2a3648] text-cyan-400 text-xs font-bold hover:bg-[#232f40] transition-colors">Create Detailed Report</button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151e2b] text-gray-500 border-b border-[#1c2532]">
                    <tr>
                      <th className="px-6 py-3 font-semibold w-32">Timestamp</th>
                      <th className="px-6 py-3 font-semibold w-48">Admin/System IGN</th>
                      <th className="px-6 py-3 font-semibold w-48">Action Type</th>
                      <th className="px-6 py-3 font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c2532]">
                    {auditLogsData.map((log, idx) => (
                      <tr key={idx} className="hover:bg-[#151e2b]/50 transition-colors cursor-pointer group">
                        <td className="px-6 py-3 text-gray-400 font-mono tracking-wide group-hover:text-cyan-400">{log.time}</td>
                        <td className="px-6 py-3 text-gray-300 font-medium">{log.ign}</td>
                        <td className="px-6 py-3 text-gray-400">{log.type}</td>
                        <td className="px-6 py-3 text-gray-400">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      </div>
      {}
      {showCreateModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f1722] p-8 rounded-xl border border-[#1c2532] shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/w0000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex items-center space-x-3 mb-6">
              <LockIcon />
              <h3 className="text-xl font-black text-white uppercase tracking-widest">Create Admin Account</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-[#151e2b] border border-[#2a3648] text-white text-sm rounded-lg py-2 px-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="admin@esport.ph"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#151e2b] border border-[#2a3648] text-white text-sm rounded-lg py-2 px-3 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Role</label>
                <select 
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#151e2b] border border-[#2a3648] text-white text-sm rounded-lg py-2 px-3 focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="Tournament Mod">Tournament Mod</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Observer">Observer</option>
                </select>
              </div>
              <button
                onClick={handleCreateUser}
                disabled={isCreating}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#090e14] font-black uppercase tracking-widest py-3 rounded-lg mt-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
              >
                {isCreating ? 'Creating...' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      )}
      {}
      {editingUser && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0f1722] p-8 rounded-xl border border-[#1c2532] shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setEditingUser(null)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/w0000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex items-center space-x-3 mb-6">
              <LockIcon />
              <h3 className="text-xl font-black text-white uppercase tracking-widest">Edit Permissions</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-[#151e2b] p-4 rounded-lg border border-[#1c2532]">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">User</label>
                <div className="text-cyan-400 font-bold text-base">{editingUser.username} <span className="text-gray-500 text-sm font-normal ml-1">({editingUser.role})</span></div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Permissions</label>
                <div className="grid grid-cols-2 gap-3">
                   {['view', 'edit', 'full', 'manage_folders'].map((perm) => (
                      <label key={perm} className="flex items-center space-x-3 cursor-pointer group bg-[#151e2b] p-3 rounded-lg border border-[#1c2532] hover:border-cyan-500/50 transition-all">
                        <div className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded border ${editPermissions[perm] ? 'bg-cyan-500 border-cyan-500' : 'bg-[#0f1722] border-gray-600 group-hover:border-gray-500'} transition-colors`}>
                           {editPermissions[perm] && <svg className="w-3.5 h-3.5 text-[#090e14]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <input
                          type="checkbox"
                          checked={editPermissions[perm] || false}
                          onChange={(e) => setEditPermissions({...editPermissions, [perm]: e.target.checked})}
                          className="hidden"
                        />
                        <span className="text-sm font-medium text-gray-300 capitalize group-hover:text-cyan-400 transition-colors whitespace-nowrap">{perm.replace('_', ' ')}</span>
                      </label>
                   ))}
                </div>
              </div>
              <button
                onClick={handleUpdatePermissions}
                disabled={isUpdatingPermissions}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#090e14] font-black uppercase tracking-widest py-3.5 rounded-lg mt-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
              >
                {isUpdatingPermissions ? 'Saving...' : 'Save Permissions'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Admin;
