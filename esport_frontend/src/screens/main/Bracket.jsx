import React, { useState, useEffect } from "react";
const TrophyIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);
const CrownIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
);
const SwordsIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>
);
const ShieldIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const UserIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const TrashIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);
const PlusIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const ShuffleIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 3 21 3 21 8"/><line x1="4" x2="21" y1="20" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" x2="21" y1="15" y2="21"/><line x1="4" x2="9" y1="4" y2="9"/></svg>
);
const initialSingleElimBracket = [
  [
    { id: 1, team1: "Team 1", team2: "Team 2", score1: 0, score2: 0, nextMatchId: 5, nextSlot: "team1" },
    { id: 2, team1: "Team 3", team2: "Team 4", score1: 0, score2: 0, nextMatchId: 5, nextSlot: "team2" },
    { id: 3, team1: "Team 5", team2: "Team 6", score1: 0, score2: 0, nextMatchId: 6, nextSlot: "team1" },
    { id: 4, team1: "Team 7", team2: "Team 8", score1: 0, score2: 0, nextMatchId: 6, nextSlot: "team2" },
  ],
  [
    { id: 5, team1: "", team2: "", score1: 0, score2: 0, nextMatchId: 7, nextSlot: "team1" },
    { id: 6, team1: "", team2: "", score1: 0, score2: 0, nextMatchId: 7, nextSlot: "team2" },
  ],
  [
    { id: 7, team1: "", team2: "", score1: 0, score2: 0, nextMatchId: null, nextSlot: null },
  ]
];
const initialDoubleElimBracket = {
  upper: [
    [
      { id: 1, team1: "Team 1", team2: "Team 2", score1: 0, score2: 0, nextMatchId: 3, nextSlot: "team1", loserMatchId: 4, loserSlot: "team1" },
      { id: 2, team1: "Team 3", team2: "Team 4", score1: 0, score2: 0, nextMatchId: 3, nextSlot: "team2", loserMatchId: 4, loserSlot: "team2" },
    ],
    [
      { id: 3, team1: "", team2: "", score1: 0, score2: 0, nextMatchId: 6, nextSlot: "team1", loserMatchId: 5, loserSlot: "team1" }
    ]
  ],
  lower: [
    [
      { id: 4, team1: "", team2: "", score1: 0, score2: 0, nextMatchId: 5, nextSlot: "team2", isLower: true },
    ],
    [
      { id: 5, team1: "", team2: "", score1: 0, score2: 0, nextMatchId: 6, nextSlot: "team2", isLower: true }
    ]
  ],
  finals: [
    [
      { id: 6, team1: "", team2: "", score1: 0, score2: 0, nextMatchId: null, nextSlot: null, isFinals: true }
    ]
  ]
};
const initialRoundRobinMatches = [
  { id: 1, team1: "Team 1", team2: "Team 2", score1: 0, score2: 0, played: false },
  { id: 2, team1: "Team 3", team2: "Team 4", score1: 0, score2: 0, played: false },
  { id: 3, team1: "Team 1", team2: "Team 3", score1: 0, score2: 0, played: false },
  { id: 4, team1: "Team 2", team2: "Team 4", score1: 0, score2: 0, played: false },
  { id: 5, team1: "Team 1", team2: "Team 4", score1: 0, score2: 0, played: false },
  { id: 6, team1: "Team 2", team2: "Team 3", score1: 0, score2: 0, played: false },
];
const MatchCard = ({ match, onChange }) => {
  const s1 = parseInt(match.score1) || 0;
  const s2 = parseInt(match.score2) || 0;
  const isTeam1Winner = s1 > s2 && match.played !== false; 
  const isTeam2Winner = s2 > s1 && match.played !== false;
  const hasWinner = isTeam1Winner || isTeam2Winner;
  return (
    <div className={`relative w-72 rounded-xl backdrop-blur-md transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${hasWinner ? 'shadow-[0_0_20px_rgba(6,182,212,0.15)]' : 'shadow-lg'} bg-gradient-to-br from-[#1e293b]/90 to-[#0f172a]/90 border ${match.isFinals ? 'border-yellow-500/50' : 'border-slate-700/50'} overflow-hidden`}>
      {match.isFinals && <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-yellow-500/0 opacity-50 animate-pulse pointer-events-none"></div>}
      {}
      <div className={`flex items-center justify-between p-3 border-b border-slate-700/50 transition-colors relative ${isTeam1Winner ? 'bg-cyan-950/40' : 'hover:bg-slate-800/40'}`}>
        {isTeam1Winner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>}
        <div className="flex items-center space-x-3 w-3/4">
          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600 shadow-inner">
            {isTeam1Winner ? <CrownIcon size={12} className="text-cyan-400" /> : <SwordsIcon size={12} className="text-slate-500" />}
          </div>
          <input 
            type="text" 
            value={match.team1} 
            onChange={(e) => onChange("team1", e.target.value)}
            placeholder="TBD"
            className={`bg-transparent border-b border-transparent focus:border-cyan-500/50 text-sm font-bold w-full focus:outline-none transition-colors ${isTeam1Winner ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-slate-300'}`}
          />
        </div>
        <input 
          type="number" 
          value={match.score1} 
          onChange={(e) => onChange("score1", e.target.value)}
          className={`bg-[#0b101a]/80 border ${isTeam1Winner ? 'border-cyan-500/50 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.3)]' : 'border-slate-700 text-slate-400'} font-black text-center w-12 rounded py-1 focus:outline-none focus:border-cyan-400 transition-all`}
        />
      </div>
      {}
      <div className={`flex items-center justify-between p-3 transition-colors relative ${isTeam2Winner ? 'bg-cyan-950/40' : 'hover:bg-slate-800/40'}`}>
        {isTeam2Winner && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>}
        <div className="flex items-center space-x-3 w-3/4">
          <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600 shadow-inner">
            {isTeam2Winner ? <CrownIcon size={12} className="text-cyan-400" /> : <SwordsIcon size={12} className="text-slate-500" />}
          </div>
          <input 
            type="text" 
            value={match.team2} 
            onChange={(e) => onChange("team2", e.target.value)}
            placeholder="TBD"
            className={`bg-transparent border-b border-transparent focus:border-cyan-500/50 text-sm font-bold w-full focus:outline-none transition-colors ${isTeam2Winner ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-slate-300'}`}
          />
        </div>
        <input 
          type="number" 
          value={match.score2} 
          onChange={(e) => onChange("score2", e.target.value)}
          className={`bg-[#0b101a]/80 border ${isTeam2Winner ? 'border-cyan-500/50 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.3)]' : 'border-slate-700 text-slate-400'} font-black text-center w-12 rounded py-1 focus:outline-none focus:border-cyan-400 transition-all`}
        />
      </div>
    </div>
  );
};
const Bracket = ({ globalGame, globalTournament }) => {
  const [activeFormat, setActiveFormat] = useState("Single Elimination");
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const formats = ["Single Elimination", "Double Elimination", "Round Robin"];
  const [teamPool, setTeamPool] = useState([]);
  const [newTeam, setNewTeam] = useState("");
  const [singleElimData, setSingleElimData] = useState(initialSingleElimBracket);
  const [doubleElimData, setDoubleElimData] = useState(initialDoubleElimBracket);
  const [roundRobinData, setRoundRobinData] = useState(initialRoundRobinMatches);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const activeGame = (globalGame || 'VALORANT').toUpperCase();
        // 1. Fetch Teams
        const resTeams = await fetch(`http://localhost:5000/api/teams?tournament=${globalTournament?.name || 'Default'}`);
        if (resTeams.ok) {
          const teamsData = await resTeams.json();
          setTeamPool(teamsData.map(t => t.team_name));
        }
        
        // 2. Fetch Bracket State
        const resState = await fetch(`http://localhost:5000/api/bracket-state?tournament=${globalTournament?.name || 'Default'}&game_title=${activeGame}&format=${activeFormat}`);
        if (resState.ok) {
          const stateData = await resState.json();
          if (stateData) {
            // we do NOT overwrite team_pool to allow newly fetched teams to remain
            if (activeFormat === "Single Elimination") setSingleElimData(stateData.bracket_data);
            if (activeFormat === "Double Elimination") setDoubleElimData(stateData.bracket_data);
            if (activeFormat === "Round Robin") setRoundRobinData(stateData.bracket_data);
          } else {
             if (activeFormat === "Single Elimination") setSingleElimData(initialSingleElimBracket);
             if (activeFormat === "Double Elimination") setDoubleElimData(initialDoubleElimBracket);
             if (activeFormat === "Round Robin") setRoundRobinData(initialRoundRobinMatches);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setHasLoaded(true);
      }
    };
    fetchState();
  }, [globalTournament?.name, globalGame, activeFormat]);

  const saveBracketState = async () => {
    setIsSaving(true);
    try {
      const activeGame = (globalGame || 'VALORANT').toUpperCase();
      let bracketData = null;
      if (activeFormat === "Single Elimination") bracketData = singleElimData;
      if (activeFormat === "Double Elimination") bracketData = doubleElimData;
      if (activeFormat === "Round Robin") bracketData = roundRobinData;

      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/bracket-state`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          tournament_name: globalTournament?.name || 'Default',
          game_title: activeGame,
          format: activeFormat,
          team_pool: teamPool,
          bracket_data: bracketData
        })
      });
      alert('Bracket saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving bracket.');
    }
    setIsSaving(false);
  };

  // Auto-seed Brackets when team pool changes
  useEffect(() => {
    // Helper to safely get team name
    const getTeam = (index, fallback) => teamPool[index] ? teamPool[index] : fallback;
    // Seed Single Elim (8 teams)
    setSingleElimData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[0][0].team1 = getTeam(0, copy[0][0].team1);
      copy[0][0].team2 = getTeam(1, copy[0][0].team2);
      copy[0][1].team1 = getTeam(2, copy[0][1].team1);
      copy[0][1].team2 = getTeam(3, copy[0][1].team2);
      copy[0][2].team1 = getTeam(4, copy[0][2].team1);
      copy[0][2].team2 = getTeam(5, copy[0][2].team2);
      copy[0][3].team1 = getTeam(6, copy[0][3].team1);
      copy[0][3].team2 = getTeam(7, copy[0][3].team2);
      return copy;
    });
    // Seed Double Elim (4 teams)
    setDoubleElimData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy.upper[0][0].team1 = getTeam(0, copy.upper[0][0].team1);
      copy.upper[0][0].team2 = getTeam(1, copy.upper[0][0].team2);
      copy.upper[0][1].team1 = getTeam(2, copy.upper[0][1].team1);
      copy.upper[0][1].team2 = getTeam(3, copy.upper[0][1].team2);
      return copy;
    });
    // Seed Round Robin (4 teams)
    setRoundRobinData(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      // T1 vs T2
      copy[0].team1 = getTeam(0, copy[0].team1);
      copy[0].team2 = getTeam(1, copy[0].team2);
      // T3 vs T4
      copy[1].team1 = getTeam(2, copy[1].team1);
      copy[1].team2 = getTeam(3, copy[1].team2);
      // T1 vs T3
      copy[2].team1 = getTeam(0, copy[2].team1);
      copy[2].team2 = getTeam(2, copy[2].team2);
      // T2 vs T4
      copy[3].team1 = getTeam(1, copy[3].team1);
      copy[3].team2 = getTeam(3, copy[3].team2);
      // T1 vs T4
      copy[4].team1 = getTeam(0, copy[4].team1);
      copy[4].team2 = getTeam(3, copy[4].team2);
      // T2 vs T3
      copy[5].team1 = getTeam(1, copy[5].team1);
      copy[5].team2 = getTeam(2, copy[5].team2);
      return copy;
    });
  }, [teamPool]);
  const addTeam = async (e) => {
    e.preventDefault();
    if (newTeam.trim() !== "") {
      const teamsToAdd = newTeam.split(/[,\n]+/).map(t => t.trim()).filter(t => t !== "" && !teamPool.includes(t));
      if (teamsToAdd.length > 0) {
        const token = localStorage.getItem('token');
        for (const tName of teamsToAdd) {
           const formData = new FormData();
           formData.append('team_name', tName);
           formData.append('tournament_name', globalTournament?.name || 'Default');
           await fetch('http://localhost:5000/api/teams', {
             method: 'POST',
             headers: { 'Authorization': `Bearer ${token}` },
             body: formData
           });
        }
        setTeamPool([...teamPool, ...teamsToAdd]);
      }
      setNewTeam("");
    }
  };
  const removeTeam = (teamToRemove) => {
    setTeamPool(teamPool.filter(t => t !== teamToRemove));
  };
  const shuffleTeams = () => {
    const shuffled = [...teamPool].sort(() => Math.random() - 0.5);
    setTeamPool(shuffled);
  };
  // Single Elimination Logic
  const updateSingleMatch = (roundIndex, matchIndex, field, value) => {
    const newBracket = [...singleElimData];
    newBracket[roundIndex][matchIndex][field] = value;
    const currentMatch = newBracket[roundIndex][matchIndex];
    if (field === "score1" || field === "score2") {
      const s1 = parseInt(currentMatch.score1) || 0;
      const s2 = parseInt(currentMatch.score2) || 0;
      let winner = "";
      if (s1 > s2) winner = currentMatch.team1;
      else if (s2 > s1) winner = currentMatch.team2;
      if (winner && currentMatch.nextMatchId) {
        for (let r = roundIndex + 1; r < newBracket.length; r++) {
          const nextMatch = newBracket[r].find(m => m.id === currentMatch.nextMatchId);
          if (nextMatch) {
            nextMatch[currentMatch.nextSlot] = winner;
            break;
          }
        }
      }
    }
    setSingleElimData(newBracket);
  };
  // Double Elimination Logic
  const updateDoubleMatch = (section, roundIndex, matchIndex, field, value) => {
    const newData = JSON.parse(JSON.stringify(doubleElimData)); // deep copy
    newData[section][roundIndex][matchIndex][field] = value;
    const currentMatch = newData[section][roundIndex][matchIndex];
    if (field === "score1" || field === "score2") {
      const s1 = parseInt(currentMatch.score1) || 0;
      const s2 = parseInt(currentMatch.score2) || 0;
      let winner = "";
      let loser = "";
      if (s1 > s2) { winner = currentMatch.team1; loser = currentMatch.team2; }
      else if (s2 > s1) { winner = currentMatch.team2; loser = currentMatch.team1; }
      // Advance winner
      if (winner && currentMatch.nextMatchId) {
        const findAndSet = (targetId, targetSlot, val) => {
          ['upper', 'lower', 'finals'].forEach(sec => {
            newData[sec].forEach(rnd => {
              const m = rnd.find(x => x.id === targetId);
              if (m) m[targetSlot] = val;
            });
          });
        };
        findAndSet(currentMatch.nextMatchId, currentMatch.nextSlot, winner);
      }
      // Drop loser to lower bracket
      if (loser && currentMatch.loserMatchId) {
        ['lower'].forEach(sec => {
          newData[sec].forEach(rnd => {
            const m = rnd.find(x => x.id === currentMatch.loserMatchId);
            if (m) m[currentMatch.loserSlot] = loser;
          });
        });
      }
    }
    setDoubleElimData(newData);
  };
  // Round Robin Logic
  const updateRoundRobinMatch = (matchIndex, field, value) => {
    const newData = [...roundRobinData];
    newData[matchIndex][field] = value;
    if (field === "score1" || field === "score2") {
      newData[matchIndex].played = true;
    }
    setRoundRobinData(newData);
  };
  const calculateStandings = () => {
    const teams = {};
    roundRobinData.forEach(m => {
      [m.team1, m.team2].forEach(t => {
        if (t && t !== "TBD" && !teams[t]) {
          teams[t] = { name: t, played: 0, wins: 0, losses: 0, points: 0, diff: 0 };
        }
      });
      if (m.played) {
        const s1 = parseInt(m.score1) || 0;
        const s2 = parseInt(m.score2) || 0;
        if (m.team1 && m.team1 !== "TBD") {
          teams[m.team1].played += 1;
          teams[m.team1].diff += (s1 - s2);
          if (s1 > s2) { teams[m.team1].wins += 1; teams[m.team1].points += 3; }
          else if (s1 < s2) { teams[m.team1].losses += 1; }
          else { teams[m.team1].points += 1; }
        }
        if (m.team2 && m.team2 !== "TBD") {
          teams[m.team2].played += 1;
          teams[m.team2].diff += (s2 - s1);
          if (s2 > s1) { teams[m.team2].wins += 1; teams[m.team2].points += 3; }
          else if (s2 < s1) { teams[m.team2].losses += 1; }
          else { teams[m.team2].points += 1; }
        }
      }
    });
    return Object.values(teams).sort((a, b) => b.points - a.points || b.diff - a.diff);
  };
  const renderSingleElimination = () => {
    return (
      <div className="flex justify-center items-stretch space-x-16 overflow-x-auto pb-10 pt-4 w-full min-h-[600px] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/5 via-transparent to-transparent pointer-events-none"></div>
        {singleElimData.map((round, rIndex) => (
          <div key={rIndex} className="flex flex-col justify-around py-4 h-full relative z-10">
            {round.map((match, mIndex) => {
              const hasWinner = (parseInt(match.score1) || 0) !== (parseInt(match.score2) || 0);
              return (
                <div key={match.id} className="relative flex items-center group">
                  {match.nextMatchId && (
                    <svg className="absolute left-full top-1/2 w-16 overflow-visible pointer-events-none" style={{ height: '2px', zIndex: -1 }}>
                      <path d="M 0 0 L 64 0" stroke={hasWinner ? "url(#glowGradient)" : "#334155"} strokeWidth="2" fill="none" className={hasWinner ? "animate-pulse" : ""}/>
                      <defs>
                        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                  {(rIndex > 0 && match.nextSlot === "team1") && (
                     <svg className="absolute -left-16 top-1/2 w-16 overflow-visible pointer-events-none" style={{ height: '2px', zIndex: -1 }}>
                        <path d="M 0 0 L 64 0" stroke={match.team1 || match.team2 ? "#06b6d4" : "#334155"} strokeWidth="2" fill="none" />
                     </svg>
                  )}
                  <MatchCard match={match} onChange={(field, value) => updateSingleMatch(rIndex, mIndex, field, value)} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  const renderDoubleElimination = () => {
    return (
      <div className="flex flex-col w-full h-full min-h-[800px] relative pb-10 overflow-x-auto space-y-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/5 via-transparent to-transparent pointer-events-none"></div>
        {}
        <div>
          <h3 className="text-cyan-400 font-bold uppercase tracking-widest mb-4 flex items-center"><CrownIcon size={16} className="mr-2"/> Upper Bracket</h3>
          <div className="flex justify-start items-stretch space-x-16 pt-4 relative">
            {doubleElimData.upper.map((round, rIndex) => (
              <div key={rIndex} className="flex flex-col justify-around py-4 h-full relative z-10 min-h-[300px]">
                {round.map((match, mIndex) => {
                  const hasWinner = (parseInt(match.score1) || 0) !== (parseInt(match.score2) || 0);
                  return (
                    <div key={match.id} className="relative flex items-center group">
                      {match.nextMatchId && (
                        <svg className="absolute left-full top-1/2 w-16 overflow-visible pointer-events-none" style={{ height: '2px', zIndex: -1 }}>
                          <path d="M 0 0 L 64 0" stroke={hasWinner ? "url(#glowGradient)" : "#334155"} strokeWidth="2" fill="none"/>
                        </svg>
                      )}
                      <MatchCard match={match} onChange={(field, value) => updateDoubleMatch('upper', rIndex, mIndex, field, value)} />
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="flex flex-col justify-center py-4 h-full relative z-10 min-h-[300px]">
              {doubleElimData.finals[0].map((match, mIndex) => (
                <div key={match.id} className="relative flex items-center group">
                  <MatchCard match={match} onChange={(field, value) => updateDoubleMatch('finals', 0, mIndex, field, value)} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {}
        <div>
          <h3 className="text-red-400 font-bold uppercase tracking-widest mb-4 flex items-center"><ShieldIcon size={16} className="mr-2"/> Lower Bracket</h3>
          <div className="flex justify-start items-stretch space-x-16 pt-4 relative">
            <div className="w-72"></div>
            {doubleElimData.lower.map((round, rIndex) => (
              <div key={rIndex} className="flex flex-col justify-around py-4 h-full relative z-10 min-h-[300px]">
                {round.map((match, mIndex) => {
                  const hasWinner = (parseInt(match.score1) || 0) !== (parseInt(match.score2) || 0);
                  return (
                    <div key={match.id} className="relative flex items-center group">
                      {match.nextMatchId && (
                        <svg className="absolute left-full top-1/2 w-16 overflow-visible pointer-events-none" style={{ height: '2px', zIndex: -1 }}>
                          <path d="M 0 0 L 64 0" stroke={hasWinner ? "url(#glowGradient)" : "#334155"} strokeWidth="2" fill="none"/>
                        </svg>
                      )}
                      <MatchCard match={match} onChange={(field, value) => updateDoubleMatch('lower', rIndex, mIndex, field, value)} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const renderRoundRobin = () => {
    const standings = calculateStandings();
    return (
      <div className="flex flex-col xl:flex-row w-full gap-8 relative z-10">
        {}
        <div className="xl:w-1/2 bg-[#121a25]/80 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700/50 bg-slate-800/20">
            <h3 className="text-xl font-black uppercase text-white flex items-center tracking-widest">
              <TrophyIcon size={18} className="text-yellow-400 mr-2" /> League Standings
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 text-xs uppercase tracking-widest text-slate-400 border-b border-slate-700/50">
                  <th className="px-6 py-4 font-bold">Rank</th>
                  <th className="px-6 py-4 font-bold">Team</th>
                  <th className="px-6 py-4 font-bold text-center">P</th>
                  <th className="px-6 py-4 font-bold text-center">W</th>
                  <th className="px-6 py-4 font-bold text-center">L</th>
                  <th className="px-6 py-4 font-bold text-center">Diff</th>
                  <th className="px-6 py-4 font-bold text-center text-cyan-400">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {standings.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-8 text-slate-500">No matches played yet</td></tr>
                ) : standings.map((team, idx) => (
                  <tr key={team.name} className={`hover:bg-slate-800/30 transition-colors ${idx === 0 ? 'bg-cyan-950/20' : ''}`}>
                    <td className="px-6 py-4 font-bold text-slate-500">{idx + 1}</td>
                    <td className={`px-6 py-4 font-bold ${idx === 0 ? 'text-cyan-400' : 'text-white'}`}>{team.name}</td>
                    <td className="px-6 py-4 text-center text-slate-300">{team.played}</td>
                    <td className="px-6 py-4 text-center text-green-400 font-medium">{team.wins}</td>
                    <td className="px-6 py-4 text-center text-red-400 font-medium">{team.losses}</td>
                    <td className="px-6 py-4 text-center text-slate-400">{team.diff > 0 ? `+${team.diff}` : team.diff}</td>
                    <td className="px-6 py-4 text-center text-cyan-400 font-black text-lg">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {}
        <div className="xl:w-1/2 flex flex-col">
          <div className="mb-6">
            <h3 className="text-xl font-black uppercase text-white flex items-center tracking-widest">
              <SwordsIcon size={18} className="text-cyan-400 mr-2" /> Match Schedule
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roundRobinData.map((match, mIndex) => (
              <div key={match.id} className="relative group">
                <MatchCard match={match} onChange={(field, value) => updateRoundRobinMatch(mIndex, field, value)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex bg-[#090e14] h-full min-h-screen">
      {}
      <div className="w-80 bg-[#121a25]/90 border-r border-[#1c2532] flex flex-col z-20 shadow-2xl relative">
        <div className="p-6 border-b border-[#1c2532] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black uppercase tracking-widest text-white flex items-center">
              <UserIcon size={18} className="text-cyan-400 mr-2" />
              Team Roster
            </h2>
            <p className="text-xs text-slate-400 mt-1 uppercase">Bracket Auto-Seeding</p>
          </div>
          <div className="bg-slate-800 text-xs font-bold px-3 py-1 rounded-full text-cyan-400 border border-slate-700">
            {teamPool.length} Teams
          </div>
        </div>
        <div className="p-6">
          <form onSubmit={addTeam} className="relative mb-6">
            <textarea 
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
              placeholder="Add teams (comma separated for bulk)"
              className="w-full bg-[#0b101a] border border-[#1c2532] text-white text-sm rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-cyan-500 transition-colors shadow-inner resize-none overflow-hidden h-12"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  addTeam(e);
                }
              }}
            />
            <button type="submit" className="absolute right-2 top-2.5 p-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-colors" disabled={!newTeam.trim()}>
              <PlusIcon size={16} />
            </button>
          </form>
          <div className="flex flex-col space-y-2 overflow-y-auto max-h-[60vh] custom-scrollbar pr-2">
            {teamPool.length === 0 ? (
              <div className="text-center p-6 border border-dashed border-slate-700 rounded-xl text-slate-500 text-sm">
                No teams added yet.<br/><span className="text-xs">Brackets are using defaults.</span>
              </div>
            ) : (
              teamPool.map((team, idx) => (
                <div key={team} className="group flex items-center justify-between bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 hover:bg-slate-700/40 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-black text-slate-500 w-4">{idx + 1}.</span>
                    <span className="text-sm font-bold text-white">{team}</span>
                  </div>
                  <button onClick={() => removeTeam(team)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrashIcon size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
          {teamPool.length > 0 && (
            <div className="flex flex-col space-y-2 mt-6">
              <button 
                onClick={shuffleTeams}
                className="w-full py-2 border border-cyan-700 text-cyan-400 flex justify-center items-center text-xs font-bold uppercase tracking-widest rounded hover:bg-cyan-900/30 transition-colors"
              >
                <ShuffleIcon size={14} className="mr-2" /> Shuffle Seed
              </button>
              <button 
                onClick={() => setTeamPool([])}
                className="w-full py-2 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest rounded hover:bg-slate-800 hover:text-white transition-colors"
              >
                Clear All Teams
              </button>
            </div>
          )}
        </div>
      </div>
      {}
      <div className="flex-1 text-white overflow-y-auto font-sans p-10 custom-scrollbar relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#090e14] to-[#090e14] pointer-events-none"></div>
        <div className="relative z-10 flex items-center justify-between mb-10 pb-6 border-b border-[#1c2532]">
          <div className="flex items-center space-x-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.6)]"></div>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 drop-shadow-md">
                {globalTournament && globalTournament.toLowerCase() !== "default" ? globalTournament : "Default"}
              </h1>
              <p className="text-xs text-cyan-500 mt-1 uppercase tracking-widest font-bold flex items-center">
                <TrophyIcon size={14} className="mr-2" />
                Tournament Bracket Management
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-[#121a25] to-[#1a2332] border border-[#1c2532] rounded-xl px-5 py-3 shadow-lg">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Statistics</span>
              <span className={`text-xs font-bold ${isLiveConnected ? "text-green-400 animate-pulse" : "text-slate-500"}`}>{isLiveConnected ? "● Connected" : "○ Disconnected"}</span>
            </div>
            <button 
              onClick={() => setIsLiveConnected(!isLiveConnected)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shadow-inner ${isLiveConnected ? "bg-green-500" : "bg-slate-700"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${isLiveConnected ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>
        <div className="relative z-10 flex space-x-4 mb-10 p-1 bg-[#121a25]/50 backdrop-blur-sm rounded-xl inline-flex border border-slate-800">
          {formats.map(format => (
            <button
              key={format}
              onClick={() => setActiveFormat(format)}
              className={`px-8 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${activeFormat === format ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] transform scale-[1.02]" : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50"}`}
            >
              {format}
            </button>
          ))}
        </div>
        <div className="relative z-10 bg-gradient-to-b from-[#121a25] to-[#0b101a] rounded-3xl p-8 border border-[#1c2532] shadow-2xl flex items-start justify-center min-h-[600px] overflow-hidden">
          {activeFormat === "Single Elimination" && renderSingleElimination()}
          {activeFormat === "Double Elimination" && renderDoubleElimination()}
          {activeFormat === "Round Robin" && renderRoundRobin()}
        </div>
      </div>
    </div>
  );
};
export default Bracket;
