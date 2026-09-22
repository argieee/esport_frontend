import React, { useState, useEffect, useMemo } from 'react';
const TeamModal = ({ team, onClose, activeGame }) => {
  if (!team) return null;
  const accent = activeGame === 'VALORANT' ? '#ff4655' : '#4c7fd6';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-bg-200 border border-slate-700/60 rounded-2xl w-full max-w-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="h-32 relative overflow-hidden bg-slate-900 flex items-end px-8 py-4">
          <div className="absolute inset-0 opacity-40" style={{ background: `linear-gradient(45deg, ${accent}, transparent)` }} />
          <div className="relative z-10 flex items-end gap-5">
            <div className="w-20 h-20 rounded-xl bg-bg-300 border-2 shadow-lg flex items-center justify-center" style={{ borderColor: accent }}>
              <span className="text-3xl font-black text-theme-text-base">{team.team ? team.team[0] : team.name?.[0] || 'T'}</span>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-black uppercase tracking-widest text-theme-text-base drop-shadow-md">{team.team || team.name || 'Team Name'}</h2>
              <p className="text-sm font-bold tracking-widest uppercase" style={{ color: accent }}>Rank #{team.rank}</p>
            </div>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-theme-text-muted hover:text-theme-text-base rounded-lg hover:bg-white/10 transition-colors z-20 bg-black/20">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-bg-300 border border-slate-800 rounded-xl p-5 flex flex-col gap-1 items-center">
              <span className="text-xs text-theme-text-muted uppercase tracking-widest font-bold">Matches Won</span>
              <span className="text-4xl font-black text-theme-text-base">{team.seriesWin !== undefined ? team.seriesWin : (team.w || 0)}</span>
            </div>
            <div className="bg-bg-300 border border-slate-800 rounded-xl p-5 flex flex-col gap-1 items-center">
              <span className="text-xs text-theme-text-muted uppercase tracking-widest font-bold">Matches Lost</span>
              <span className="text-4xl font-black text-theme-text-base">{team.seriesLoss !== undefined ? team.seriesLoss : (team.l || 0)}</span>
            </div>
            <div className="bg-bg-300 border border-slate-800 rounded-xl p-5 flex flex-col gap-1 items-center">
              <span className="text-xs text-theme-text-muted uppercase tracking-widest font-bold">Set Diff</span>
              <span className="text-4xl font-black text-theme-text-base">{team.setDiff !== undefined ? (team.setDiff > 0 ? '+'+team.setDiff : team.setDiff) : 0}</span>
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
      <div className="bg-bg-200 border border-slate-700/60 rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-slate-800/60 flex items-center justify-between bg-slate-900/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-800 border-2 shadow-lg flex items-center justify-center text-xl font-black text-theme-text-base" style={{ borderColor: accent }}>
              {player.name ? player.name[0] : 'P'}
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-widest text-theme-text-base drop-shadow-md">{player.name || 'Player Profile'}</h2>
              <p className="text-xs font-bold tracking-widest text-theme-text-muted uppercase mt-1">Rank #{player.rank || 1} — {activeGame}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-theme-text-muted hover:text-theme-text-base rounded-lg hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-bg-300 border border-[#232f40] rounded-xl p-5">
              <h3 className="text-xs font-black tracking-widest text-theme-text-faint uppercase mb-4">Combat Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-theme-text-base">K/D Ratio</span><span className="text-lg font-black text-theme-text-base">{player.kd}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-theme-text-base">Total Kills</span><span className="text-lg font-black text-theme-text-base">{player.kills}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-theme-text-base">Total Deaths</span><span className="text-lg font-black text-theme-text-base">{player.death || player.deaths}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-theme-text-base">Rounds Played</span><span className="text-lg font-black text-theme-text-base">{player.round || player.rounds}</span></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-bg-300 border border-[#232f40] rounded-xl p-5 h-full">
              <h3 className="text-xs font-black tracking-widest text-theme-text-faint uppercase mb-4">Advanced Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-theme-text-base">Kill per Round</span><span className="text-lg font-black text-[#8a9db8]">{player.kr}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-theme-text-base">Survive Rate</span><span className="text-lg font-black text-[#8a9db8]">{player.sr}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-theme-text-base">Headshot/Kill</span><span className="text-lg font-black text-[#8a9db8]">{player.hk}</span></div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-theme-text-base">Avg Points</span><span className="text-lg font-black text-[#8a9db8]">{player.ap}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Leaderboards = ({ globalGame, globalTournament }) => {
  const activeGame = (globalGame || 'VALORANT').toUpperCase();
  const [dailySearch, setDailySearch] = useState('');
  const [weeklySearch, setWeeklySearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [h2hLeft, setH2hLeft] = useState('');
  const [h2hRight, setH2hRight] = useState('');
  const [bestPlayerLeft, setBestPlayerLeft] = useState('');
  const [bestPlayerRight, setBestPlayerRight] = useState('');
  const [matchRecords, setMatchRecords] = useState([]);
  useEffect(() => {
     fetch(`http://localhost:5000/api/match-records?tournament=${encodeURIComponent(globalTournament || 'Default')}`)
       .then(res => res.json())
       .then(data => setMatchRecords(data))
       .catch(err => console.error(err));
  }, [globalTournament]);
  const theme = useMemo(() => ({
    leftAccent: activeGame === 'VALORANT' ? '#ff3366' : '#4c7fd6',
    rightAccent: activeGame === 'VALORANT' ? '#00d0eb' : '#f59e0b',
    leftGradient: activeGame === 'VALORANT' ? 'from-[#801933] to-[#ff3366]' : 'from-[#1e3a8a] to-[#4c7fd6]',
    rightGradient: activeGame === 'VALORANT' ? 'from-[#006880] to-[#00d0eb]' : 'from-[#92400e] to-[#f59e0b]'
  }), [activeGame]);
  const standings = useMemo(() => {
    const gameRecords = matchRecords.filter(r => r.game.toUpperCase() === activeGame);
    const teamStats = {};
    const setsSeen = new Set();
    const matchResults = {}; 
    const maxR = activeGame === 'VALORANT' ? 13 : 10;
    gameRecords.forEach(record => {
      const team = record.team_name;
      if (!team) return;
      if (!teamStats[team]) teamStats[team] = { team, seriesWin: 0, seriesLoss: 0, setWin: 0, setLoss: 0, roundDiff: 0, kills: 0, deaths: 0 };
      teamStats[team].kills += Number(record.kills) || 0;
      teamStats[team].deaths += Number(record.deaths) || 0;
      const matchKey = `${record.week || 'W'}-${record.day || 'D'}-${record.match || 'M'}-${record.created_at || 'T'}`;
      const setKey = `${matchKey}-${record.set_num || '1'}-${team}`;
      if (!setsSeen.has(setKey)) {
        setsSeen.add(setKey);
        if (!matchResults[matchKey]) matchResults[matchKey] = {};
        if (!matchResults[matchKey][team]) matchResults[matchKey][team] = { setsWon: 0, setsLost: 0 };
        const isWin = String(record.win).toLowerCase() === 'true' || record.win === 1;
        if (isWin) {
          teamStats[team].setWin += 1;
          matchResults[matchKey][team].setsWon += 1;
        } else {
          teamStats[team].setLoss += 1;
          matchResults[matchKey][team].setsLost += 1;
        }
        let rd = 0;
        const rounds = Number(record.rounds) || 0;
        if (rounds >= maxR * 2) rd = isWin ? 2 : -2;
        else rd = isWin ? (maxR * 2 - rounds) : (rounds - maxR * 2);
        teamStats[team].roundDiff += rd;
      }
    });
    Object.values(matchResults).forEach(matchObj => {
       const teamsInMatch = Object.keys(matchObj);
       if (teamsInMatch.length === 2) {
          const [t1, t2] = teamsInMatch;
          const t1Wins = matchObj[t1].setsWon;
          const t2Wins = matchObj[t2].setsWon;
          if (t1Wins > t2Wins) { teamStats[t1].seriesWin += 1; teamStats[t2].seriesLoss += 1; }
          else if (t2Wins > t1Wins) { teamStats[t2].seriesWin += 1; teamStats[t1].seriesLoss += 1; }
       } else if (teamsInMatch.length === 1) {
          const t1 = teamsInMatch[0];
          if (matchObj[t1].setsWon > matchObj[t1].setsLost) teamStats[t1].seriesWin += 1;
          else if (matchObj[t1].setsLost > matchObj[t1].setsWon) teamStats[t1].seriesLoss += 1;
       }
    });
    return Object.values(teamStats)
      .map(t => ({ ...t, setDiff: t.setWin - t.setLoss, totalPlusMinus: t.kills - t.deaths }))
      .sort((a, b) => {
         if (b.seriesWin !== a.seriesWin) return b.seriesWin - a.seriesWin;
         if (a.seriesLoss !== b.seriesLoss) return a.seriesLoss - b.seriesLoss;
         if (b.setDiff !== a.setDiff) return b.setDiff - a.setDiff;
         if (b.roundDiff !== a.roundDiff) return b.roundDiff - a.roundDiff;
         return b.totalPlusMinus - a.totalPlusMinus;
      })
      .map((t, idx) => ({ ...t, rank: idx + 1, w: t.seriesWin, l: t.seriesLoss }));
  }, [matchRecords, activeGame]);
  const leftTeam = h2hLeft || (standings[0]?.team || 'Team 1');
  const rightTeam = h2hRight || (standings[1]?.team || 'Team 2');
  const playerStats = useMemo(() => {
    const gameRecords = matchRecords.filter(r => r.game.toUpperCase() === activeGame);
    const stats = {};
    gameRecords.forEach(r => {
      const p = r.ign;
      if (!p) return;
      if (!stats[p]) stats[p] = { ign: p, team: r.team_name, kills: 0, deaths: 0, assists: 0, headshots: 0, rounds: 0 };
      stats[p].kills += Number(r.kills) || 0;
      stats[p].deaths += Number(r.deaths) || 0;
      stats[p].assists += Number(r.assists) || 0;
      stats[p].headshots += Number(r.headshots) || 0;
      stats[p].rounds += Number(r.rounds) || 0;
    });
    return Object.values(stats).map(s => {
      const kd = s.deaths > 0 ? (s.kills / s.deaths).toFixed(2) : s.kills.toFixed(2);
      const kr = s.rounds > 0 ? (s.kills / s.rounds).toFixed(2) : '0.00';
      const sr = s.rounds > 0 ? ((s.rounds - s.deaths > 0 ? s.rounds - s.deaths : 0) / s.rounds).toFixed(2) : '0.00';
      const hk = s.kills > 0 ? (s.headshots / s.kills).toFixed(2) : '0.00';
      const pm = s.kills - s.deaths;
      const ap = s.kills * 150 + s.assists * 50; 
      return { ...s, name: s.ign, player: s.ign, kd, kr, sr, hk, pm, ap };
    });
  }, [matchRecords, activeGame]);
  const topPlayers = useMemo(() => [...playerStats].sort((a, b) => Number(b.kd) - Number(a.kd) || b.kills - a.kills).map((p, i) => ({ ...p, rank: i + 1 })), [playerStats]);
  const dailyPlayers = topPlayers.slice(0, 5);
  const weeklyPlayers = topPlayers.slice(0, 10);
  const teamRosters = useMemo(() => {
    const rosters = {};
    playerStats.forEach(p => {
      if (p.team === leftTeam || p.team === rightTeam) {
        if (!rosters[p.team]) rosters[p.team] = [];
        rosters[p.team].push(p);
      }
    });
    return rosters;
  }, [playerStats, leftTeam, rightTeam]);
  const mapAnalytics = useMemo(() => {
    const gameRecords = matchRecords.filter(r => r.game.toUpperCase() === activeGame && (r.team_name === leftTeam || r.team_name === rightTeam));
    const maps = {};
    const setsSeen = new Set();
    gameRecords.forEach(r => {
      const m = r.map || 'Unknown';
      if (!m) return;
      const team = r.team_name;
      const matchKey = `${r.week}-${r.day}-${r.match}-${r.set_num}-${team}`;
      if (!setsSeen.has(matchKey)) {
        setsSeen.add(matchKey);
        if (!maps[m]) maps[m] = { map: m, sets: 0, wins: 0, teams: {} };
        maps[m].sets += 1;
        const isWin = String(r.win).toLowerCase() === 'true' || r.win === 1;
        if (isWin) maps[m].wins += 1;
        if (!maps[m].teams[team]) maps[m].teams[team] = { sets: 0, wins: 0 };
        maps[m].teams[team].sets += 1;
        if (isWin) maps[m].teams[team].wins += 1;
      }
    });
    const winRates = Object.values(maps).map(m => {
      const teams = Object.keys(m.teams);
      const t1 = teams[0] || 'T1';
      const t2 = teams[1] || 'T2';
      return {
        map: m.map,
        team1Sets: m.teams[t1]?.sets || 0,
        team1WinRate: m.teams[t1] ? Math.round((m.teams[t1].wins / m.teams[t1].sets) * 100) + '%' : '0%',
        team2Sets: m.teams[t2]?.sets || 0,
        team2WinRate: m.teams[t2] ? Math.round((m.teams[t2].wins / m.teams[t2].sets) * 100) + '%' : '0%',
        totalSets: m.sets,
        overallWinRate: m.sets > 0 ? (m.wins / m.sets) * 100 : 0
      };
    }).sort((a, b) => b.totalSets - a.totalSets);
    const hottestMap = winRates[0] ? { map: winRates[0].map, team: 'Overall', winRate: Math.round(winRates[0].overallWinRate) + '%' } : null;
    const coldestMap = winRates[winRates.length - 1] ? { map: winRates[winRates.length - 1].map, winRate: Math.round(winRates[winRates.length - 1].overallWinRate) + '%' } : null;
    return { winRates, comparison: winRates[0] || {}, hottestMap, coldestMap };
  }, [matchRecords, activeGame, leftTeam, rightTeam]);
  const h2h = useMemo(() => {
     const leftStats = standings.find(s => s.team === leftTeam) || { seriesWin: 0, kills: 0 };
     const rightStats = standings.find(s => s.team === rightTeam) || { seriesWin: 0, kills: 0 };
     return {
        teamLeft: leftTeam,
        teamRight: rightTeam,
        scoreLeft: leftStats.seriesWin, scoreRight: rightStats.seriesWin,
        stats: [
           { label: 'Wins', left: leftStats.seriesWin, right: rightStats.seriesWin, max: leftStats.seriesWin + rightStats.seriesWin || 10 },
           { label: 'Total Kills', left: leftStats.kills || 0, right: rightStats.kills || 0, max: (leftStats.kills || 0) + (rightStats.kills || 0) || 1000 }
        ]
     };
  }, [standings, leftTeam, rightTeam]);
  const playerMatchup = useMemo(() => {
    const leftPlayers = topPlayers.filter(p => p.team === leftTeam);
    const rightPlayers = topPlayers.filter(p => p.team === rightTeam);
    const p1 = playerStats.find(p => p.ign === bestPlayerLeft) || leftPlayers[0] || topPlayers[0] || { kd: '0', kr: '0', hk: '0', sr: '0', ap: '0', kills: 0 };
    const p2 = playerStats.find(p => p.ign === bestPlayerRight) || rightPlayers[0] || topPlayers[1] || { kd: '0', kr: '0', hk: '0', sr: '0', ap: '0', kills: 0 };
    return {
      playerLeft: bestPlayerLeft || p1.ign || 'Player 1',
      playerRight: bestPlayerRight || p2.ign || 'Player 2',
      stats: [
        { stat: 'K/D', leftVal: p1.kd, rightVal: p2.kd, leftRank: p1.rank||1, rightRank: p2.rank||2 },
        { stat: 'K/R', leftVal: p1.kr, rightVal: p2.kr, leftRank: 1, rightRank: 2 },
        { stat: 'H/K', leftVal: (p1.hk * 100).toFixed(0) + '%', rightVal: (p2.hk * 100).toFixed(0) + '%', leftRank: 1, rightRank: 2 },
        { stat: 'S/R', leftVal: (p1.sr * 100).toFixed(0) + '%', rightVal: (p2.sr * 100).toFixed(0) + '%', leftRank: 1, rightRank: 2 },
        { stat: 'A/P', leftVal: p1.ap, rightVal: p2.ap, leftRank: 1, rightRank: 2 },
      ]
    };
  }, [playerStats, topPlayers, bestPlayerLeft, bestPlayerRight, leftTeam, rightTeam]);
  const setDiff = useMemo(() => standings.map(t => ({ rank: t.rank, diff: t.setDiff, team: t.team })), [standings]);
  const roundDiff = useMemo(() => standings.map(t => ({ rank: t.rank, diff: t.roundDiff, team: t.team })), [standings]);
  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/w0000/svg" className="h-4 w-4 text-theme-text-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
  const filteredDaily = dailyPlayers.filter(p => p.name.toLowerCase().includes(dailySearch.toLowerCase()));
  const filteredWeekly = weeklyPlayers.filter(p => p.name.toLowerCase().includes(weeklySearch.toLowerCase()));
  return (
    <div className="flex-1 bg-bg-100 text-theme-text-base overflow-y-auto flex flex-col h-full custom-scrollbar">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
      <div className="flex-1 overflow-y-auto custom-scrollbar px-8 lg:px-12 pb-16 pt-8 flex flex-col items-center">
        <div className="w-full max-w-[1400px] flex flex-col" style={{ gap: '48px' }}>
          <div className="grid grid-cols-1 xl:grid-cols-12" style={{ gap: '40px' }}>
            {}
            <div className="xl:col-span-5 flex flex-col" style={{ gap: '32px' }}>
              {}
              <div className="bg-bg-300 rounded-xl overflow-hidden border border-[#232f40] shadow-xl">
                <div className="bg-bg-400 text-center border-b border-[#232f40]" style={{ padding: '24px 32px' }}>
                  <h3 className="text-sm font-black tracking-[0.2em] text-theme-text-base uppercase">Standings</h3>
                </div>
                <div className="overflow-x-auto overflow-y-auto max-h-[600px] custom-scrollbar">
                  <table className="w-full text-base text-center">
                    <thead className="bg-bg-300 text-theme-text-muted font-bold text-xs tracking-wider border-b border-[#232f40]">
                      <tr>
                        <th className="w-16" style={{ padding: '16px 8px' }}>RANK</th>
                        <th className="text-left" style={{ padding: '16px' }}>TEAM NAME</th>
                        <th className="w-16 text-cyan-400" style={{ padding: '16px' }}>W</th>
                        <th className="w-16 text-[#ff4655]" style={{ padding: '16px' }}>L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2938]">
                      {standings.map((row) => (
                        <tr key={row.rank} onClick={() => setSelectedTeam(row)} className="hover:bg-bg-400 transition-colors group cursor-pointer text-sm">
                          <td className="font-mono text-theme-text-faint group-hover:text-theme-text-base bg-bg-300/50 transition-colors" style={{ padding: '16px 8px' }}>{row.rank}</td>
                          <td className="text-left font-bold flex items-center space-x-3 text-gray-200 group-hover:text-theme-text-base transition-colors" style={{ padding: '16px' }}>
                            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#2a3a52] to-[#405470] flex-shrink-0 border border-white/5 shadow-sm"></div>
                            <span className="truncate">{row.team}</span>
                          </td>
                          <td className="text-cyan-400 font-black bg-bg-300/30" style={{ padding: '16px' }}>{row.w}</td>
                          <td className="text-[#ff4655] font-black" style={{ padding: '16px' }}>{row.l}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {}
              <div className="grid grid-cols-2" style={{ gap: '24px' }}>
                <div className="bg-bg-300 rounded-xl overflow-hidden border border-[#232f40] shadow-xl">
                  <div className="bg-bg-400 text-center border-b border-[#232f40]" style={{ padding: '20px 24px' }}>
                    <h3 className="text-xs font-bold tracking-[0.15em] text-theme-text-muted uppercase">Set Difference</h3>
                  </div>
                  <div className="overflow-y-auto max-h-[300px] custom-scrollbar">
                    <table className="w-full text-sm text-center">
                      <tbody className="divide-y divide-[#1e2938]">
                        {setDiff.map((row) => (
                          <tr key={row.rank} onClick={() => setSelectedTeam(row)} className="hover:bg-bg-400 transition-colors cursor-pointer group">
                            <td className="text-theme-text-faint w-12 border-r border-[#1e2938]" style={{ padding: '12px 8px' }}>{row.rank}.</td>
                            <td className="font-mono text-[#8a9db8] font-bold" style={{ padding: '12px 16px' }}>{row.diff > 0 ? '+'+row.diff : row.diff}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-bg-300 rounded-xl overflow-hidden border border-[#232f40] shadow-xl">
                  <div className="bg-bg-400 text-center border-b border-[#232f40]" style={{ padding: '20px 24px' }}>
                    <h3 className="text-xs font-bold tracking-[0.15em] text-theme-text-muted uppercase">Round Difference</h3>
                  </div>
                  <div className="overflow-y-auto max-h-[300px] custom-scrollbar">
                    <table className="w-full text-sm text-center">
                      <tbody className="divide-y divide-[#1e2938]">
                        {roundDiff.map((row) => (
                          <tr key={row.rank} onClick={() => setSelectedTeam(row)} className="hover:bg-bg-400 transition-colors cursor-pointer group">
                            <td className="text-theme-text-faint w-12 border-r border-[#1e2938]" style={{ padding: '12px 8px' }}>{row.rank}.</td>
                            <td className="font-mono text-[#8a9db8] font-bold" style={{ padding: '12px 16px' }}>{row.diff > 0 ? '+'+row.diff : row.diff}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {}

            </div>
            {}
            <div className="xl:col-span-7 flex flex-col" style={{ gap: '32px' }}>
              {}
              <div className="bg-bg-300 rounded-xl border border-[#232f40] shadow-xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                <div className="flex justify-between items-center relative z-10" style={{ padding: '40px', paddingBottom: '24px' }}>
                  <select 
                    value={h2hLeft} onChange={e => setH2hLeft(e.target.value)} 
                    className="bg-bg-400 border border-[#232f40] text-sm font-bold text-gray-200 rounded-lg py-2 px-4 focus:outline-none"
                  >
                    <option value="">Select Team</option>
                    {standings.map(t => <option key={t.team} value={t.team}>{t.team}</option>)}
                  </select>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-theme-text-muted font-black tracking-[0.3em] uppercase mb-1">Head to Head</span>
                    <div className="text-6xl font-black text-theme-text-base tracking-tighter drop-shadow-md">
                      {h2h.scoreLeft} <span className="text-gray-600 font-medium px-2">-</span> {h2h.scoreRight}
                    </div>
                  </div>
                  <select 
                    value={h2hRight} onChange={e => setH2hRight(e.target.value)} 
                    className="bg-bg-400 border border-[#232f40] text-sm font-bold text-gray-200 rounded-lg py-2 px-4 focus:outline-none"
                  >
                    <option value="">Select Team</option>
                    {standings.map(t => <option key={t.team} value={t.team}>{t.team}</option>)}
                  </select>
                </div>
                <div className="flex-1 flex flex-col justify-between space-y-8 relative z-10" style={{ padding: '24px 40px 40px 40px' }}>
                  {h2h.stats.map((stat, i) => {
                    const leftPercent = stat.max > 0 ? (stat.left / stat.max) * 100 : 0;
                    const rightPercent = stat.max > 0 ? (stat.right / stat.max) * 100 : 0;
                    return (
                      <div key={i} className="flex flex-col space-y-3">
                        <div className="flex justify-between text-sm text-theme-text-muted font-semibold px-1">
                          <span style={{ color: theme.leftAccent }}>{stat.label}</span>
                          <span className="text-theme-text-base bg-white/5 px-4 py-1 rounded-full text-xs border border-white/10 tracking-wider">
                            {stat.left} - {stat.right}
                          </span>
                          <span style={{ color: theme.rightAccent }}>{stat.label}</span>
                        </div>
                        <div className="h-8 w-full bg-bg-100 rounded-md flex overflow-hidden border border-[#1e2938] shadow-inner relative">
                          <div className={`h-full bg-gradient-to-r ${theme.leftGradient} flex justify-end items-center px-4 text-sm font-bold text-theme-text-base/90 transition-all duration-1000`} style={{ width: `${leftPercent}%` }}></div>
                          <div className="w-[2px] bg-bg-400 h-full z-10"></div>
                          <div className={`h-full bg-gradient-to-l ${theme.rightGradient} flex justify-start items-center px-4 text-sm font-bold text-theme-text-base/90 transition-all duration-1000`} style={{ width: `${rightPercent}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {}
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '32px' }}>
                {}
                <div className="bg-bg-300 rounded-xl border border-[#232f40] shadow-xl overflow-hidden space-y-8" style={{ padding: '40px' }}>
                  <h3 className="text-sm font-black tracking-widest text-gray-200 uppercase border-b border-[#232f40]" style={{ paddingBottom: '24px' }}>Map Analytics</h3>
                  <div className="space-y-4">
                     {mapAnalytics.winRates.slice(0,3).map((m, i) => (
                       <div key={i} className="flex justify-between items-center bg-bg-300 rounded-lg border border-[#232f40]" style={{ padding: '16px' }}>
                         <span className="font-bold text-theme-text-base text-sm">{m.map}</span>
                         <span className="font-black text-theme-text-base text-base bg-blue-500/20 text-[#4c7fd6] rounded-md" style={{ padding: '4px 12px' }}>{m.overallWinRate.toFixed(0)}% Win Rate</span>
                       </div>
                     ))}
                     {mapAnalytics.hottestMap && (
                       <div className="bg-gradient-to-br from-[#1e3a8a]/40 to-transparent rounded-lg border border-[#4c7fd6]/30" style={{ padding: '16px' }}>
                         <p className="text-xs font-bold text-theme-text-muted uppercase mb-1">Hottest Map</p>
                         <p className="text-xl font-black text-theme-text-base">{mapAnalytics.hottestMap.map} <span className="text-sm font-medium text-theme-text-muted">({mapAnalytics.hottestMap.winRate})</span></p>
                       </div>
                     )}
                     {mapAnalytics.coldestMap && mapAnalytics.winRates.length > 1 && (
                       <div className="bg-gradient-to-br from-[#801933]/40 to-transparent rounded-lg border border-[#ff3366]/30" style={{ padding: '16px' }}>
                         <p className="text-xs font-bold text-theme-text-muted uppercase mb-1">Coldest Map</p>
                         <p className="text-xl font-black text-theme-text-base">{mapAnalytics.coldestMap.map} <span className="text-sm font-medium text-theme-text-muted">({mapAnalytics.coldestMap.winRate})</span></p>
                       </div>
                     )}
                  </div>
                </div>
                {}
                <div className="bg-bg-300 rounded-xl border border-[#232f40] shadow-xl overflow-hidden space-y-8" style={{ padding: '40px' }}>
                  <h3 className="text-sm font-black tracking-widest text-gray-200 uppercase border-b border-[#232f40]" style={{ paddingBottom: '24px' }}>Team Rosters K/D</h3>
                  <div className="space-y-4 overflow-y-auto max-h-[250px] custom-scrollbar pr-2">
                     {Object.entries(teamRosters).map(([team, players], i) => (
                        <div key={i} className="bg-bg-300 rounded-lg border border-[#232f40] space-y-3" style={{ padding: '16px' }}>
                         <h4 className="font-black text-[#00d0eb] text-sm uppercase">{team}</h4>
                         <div className="space-y-2">
                           {players.slice(0,5).map(p => (
                             <div key={p.ign} className="flex justify-between text-sm">
                               <span className="font-semibold text-theme-text-base">{p.ign}</span>
                               <span className="font-mono font-bold text-theme-text-base bg-white/10 rounded" style={{ padding: '0 8px' }}>{p.kd}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
              <div className="bg-bg-300 rounded-xl border border-[#232f40] shadow-xl overflow-hidden flex flex-col">
                 <div className="grid grid-cols-[1fr_auto_1fr] items-stretch bg-bg-300 border-b border-[#232f40]">
                     <div className="flex justify-between items-center transition-colors duration-500" style={{ padding: '32px 40px', background: `linear-gradient(to right, ${theme.leftAccent}1A, transparent)` }}>
                      <div className="flex flex-col">
                         <span style={{ color: theme.leftAccent }} className="text-xs font-bold tracking-widest uppercase mb-1">Best Player</span>
                         <span className="font-black text-theme-text-base text-lg tracking-wide">{playerMatchup.playerLeft}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-bg-400 border-2 shadow-lg relative overflow-hidden flex items-center justify-center" style={{ borderColor: theme.leftAccent, boxShadow: `0 0 15px ${theme.leftAccent}4D` }}>
                      </div>
                    </div>
                    <div className="px-6 flex items-center justify-center bg-bg-300 border-x border-[#232f40]">
                      <span className="text-sm font-black text-gray-600 italic tracking-widest">VS</span>
                    </div>
                     <div className="flex justify-between items-center transition-colors duration-500" style={{ padding: '32px 40px', background: `linear-gradient(to left, ${theme.rightAccent}1A, transparent)` }}>
                      <div className="w-12 h-12 rounded-full bg-bg-400 border-2 shadow-lg relative overflow-hidden flex items-center justify-center" style={{ borderColor: theme.rightAccent, boxShadow: `0 0 15px ${theme.rightAccent}4D` }}>
                      </div>
                      <div className="flex flex-col text-right">
                         <span style={{ color: theme.rightAccent }} className="text-xs font-bold tracking-widest uppercase mb-1">Best Player</span>
                         <span className="font-black text-theme-text-base text-lg tracking-wide">{playerMatchup.playerRight}</span>
                      </div>
                    </div>
                 </div>
                 <table className="w-full text-center text-base">
                   <thead className="bg-bg-300 text-xs text-theme-text-faint font-bold tracking-[0.2em] uppercase">
                     <tr>
                       <th className="border-r border-[#232f40] w-1/5" style={{ padding: '16px 0' }}>Rank</th>
                       <th className="border-r border-[#232f40] w-1/5 text-theme-text-muted" style={{ padding: '16px 0' }}>Value</th>
                       <th className="border-r border-[#232f40] w-1/5 bg-bg-300 text-theme-text-base" style={{ padding: '16px 0' }}>Stats</th>
                       <th className="border-r border-[#232f40] w-1/5" style={{ padding: '16px 0' }}>Rank</th>
                       <th className="w-1/5 text-theme-text-muted" style={{ padding: '16px 0' }}>Value</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-[#1e2938]">
                     {playerMatchup.stats.map((row, i) => (
                       <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                         <td className="border-r border-[#232f40] text-theme-text-faint font-bold" style={{ padding: '16px 0' }}>{row.leftRank}</td>
                         <td className="border-r border-[#232f40] font-black text-lg" style={{ color: theme.leftAccent, padding: '16px 0' }}>{row.leftVal}</td>
                         <td className="border-r border-[#232f40] bg-bg-300 text-theme-text-base text-sm font-bold tracking-widest" style={{ padding: '16px 0' }}>{row.stat}</td>
                         <td className="border-r border-[#232f40] text-theme-text-faint font-bold" style={{ padding: '16px 0' }}>{row.rightRank}</td>
                         <td className="font-black text-lg" style={{ color: theme.rightAccent, padding: '16px 0' }}>{row.rightVal}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
              </div>
            </div>
          </div>
          {}
          <div className="grid grid-cols-1 xl:grid-cols-2 pb-8" style={{ gap: '32px' }}>
             {}
             <div className="bg-bg-300 rounded-xl border border-theme-input shadow-xl flex flex-col h-[500px] overflow-hidden">
               <div className="border-b border-theme-input bg-bg-200" style={{ padding: '24px' }}>
                 <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                   <h3 className="text-base font-black text-gray-200 uppercase tracking-widest">Daily Player Ranking</h3>
                 </div>
                 <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <SearchIcon />
                   </div>
                   <input type="text" placeholder="Search Player Here" className="w-full bg-theme-input border border-theme-input text-sm text-theme-text-base rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-[#406899] focus:ring-1 focus:ring-[#406899]/50 transition-all shadow-inner placeholder-gray-600" value={dailySearch} onChange={(e) => setDailySearch(e.target.value)} />
                 </div>
               </div>
               <div className="flex-1 overflow-y-auto custom-scrollbar bg-bg-300">
                 <table className="w-full text-center text-sm">
                   <thead className="bg-bg-400 sticky top-0 text-theme-text-muted font-semibold shadow-md z-10 text-xs tracking-wider uppercase">
                     <tr>
                       <th className="text-left" style={{ padding: '16px 24px' }}>NAME</th>
                       <th style={{ padding: '16px 12px' }}>KILLS</th>
                       <th style={{ padding: '16px 12px' }}>DEATH</th>
                       <th style={{ padding: '16px 12px' }}>ROUND</th>
                       <th style={{ padding: '16px 12px' }}>K/D</th>
                       <th style={{ padding: '16px 12px' }}>K/R</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-theme-input">
                     {filteredDaily.map((p, i) => (
                       <tr key={i} onClick={() => setSelectedPlayer(p)} className="hover:bg-bg-400 transition-colors group cursor-pointer">
                         <td className="text-left font-bold text-theme-text-base flex items-center space-x-3 group-hover:text-theme-text-base transition-colors" style={{ padding: '16px 24px' }}>
                           <span className="text-gray-600 w-4 text-right font-mono">{p.rank}.</span>
                           <span className="truncate max-w-[150px]">{p.name}</span>
                         </td>
                         <td className="text-theme-text-muted font-semibold" style={{ padding: '16px 12px' }}>{p.kills}</td>
                         <td className="text-theme-text-muted font-semibold" style={{ padding: '16px 12px' }}>{p.deaths || p.death}</td>
                         <td className="text-theme-text-muted font-semibold" style={{ padding: '16px 12px' }}>{p.rounds || p.round}</td>
                         <td className="text-theme-text-muted font-black" style={{ padding: '16px 12px' }}>{p.kd}</td>
                         <td className="text-theme-text-muted font-black" style={{ padding: '16px 12px' }}>{p.kr}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
             {}
             <div className="bg-bg-300 rounded-xl border border-theme-input shadow-xl flex flex-col h-[500px] overflow-hidden">
               <div className="border-b border-theme-input bg-bg-200" style={{ padding: '24px' }}>
                 <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                   <h3 className="text-base font-black text-gray-200 uppercase tracking-widest">Weekly Player Ranking</h3>
                 </div>
                 <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <SearchIcon />
                   </div>
                   <input type="text" placeholder="Search Player Here" className="w-full bg-theme-input border border-theme-input text-sm text-theme-text-base rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-[#406899] focus:ring-1 focus:ring-[#406899]/50 transition-all shadow-inner placeholder-gray-600" value={weeklySearch} onChange={(e) => setWeeklySearch(e.target.value)} />
                 </div>
               </div>
               <div className="flex-1 overflow-y-auto custom-scrollbar bg-bg-300">
                 <table className="w-full text-center text-sm">
                   <thead className="bg-bg-400 sticky top-0 text-theme-text-muted font-semibold shadow-md z-10 text-xs tracking-wider uppercase">
                     <tr>
                       <th className="text-left" style={{ padding: '16px 24px' }}>NAME</th>
                       <th style={{ padding: '16px 12px' }}>KILLS</th>
                       <th style={{ padding: '16px 12px' }}>DEATH</th>
                       <th style={{ padding: '16px 12px' }}>ROUND</th>
                       <th style={{ padding: '16px 12px' }}>K/D</th>
                       <th style={{ padding: '16px 12px' }}>K/R</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-theme-input">
                     {filteredWeekly.map((p, i) => (
                       <tr key={i} onClick={() => setSelectedPlayer(p)} className="hover:bg-bg-400 transition-colors group cursor-pointer">
                         <td className="text-left font-bold text-theme-text-base flex items-center space-x-3 group-hover:text-theme-text-base transition-colors" style={{ padding: '16px 24px' }}>
                           <span className="text-gray-600 w-4 text-right font-mono">{p.rank}.</span>
                           <span className="truncate max-w-[150px]">{p.name}</span>
                         </td>
                         <td className="text-theme-text-muted font-semibold" style={{ padding: '16px 12px' }}>{p.kills}</td>
                         <td className="text-theme-text-muted font-semibold" style={{ padding: '16px 12px' }}>{p.deaths || p.death}</td>
                         <td className="text-theme-text-muted font-semibold" style={{ padding: '16px 12px' }}>{p.rounds || p.round}</td>
                         <td className="text-theme-text-muted font-black" style={{ padding: '16px 12px' }}>{p.kd}</td>
                         <td className="text-theme-text-muted font-black" style={{ padding: '16px 12px' }}>{p.kr}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          </div>
        </div>
      </div>
      {}
      <TeamModal team={selectedTeam} onClose={() => setSelectedTeam(null)} activeGame={activeGame} />
      <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} activeGame={activeGame} />
    </div>
  );
};
export default Leaderboards;
