import React, { useState, useEffect } from "react";
import { Users, Plus, Shield, Trash2, GripVertical, PanelLeftClose, PanelLeftOpen, Trophy, TrendingUp, Search } from 'lucide-react';
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
const ExternalLinkIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
);
const SaveIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
);
const HashIcon = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/></svg>
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

/* ── Match Card ─────────────────────────────────────────── */
const MatchCard = ({ match, onChange, matchNumber }) => {
  const s1 = parseInt(match.score1) || 0;
  const s2 = parseInt(match.score2) || 0;
  const isTeam1Winner = s1 > s2 && match.played !== false; 
  const isTeam2Winner = s2 > s1 && match.played !== false;
  const hasWinner = isTeam1Winner || isTeam2Winner;

  const cardBorder = match.isFinals
    ? '1px solid rgba(234,179,8,0.4)'
    : hasWinner
      ? '1px solid rgba(6,182,212,0.3)'
      : '1px solid rgba(51,65,85,0.4)';

  const rowStyle = (isWinner) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    position: 'relative',
    background: isWinner
      ? 'linear-gradient(90deg, rgba(8,51,68,0.5) 0%, #0f1923 100%)'
      : '#141e2b',
    transition: 'background 0.2s',
  });

  const teamNameStyle = (isWinner, hasName) => ({
    fontSize: '12px',
    fontWeight: 700,
    color: isWinner ? '#ffffff' : hasName ? '#e2e8f0' : '#64748b',
    fontStyle: hasName ? 'normal' : 'italic',
    textShadow: isWinner ? '0 0 6px rgba(255,255,255,0.3)' : 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  });

  const scoreStyle = (isWinner) => ({
    fontWeight: 900,
    textAlign: 'center',
    width: '36px',
    height: '28px',
    borderRadius: '4px',
    fontSize: '14px',
    border: isWinner ? '1px solid rgba(6,182,212,0.4)' : '1px solid rgba(51,65,85,0.6)',
    background: isWinner ? 'rgba(6,182,212,0.12)' : '#0b1018',
    color: isWinner ? '#67e8f9' : '#e2e8f0',
    outline: 'none',
    flexShrink: 0,
  });

  return (
    <div
      style={{
        width: 280,
        borderRadius: '8px',
        overflow: 'hidden',
        border: cardBorder,
        position: 'relative',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      className="hover:-translate-y-0.5"
    >
      {/* Finals glow */}
      {match.isFinals && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent, rgba(234,179,8,0.1), transparent)',
          animation: 'pulse 2s infinite',
        }} />
      )}

      {/* ─── Team 1 Row ─── */}
      <div style={rowStyle(isTeam1Winner)}>
        {isTeam1Winner && (
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg, #22d3ee, #0891b2)', boxShadow: '0 0 8px #06b6d4' }} />
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            background: isTeam1Winner ? 'rgba(6,182,212,0.15)' : 'rgba(51,65,85,0.5)',
            border: isTeam1Winner ? '1px solid rgba(6,182,212,0.4)' : '1px solid rgba(71,85,105,0.4)',
          }}>
            {isTeam1Winner
              ? <CrownIcon size={11} className="text-cyan-400" />
              : <SwordsIcon size={11} className="text-slate-400" />
            }
          </div>
          <span style={teamNameStyle(isTeam1Winner, !!match.team1)}>
            {match.team1 || "TBD"}
          </span>
        </div>
        {matchNumber != null && (
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#475569', marginRight: 6, flexShrink: 0 }}>{matchNumber}</span>
        )}
        <input
          type="number"
          value={match.score1}
          onChange={(e) => onChange("score1", e.target.value)}
          style={scoreStyle(isTeam1Winner)}
        />
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(51,65,85,0.3)' }} />

      {/* ─── Team 2 Row ─── */}
      <div style={rowStyle(isTeam2Winner)}>
        {isTeam2Winner && (
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'linear-gradient(180deg, #22d3ee, #0891b2)', boxShadow: '0 0 8px #06b6d4' }} />
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            background: isTeam2Winner ? 'rgba(6,182,212,0.15)' : 'rgba(51,65,85,0.5)',
            border: isTeam2Winner ? '1px solid rgba(6,182,212,0.4)' : '1px solid rgba(71,85,105,0.4)',
          }}>
            {isTeam2Winner
              ? <CrownIcon size={11} className="text-cyan-400" />
              : <SwordsIcon size={11} className="text-slate-400" />
            }
          </div>
          <span style={teamNameStyle(isTeam2Winner, !!match.team2)}>
            {match.team2 || "TBD"}
          </span>
        </div>
        {matchNumber != null && (
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#475569', marginRight: 6, flexShrink: 0 }}>{matchNumber}</span>
        )}
        <input
          type="number"
          value={match.score2}
          onChange={(e) => onChange("score2", e.target.value)}
          style={scoreStyle(isTeam2Winner)}
        />
      </div>
    </div>
  );
};

