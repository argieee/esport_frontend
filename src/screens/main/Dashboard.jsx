import React, { useState, useEffect } from 'react';

// SVG Icons
const Icons = {
  Trophy: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Users: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Crosshair: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22v-4m0-12V2m10 10h-4M6 12H2m13.414 7.414l-2.828-2.828M6.414 6.414l2.828 2.828m8.486 0l-2.828 2.828M6.414 17.586l2.828-2.828" /></svg>,
  Global: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
};

const mockApiResponse = {
  timerSeconds: 225301, 
  kpis: [
    { title: 'TOURNAMENTS', type: 'global', stats: [{ label: 'Active', value: '3' }, { label: 'Upcoming', value: '12' }] },
    { title: 'TOTAL PLAYERS', type: 'users', stats: [{ label: 'Registered', value: '18,250' }, { label: 'Active', value: '6,400' }] },
    { title: 'TOTAL TEAMS', type: 'teams', stats: [{ label: 'Verified', value: '450' }, { label: 'Amateur', value: '1,800' }] },
    { title: 'PRIZE POOL', type: 'prize', stats: [{ label: 'Total to Date', value: '₱5.75M' }, { label: 'Current', value: '₱1.20M' }] }
  ],
  liveMatch: {
    team1: { name: 'GRYPHON', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Secret&backgroundColor=0ea5e9' },
    team2: { name: 'STORM', logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=Oasis&backgroundColor=ef4444' }
  },
  standings: [
    { rank: 1, t1: { name: 'Gryphon', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=G' }, isLive: true, score: '7 - 9', map: 'Map 2: Sunset', t2: { name: 'Storm', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=S' } },
    { rank: 2, t1: { name: 'Knights', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=K' }, isLive: true, score: '0 - 1', map: 'Map 1: Ascent', t2: { name: 'Dragon', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=D' } },
    { rank: 3, t1: { name: 'Tigers', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=T' }, isLive: false, score: '13 - 7', map: 'Match Finished', t2: { name: 'Phoenix', img: 'https://api.dicebear.com/7.x/identicon/svg?seed=P' } }
  ],
  detailedStats: [
    { rank: 1, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=G', name: 'GRYPHON.Alpha', kd: 1.8, wl: '15 / 3', dmg: '45k', mvp: 1200, role: 'Duelist' },
    { rank: 2, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=S', name: 'Storm.Beta', kd: 1.7, wl: '15 / 3', dmg: '40k', mvp: 1200, role: 'Initiator' },
    { rank: 3, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=K', name: 'Knights.Gamma', kd: 1.6, wl: '10 / 3', dmg: '35k', mvp: 1200, role: 'Controller' },
    { rank: 4, teamLogo: 'https://api.dicebear.com/7.x/identicon/svg?seed=G', name: 'GRYPHON.Omega', kd: 1.2, wl: '9 / 3', dmg: '23k', mvp: 1200, role: 'Sentinel' },
  ],
  topPlayers: [
    { rank: '#1', name: 'Gryphon.Alpha', stats: '1.8 K/D | Duelist', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha&backgroundColor=0c70ed' },
    { rank: '#2', name: 'Storm.Beta', stats: '1.7 K/D | Initiator', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beta&backgroundColor=dc384c' },
    { rank: '#3', name: 'Knights.Gamma', stats: '1.6 K/D | Controller', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gamma&backgroundColor=3182ce' }
  ]
};

const getRoleColor = (role) => {
  switch(role) {
    case 'Duelist': return 'text-red-400 bg-red-400/10 border-red-400/20';
    case 'Initiator': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    case 'Controller': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
    case 'Sentinel': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
};

const Dashboard = () => {
  const [timeLeft, setTimeLeft] = useState(mockApiResponse.timerSeconds);

  useEffect(() => {
    const timerId = setInterval(() => setTimeLeft(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (24 * 3600));
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${String(d).padStart(2, '0')}D : ${String(h).padStart(2, '0')}H : ${String(m).padStart(2, '0')}M : ${String(s).padStart(2, '0')}S`;
  };

  return (
    <div className="flex-1 p-6 lg:p-10 h-full overflow-y-auto custom-scrollbar bg-[#040814]">
      
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {mockApiResponse.kpis.map((card, idx) => (
          <div key={idx} className="relative overflow-hidden bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-md group hover:border-[#00ffcc]/50 transition-all duration-300 shadow-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ffcc]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xs font-bold text-slate-400 tracking-[0.15em] uppercase">{card.title}</h3>
              <div className="text-[#00ffcc]/70 group-hover:text-[#00ffcc] transition-colors">
                {Icons[card.type === 'global' ? 'Global' : card.type === 'users' ? 'Users' : card.type === 'teams' ? 'Crosshair' : 'Trophy']}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {card.stats.map((stat, sIdx) => (
                <div key={sIdx} className="border-l-2 border-slate-800 pl-3">
                  <p className="text-[10px] text-slate-500 mb-1 tracking-wider uppercase">{stat.label}</p>
                  <p className="text-lg font-black text-white tracking-wide">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* LIVE MATCH & STANDINGS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        
        {/* Live Match Graphic */}
        <div className="xl:col-span-2 relative overflow-hidden bg-[#0A101D] rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col justify-center p-8 min-h-[400px]">
          {/* Background Glows */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"></div>
          
          <div className="absolute top-6 left-6 px-3 py-1 bg-[#00ffcc]/10 border border-[#00ffcc]/30 rounded text-[10px] font-bold tracking-[0.2em] text-[#00ffcc] uppercase z-10 flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-[#00ffcc] rounded-full animate-pulse"></span> LIVE TOURNAMENT
          </div>

          <div className="flex justify-between items-center text-center relative z-10 mt-8 mb-6">
            {/* Team 1 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-32 h-32 mb-4 bg-[#0F172A] rounded-2xl p-4 shadow-[0_0_30px_rgba(14,165,233,0.15)] border border-cyan-500/20 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img src={mockApiResponse.liveMatch.team1.logo} alt="T1" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-lg">{mockApiResponse.liveMatch.team1.name}</h2>
              <p className="text-xs text-cyan-400 font-bold tracking-[0.3em] uppercase mt-1">HOME</p>
            </div>
            
            {/* VS & Timer */}
            <div className="flex-[1] flex flex-col items-center">
              <div className="text-5xl font-black italic text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-white drop-shadow-[0_0_20px_rgba(0,255,204,0.3)] mb-4">
                VS
              </div>
              <h4 className="text-sm font-bold text-slate-400 tracking-[0.2em] mb-2 uppercase">NEXT MATCH IN</h4>
              <div className="text-xl font-mono font-bold tracking-[0.15em] text-white bg-slate-900/80 px-6 py-2 rounded-lg border border-slate-700/50 shadow-inner">
                {formatTime(timeLeft)}
              </div>
            </div>
            
            {/* Team 2 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-32 h-32 mb-4 bg-[#0F172A] rounded-2xl p-4 shadow-[0_0_30px_rgba(239,68,68,0.15)] border border-red-500/20 -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img src={mockApiResponse.liveMatch.team2.logo} alt="T2" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-widest drop-shadow-lg">{mockApiResponse.liveMatch.team2.name}</h2>
              <p className="text-xs text-red-400 font-bold tracking-[0.3em] uppercase mt-1">AWAY</p>
            </div>
          </div>

          <div className="flex justify-center mt-auto relative z-10 pt-4">
            <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-10 rounded-xl transition-all duration-300 text-xs tracking-[0.15em] uppercase shadow-[0_0_20px_rgba(0,255,204,0.3)] hover:shadow-[0_0_30px_rgba(0,255,204,0.5)] transform hover:-translate-y-1">
              WATCH LIVE STREAM
            </button>
          </div>
        </div>

        {/* Standings List */}
        <div className="bg-slate-900/60 rounded-2xl p-6 shadow-xl border border-slate-800/80 flex flex-col backdrop-blur-md min-h-[400px]">
          <h3 className="text-xs font-bold text-slate-400 tracking-[0.15em] uppercase mb-6 pb-4 border-b border-slate-800">ONGOING MATCHES</h3>
          
          <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {mockApiResponse.standings.map((match, i) => (
              <div key={i} className="bg-[#0A101D] p-4 rounded-xl flex justify-between items-center border border-slate-800/50 hover:border-slate-600 transition-colors">
                
                <div className="flex flex-col items-center w-[25%] gap-1">
                  <img src={match.t1.img} className="w-10 h-10 rounded-lg bg-slate-800 p-1" alt="T1" />
                  <span className="text-[10px] text-slate-300 font-bold tracking-wide uppercase text-center">{match.t1.name}</span>
                </div>
                
                <div className="flex flex-col items-center w-[50%] text-center">
                  {match.isLive ? (
                    <span className="text-[9px] text-red-500 font-bold tracking-[0.2em] flex items-center justify-center gap-1.5 mb-1 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>LIVE
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-500 font-bold tracking-[0.2em] mb-1">FINISHED</span>
                  )}
                  <div className="font-black text-2xl text-white tracking-widest my-1">{match.score}</div>
                  <span className="text-[10px] text-cyan-500/80 font-medium tracking-wide">{match.map}</span>
                </div>

                <div className="flex flex-col items-center w-[25%] gap-1">
                  <img src={match.t2.img} className="w-10 h-10 rounded-lg bg-slate-800 p-1" alt="T2" />
                  <span className="text-[10px] text-slate-300 font-bold tracking-wide uppercase text-center">{match.t2.name}</span>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DETAILED STATS TABLE */}
      <div className="bg-slate-900/60 rounded-2xl p-6 shadow-xl border border-slate-800/80 backdrop-blur-md">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
          <h3 className="text-xs font-bold text-slate-400 tracking-[0.15em] uppercase">PLAYER PERFORMANCE OVERVIEW</h3>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Main Table */}
          <div className="flex-[3] overflow-x-auto custom-scrollbar pb-2">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="text-[10px] text-slate-500 uppercase tracking-widest bg-slate-800/30">
                <tr>
                  <th className="py-4 px-4 rounded-tl-lg">Rank</th>
                  <th className="py-4 px-4">Player</th>
                  <th className="py-4 px-4">Avg K/D</th>
                  <th className="py-4 px-4">W/L</th>
                  <th className="py-4 px-4">Damage</th>
                  <th className="py-4 px-4">Role</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-800/50">
                {mockApiResponse.detailedStats.map((stat, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 text-slate-400 font-mono font-bold">#{stat.rank}</td>
                    <td className="py-4 px-4 flex items-center gap-3">
                      <img src={stat.teamLogo} className="w-6 h-6 rounded bg-slate-800" alt="team" />
                      <span className="font-bold text-white tracking-wide">{stat.name}</span>
                    </td>
                    <td className="py-4 px-4"><span className="text-[#00ffcc] font-bold">{stat.kd}</span></td>
                    <td className="py-4 px-4 text-slate-300">{stat.wl}</td>
                    <td className="py-4 px-4 text-red-400 font-bold">{stat.dmg}</td>
                    <td className="py-4 px-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded border tracking-wider uppercase ${getRoleColor(stat.role)}`}>
                        {stat.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Side MVP List */}
          <div className="flex-1 min-w-[250px] flex flex-col gap-4 xl:border-l border-slate-800 xl:pl-8">
             <h4 className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-2">TOP MVP PLAYERS</h4>
             <div className="space-y-3">
                {mockApiResponse.topPlayers.map((player, i) => (
                  <div key={i} className="flex items-center gap-4 bg-slate-800/30 p-3 rounded-xl border border-slate-700/30 hover:border-cyan-500/30 transition-colors">
                    <img src={player.avatar} alt="avatar" className="w-10 h-10 rounded-lg bg-slate-800"/>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-white tracking-wide">{player.name}</p>
                      <p className="text-[10px] text-slate-400 mt-1">{player.stats}</p>
                    </div>
                    <div className="text-lg font-black text-slate-600 italic mr-2">{player.rank}</div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;