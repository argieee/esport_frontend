import React, { useState } from 'react';

const TeamModal = ({ team, onClose, activeGame }) => {
  if (!team) return null;
  const accent = activeGame === 'VALORANT' ? '#ff4655' : '#4c7fd6';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-[#0b111a] border border-slate-700/60 rounded-2xl w-full max-w-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        
        {/* Banner */}
        <div className="h-32 relative overflow-hidden bg-slate-900 flex items-end px-8 py-4">
          <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(45deg, ${accent}, transparent)` }} />
          <div className="relative z-10 flex items-end gap-5">
            <div className="w-20 h-20 rounded-xl bg-[#121a25] border-2 shadow-lg flex items-center justify-center" style={{ borderColor: accent }}>
              <span className="text-3xl font-black text-white">{team.team ? team.team[0] : team.name?.[0] || 'T'}</span>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-black uppercase tracking-widest text-white drop-shadow-md">{team.team || team.name || 'Team Name'}</h2>
              <p className="text-sm font-bold tracking-widest uppercase" style={{ color: accent }}>Rank #{team.rank}</p>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors z-20 bg-black/20">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-[#121a25] border border-slate-800 rounded-xl p-5 flex flex-col gap-1 items-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Matches Won</span>
              <span className="text-3xl font-black text-white">{team.w || team.diff || 12}</span>
            </div>
            <div className="bg-[#121a25] border border-slate-800 rounded-xl p-5 flex flex-col gap-1 items-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Matches Lost</span>
              <span className="text-3xl font-black text-white">{team.l || 4}</span>
            </div>
            <div className="bg-[#121a25] border border-slate-800 rounded-xl p-5 flex flex-col gap-1 items-center">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Win Rate</span>
              <span className="text-3xl font-black text-white">{team.w ? Math.round((team.w / (team.w + team.l)) * 100) : 75}%</span>
            </div>
          </div>

          <div className="bg-[#151e2b] border border-[#232f40] rounded-xl overflow-hidden">
            <div className="bg-[#182331] px-5 py-3 border-b border-[#232f40]">
              <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase">Active Roster</h3>
            </div>
            <div className="divide-y divide-[#1e2938]">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-[#1a2533] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">P{i}</div>
                    <span className="font-bold text-gray-200">Player_{i}</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Starter</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerModal = ({ player, onClose, activeGame }) => {
  if (!player) return null;
  const accent = activeGame === 'VALORANT' ? '#00d0eb' : '#ef4444';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-[#0b111a] border border-slate-700/60 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        
        <div className="px-6 py-5 border-b border-slate-800/60 flex items-center justify-between bg-slate-900/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-800 border-2 shadow-lg flex items-center justify-center text-xl font-black text-white" style={{ borderColor: accent }}>
              {player.name ? player.name[0] : 'P'}
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest text-white drop-shadow-md">{player.name || 'Player Profile'}</h2>
              <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-1">Rank #{player.rank || 1} — {activeGame}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-[#151e2b] border border-[#232f40] rounded-xl p-5">
              <h3 className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-4">Combat Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-300">K/D Ratio</span><span className="text-lg font-black text-white">{player.kd || '1.85'}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-300">Total Kills</span><span className="text-lg font-black text-white">{player.kills || '420'}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-300">Total Deaths</span><span className="text-lg font-black text-white">{player.death || '225'}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-300">Rounds Played</span><span className="text-lg font-black text-white">{player.round || '130'}</span></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-[#151e2b] border border-[#232f40] rounded-xl p-5 h-full">
              <h3 className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-4">Advanced Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-300">Kill per Round</span><span className="text-lg font-black text-[#8a9db8]">{player.kr || '1.15'}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-300">Survive Rate</span><span className="text-lg font-black text-[#8a9db8]">{player.sr || '0.62'}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-300">Headshot/Kill</span><span className="text-lg font-black text-[#8a9db8]">{player.hk || '0.55'}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-300">Avg Points</span><span className="text-lg font-black text-[#8a9db8]">{player.ap || '3200'}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Leaderboards = () => {
  const [activeGame, setActiveGame] = useState('VALORANT');
  const [dailySearch, setDailySearch] = useState('');
  const [weeklySearch, setWeeklySearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // --- MOCK DATA: VALORANT ---
  const valorantData = {
    theme: {
      leftAccent: '#ff3366',
      rightAccent: '#00d0eb',
      leftGradient: 'from-[#801933] to-[#ff3366]',
      rightGradient: 'from-[#006880] to-[#00d0eb]',
    },
    standings: [
      { rank: 1, team: 'EVOS Esport', w: 8, l: 1 },
      { rank: 2, team: 'UBECMANIAC', w: 7, l: 2 },
      { rank: 3, team: 'Pacific', w: 6, l: 3 },
      { rank: 4, team: 'Team Secret', w: 5, l: 4 },
      { rank: 5, team: 'Execration', w: 3, l: 4 },
      { rank: 6, team: 'TEAM ACCEPTANCE', w: 2, l: 5 },
      { rank: 7, team: 'Gaon Gaming', w: 1, l: 6 },
      { rank: 8, team: 'Fervid eSportd', w: 0, l: 7 },
    ],
    setDiff: [
      { rank: 1, diff: 13 }, { rank: 2, diff: 9 }, { rank: 3, diff: 8 },
      { rank: 4, diff: 0 }, { rank: 5, diff: -3 }, { rank: 6, diff: -5 },
      { rank: 7, diff: -10 }, { rank: 8, diff: -12 },
    ],
    roundDiff: [
      { rank: 1, diff: 95 }, { rank: 2, diff: 36 }, { rank: 3, diff: 58 },
      { rank: 4, diff: -3 }, { rank: 5, diff: -20 }, { rank: 6, diff: -37 },
      { rank: 7, diff: -46 }, { rank: 8, diff: -84 },
    ],
    h2h: {
      teamLeft: 'UBECMANIAC',
      teamRight: 'Pacific',
      scoreLeft: 6,
      scoreRight: 7,
      stats: [
        { label: 'Wins', left: 6, right: 7, max: 13 },
        { label: 'Average K/D', left: 1.52, right: 1.67, max: 3.19 },
        { label: 'Total Kills', left: 320, right: 420, max: 740 },
        { label: 'Headshot %', left: 30, right: 70, max: 100 },
        { label: 'Round Winrate', left: 56, right: 44, max: 100 },
      ]
    },
    playerMatchup: {
      playerLeft: 'PE_ALDRIN',
      playerRight: 'UM_NO',
      stats: [
        { stat: 'K/D', leftRank: 1, leftVal: '1.85', rightRank: 3, rightVal: '1.52' },
        { stat: 'K/R', leftRank: 1, leftVal: '1.55', rightRank: 2, rightVal: '1.37' },
        { stat: 'H/K', leftRank: 2, leftVal: '68%', rightRank: 4, rightVal: '62%' },
        { stat: 'S/R', leftRank: 5, leftVal: '42%', rightRank: 1, rightVal: '55%' },
        { stat: 'A/P', leftRank: 1, leftVal: '2,450', rightRank: 2, rightVal: '2,180' },
      ]
    },
    dailyPlayers: [
      { rank: 1, name: 'PE_ALDRIN', kills: 336, death: 39, round: 13, kd: '1.41', kr: '0.93', sr: '0.40', hk: '0.80', ap: 265 },
      { rank: 2, name: 'UM_NO', kills: 336, death: 42, round: 13, kd: '1.39', kr: '0.88', sr: '0.39', hk: '0.72', ap: 255 },
      { rank: 3, name: 'PE_MVA', kills: 332, death: 58, round: 18, kd: '1.34', kr: '0.87', sr: '0.38', hk: '0.70', ap: 252 },
      { rank: 4, name: 'TS_AIDEN', kills: 331, death: 89, round: 18, kd: '1.33', kr: '0.87', sr: '0.36', hk: '0.67', ap: 243 },
      { rank: 5, name: 'EVOS_YOB1B', kills: 301, death: 125, round: 15, kd: '1.30', kr: '0.87', sr: '0.36', hk: '0.65', ap: 234 },
    ],
    weeklyPlayers: [
      { rank: 1, name: 'PE_ALDRIN', kills: 1467, death: 803, round: 221, kd: '1.30', kr: '0.88', sr: '0.32', hk: '0.50', ap: 803 },
      { rank: 2, name: 'PE_JAMERO', kills: 1396, death: 950, round: 219, kd: '1.11', kr: '0.87', sr: '0.29', hk: '0.47', ap: 803 },
      { rank: 3, name: 'PE_JSTN', kills: 1392, death: 955, round: 198, kd: '1.10', kr: '0.85', sr: '0.28', hk: '0.44', ap: 803 },
      { rank: 4, name: 'PE_MVA', kills: 1388, death: 1077, round: 192, kd: '0.99', kr: '0.79', sr: '0.27', hk: '0.42', ap: 803 },
      { rank: 5, name: 'PE_REVENGE', kills: 1089, death: 1115, round: 141, kd: '0.96', kr: '0.77', sr: '0.25', hk: '0.41', ap: 803 },
    ]
  };

  // --- MOCK DATA: CROSSFIRE ---
  const crossfireData = {
    theme: {
      leftAccent: '#4c7fd6',
      rightAccent: '#f59e0b',
      leftGradient: 'from-[#1e3a8a] to-[#4c7fd6]',
      rightGradient: 'from-[#92400e] to-[#f59e0b]',
    },
    standings: [
      { rank: 1, team: 'CF Elite', w: 10, l: 0 },
      { rank: 2, team: 'Sniper Squad', w: 8, l: 2 },
      { rank: 3, team: 'Blacklist Int', w: 7, l: 3 },
      { rank: 4, team: 'Phantom', w: 5, l: 5 },
      { rank: 5, team: 'Ghost Riders', w: 4, l: 6 },
      { rank: 6, team: 'Alpha Force', w: 3, l: 7 },
      { rank: 7, team: 'Omega Gaming', w: 2, l: 8 },
      { rank: 8, team: 'Noobs', w: 1, l: 9 },
    ],
    setDiff: [
      { rank: 1, diff: 18 }, { rank: 2, diff: 12 }, { rank: 3, diff: 10 },
      { rank: 4, diff: 2 }, { rank: 5, diff: -4 }, { rank: 6, diff: -8 },
      { rank: 7, diff: -14 }, { rank: 8, diff: -16 },
    ],
    roundDiff: [
      { rank: 1, diff: 120 }, { rank: 2, diff: 85 }, { rank: 3, diff: 60 },
      { rank: 4, diff: 10 }, { rank: 5, diff: -25 }, { rank: 6, diff: -50 },
      { rank: 7, diff: -90 }, { rank: 8, diff: -110 },
    ],
    h2h: {
      teamLeft: 'CF Elite',
      teamRight: 'Sniper Squad',
      scoreLeft: 9,
      scoreRight: 4,
      stats: [
        { label: 'Wins', left: 9, right: 4, max: 13 },
        { label: 'Average K/D', left: 2.10, right: 1.45, max: 3.55 },
        { label: 'Total Kills', left: 510, right: 380, max: 890 },
        { label: 'Headshot %', left: 80, right: 55, max: 100 },
        { label: 'Round Winrate', left: 75, right: 35, max: 100 },
      ]
    },
    playerMatchup: {
      playerLeft: 'CF_KING',
      playerRight: 'SNIPER_PRO',
      stats: [
        { stat: 'K/D', leftRank: 1, leftVal: '2.50', rightRank: 2, rightVal: '1.95' },
        { stat: 'K/R', leftRank: 1, leftVal: '1.85', rightRank: 3, rightVal: '1.40' },
        { stat: 'H/K', leftRank: 1, leftVal: '85%', rightRank: 2, rightVal: '75%' },
        { stat: 'S/R', leftRank: 2, leftVal: '50%', rightRank: 1, rightVal: '60%' },
        { stat: 'A/P', leftRank: 1, leftVal: '3,100', rightRank: 3, rightVal: '2,500' },
      ]
    },
    dailyPlayers: [
      { rank: 1, name: 'CF_KING', kills: 450, death: 45, round: 20, kd: '2.50', kr: '1.85', sr: '0.50', hk: '0.85', ap: 350 },
      { rank: 2, name: 'SNIPER_PRO', kills: 380, death: 60, round: 20, kd: '1.95', kr: '1.40', sr: '0.60', hk: '0.75', ap: 310 },
      { rank: 3, name: 'GHOST_ASSASSIN', kills: 350, death: 70, round: 19, kd: '1.80', kr: '1.30', sr: '0.45', hk: '0.70', ap: 280 },
      { rank: 4, name: 'ALPHA_LEADER', kills: 320, death: 80, round: 18, kd: '1.60', kr: '1.20', sr: '0.40', hk: '0.65', ap: 260 },
      { rank: 5, name: 'OMEGA_STRIKE', kills: 290, death: 90, round: 18, kd: '1.45', kr: '1.10', sr: '0.35', hk: '0.60', ap: 240 },
    ],
    weeklyPlayers: [
      { rank: 1, name: 'CF_KING', kills: 2500, death: 500, round: 300, kd: '2.50', kr: '1.85', sr: '0.50', hk: '0.85', ap: 2000 },
      { rank: 2, name: 'SNIPER_PRO', kills: 2100, death: 600, round: 280, kd: '1.95', kr: '1.40', sr: '0.60', hk: '0.75', ap: 1800 },
      { rank: 3, name: 'GHOST_ASSASSIN', kills: 1900, death: 700, round: 260, kd: '1.80', kr: '1.30', sr: '0.45', hk: '0.70', ap: 1600 },
      { rank: 4, name: 'ALPHA_LEADER', kills: 1700, death: 800, round: 250, kd: '1.60', kr: '1.20', sr: '0.40', hk: '0.65', ap: 1500 },
      { rank: 5, name: 'OMEGA_STRIKE', kills: 1500, death: 900, round: 240, kd: '1.45', kr: '1.10', sr: '0.35', hk: '0.60', ap: 1400 },
    ]
  };

  const currentData = activeGame === 'VALORANT' ? valorantData : crossfireData;
  const { theme, standings, setDiff, roundDiff, h2h, playerMatchup, dailyPlayers, weeklyPlayers } = currentData;

  const filteredDaily = dailyPlayers.filter(p => p.name.toLowerCase().includes(dailySearch.toLowerCase()));
  const filteredWeekly = weeklyPlayers.filter(p => p.name.toLowerCase().includes(weeklySearch.toLowerCase()));

  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/w0000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  return (
    <div className="flex-1 bg-[#090e14] text-white overflow-y-auto flex flex-col h-full custom-scrollbar">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
      {/* Top Header */}
      <div className="bg-[#0f1722] py-6 border-b border-[#1c2532] shadow-[0_4px_20px_rgba(0,0,0,0.5)] relative z-20 shrink-0">
        <div className="max-w-[1400px] mx-auto px-8 flex justify-center">
          <div className="flex w-full max-w-4xl justify-between items-center relative">
            
            <button 
              onClick={() => setActiveGame('VALORANT')} 
              className={`flex-1 flex justify-center items-center space-x-4 font-black text-3xl tracking-[0.25em] transition-all duration-500 ${activeGame === 'VALORANT' ? 'text-white scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-600 hover:text-gray-400'}`}
            >
              <svg viewBox="0 0 100 100" className={`h-10 w-10 transition-colors duration-500 ${activeGame === 'VALORANT' ? 'fill-[#ff4655]' : 'fill-gray-600'}`}><path d="M99 0L35.2 61.2 53.6 100zM0 0l31.2 65.6L19 100 0 60z"/></svg>
              <span>VALORANT</span>
            </button>

            {/* Sleek Professional Divider */}
            <div className="flex flex-col items-center justify-center mx-8 opacity-50">
               <div className="h-6 w-[2px] bg-gradient-to-b from-transparent to-gray-500 rounded-full mb-2"></div>
               <div className="w-2 h-2 rounded-full border-2 border-gray-400 bg-transparent"></div>
               <div className="h-6 w-[2px] bg-gradient-to-t from-transparent to-gray-500 rounded-full mt-2"></div>
            </div>

            <button 
              onClick={() => setActiveGame('CROSSFIRE')} 
              className={`flex-1 flex justify-center items-center space-x-4 font-black text-3xl tracking-[0.25em] transition-all duration-500 ${activeGame === 'CROSSFIRE' ? 'text-white scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'text-gray-600 hover:text-gray-400'}`}
            >
              <svg viewBox="0 0 100 100" className={`h-10 w-10 transition-colors duration-500 ${activeGame === 'CROSSFIRE' ? 'fill-[#4c7fd6]' : 'fill-gray-600'}`}><circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="15" fill="none"/><circle cx="50" cy="50" r="10" fill="currentColor"/></svg>
              <span>CROSSFIRE</span>
            </button>

          </div>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pb-16">
        <div className="max-w-[1400px] mx-auto space-y-8">
          
          {/* Top Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* LEFT PANE: Standings */}
            <div className="xl:col-span-4 space-y-8">
              {/* Standings Table */}
              <div className="bg-[#121a25] rounded-xl overflow-hidden border border-[#232f40] shadow-xl">
                <div className="bg-[#182331] py-3 text-center border-b border-[#232f40]">
                  <h3 className="text-xs font-black tracking-[0.2em] text-gray-300 uppercase">Standing</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-center">
                    <thead className="bg-[#151e2b] text-gray-400 font-semibold text-xs tracking-wider border-b border-[#232f40]">
                      <tr>
                        <th className="py-4 px-2 w-16">RANK</th>
                        <th className="py-4 px-4 text-left">TEAM NAME</th>
                        <th className="py-4 px-4 w-16">W</th>
                        <th className="py-4 px-4 w-16">L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2938]">
                      {standings.map((row) => (
                        <tr key={row.rank} onClick={() => setSelectedTeam(row)} className="hover:bg-[#1a2533] transition-colors group cursor-pointer">
                          <td className="py-3 px-2 font-mono text-gray-500 group-hover:text-white bg-[#151e2b]/50 transition-colors">{row.rank}</td>
                          <td className="py-3 px-4 text-left font-bold flex items-center space-x-3 text-gray-200 group-hover:text-white transition-colors">
                            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#2a3a52] to-[#405470] flex-shrink-0 border border-white/5 shadow-sm"></div>
                            <span className="truncate">{row.team}</span>
                          </td>
                          <td className="py-3 px-4 text-[#8a9db8] font-medium bg-[#151e2b]/30">{row.w}</td>
                          <td className="py-3 px-4 text-[#8a9db8] font-medium">{row.l}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Set & Round Difference */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#121a25] rounded-xl overflow-hidden border border-[#232f40] shadow-xl">
                  <div className="bg-[#182331] py-2 text-center border-b border-[#232f40]">
                    <h3 className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">Set Difference</h3>
                  </div>
                  <table className="w-full text-xs text-center">
                    <tbody className="divide-y divide-[#1e2938]">
                      {setDiff.map((row) => (
                        <tr key={row.rank} onClick={() => setSelectedTeam(row)} className="hover:bg-[#1a2533] transition-colors cursor-pointer group">
                          <td className="py-2 px-2 text-gray-500 w-12 border-r border-[#1e2938]">{row.rank}.</td>
                          <td className="py-2 px-4 font-mono text-[#8a9db8] font-medium">{row.diff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-[#121a25] rounded-xl overflow-hidden border border-[#232f40] shadow-xl">
                  <div className="bg-[#182331] py-2 text-center border-b border-[#232f40]">
                    <h3 className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase">Round Difference</h3>
                  </div>
                  <table className="w-full text-xs text-center">
                    <tbody className="divide-y divide-[#1e2938]">
                      {roundDiff.map((row) => (
                        <tr key={row.rank} onClick={() => setSelectedTeam(row)} className="hover:bg-[#1a2533] transition-colors cursor-pointer group">
                          <td className="py-2 px-2 text-gray-500 w-12 border-r border-[#1e2938]">{row.rank}.</td>
                          <td className="py-2 px-4 font-mono text-[#8a9db8] font-medium">{row.diff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT PANE */}
            <div className="xl:col-span-8 space-y-8 flex flex-col">
              
              {/* Head to Head Card */}
              <div className="bg-[#121a25] rounded-xl border border-[#232f40] shadow-xl flex-1 flex flex-col overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                
                <div className="flex justify-between items-center p-8 pb-4 relative z-10">
                  <span className="text-sm font-bold tracking-[0.1em] text-gray-300">{h2h.teamLeft}</span>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-gray-400 font-black tracking-[0.3em] uppercase mb-1">Head to Head</span>
                    <div className="text-5xl font-black text-white tracking-tighter drop-shadow-md">
                      {h2h.scoreLeft} <span className="text-gray-600 font-medium px-2">-</span> {h2h.scoreRight}
                    </div>
                  </div>
                  <span className="text-sm font-bold tracking-[0.1em] text-gray-300">{h2h.teamRight}</span>
                </div>

                <div className="px-10 pb-10 pt-4 flex-1 flex flex-col justify-between space-y-6 relative z-10">
                  {h2h.stats.map((stat, i) => {
                    const leftPercent = (stat.left / stat.max) * 100;
                    const rightPercent = (stat.right / stat.max) * 100;
                    return (
                      <div key={i} className="flex flex-col space-y-2">
                        <div className="flex justify-between text-xs text-gray-400 font-semibold px-1">
                          <span style={{ color: theme.leftAccent }} className="drop-shadow-sm">{stat.label}</span>
                          <span className="text-white bg-white/5 px-3 py-0.5 rounded-full text-[10px] border border-white/10 tracking-wider">
                            {stat.left} - {stat.right}
                          </span>
                          <span style={{ color: theme.rightAccent }} className="drop-shadow-sm">{stat.label}</span>
                        </div>
                        <div className="h-7 w-full bg-[#0a0f16] rounded-md flex overflow-hidden border border-[#1e2938] shadow-inner relative">
                          {/* Left Bar */}
                          <div 
                            className={`h-full bg-gradient-to-r ${theme.leftGradient} flex justify-end items-center px-4 text-xs font-bold text-white/90 transition-all duration-1000 ease-out relative overflow-hidden`}
                            style={{ width: `${leftPercent}%` }}
                          >
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                          </div>
                          {/* Divider */}
                          <div className="w-[2px] bg-[#1e2938] h-full z-10"></div>
                          {/* Right Bar */}
                          <div 
                            className={`h-full bg-gradient-to-l ${theme.rightGradient} flex justify-start items-center px-4 text-xs font-bold text-white/90 transition-all duration-1000 ease-out relative overflow-hidden`}
                            style={{ width: `${rightPercent}%` }}
                          >
                             <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Best Player Card */}
              <div className="bg-[#121a25] rounded-xl border border-[#232f40] shadow-xl overflow-hidden flex flex-col">
                 <div className="grid grid-cols-[1fr_auto_1fr] items-stretch bg-[#151e2b] border-b border-[#232f40]">
                    <div 
                      className="py-4 px-8 flex justify-between items-center transition-colors duration-500"
                      style={{ background: `linear-gradient(to right, ${theme.leftAccent}1A, transparent)` }}
                    >
                      <div className="flex flex-col">
                         <span style={{ color: theme.leftAccent }} className="text-[10px] font-bold tracking-widest uppercase mb-1">Best Player</span>
                         <span className="font-black text-white text-base tracking-wide">{playerMatchup.playerLeft}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[#1e2938] border-2 shadow-lg relative overflow-hidden flex items-center justify-center transition-colors duration-500" style={{ borderColor: theme.leftAccent, boxShadow: `0 0 15px ${theme.leftAccent}4D` }}>
                         <svg className="w-6 h-6 text-gray-500 mt-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                      </div>
                    </div>
                    
                    <div className="px-6 flex items-center justify-center bg-[#0f1722] border-x border-[#232f40]">
                      <span className="text-xs font-black text-gray-600 italic tracking-widest">VS</span>
                    </div>

                    <div 
                      className="py-4 px-8 flex justify-between items-center transition-colors duration-500"
                      style={{ background: `linear-gradient(to left, ${theme.rightAccent}1A, transparent)` }}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#1e2938] border-2 shadow-lg relative overflow-hidden flex items-center justify-center transition-colors duration-500" style={{ borderColor: theme.rightAccent, boxShadow: `0 0 15px ${theme.rightAccent}4D` }}>
                        <svg className="w-6 h-6 text-gray-500 mt-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                      </div>
                      <div className="flex flex-col text-right">
                         <span style={{ color: theme.rightAccent }} className="text-[10px] font-bold tracking-widest uppercase mb-1">Best Player</span>
                         <span className="font-black text-white text-base tracking-wide">{playerMatchup.playerRight}</span>
                      </div>
                    </div>
                 </div>

                 <table className="w-full text-center text-sm">
                   <thead className="bg-[#0f1722] text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">
                     <tr>
                       <th className="py-3 border-r border-[#232f40] w-1/5">Rank</th>
                       <th className="py-3 border-r border-[#232f40] w-1/5 text-gray-400">Value</th>
                       <th className="py-3 border-r border-[#232f40] w-1/5 bg-[#151e2b] text-gray-300">Stats</th>
                       <th className="py-3 border-r border-[#232f40] w-1/5">Rank</th>
                       <th className="py-3 w-1/5 text-gray-400">Value</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#1e2938]">
                     {playerMatchup.stats.map((row, i) => (
                       <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                         <td className="py-3.5 border-r border-[#232f40] text-gray-500 font-medium">{row.leftRank}</td>
                         <td style={{ color: theme.leftAccent }} className="py-3.5 border-r border-[#232f40] font-black text-base transition-colors duration-500">{row.leftVal}</td>
                         <td className="py-3.5 border-r border-[#232f40] bg-[#151e2b] text-gray-300 text-xs font-bold tracking-widest">{row.stat}</td>
                         <td className="py-3.5 border-r border-[#232f40] text-gray-500 font-medium">{row.rightRank}</td>
                         <td style={{ color: theme.rightAccent }} className="py-3.5 font-black text-base transition-colors duration-500">{row.rightVal}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
              </div>

            </div>
          </div>

          {/* Bottom Grid: Daily & Weekly Rankings */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-8">
             
             {/* Daily Ranking */}
             <div className="bg-[#121a25] rounded-xl border border-[#232f40] shadow-xl flex flex-col h-[450px] overflow-hidden">
               <div className="p-5 border-b border-[#232f40] bg-gradient-to-b from-[#151e2b] to-[#121a25]">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="text-sm font-black text-gray-200 uppercase tracking-widest">Daily Player Ranking</h3>
                 </div>
                 <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <SearchIcon />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Search Player Here" 
                     className="w-full bg-[#0a0f16] border border-[#232f40] text-sm text-gray-200 rounded-lg py-2.5 pl-11 pr-4 focus:outline-none focus:border-[#406899] focus:ring-1 focus:ring-[#406899]/50 transition-all shadow-inner placeholder-gray-600"
                     value={dailySearch}
                     onChange={(e) => setDailySearch(e.target.value)}
                   />
                 </div>
               </div>
               
               <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0f1722]">
                 <table className="w-full text-center text-xs">
                   <thead className="bg-[#182331] sticky top-0 text-gray-400 font-semibold shadow-md z-10 text-[10px] tracking-wider uppercase">
                     <tr>
                       <th className="py-3 px-2 text-left pl-6">NAME</th>
                       <th className="py-3 px-1">KILLS</th>
                       <th className="py-3 px-1">DEATH</th>
                       <th className="py-3 px-1">ROUND</th>
                       <th className="py-3 px-1">K/D</th>
                       <th className="py-3 px-1">K/R</th>
                       <th className="py-3 px-1">S/R</th>
                       <th className="py-3 px-1">H/K</th>
                       <th className="py-3 px-1">A/P</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#1e2938]">
                     {filteredDaily.length > 0 ? filteredDaily.map((p, i) => (
                       <tr key={i} onClick={() => setSelectedPlayer(p)} className="hover:bg-[#1a2533] transition-colors group cursor-pointer">
                         <td className="py-3.5 px-2 text-left pl-4 font-bold text-gray-300 flex items-center space-x-3 group-hover:text-white transition-colors">
                           <span className="text-gray-600 w-4 text-right font-mono">{p.rank}.</span>
                           <span className="truncate max-w-[120px]" title={p.name}>{p.name}</span>
                         </td>
                         <td className="py-3.5 px-1 text-gray-400">{p.kills}</td>
                         <td className="py-3.5 px-1 text-gray-400">{p.death}</td>
                         <td className="py-3.5 px-1 text-gray-400">{p.round}</td>
                         <td className="py-3.5 px-1 text-[#8a9db8] font-semibold">{p.kd}</td>
                         <td className="py-3.5 px-1 text-[#8a9db8] font-semibold">{p.kr}</td>
                         <td className="py-3.5 px-1 text-[#8a9db8] font-semibold">{p.sr}</td>
                         <td className="py-3.5 px-1 text-[#8a9db8] font-semibold">{p.hk}</td>
                         <td className="py-3.5 px-1 text-[#8a9db8] font-semibold">{p.ap}</td>
                       </tr>
                     )) : (
                       <tr><td colSpan="9" className="py-12 text-gray-600 font-medium">No players found matching your search.</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
               <div className="bg-[#151e2b] py-3 text-center border-t border-[#232f40] hover:bg-[#1a2533] transition-colors cursor-pointer">
                 <span className="text-xs font-semibold text-gray-500 tracking-wider">Show More...</span>
               </div>
             </div>

             {/* Weekly Ranking */}
             <div className="bg-[#121a25] rounded-xl border border-[#232f40] shadow-xl flex flex-col h-[450px] overflow-hidden">
               <div className="p-5 border-b border-[#232f40] bg-gradient-to-b from-[#151e2b] to-[#121a25]">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="text-sm font-black text-gray-200 uppercase tracking-widest">Weekly Player Ranking</h3>
                 </div>
                 <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <SearchIcon />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Search Player Here" 
                     className="w-full bg-[#0a0f16] border border-[#232f40] text-sm text-gray-200 rounded-lg py-2.5 pl-11 pr-4 focus:outline-none focus:border-[#406899] focus:ring-1 focus:ring-[#406899]/50 transition-all shadow-inner placeholder-gray-600"
                     value={weeklySearch}
                     onChange={(e) => setWeeklySearch(e.target.value)}
                   />
                 </div>
               </div>
               
               <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0f1722]">
                 <table className="w-full text-center text-xs">
                   <thead className="bg-[#182331] sticky top-0 text-gray-400 font-semibold shadow-md z-10 text-[10px] tracking-wider uppercase">
                     <tr>
                       <th className="py-3 px-2 text-left pl-6">NAME</th>
                       <th className="py-3 px-1">KILLS</th>
                       <th className="py-3 px-1">DEATH</th>
                       <th className="py-3 px-1">ROUND</th>
                       <th className="py-3 px-1">K/D</th>
                       <th className="py-3 px-1">K/R</th>
                       <th className="py-3 px-1">S/R</th>
                       <th className="py-3 px-1">H/K</th>
                       <th className="py-3 px-1">A/P</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#1e2938]">
                     {filteredWeekly.length > 0 ? filteredWeekly.map((p, i) => (
                       <tr key={i} onClick={() => setSelectedPlayer(p)} className="hover:bg-[#1a2533] transition-colors group cursor-pointer">
                         <td className="py-3.5 px-2 text-left pl-4 font-bold text-gray-300 flex items-center space-x-3 group-hover:text-white transition-colors">
                           <span className="text-gray-600 w-4 text-right font-mono">{p.rank}.</span>
                           <span className="truncate max-w-[120px]" title={p.name}>{p.name}</span>
                         </td>
                         <td className="py-3.5 px-1 text-gray-400">{p.kills}</td>
                         <td className="py-3.5 px-1 text-gray-400">{p.death}</td>
                         <td className="py-3.5 px-1 text-gray-400">{p.round}</td>
                         <td className="py-3.5 px-1 text-[#8a9db8] font-semibold">{p.kd}</td>
                         <td className="py-3.5 px-1 text-[#8a9db8] font-semibold">{p.kr}</td>
                         <td className="py-3.5 px-1 text-[#8a9db8] font-semibold">{p.sr}</td>
                         <td className="py-3.5 px-1 text-[#8a9db8] font-semibold">{p.hk}</td>
                         <td className="py-3.5 px-1 text-[#8a9db8] font-semibold">{p.ap}</td>
                       </tr>
                     )) : (
                       <tr><td colSpan="9" className="py-12 text-gray-600 font-medium">No players found matching your search.</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
               <div className="bg-[#151e2b] py-3 text-center border-t border-[#232f40] hover:bg-[#1a2533] transition-colors cursor-pointer">
                 <span className="text-xs font-semibold text-gray-500 tracking-wider">Show More...</span>
               </div>
             </div>

          </div>
        </div>
      </div>
      
      {/* Interactive Modals */}
      <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} activeGame={activeGame} />
      <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} activeGame={activeGame} />
    </div>
  );
};

export default Leaderboards;