/* ── Main Bracket Component ─────────────────────────────── */
const Bracket = ({ globalGame, globalTournament }) => {
  const [activeFormat, setActiveFormat] = useState("Single Elimination");
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [isRosterOpen, setIsRosterOpen] = useState(true);
  const formats = ["Single Elimination", "Double Elimination", "Round Robin"];
  const [teamPool, setTeamPool] = useState([]);
  const [newTeam, setNewTeam] = useState("");
  const [singleElimData, setSingleElimData] = useState(initialSingleElimBracket);
  const [doubleElimData, setDoubleElimData] = useState(initialDoubleElimBracket);
  const [roundRobinData, setRoundRobinData] = useState(initialRoundRobinMatches);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  // Total bracket slots for seed indicator
  const totalSlots = 8;

  // Inactivity timer for UI fade
  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 2500); // 2.5 seconds
    };

    handleMouseMove();
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

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
    setIsShuffling(true);
    setTimeout(() => {
      const shuffled = [...teamPool].sort(() => Math.random() - 0.5);
      setTeamPool(shuffled);
      setIsShuffling(false);
    }, 400);
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

  /* ── Round labels ──────────────────────────────────────── */
  const getRoundLabel = (roundIndex, totalRounds) => {
    if (roundIndex === totalRounds - 1) return "Finals";
    if (roundIndex === totalRounds - 2) return "Semi-Finals";
    if (roundIndex === totalRounds - 3) return "Quarter-Finals";
    return `Round ${roundIndex + 1}`;
  };

  /* ── Bracket Renderers ─────────────────────────────────── */

  /* Bracket connector component — draws elbow lines between rounds */
  const BracketConnector = ({ fromCount, roundGap, cardHeight, roundSpacing }) => {
    // fromCount = number of matches in the current round that feed into next round
    // Each pair of matches merges into one next-round match
    const pairCount = Math.floor(fromCount / 2);
    const connectors = [];

    for (let i = 0; i < pairCount; i++) {
      const topMatchIdx = i * 2;
      const botMatchIdx = i * 2 + 1;

      // Calculate Y positions based on card heights and spacing
      const topY = topMatchIdx * (cardHeight + roundSpacing) + cardHeight / 2;
      const botY = botMatchIdx * (cardHeight + roundSpacing) + cardHeight / 2;
      const midY = (topY + botY) / 2;

      const hLen = roundGap * 0.4;  // horizontal segment length
      const startX = 0;
      const endX = roundGap;

      connectors.push(
        <g key={i}>
          {/* Top match → horizontal right */}
          <line x1={startX} y1={topY} x2={startX + hLen} y2={topY}
            stroke="rgba(6,182,212,0.35)" strokeWidth="2" />
          {/* Bottom match → horizontal right */}
          <line x1={startX} y1={botY} x2={startX + hLen} y2={botY}
            stroke="rgba(6,182,212,0.35)" strokeWidth="2" />
          {/* Vertical line connecting top and bottom */}
          <line x1={startX + hLen} y1={topY} x2={startX + hLen} y2={botY}
            stroke="rgba(6,182,212,0.35)" strokeWidth="2" />
          {/* Middle → horizontal right to next match */}
          <line x1={startX + hLen} y1={midY} x2={endX} y2={midY}
            stroke="rgba(6,182,212,0.35)" strokeWidth="2" />
          {/* Glow dot at merge point */}
          <circle cx={startX + hLen} cy={midY} r="3"
            fill="rgba(6,182,212,0.5)" />
        </g>
      );
    }

    const totalHeight = fromCount * cardHeight + (fromCount - 1) * roundSpacing;

    return (
      <svg
        width={roundGap}
        height={totalHeight}
        style={{ flexShrink: 0, display: 'block' }}
        className="pointer-events-none"
      >
        {connectors}
      </svg>
    );
  };

  const renderSingleElimination = () => {
    const totalRounds = singleElimData.length;
    const CARD_H = 76;    // approximate card height (2 rows × ~38px)
    const ROUND_GAP = 60; // gap between columns for connector SVG

    return (
      <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto', paddingBottom: 16, paddingTop: 8, paddingLeft: 32, paddingRight: 32, width: '100%', minHeight: 500 }}>
        {singleElimData.map((round, rIndex) => {
          // Spacing between match cards increases with each round
          const spacing = rIndex === 0 ? 14 : rIndex === 1 ? CARD_H + 28 : CARD_H * 3 + 56;

          return (
            <React.Fragment key={rIndex}>
              {/* Connector SVG between previous round and this round */}
              {rIndex > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <BracketConnector
                    fromCount={singleElimData[rIndex - 1].length}
                    roundGap={ROUND_GAP}
                    cardHeight={CARD_H}
                    roundSpacing={rIndex - 1 === 0 ? 14 : rIndex - 1 === 1 ? CARD_H + 28 : CARD_H * 3 + 56}
                  />
                </div>
              )}

              {/* Round column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, minWidth: 290 }}>
                {/* Round label */}
                <div style={{ marginBottom: 16, textAlign: 'center' }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em',
                    padding: '4px 12px', borderRadius: 20,
                    color: rIndex === totalRounds - 1 ? '#facc15' : '#64748b',
                    background: rIndex === totalRounds - 1 ? 'rgba(250,204,21,0.08)' : 'rgba(30,41,59,0.4)',
                    border: rIndex === totalRounds - 1 ? '1px solid rgba(250,204,21,0.2)' : '1px solid rgba(51,65,85,0.3)',
                  }}>
                    {getRoundLabel(rIndex, totalRounds)}
                  </span>
                </div>

                {/* Match cards */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', flex: 1, gap: spacing }}>
                  {round.map((match, mIndex) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      matchNumber={match.id}
                      onChange={(field, value) => updateSingleMatch(rIndex, mIndex, field, value)}
                    />
                  ))}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderDoubleElimination = () => {
    const CARD_H = 76;
    const ROUND_GAP = 60;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: 700, paddingBottom: 24, paddingTop: 16, paddingLeft: 32, paddingRight: 32, gap: 40, overflowX: 'auto' }}>
        {/* Upper Bracket */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 4, height: 20, borderRadius: 4, background: 'linear-gradient(180deg, #22d3ee, #3b82f6)' }} />
            <h3 style={{ color: '#22d3ee', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 13, display: 'flex', alignItems: 'center', margin: 0 }}>
              <CrownIcon size={14} className="mr-2"/> Upper Bracket
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {doubleElimData.upper.map((round, rIndex) => (
              <React.Fragment key={rIndex}>
                {rIndex > 0 && (
                  <div style={{ flexShrink: 0 }}>
                    <BracketConnector
                      fromCount={doubleElimData.upper[rIndex - 1].length}
                      roundGap={ROUND_GAP}
                      cardHeight={CARD_H}
                      roundSpacing={14}
                    />
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', flexShrink: 0, minWidth: 290, gap: 14 }}>
                  {round.map((match, mIndex) => (
                    <MatchCard key={match.id} match={match} matchNumber={match.id}
                      onChange={(field, value) => updateDoubleMatch('upper', rIndex, mIndex, field, value)} />
                  ))}
                </div>
              </React.Fragment>
            ))}
            {/* Connector to Grand Finals */}
            <div style={{ flexShrink: 0 }}>
              <svg width={ROUND_GAP} height={CARD_H} className="pointer-events-none">
                <line x1={0} y1={CARD_H / 2} x2={ROUND_GAP} y2={CARD_H / 2}
                  stroke="rgba(6,182,212,0.35)" strokeWidth="2" />
                <circle cx={ROUND_GAP - 4} cy={CARD_H / 2} r="3" fill="rgba(6,182,212,0.5)" />
              </svg>
            </div>
            {/* Grand Finals */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0, minWidth: 290 }}>
              {doubleElimData.finals[0].map((match, mIndex) => (
                <MatchCard key={match.id} match={match} matchNumber="GF"
                  onChange={(field, value) => updateDoubleMatch('finals', 0, mIndex, field, value)} />
              ))}
            </div>
          </div>
        </div>

        {/* Lower Bracket */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 4, height: 20, borderRadius: 4, background: 'linear-gradient(180deg, #f87171, #dc2626)' }} />
            <h3 style={{ color: '#f87171', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 13, display: 'flex', alignItems: 'center', margin: 0 }}>
              <ShieldIcon size={14} className="mr-2"/> Lower Bracket
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Spacer for first upper round */}
            <div style={{ minWidth: 290, flexShrink: 0 }} />
            <div style={{ width: ROUND_GAP, flexShrink: 0 }} />
            {doubleElimData.lower.map((round, rIndex) => (
              <React.Fragment key={rIndex}>
                {rIndex > 0 && (
                  <div style={{ flexShrink: 0 }}>
                    <svg width={ROUND_GAP} height={CARD_H} className="pointer-events-none">
                      <line x1={0} y1={CARD_H / 2} x2={ROUND_GAP} y2={CARD_H / 2}
                        stroke="rgba(248,113,113,0.3)" strokeWidth="2" />
                      <circle cx={ROUND_GAP - 4} cy={CARD_H / 2} r="3" fill="rgba(248,113,113,0.4)" />
                    </svg>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', flexShrink: 0, minWidth: 290, gap: 14 }}>
                  {round.map((match, mIndex) => (
                    <MatchCard key={match.id} match={match} matchNumber={match.id}
                      onChange={(field, value) => updateDoubleMatch('lower', rIndex, mIndex, field, value)} />
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRoundRobin = () => {
    const standings = calculateStandings();
    return (
      <div className="flex flex-col w-full relative z-10" style={{ gap: "32px", padding: "16px" }}>
        {/* Standings */}
        <div className="w-full bg-[#070b14]/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl font-sans select-none overflow-hidden" style={{ padding: "32px" }}>
          {/* Header Component */}
          <div className="flex items-center justify-between" style={{ marginBottom: "32px" }}>
            <div className="flex items-center gap-3">
              <h2 className="text-white font-black text-lg tracking-wider uppercase">LEAGUE STANDINGS</h2>
            </div>
            {/* Search Input */}
            <div className="relative hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search team" 
                className="bg-transparent border border-slate-700/50 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 w-48 transition-colors"
                style={{ padding: "8px 16px 8px 40px" }}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-400 text-xs font-bold uppercase tracking-[0.1em]">
                  <th className="text-center" style={{ padding: "12px 16px", width: "48px" }}>#</th>
                  <th style={{ padding: "12px 16px" }}>Team</th>
                  <th className="text-center" style={{ padding: "12px 16px", width: "48px" }}>P</th>
                  <th className="text-center" style={{ padding: "12px 16px", width: "48px" }}>W</th>
                  <th className="text-center" style={{ padding: "12px 16px", width: "48px" }}>L</th>
                  <th className="text-center" style={{ padding: "12px 16px", width: "64px" }}>Diff</th>
                  <th className="text-center" style={{ padding: "12px 16px", width: "48px" }}>Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {standings.length === 0 ? (
                  <tr><td colSpan="7" className="text-center py-10 text-slate-500 text-sm">No matches played yet</td></tr>
                ) : standings.map((team, idx) => (
                  <tr 
                    key={team.name} 
                    className={`${idx === 0 ? 'bg-cyan-500/[0.06]' : 'hover:bg-slate-800/30'} transition-colors`}
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-white font-bold">{idx + 1}</span>
                        {/* Mock Trend Indicators based on photo */}
                        {idx === 0 || idx === 3 ? (
                          <span className="text-slate-500 text-xs">–</span>
                        ) : idx === 1 ? (
                          <span className="text-emerald-400 text-xs font-bold">↑</span>
                        ) : (
                          <span className="text-rose-400 text-xs font-bold">↓</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-900/40 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-black shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                          {team.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-white font-bold">{team.name}</span>
                      </div>
                    </td>
                    <td className="text-center text-slate-400" style={{ padding: "12px 16px" }}>{team.played}</td>
                    <td className="text-center text-emerald-400 font-bold" style={{ padding: "12px 16px" }}>{team.wins}</td>
                    <td className="text-center text-rose-400 font-bold" style={{ padding: "12px 16px" }}>{team.losses}</td>
                    <td className={`text-center font-medium ${team.diff > 0 ? 'text-emerald-400' : team.diff < 0 ? 'text-rose-400' : 'text-slate-400'}`} style={{ padding: "12px 16px" }}>
                      {team.diff > 0 ? `+${team.diff}` : team.diff}
                    </td>
                    <td className="text-center text-cyan-400 font-black" style={{ padding: "12px 16px" }}>{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Match Schedule */}
        <div className="w-full flex flex-col" style={{ padding: "0 32px" }}>
          <div className="flex items-center space-x-3" style={{ marginBottom: "32px" }}>
            <SwordsIcon size={16} className="text-cyan-400" />
            <h3 className="text-sm font-bold uppercase text-white tracking-[0.1em]">Match Schedule</h3>
          </div>
          <div className="flex flex-wrap gap-4 justify-start">
            {roundRobinData.map((match, mIndex) => (
              <div key={match.id} className="relative group shrink-0">
                <MatchCard match={match} matchNumber={match.id} onChange={(field, value) => updateRoundRobinMatch(mIndex, field, value)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ── Tournament ID shorthand ───────────────────────────── */
  const tournamentId = globalTournament?.id
    ? `${String(globalTournament.id).slice(0, 5)}...${String(globalTournament.id).slice(-5)}`
    : "56467...2300C";

  const tournamentName = globalTournament && typeof globalTournament === 'string'
    ? globalTournament
    : globalTournament?.name || "Default";

  /* ── RENDER ────────────────────────────────────────────── */
  return (
    <div className="flex bg-[#090e14] h-full min-h-screen relative">

      {/* ══ LEFT SIDEBAR — Team Roster ═══════════════════════ */}
      <div className={`bg-[#0d141e]/95 border-[#1a2332] flex flex-col z-20 shadow-2xl relative flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isRosterOpen ? 'w-[400px] border-r opacity-100' : 'w-0 border-r-0 opacity-0 overflow-hidden'}`}>
        <div className="w-[400px] h-full flex flex-col shrink-0">
        {/* Header */}
        <div className="border-b border-[#1a2332] flex items-center justify-between" style={{ padding: "32px 40px" }}>
          <div>
            <h2 className="text-[16px] font-black uppercase tracking-[0.12em] text-white flex items-center">
              <UserIcon size={18} className="text-cyan-400 mr-3" />
              Team Roster
            </h2>
            <p className="text-[12px] text-slate-500 mt-1.5 uppercase tracking-wider">Bracket Auto-Seeding</p>
          </div>
          <div className="bg-slate-800/70 text-[12px] font-bold px-4 py-2 text-cyan-400 border border-slate-700/50" style={{ borderRadius: "8px" }}>
            {teamPool.length} Teams
          </div>
        </div>

        {/* Add Team Input */}
        <div className="border-b border-[#1a2332]" style={{ padding: "24px 40px" }}>
          <form onSubmit={addTeam} className="relative mb-0">
            <input 
              type="text" 
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
              placeholder="Add teams (comma separated)..." 
              className="w-full bg-slate-900/80 border border-slate-700/60 px-5 py-4 text-[13px] text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-200 pr-14"
              style={{ borderRadius: "16px" }}
            />
            <button type="submit" disabled={!newTeam.trim()} className="absolute right-2 top-2 bottom-2 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center transition-colors shadow-[0_0_10px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed" style={{ borderRadius: "12px" }}>
              <Plus size={18} strokeWidth={2.5} />
            </button>
          </form>
        </div>

        {/* Team list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar" style={{ padding: "24px 24px 24px 40px" }}>
          <div className="flex flex-col gap-3">
            {/* Active Teams */}
            {teamPool.map((team, idx) => (
              <div 
                key={team}
                className="group flex items-center justify-between bg-slate-900/40 hover:bg-slate-800/50 border border-slate-800/80 hover:border-cyan-500/30 px-4 py-3.5 transition-all duration-200"
                style={{ borderRadius: "12px" }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-[13px] font-bold text-slate-500 w-5 text-right flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/50 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Shield size={16} />
                  </div>
                  <span className="text-[14px] font-bold text-slate-200 tracking-wide truncate">
                    {team}
                  </span>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <button onClick={() => removeTeam(team)} className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1.5">
                    <Trash2 size={16} />
                  </button>
                  <div className="text-slate-600 cursor-grab active:cursor-grabbing p-1.5">
                    <GripVertical size={16} />
                  </div>
                </div>
              </div>
            ))}

            {/* Clean Empty Slot Placeholders */}
            {teamPool.length < totalSlots && Array.from({ length: totalSlots - teamPool.length }).map((_, idx) => {
              const slotNumber = teamPool.length + idx + 1;
              return (
                <div 
                  key={`empty-${slotNumber}`}
                  className="flex items-center justify-between border border-dashed border-slate-800/80 px-4 py-3.5 opacity-50"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[13px] font-medium text-slate-600 w-5 text-right">
                      {slotNumber}
                    </span>
                    <span className="text-[14px] italic text-slate-500 font-medium tracking-wide">
                      Available Slot
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="border-t border-[#1a2332]" style={{ padding: "24px 40px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {teamPool.length > 0 && (
            <>
              <button 
                onClick={shuffleTeams}
                disabled={isShuffling}
                className={`w-full py-3.5 border border-cyan-700/60 text-cyan-400 flex justify-center items-center text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-cyan-900/25 transition-all duration-300 ${isShuffling ? 'opacity-60 animate-pulse' : ''}`}
                style={{ borderRadius: "12px" }}
              >
                <ShuffleIcon size={14} className="mr-2" />
                {isShuffling ? 'Seed Shuffle Processing...' : 'Shuffle Seed'}
              </button>
              <button 
                onClick={() => setTeamPool([])}
                className="w-full py-3.5 border border-slate-700/40 text-slate-500 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-slate-800/50 hover:text-white transition-colors"
                style={{ borderRadius: "12px" }}
              >
                Clear All Teams
              </button>
            </>
          )}
        </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT AREA ════════════════════════════════ */}
      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10" style={{ height: "100vh" }}>
        {/* Toggle Button for Roster */}
        <button 
          onClick={() => setIsRosterOpen(!isRosterOpen)}
          className={`absolute left-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-[#0d141e]/90 backdrop-blur-md border border-[#1a2332] rounded-full text-slate-400 hover:text-cyan-400 hover:bg-slate-800/90 hover:border-cyan-500/50 shadow-xl hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-700 group ${isIdle ? 'opacity-20' : 'opacity-100 hover:opacity-100'}`}
        >
          {isRosterOpen ? <PanelLeftClose size={24} className="group-hover:scale-110 transition-transform" /> : <PanelLeftOpen size={24} className="group-hover:scale-110 transition-transform" />}
        </button>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-900/15 via-[#090e14] to-[#090e14] pointer-events-none" />

        {/* Top bar: Title + Live Stats */}
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6" style={{ padding: "48px 64px 48px 96px" }}>
          {/* Left: Title area */}
          <div className="flex-1 min-w-0 w-full">
            <div className="flex items-center space-x-3 mb-1">
              <p className="text-[10px] text-cyan-500 uppercase tracking-[0.2em] font-bold flex items-center">
                <TrophyIcon size={12} className="mr-1.5" />
                Tournament Bracket Management
              </p>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight truncate">
              {tournamentName && !tournamentName.match(/^[0-9a-f]{8}-/i) ? tournamentName : "Active Tournament Bracket"}
            </h1>
          </div>

          {/* Right: Live Statistics toggle panel */}
          <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-start lg:items-end justify-center gap-3">
            <div className="flex items-center gap-4">
              <div className="text-left lg:text-right">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 block mb-0.5">Live Statistics</span>
                <span className={`text-[10px] font-bold flex items-center lg:justify-end ${isLiveConnected ? "text-green-400" : "text-slate-500"}`}>
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${isLiveConnected ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" : "bg-slate-600"}`} />
                  {isLiveConnected ? "Status: Active" : "Status: Inactive"}
                </span>
              </div>
              <button 
                onClick={() => setIsLiveConnected(!isLiveConnected)}
                className={`relative inline-flex h-6 w-11 items-center transition-colors focus:outline-none shadow-inner shrink-0 cursor-pointer ${isLiveConnected ? "bg-green-500" : "bg-slate-700"}`}
                style={{ borderRadius: "24px" }}
              >
                <span className={`inline-block h-4 w-4 transform bg-white transition-transform shadow-md ${isLiveConnected ? "translate-x-6" : "translate-x-1"}`} style={{ borderRadius: "50%" }} />
              </button>
            </div>
            {/* Action buttons row */}
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest shrink-0 ${isLiveConnected ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-slate-800/50 text-slate-500 border border-slate-700/30'}`}>
                {isLiveConnected ? "LIVE" : "OFFLINE"}
              </span>
              <button className="flex items-center justify-center gap-2 px-4 py-1.5 bg-slate-800/40 border border-slate-700/30 rounded text-[10px] font-bold text-slate-300 uppercase tracking-wider hover:bg-slate-700/40 hover:text-white transition-colors cursor-pointer" style={{ borderRadius: "8px" }}>
                <ExternalLinkIcon size={12} />
                <span>View Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* Format Tabs */}
        <div className="relative z-10 w-full shrink-0" style={{ padding: "0 64px 0 96px", marginBottom: "48px" }}>
          <div className="flex w-full bg-[#0d141e]/60 backdrop-blur-sm border border-slate-800/50" style={{ padding: "8px", gap: "12px", borderRadius: "16px" }}>
            {formats.map(format => (
              <button
                key={format}
                onClick={() => setActiveFormat(format)}
                className={`flex-1 text-sm font-bold transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer
                  ${activeFormat === format
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_16px_rgba(6,182,212,0.3)]"
                    : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/40"
                  }`}
                style={{ padding: "16px", borderRadius: "12px" }}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Bracket Area */}
        <div className="relative z-10 bg-gradient-to-b from-[#0f1720] to-[#0b1018] rounded-2xl border border-[#1a2332] shadow-2xl shrink-0" style={{ minHeight: "fit-content", margin: "0 64px 24px 96px" }}>
          <div className="p-6 flex items-start justify-center">
            {activeFormat === "Single Elimination" && renderSingleElimination()}
            {activeFormat === "Double Elimination" && renderDoubleElimination()}
            {activeFormat === "Round Robin" && renderRoundRobin()}
          </div>
        </div>

        {/* Save bar */}
        <div className="relative z-10 flex justify-center w-full shrink-0" style={{ paddingBottom: "48px" }}>
          <button
            onClick={saveBracketState}
            disabled={isSaving}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold uppercase tracking-[0.12em] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
            style={{ padding: "16px 48px", borderRadius: "16px", gap: "12px" }}
          >
            <SaveIcon size={18} />
            <span style={{ fontSize: "14px" }}>{isSaving ? 'Saving...' : 'Save Bracket'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Bracket;
