import React, { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const IconTrophy = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconCrosshair = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22v-4m0-12V2m10 10h-4M6 12H2m13.414 7.414l-2.828-2.828M6.414 6.414l2.828 2.828m8.486 0l-2.828 2.828M6.414 17.586l2.828-2.828" />
  </svg>
);
const IconGlobe = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
);
const IconPlay = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const IconChevron = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

/* ─────────────────────────────────────────────
   ROLE BADGE
───────────────────────────────────────────── */
const roleBadge = (role) => {
  const s = {
    'Duelist':   'text-red-300 bg-red-500/10 border-red-500/20',
    'Initiator': 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20',
    'Controller':'text-purple-300 bg-purple-500/10 border-purple-500/20',
    'Sentinel':  'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
    'Sniper':    'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
    'Assaulter': 'text-orange-300 bg-orange-500/10 border-orange-500/20',
    'Lurker':    'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
    'Support':   'text-blue-300 bg-blue-500/10 border-blue-500/20',
    'Flex':      'text-pink-300 bg-pink-500/10 border-pink-500/20',
  };
  return s[role] || 'text-gray-300 bg-gray-500/10 border-gray-500/20';
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const db = {
  valorant: {
    label: 'VALORANT',
    accent: '#06b6d4',
    accentAlt: '#3b82f6',
    timerSeconds: 225301,
    kpis: [
      { title: 'VCT Tournaments', icon: 'globe', stats: [{ label: 'Active', value: '3' }, { label: 'Upcoming', value: '12' }] },
      { title: 'Valorant Players', icon: 'users', stats: [{ label: 'Registered', value: '18,250' }, { label: 'Active', value: '6,400' }] },
      { title: 'Total Teams', icon: 'crosshair', stats: [{ label: 'Verified', value: '450' }, { label: 'Amateur', value: '1,800' }] },
      { title: 'Prize Pool', icon: 'trophy', stats: [{ label: 'Total', value: '₱5.75M' }, { label: 'Current', value: '₱1.20M' }] },
    ],
    liveMatch: { team1: 'PRX', team2: 'SEN', score: '7 – 9', map: 'Sunset', status: 'LIVE' },
    standings: [
      { t1: 'PRX', t2: 'SEN', score: '7 – 9', map: 'Map 2: Sunset', live: true },
      { t1: 'FNC', t2: 'DRX', score: '0 – 1', map: 'Map 1: Ascent', live: true },
      { t1: 'LOUD', t2: 'NRG', score: '13 – 7', map: 'Match Finished', live: false },
    ],
    stats: [
      { rank: 1, name: 'PRX.Jinggg', kd: 1.8, wl: '12 / 3', dmg: '45k', role: 'Duelist' },
      { rank: 2, name: 'DRX.MaKo', kd: 1.7, wl: '11 / 4', dmg: '38k', role: 'Controller' },
      { rank: 3, name: 'ZETA.Laz', kd: 1.6, wl: '10 / 5', dmg: '35k', role: 'Sentinel' },
      { rank: 4, name: 'PRX.Forsaken', kd: 1.5, wl: '9 / 3', dmg: '32k', role: 'Flex' },
      { rank: 5, name: 'T1.Sayaplayer', kd: 1.45, wl: '8 / 4', dmg: '30k', role: 'Duelist' },
      { rank: 6, name: 'GEN.Meteor', kd: 1.4, wl: '8 / 5', dmg: '28k', role: 'Duelist' },
      { rank: 7, name: 'TS.Invy', kd: 1.35, wl: '7 / 5', dmg: '25k', role: 'Initiator' },
      { rank: 8, name: 'RRQ.Lmemore', kd: 1.3, wl: '6 / 6', dmg: '22k', role: 'Sentinel' },
    ],
  },
  crossfire: {
    label: 'CROSSFIRE',
    accent: '#f59e0b',
    accentAlt: '#ef4444',
    timerSeconds: 86400,
    kpis: [
      { title: 'CFS Tournaments', icon: 'globe', stats: [{ label: 'Active', value: '1' }, { label: 'Upcoming', value: '4' }] },
      { title: 'Crossfire Players', icon: 'users', stats: [{ label: 'Registered', value: '45,120' }, { label: 'Active', value: '12,300' }] },
      { title: 'Clan Rosters', icon: 'crosshair', stats: [{ label: 'Verified', value: '890' }, { label: 'Amateur', value: '3,200' }] },
      { title: 'Prize Pool', icon: 'trophy', stats: [{ label: 'Total', value: '$2.5M' }, { label: 'Current', value: '$500K' }] },
    ],
    liveMatch: { team1: 'ALL GAMERS', team2: 'BAISHA', score: '5 – 3', map: 'Black Widow', status: 'LIVE' },
    standings: [
      { t1: 'AG', t2: 'BS', score: '5 – 3', map: 'Map 1: Black Widow', live: true },
      { t1: 'VG', t2: 'SV', score: '9 – 9', map: 'Map 3: Port', live: true },
      { t1: 'PM', t2: 'EXE', score: '10 – 4', map: 'Match Finished', live: false },
    ],
    stats: [
      { rank: 1, name: 'AG.Even', kd: 2.1, wl: '18 / 2', dmg: '55k', role: 'Assaulter' },
      { rank: 2, name: 'BS.N9', kd: 1.9, wl: '16 / 4', dmg: '48k', role: 'Sniper' },
      { rank: 3, name: 'VG.Mzi', kd: 1.5, wl: '12 / 5', dmg: '38k', role: 'Support' },
      { rank: 4, name: 'AG.ZY', kd: 1.4, wl: '11 / 6', dmg: '35k', role: 'Lurker' },
      { rank: 5, name: 'BS.baby', kd: 1.35, wl: '10 / 5', dmg: '32k', role: 'Assaulter' },
      { rank: 6, name: 'EP.First', kd: 1.3, wl: '9 / 6', dmg: '30k', role: 'Sniper' },
      { rank: 7, name: 'KZ.Lsn', kd: 1.25, wl: '8 / 7', dmg: '28k', role: 'Support' },
      { rank: 8, name: 'AG.Doo', kd: 1.2, wl: '8 / 8', dmg: '25k', role: 'Assaulter' },
    ],
  },
};

const KpiCard = ({ card, accent, onClick }) => {
  const icons = { globe: <IconGlobe />, users: <IconUsers />, crosshair: <IconCrosshair />, trophy: <IconTrophy /> };
  return (
    <div onClick={() => onClick(card)} className="cursor-pointer bg-[#0d131c] rounded-2xl border border-slate-800/60 p-5 flex flex-col gap-4 hover:border-slate-700/60 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 group relative overflow-hidden">
      {/* corner glow */}
      <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: accent }} />
      {/* title + icon */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{card.title}</h3>
        <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0" style={{ color: accent }}>
          {icons[card.icon]}
        </div>
      </div>
      {/* stats */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        {card.stats.map((s, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{s.label}</span>
            <span className="text-xl font-black text-white">{s.value}</span>
          </div>
        ))}
      </div>
      {/* hover bottom bar */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 rounded-b-2xl" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
    </div>
  );
};

/* ─────────────────────────────────────────────
   KPI MODAL
───────────────────────────────────────────── */
const KpiModal = ({ card, accent, onClose }) => {
  if (!card) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-[#0b111a] border border-slate-700/60 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-slate-800/60 flex items-center justify-between bg-slate-900/30">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}80` }} />
            <h2 className="text-lg font-black uppercase tracking-widest text-white">{card.title} Details</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {card.stats.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{s.label}</span>
                <span className="text-2xl font-black text-white">{s.value}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#0f1621] border border-slate-800 rounded-xl p-5">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Detailed Breakdown</h4>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors border border-transparent hover:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold" style={{ color: accent }}>{i}</div>
                    <div className="text-sm font-bold text-slate-200">Data Entry Point {i}</div>
                  </div>
                  <div className="text-sm font-mono text-slate-400">+{(Math.random() * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MATCH ROW
───────────────────────────────────────────── */
const MatchRow = ({ match, accent }) => (
  <div className="flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-xl px-4 py-3 transition-all cursor-pointer group">
    <div className="flex items-center gap-3 min-w-0 flex-1">
      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-300 shrink-0">{match.t1[0]}</div>
      <div className="min-w-0">
        <div className="text-sm font-bold text-white truncate">{match.t1} <span className="text-slate-500 font-normal">vs</span> {match.t2}</div>
        <div className="text-[10px] text-slate-500 truncate">{match.map}</div>
      </div>
    </div>
    <div className="flex items-center gap-3 shrink-0 pl-3">
      <div className="text-base font-black text-white">{match.score}</div>
      {match.live ? (
        <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] font-black text-red-400">LIVE</span>
        </div>
      ) : (
        <span className="text-[9px] font-bold text-slate-500 bg-white/5 border border-white/5 rounded-full px-2 py-0.5">FIN</span>
      )}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   TIMER BLOCK
───────────────────────────────────────────── */
const TimerBlock = ({ label, value }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="text-2xl md:text-3xl font-mono font-black text-white">{value}</div>
    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{label}</div>
  </div>
);

/* ─────────────────────────────────────────────
   LEADERBOARD & PLAYER OVERVIEW MODAL
───────────────────────────────────────────── */
const LeaderboardOverviewModal = ({ isOpen, onClose, data, player, accent }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-[#0b111a] border border-slate-700/60 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800/60 flex items-center justify-between bg-slate-900/30 shrink-0">
          <div className="flex items-center gap-4">
            {player ? (
              <div className="w-12 h-12 rounded-lg bg-[#121a25] border-2 shadow-lg flex items-center justify-center text-xl font-black text-white" style={{ borderColor: accent }}>
                {player.name.split('.')[0]?.[0] || 'P'}
              </div>
            ) : (
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent, boxShadow: `0 0 10px ${accent}80` }} />
            )}
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest text-white drop-shadow-md">
                {player ? `${player.name} Profile` : 'Full Leaderboard Stats'}
              </h2>
              <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-1">
                {player ? `Rank #${player.rank} — ${player.role}` : 'Season Performance Overview'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {player ? (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-[#151e2b] border border-slate-800 rounded-xl p-5">
                  <h3 className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-4">Combat Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-400">K/D Ratio</span><span className="text-xl font-black text-white" style={{ color: accent }}>{player.kd}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-400">Win / Loss</span><span className="text-lg font-black text-white">{player.wl}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-400">Total Damage</span><span className="text-lg font-black text-white">{player.dmg}</span></div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#151e2b] border border-slate-800 rounded-xl p-5 h-full">
                  <h3 className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-4">Advanced Metrics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-400">Kill per Round</span><span className="text-lg font-black text-slate-200">{(player.kd * 0.7).toFixed(2)}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-400">Survive Rate</span><span className="text-lg font-black text-slate-200">62%</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-400">Headshot %</span><span className="text-lg font-black text-slate-200">45%</span></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#151e2b] rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#182331] text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4 font-bold">Rank</th>
                    <th className="px-6 py-4 font-bold">Player</th>
                    <th className="px-6 py-4 font-bold">Avg K/D</th>
                    <th className="px-6 py-4 font-bold">W/L</th>
                    <th className="px-6 py-4 font-bold">Damage</th>
                    <th className="px-6 py-4 font-bold text-right">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {data.stats.map((s, i) => (
                    <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-4 text-slate-500 font-mono font-bold text-base"><span className="opacity-50">#</span>{s.rank}</td>
                      <td className="px-6 py-4 font-bold text-white">{s.name}</td>
                      <td className="px-6 py-4 font-black" style={{ color: accent }}>{s.kd}</td>
                      <td className="px-6 py-4 text-slate-300 font-medium text-sm">{s.wl}</td>
                      <td className="px-6 py-4 text-slate-200 font-bold text-sm">{s.dmg}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-block text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-600 tracking-widest uppercase">{s.role}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */
const Dashboard = () => {
  const [activeGame, setActiveGame] = useState('valorant');
  const data = db[activeGame];
  const [timeLeft, setTimeLeft] = useState(data.timerSeconds);
  const [activeModal, setActiveModal] = useState(null);
  const [overviewState, setOverviewState] = useState({ open: false, player: null });

  useEffect(() => { setTimeLeft(data.timerSeconds); }, [activeGame]);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (s) => ({
    d: String(Math.floor(s / 86400)).padStart(2, '0'),
    h: String(Math.floor((s % 86400) / 3600)).padStart(2, '0'),
    m: String(Math.floor((s % 3600) / 60)).padStart(2, '0'),
    s: String(s % 60).padStart(2, '0'),
  });
  const t = fmt(timeLeft);

  return (
    <div className="w-full h-full bg-[#05080f] text-white overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}>
      <style>{`
        .dash-scroll::-webkit-scrollbar { width: 4px; }
        .dash-scroll::-webkit-scrollbar-track { background: transparent; }
        .dash-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
      `}</style>

      {/* subtle ambient glow — fixed behind content */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: data.accent }} />
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 py-6 pb-16 flex flex-col gap-7">

        {/* ── Section: Game Selector + Page Title ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full" style={{ background: `linear-gradient(180deg, ${data.accent}, ${data.accentAlt})`, boxShadow: `0 0 12px ${data.accent}80` }} />
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Esport League</div>
              <h1 className="text-xl font-black uppercase tracking-[0.15em] text-white">Dashboard</h1>
            </div>
          </div>

          {/* Game toggle pills */}
          <div className="flex items-center bg-[#0d131c] border border-slate-800/60 rounded-xl p-1 gap-1 self-start sm:self-auto">
            {Object.entries(db).map(([key, d]) => (
              <button
                key={key}
                onClick={() => setActiveGame(key)}
                className={`px-4 py-2 rounded-lg text-[11px] font-black tracking-widest uppercase transition-all duration-200 ${activeGame === key ? 'text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                style={activeGame === key ? { backgroundColor: d.accent + '22', border: `1px solid ${d.accent}44`, color: d.accent } : {}}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Section: KPI Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {data.kpis.map((card, i) => (
            <KpiCard key={i} card={card} accent={data.accent} onClick={setActiveModal} />
          ))}
        </div>

        {/* ── Section: Live Match Hero + Standings ── */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">

          {/* Live Match Hero — 3 cols */}
          <div className="xl:col-span-3 bg-[#0d131c] rounded-2xl border border-slate-800/60 overflow-hidden relative flex flex-col" style={{ minHeight: '360px' }}>
            {/* grid mesh bg */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
            {/* glow center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[400px] h-[200px] rounded-full blur-[100px] opacity-10" style={{ backgroundColor: data.accent }} />
            </div>

            {/* LIVE badge */}
            <div className="relative z-10 flex items-center justify-between px-5 pt-5">
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black text-red-400 tracking-widest uppercase">Live Broadcast</span>
              </div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{data.liveMatch.map}</div>
            </div>

            {/* Teams vs score */}
            <div className="relative z-10 flex-1 flex items-center justify-around px-6 py-8 gap-4">
              {/* Team 1 */}
              <div className="flex flex-col items-center gap-3 flex-1">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-2xl font-black" style={{ color: data.accent }}>
                  {data.liveMatch.team1[0]}
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-xl font-black text-white uppercase tracking-wide">{data.liveMatch.team1}</div>
                  <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">Home</div>
                </div>
              </div>

              {/* Score + Timer */}
              <div className="flex flex-col items-center gap-4 shrink-0">
                <div className="text-4xl md:text-5xl font-black text-white tracking-wider">{data.liveMatch.score}</div>
                <div className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 flex flex-col items-center gap-2 min-w-[180px]">
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Next match starts in</div>
                  <div className="flex items-center gap-2">
                    <TimerBlock label="D" value={t.d} />
                    <span className="text-slate-600 font-black text-xl mb-3">:</span>
                    <TimerBlock label="H" value={t.h} />
                    <span className="text-slate-600 font-black text-xl mb-3">:</span>
                    <TimerBlock label="M" value={t.m} />
                    <span className="font-black text-xl mb-3" style={{ color: data.accent }}>:</span>
                    <TimerBlock label="S" value={t.s} />
                  </div>
                </div>
              </div>

              {/* Team 2 */}
              <div className="flex flex-col items-center gap-3 flex-1">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-2xl font-black text-red-400">
                  {data.liveMatch.team2[0]}
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-xl font-black text-white uppercase tracking-wide">{data.liveMatch.team2}</div>
                  <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">Away</div>
                </div>
              </div>
            </div>

            {/* Watch button */}
            <div className="relative z-10 px-5 pb-5">
              <button
                onClick={() => alert('Connecting to live stream...')}
                className="w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white flex items-center justify-center gap-2 transition-all active:scale-95 hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${data.accent}, ${data.accentAlt})`, boxShadow: `0 0 20px ${data.accent}40` }}
              >
                <IconPlay /> Watch Live Stream
              </button>
            </div>
          </div>

          {/* Standings — 2 cols */}
          <div className="xl:col-span-2 bg-[#0d131c] rounded-2xl border border-slate-800/60 flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800/50 flex items-center justify-between shrink-0">
              <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Live</div>
                <h2 className="text-sm font-black uppercase tracking-widest text-white">Ongoing Matches</h2>
              </div>
              <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-2.5 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[9px] font-black text-red-400">LIVE</span>
              </div>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}>
              {data.standings.map((m, i) => (
                <MatchRow key={i} match={m} accent={data.accent} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Section: Player Performance Table ── */}
        <div className="bg-[#0d131c] rounded-2xl border border-slate-800/60 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-800/50 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Season</div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Player Performance Overview</h2>
            </div>
            <button onClick={() => setOverviewState({ open: true, player: null })} className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: data.accent }}>
              View Full Stats <IconChevron />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-800/50 bg-slate-900/30">
                  <th className="px-5 py-3 text-left font-bold">Rank</th>
                  <th className="px-5 py-3 text-left font-bold">Player</th>
                  <th className="px-5 py-3 text-left font-bold">Avg K/D</th>
                  <th className="px-5 py-3 text-left font-bold">W/L</th>
                  <th className="px-5 py-3 text-left font-bold">Damage</th>
                  <th className="px-5 py-3 text-right font-bold">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {data.stats.slice(0,4).map((s, i) => (
                  <tr key={i} onClick={() => setOverviewState({ open: true, player: s })} className="hover:bg-white/[0.04] transition-colors group cursor-pointer">
                    <td className="px-5 py-4 text-slate-500 font-mono font-bold text-base">
                      <span className="opacity-50">#</span>{s.rank}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-400 shrink-0">
                          {s.name.split('.')[0]?.[0]}
                        </div>
                        <span className="font-bold text-white text-sm group-hover:text-white">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-black text-lg" style={{ color: data.accent }}>{s.kd}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-300 font-medium text-sm">{s.wl}</td>
                    <td className="px-5 py-4 text-slate-200 font-bold text-sm">{s.dmg}</td>
                    <td className="px-5 py-4 text-right">
                      <span className={`inline-block text-[10px] font-bold px-3 py-1.5 rounded-full border tracking-widest uppercase ${roleBadge(s.role)}`}>
                        {s.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <KpiModal card={activeModal} accent={data.accent} onClose={() => setActiveModal(null)} />
      <LeaderboardOverviewModal 
        isOpen={overviewState.open} 
        player={overviewState.player} 
        data={data} 
        accent={data.accent} 
        onClose={() => setOverviewState({ open: false, player: null })} 
      />
    </div>
  );
};

export default Dashboard;