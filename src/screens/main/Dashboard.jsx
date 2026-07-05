import React, { useState, useEffect } from 'react';

// SVG Icons
const Icons = {
  Trophy: <svg className="w-5 h-5 xl:w-6 xl:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Users: <svg className="w-5 h-5 xl:w-6 xl:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Crosshair: <svg className="w-5 h-5 xl:w-6 xl:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22v-4m0-12V2m10 10h-4M6 12H2m13.414 7.414l-2.828-2.828M6.414 6.414l2.828 2.828m8.486 0l-2.828 2.828M6.414 17.586l2.828-2.828" /></svg>,
  Global: <svg className="w-5 h-5 xl:w-6 xl:h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  ChevronDown: <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>,
  Play: <svg className="w-5 h-5 ml-2 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>,
};

// Separated Game Data
const db = {
  valorant: {
    theme: { 
      primary: 'cyan', 
      gradient: 'from-cyan-500 to-blue-600', 
      text: 'text-cyan-400', 
      textHover: 'group-hover:text-cyan-300',
      textDim: 'text-cyan-400/70',
      border: 'border-cyan-500',
      borderSoft: 'border-cyan-500/30',
      bgSoft: 'bg-cyan-500/10',
      bgActive: 'bg-cyan-500/20',
      glow: 'bg-cyan-500/20',
      glowStrong: 'bg-cyan-500/40',
      glowHover: 'group-hover:bg-cyan-500/30',
    },
    timerSeconds: 225301,
    kpis: [
      { title: 'VCT TOURNAMENTS', type: 'global', stats: [{ label: 'Active', value: '3' }, { label: 'Upcoming', value: '12' }] },
      { title: 'VALORANT PLAYERS', type: 'users', stats: [{ label: 'Registered', value: '18,250' }, { label: 'Active', value: '6,400' }] },
      { title: 'TOTAL TEAMS', type: 'teams', stats: [{ label: 'Verified', value: '450' }, { label: 'Amateur', value: '1,800' }] },
      { title: 'PRIZE POOL', type: 'prize', stats: [{ label: 'Total to Date', value: '₱5.75M' }, { label: 'Current', value: '₱1.20M' }] }
    ],
    liveMatch: {
      team1: { name: 'PRX', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=PRX&backgroundColor=0ea5e9' },
      team2: { name: 'SEN', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=SEN&backgroundColor=ef4444' }
    },
    standings: [
      { rank: 1, t1: { name: 'PRX', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=P' }, isLive: true, score: '7 - 9', map: 'Map 2: Sunset', t2: { name: 'SEN', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=S' } },
      { rank: 2, t1: { name: 'FNC', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=F' }, isLive: true, score: '0 - 1', map: 'Map 1: Ascent', t2: { name: 'DRX', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=D' } },
      { rank: 3, t1: { name: 'LOUD', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=L' }, isLive: false, score: '13 - 7', map: 'Match Finished', t2: { name: 'NRG', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=N' } }
    ],
    detailedStats: [
      { rank: 1, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=P', name: 'PRX.Jinggg', kd: 1.8, wl: '15 / 3', dmg: '45k', mvp: 1200, role: 'Duelist' },
      { rank: 2, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=S', name: 'SEN.TenZ', kd: 1.7, wl: '15 / 3', dmg: '40k', mvp: 1150, role: 'Initiator' },
      { rank: 3, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=F', name: 'FNC.Boaster', kd: 1.1, wl: '10 / 3', dmg: '25k', mvp: 900, role: 'Controller' },
      { rank: 4, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=P', name: 'PRX.Forsaken', kd: 1.5, wl: '9 / 3', dmg: '32k', mvp: 1050, role: 'Flex' },
    ],
  },
  crossfire: {
    theme: { 
      primary: 'amber', 
      gradient: 'from-amber-500 to-orange-600', 
      text: 'text-amber-400', 
      textHover: 'group-hover:text-amber-300',
      textDim: 'text-amber-400/70',
      border: 'border-amber-500',
      borderSoft: 'border-amber-500/30',
      bgSoft: 'bg-amber-500/10',
      bgActive: 'bg-amber-500/20',
      glow: 'bg-amber-500/20',
      glowStrong: 'bg-amber-500/40',
      glowHover: 'group-hover:bg-amber-500/30',
    },
    timerSeconds: 86400,
    kpis: [
      { title: 'CFS TOURNAMENTS', type: 'global', stats: [{ label: 'Active', value: '1' }, { label: 'Upcoming', value: '4' }] },
      { title: 'CROSSFIRE PLAYERS', type: 'users', stats: [{ label: 'Registered', value: '45,120' }, { label: 'Active', value: '12,300' }] },
      { title: 'CLAN ROSTERS', type: 'teams', stats: [{ label: 'Verified', value: '890' }, { label: 'Amateur', value: '3,200' }] },
      { title: 'PRIZE POOL', type: 'prize', stats: [{ label: 'Total to Date', value: '$2.5M' }, { label: 'Current', value: '$500K' }] }
    ],
    liveMatch: {
      team1: { name: 'ALL GAMERS', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=AG&backgroundColor=f59e0b' },
      team2: { name: 'BAISHA', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=BS&backgroundColor=ef4444' }
    },
    standings: [
      { rank: 1, t1: { name: 'AG', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=AG' }, isLive: true, score: '5 - 3', map: 'Map 1: Black Widow', t2: { name: 'BS', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=BS' } },
      { rank: 2, t1: { name: 'VG', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=VG' }, isLive: true, score: '9 - 9', map: 'Map 3: Port', t2: { name: 'SV', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=SV' } },
      { rank: 3, t1: { name: 'PM', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=PM' }, isLive: false, score: '10 - 4', map: 'Match Finished', t2: { name: 'EXE', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=EX' } }
    ],
    detailedStats: [
      { rank: 1, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=AG', name: 'AG.Even', kd: 2.1, wl: '18 / 2', dmg: '55k', mvp: 1400, role: 'Assaulter' },
      { rank: 2, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=BS', name: 'BS.N9', kd: 1.9, wl: '16 / 4', dmg: '48k', mvp: 1350, role: 'Sniper' },
      { rank: 3, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=VG', name: 'VG.Mzi', kd: 1.5, wl: '12 / 5', dmg: '38k', mvp: 1100, role: 'Support' },
      { rank: 4, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=AG', name: 'AG.ZY', kd: 1.4, wl: '11 / 6', dmg: '35k', mvp: 1050, role: 'Lurker' },
    ],
  }
};

const getRoleBadge = (role) => {
  const styles = {
    'Duelist': 'text-red-300 bg-red-500/10 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]',
    'Initiator': 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]',
    'Controller': 'text-purple-300 bg-purple-500/10 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
    'Sentinel': 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.2)]',
    'Sniper': 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    'Assaulter': 'text-orange-300 bg-orange-500/10 border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.2)]',
    'Lurker': 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]',
    'Support': 'text-blue-300 bg-blue-500/10 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
  };
  return styles[role] || 'text-gray-300 bg-gray-500/10 border-gray-500/20';
};

const Dashboard = () => {
  const [activeGame, setActiveGame] = useState('valorant');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const data = db[activeGame];
  const [timeLeft, setTimeLeft] = useState(data.timerSeconds);

  // Reset timer when switching games
  useEffect(() => {
    setTimeLeft(data.timerSeconds);
  }, [activeGame, data.timerSeconds]);

  useEffect(() => {
    const timerId = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (24 * 3600));
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return {
      days: String(d).padStart(2, '0'),
      hours: String(h).padStart(2, '0'),
      mins: String(m).padStart(2, '0'),
      secs: String(s).padStart(2, '0')
    };
  };

  const time = formatTime(timeLeft);

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[#05080f] text-white font-sans relative selection:bg-white/20">
      
      {/* AMBIENT BACKGROUND GLOW */}
      <div className={`fixed top-0 left-0 w-full h-1/2 ${data.theme.glow} blur-[200px] opacity-20 pointer-events-none transition-colors duration-1000 z-0`}></div>
      
      {/* 
        MAIN CONTENT WRAPPER
        Using flex-col with gap ensures NO overlapping elements vertically. 
      */}
      <div className="flex flex-col gap-10 p-6 md:p-10 lg:p-14 relative z-10 w-full max-w-[1920px] mx-auto">
        
        {/* GAME SELECTION (Dropdown Style) */}
        <div className="flex justify-start shrink-0 relative z-50">
          <div className="relative w-64 sm:w-80">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex items-center justify-between px-6 py-4 bg-white/5 backdrop-blur-2xl rounded-2xl border ${data.theme.borderSoft} shadow-2xl text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 ${data.theme.text} hover:bg-white/10`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${data.theme.bgActive} border ${data.theme.borderSoft} animate-pulse`}></span>
                {activeGame}
              </div>
              <span className={`transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                {Icons.ChevronDown}
              </span>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-full bg-[#0a0d14]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50 transform origin-top animate-fade-in">
                {['valorant', 'crossfire'].map(game => (
                  <button 
                    key={game}
                    onClick={() => { setActiveGame(game); setIsDropdownOpen(false); }}
                    className={`w-full text-left px-6 py-4 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-3 ${
                      activeGame === game 
                        ? `${db[game].theme.text} bg-white/5` 
                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${activeGame === game ? db[game].theme.bgActive : 'bg-transparent'}`}></span>
                    {game}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8 shrink-0">
          {data.kpis.map((card, idx) => (
            <div key={idx} className="relative group p-[1px] rounded-[1.5rem] bg-gradient-to-b from-white/10 to-transparent shadow-xl flex flex-col h-full">
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.5rem]"></div>
              
              <div className="relative flex-1 bg-[#0a0d14]/90 backdrop-blur-3xl p-5 lg:p-7 rounded-[1.4rem] transition-colors duration-500 flex flex-col overflow-hidden">
                {/* Corner Glow */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 ${data.theme.glow} rounded-full blur-3xl ${data.theme.glowHover} transition-all duration-500`}></div>
                
                <div className="flex justify-between items-start mb-6 lg:mb-8 relative z-10 gap-4">
                  <h3 className="text-[10px] xl:text-[11px] font-bold text-slate-400 tracking-[0.15em] uppercase leading-snug flex-1 break-words">{card.title}</h3>
                  <div className={`p-2 xl:p-3 rounded-xl bg-white/5 border border-white/10 ${data.theme.textDim} ${data.theme.textHover} group-hover:scale-110 transition-all duration-300 shadow-inner shrink-0 flex items-center justify-center`}>
                    {Icons[card.type === 'global' ? 'Global' : card.type === 'users' ? 'Users' : card.type === 'teams' ? 'Crosshair' : 'Trophy']}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 lg:gap-4 relative z-10 mt-auto w-full">
                  {card.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex flex-col overflow-hidden">
                      <p className="text-[9px] xl:text-[10px] text-slate-500 mb-1 tracking-widest uppercase font-semibold truncate" title={stat.label}>{stat.label}</p>
                      <p className="text-lg xl:text-xl 2xl:text-2xl font-black text-white tracking-wide truncate" title={stat.value}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Decorative Bottom Bar */}
                <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r ${data.theme.gradient} transition-all duration-700 ease-out`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* LIVE MATCH & STANDINGS */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 shrink-0">
          
          {/* Live Match Graphic - Broadcast Style */}
          <div className="xl:col-span-2 relative bg-[#0a0d14] rounded-[2rem] border border-white/10 shadow-[0_0_50px_-15px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden group min-h-[400px]">
            {/* Grid Background Mesh */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            
            {/* Dynamic Core Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-full max-w-4xl ${data.theme.glow} blur-[140px] rounded-[100%] opacity-30 group-hover:opacity-50 transition-opacity duration-1000 mix-blend-screen pointer-events-none`}></div>
            <div className="absolute -bottom-40 -right-40 w-120 h-120 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            {/* Live Indicator */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-[10px] font-bold tracking-[0.25em] text-red-400 uppercase z-20 flex items-center gap-2 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.2)] shrink-0">
               <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.8)] shrink-0"></span> LIVE BROADCAST
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center text-center relative z-10 w-full p-8 md:p-14 lg:p-20 mt-12 md:mt-0 flex-1 gap-6 md:gap-0">
              {/* Team 1 */}
              <div className="flex-1 flex flex-col items-center w-full shrink-0">
                <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 group/logo cursor-pointer shrink-0">
                  <div className={`absolute inset-0 bg-gradient-to-br ${data.theme.gradient} rounded-[1.5rem] md:rounded-[2rem] blur-2xl opacity-20 group-hover/logo:opacity-50 transition-opacity duration-500`}></div>
                  <div className="relative w-full h-full bg-[#05080f]/80 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-2xl border border-white/10 group-hover/logo:scale-105 group-hover/logo:border-white/30 transition-all duration-500 flex items-center justify-center">
                      <img src={data.liveMatch.team1.logo} alt="T1" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-[0.1em] md:tracking-[0.15em] drop-shadow-2xl">{data.liveMatch.team1.name}</h2>
                <p className={`text-[10px] md:text-[11px] ${data.theme.text} font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase mt-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 inline-block`}>HOME</p>
              </div>
              
              {/* VS & Timer */}
              <div className="flex-[0.8] flex flex-col items-center justify-center w-full shrink-0">
                <div className="text-5xl md:text-7xl lg:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-700 mb-8 drop-shadow-2xl filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  VS
                </div>
                
                <div className="bg-[#05080f]/90 backdrop-blur-xl px-6 py-5 md:px-8 md:py-6 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center min-w-[220px] md:min-w-[260px]">
                  <h4 className="text-[10px] md:text-[11px] font-bold text-slate-400 tracking-[0.2em] md:tracking-[0.3em] mb-4 uppercase">MATCH STARTS IN</h4>
                  <div className="flex items-center gap-2 md:gap-3 text-2xl md:text-3xl lg:text-4xl font-mono font-bold tracking-widest text-white">
                    <div className="flex flex-col items-center">
                      <span>{time.days}</span>
                      <span className="text-[8px] md:text-[9px] text-slate-500 tracking-[0.2em] mt-2">DAYS</span>
                    </div>
                    <span className="text-slate-600 mb-4 md:mb-5">:</span>
                    <div className="flex flex-col items-center">
                      <span>{time.hours}</span>
                      <span className="text-[8px] md:text-[9px] text-slate-500 tracking-[0.2em] mt-2">HRS</span>
                    </div>
                    <span className="text-slate-600 mb-4 md:mb-5">:</span>
                    <div className="flex flex-col items-center">
                      <span>{time.mins}</span>
                      <span className="text-[8px] md:text-[9px] text-slate-500 tracking-[0.2em] mt-2">MIN</span>
                    </div>
                    <span className={`mb-4 md:mb-5 ${data.theme.text} animate-pulse`}>:</span>
                    <div className="flex flex-col items-center">
                      <span className={data.theme.text}>{time.secs}</span>
                      <span className="text-[8px] md:text-[9px] text-slate-500 tracking-[0.2em] mt-2">SEC</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Team 2 */}
              <div className="flex-1 flex flex-col items-center w-full shrink-0">
                <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 group/logo cursor-pointer shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-600 rounded-[1.5rem] md:rounded-[2rem] blur-2xl opacity-20 group-hover/logo:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative w-full h-full bg-[#05080f]/80 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 shadow-2xl border border-white/10 group-hover/logo:scale-105 group-hover/logo:border-white/30 transition-all duration-500 flex items-center justify-center">
                      <img src={data.liveMatch.team2.logo} alt="T2" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-[0.1em] md:tracking-[0.15em] drop-shadow-2xl">{data.liveMatch.team2.name}</h2>
                <p className="text-[10px] md:text-[11px] text-red-400 font-bold tracking-[0.3em] md:tracking-[0.4em] uppercase mt-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 inline-block">AWAY</p>
              </div>
            </div>

            <div className="flex justify-center relative z-10 p-6 md:pb-10 shrink-0 mt-auto">
              <button className={`flex items-center gap-2 md:gap-3 bg-gradient-to-r ${data.theme.gradient} text-white font-bold py-3 md:py-4 px-8 md:px-12 rounded-[1rem] transition-all duration-300 text-[10px] md:text-[12px] tracking-[0.25em] uppercase shadow-[0_0_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:scale-[1.03]`}>
                Watch Live Stream {Icons.Play}
              </button>
            </div>
          </div>

          {/* Standings List */}
          <div className="bg-[#0a0d14]/80 backdrop-blur-2xl rounded-[2rem] p-6 lg:p-10 shadow-2xl border border-white/10 flex flex-col shrink-0">
            <div className="flex justify-between items-center mb-6 lg:mb-8 pb-4 lg:pb-5 border-b border-white/5 shrink-0">
              <h3 className="text-[11px] md:text-xs font-bold text-slate-400 tracking-[0.2em] md:tracking-[0.25em] uppercase">ONGOING MATCHES</h3>
              <span className={`text-[10px] font-bold ${data.theme.text} bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 shrink-0`}>LIVE</span>
            </div>
            
            <div className="flex flex-col gap-4 lg:gap-6 flex-1 overflow-y-auto custom-scrollbar pr-2 lg:pr-3">
              {data.standings.map((match, i) => (
                <div key={i} className="group bg-white/5 hover:bg-white/10 p-4 lg:p-6 rounded-[1.25rem] lg:rounded-[1.5rem] flex justify-between items-center border border-transparent hover:border-white/10 transition-all duration-300 cursor-pointer">
                  
                  <div className="flex flex-col items-center w-[30%] gap-2 lg:gap-3 shrink-0">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-[#05080f] p-2 lg:p-3 border border-white/5 group-hover:border-white/20 transition-colors shadow-inner flex items-center justify-center shrink-0">
                      <img src={match.t1.img} className="w-full h-full object-contain" alt="T1" />
                    </div>
                    <span className="text-[10px] lg:text-[11px] text-slate-300 font-bold tracking-[0.1em] lg:tracking-[0.15em] uppercase text-center truncate w-full">{match.t1.name}</span>
                  </div>
                  
                  <div className="flex flex-col items-center w-[40%] text-center shrink-0 px-2">
                    {match.isLive ? (
                      <span className="text-[9px] lg:text-[10px] text-red-400 font-bold tracking-[0.2em] flex items-center justify-center gap-1.5 lg:gap-2 mb-2 lg:mb-3 bg-red-500/10 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)] shrink-0">
                        <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-red-500 rounded-full animate-ping shrink-0"></span>LIVE
                      </span>
                    ) : (
                      <span className="text-[9px] lg:text-[10px] text-slate-500 font-bold tracking-[0.2em] mb-2 lg:mb-3 bg-white/5 px-3 lg:px-4 py-1 lg:py-1.5 rounded-full border border-white/5 shrink-0">FIN</span>
                    )}
                    <div className="font-black text-2xl md:text-3xl lg:text-4xl text-white tracking-widest">{match.score}</div>
                    <span className={`text-[10px] lg:text-[11px] ${data.theme.text} opacity-80 font-semibold tracking-wider lg:tracking-widest mt-1.5 lg:mt-2 truncate w-full`}>{match.map}</span>
                  </div>

                  <div className="flex flex-col items-center w-[30%] gap-2 lg:gap-3 shrink-0">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-[#05080f] p-2 lg:p-3 border border-white/5 group-hover:border-white/20 transition-colors shadow-inner flex items-center justify-center shrink-0">
                      <img src={match.t2.img} className="w-full h-full object-contain" alt="T2" />
                    </div>
                    <span className="text-[10px] lg:text-[11px] text-slate-300 font-bold tracking-[0.1em] lg:tracking-[0.15em] uppercase text-center truncate w-full">{match.t2.name}</span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DETAILED STATS TABLE */}
        <div className="bg-[#0a0d14]/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/10 flex flex-col overflow-hidden shrink-0">
          <div className="flex justify-between items-center p-6 lg:p-10 border-b border-white/5 bg-white/[0.02] shrink-0">
            <h3 className="text-[11px] md:text-xs font-bold text-slate-400 tracking-[0.2em] md:tracking-[0.25em] uppercase">PLAYER PERFORMANCE OVERVIEW</h3>
            <button className={`text-[10px] lg:text-[11px] font-bold ${data.theme.text} ${data.theme.textHover} tracking-widest uppercase transition-colors flex items-center gap-1.5 lg:gap-2 shrink-0`}>
              View Full Stats <svg className="w-3 h-3 lg:w-4 lg:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="overflow-x-auto p-6 lg:p-8">
            <table className="w-full text-left whitespace-nowrap min-w-[700px]">
              <thead className="text-[10px] lg:text-[11px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                <tr>
                  <th className="pb-4 lg:pb-6 px-4 lg:px-6 border-b border-white/5">Rank</th>
                  <th className="pb-4 lg:pb-6 px-4 lg:px-6 border-b border-white/5">Player</th>
                  <th className="pb-4 lg:pb-6 px-4 lg:px-6 border-b border-white/5">Avg K/D</th>
                  <th className="pb-4 lg:pb-6 px-4 lg:px-6 border-b border-white/5">W/L</th>
                  <th className="pb-4 lg:pb-6 px-4 lg:px-6 border-b border-white/5">Damage</th>
                  <th className="pb-4 lg:pb-6 px-4 lg:px-6 border-b border-white/5 text-right">Role</th>
                </tr>
              </thead>
              <tbody className="text-xs lg:text-sm">
                {data.detailedStats.map((stat, i) => (
                  <tr key={i} className="group hover:bg-white/5 transition-colors duration-300 cursor-pointer">
                    <td className="py-4 lg:py-6 px-4 lg:px-6 text-slate-400 font-mono font-bold text-base lg:text-lg border-b border-white/5 group-last:border-none">
                      <span className="opacity-50">#</span>{stat.rank}
                    </td>
                    <td className="py-4 lg:py-6 px-4 lg:px-6 border-b border-white/5 group-last:border-none">
                      <div className="flex items-center gap-3 lg:gap-5">
                        <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-xl bg-[#05080f] border border-white/10 p-1.5 lg:p-2 group-hover:border-white/20 transition-colors shadow-inner shrink-0 flex items-center justify-center">
                          <img src={stat.teamLogo} className="w-full h-full object-contain shrink-0" alt="team" />
                        </div>
                        <span className="font-bold text-white tracking-wide text-sm lg:text-base group-hover:text-white transition-colors">{stat.name}</span>
                      </div>
                    </td>
                    <td className="py-4 lg:py-6 px-4 lg:px-6 border-b border-white/5 group-last:border-none">
                      <span className={`${data.theme.text} font-black text-base lg:text-lg`}>{stat.kd}</span>
                    </td>
                    <td className="py-4 lg:py-6 px-4 lg:px-6 text-slate-300 font-medium text-sm lg:text-base border-b border-white/5 group-last:border-none">
                      {stat.wl}
                    </td>
                    <td className="py-4 lg:py-6 px-4 lg:px-6 text-slate-200 font-bold text-sm lg:text-base border-b border-white/5 group-last:border-none">
                      {stat.dmg}
                    </td>
                    <td className="py-4 lg:py-6 px-4 lg:px-6 border-b border-white/5 group-last:border-none text-right">
                      <span className={`inline-block text-[10px] lg:text-[11px] font-bold px-3 py-1.5 lg:px-4 lg:py-2 rounded-full border tracking-widest uppercase shrink-0 ${getRoleBadge(stat.role)}`}>
                        {stat.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;