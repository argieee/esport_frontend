import React, { useState, useMemo } from 'react';

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const IconBroadcast = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.111 16.404a5.5 5.5 0 010-8.808m7.778 8.808a5.5 5.5 0 000-8.808M12 12a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.929 19.071a10 10 0 010-14.142m14.142 0a10 10 0 010 14.142" />
  </svg>
);
const IconGame = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 5v2m-6-2v2M5 9h14l1 12H4L5 9zm4 5h2m2 0h2M9 14v2m6-2v2" />
  </svg>
);
const IconMap = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);
const IconStats = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h4v10H3V10zm7-6h4v16h-4V4zm7 8h4v8h-4v-8z" />
  </svg>
);
const IconNotes = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);
const IconSave = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
const SectionHeader = ({ icon, label, sub, accent = '#06b6d4' }) => (
  <div className="px-5 py-3.5 border-b border-slate-800/60 flex items-center gap-3 bg-slate-900/30">
    <div className="p-1.5 rounded-lg flex-shrink-0" style={{ backgroundColor: accent + '18', border: `1px solid ${accent}30` }}>
      <span style={{ color: accent }}>{icon}</span>
    </div>
    <div>
      {sub && <div className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600 mb-0.5">{sub}</div>}
      <h2 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">{label}</h2>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   LABEL + INPUT wrapper
───────────────────────────────────────────── */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{label}</label>
    {children}
  </div>
);

/* ─────────────────────────────────────────────
   SHARED INPUT STYLES
───────────────────────────────────────────── */
const inputBase = "bg-slate-800/50 border border-slate-700/70 text-white text-xs font-bold px-3 py-2.5 rounded-lg outline-none focus:border-cyan-500/70 focus:ring-2 focus:ring-cyan-500/10 transition-all w-full placeholder-slate-600";
const selectBase = "bg-slate-800/50 border border-slate-700/70 text-white text-xs font-bold px-3 py-2.5 rounded-lg outline-none focus:border-cyan-500/70 focus:ring-2 focus:ring-cyan-500/10 transition-all w-full cursor-pointer appearance-none";
const tableInput = "bg-transparent w-full text-center outline-none focus:bg-slate-800/70 focus:ring-1 focus:ring-cyan-500/50 rounded-md py-1.5 transition-all text-xs font-bold";

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const DataEntry = () => {
  const [broadcast, setBroadcast] = useState(false);
  const [game, setGame] = useState('Valorant');
  const [league, setLeague] = useState('VCT Pacific');
  const [stage, setStage] = useState('PLAYOFFS - DAY 2');
  const [match, setMatch] = useState('GAME 1 - BO3');

  const [teamA, setTeamA] = useState({ name: 'WOLF ESPORT', logo: '' });
  const [teamB, setTeamB] = useState({ name: 'GOAT GAMING', logo: '' });
  const [winner, setWinner] = useState('A');

  const [mapName, setMapName] = useState('Bind');
  const [scoreA, setScoreA] = useState(13);
  const [scoreB, setScoreB] = useState(11);

  // Round tracker: each round stores which team won ('A', 'B', or '' for unplayed)
  const [rounds, setRounds] = useState(() => {
    const r = Array(24).fill('');
    ['A','A','A','B','A','B','A','A','B','A','B','A','A'].forEach((v, i) => r[i] = v);
    return r;
  });

  const [playersA, setPlayersA] = useState(() => {
    const defaultAgents = ['Jett', 'Fade', 'Neon', 'Clove', 'Chamber'];
    const defaultIGNs = ['XIP Hotsauze', 'XIP Emman', 'XIP JA', 'XIP Fixyy', 'XIP Rizza'];
    const defaultK = [20, 13, 11, 9, 5];
    const defaultD = [15, 12, 12, 7, 6];
    const defaultA = [5, 5, 6, 2, 3];
    const defaultACS = [2019, 1571, 1901, 1673, 1666];
    const defaultEcon = [561, 532, 521, 492, 438];
    return defaultIGNs.map((ign, i) => ({
      ign: `Player 1: ${ign}`,
      agent: defaultAgents[i],
      k: defaultK[i],
      d: defaultD[i],
      a: defaultA[i],
      acs: defaultACS[i],
      econ: defaultEcon[i],
    }));
  });

  const [playersB, setPlayersB] = useState(() => {
    const defaultAgents = ['Viper', 'Omen', 'Gekko'];
    const defaultIGNs = ['XIP Hotsauze', 'XIP Hotsauze', 'XIP Hotsauze'];
    const defaultK = [2, 2, 4];
    const defaultD = [5, 6, 7];
    const defaultA = [12, 0, 12];
    const defaultACS = [1037, 941, 810];
    const defaultEcon = [255, 234, 214];
    return Array(5).fill(null).map((_, i) => ({
      ign: i < 3 ? `Player 1: ${defaultIGNs[i]}` : `Player ${i+1}: GOAT`,
      agent: i < 3 ? defaultAgents[i] : 'Sage',
      k: i < 3 ? defaultK[i] : 0,
      d: i < 3 ? defaultD[i] : 0,
      a: i < 3 ? defaultA[i] : 0,
      acs: i < 3 ? defaultACS[i] : 0,
      econ: i < 3 ? defaultEcon[i] : 0,
    }));
  });

  const [notes, setNotes] = useState('Pause at 12:00 due to the technical issue');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Crossfire Adaptive Columns State (Groups of K, D, A, H)
  const [cfGroups, setCfGroups] = useState([
    { id: 'g1', label: 'TOTAL PLAYER STATS', isTotal: true }
  ]);

  const handleAddCfGroup = () => {
    const newId = `g_${Date.now()}`;
    setCfGroups([...cfGroups, { id: newId, label: 'NEW STATS' }]);
  };
  const handleRemoveCfGroup = (id) => {
    setCfGroups(cfGroups.filter(g => g.id !== id));
  };
  const handleUpdateCfGroupLabel = (id, label) => {
    setCfGroups(cfGroups.map(g => g.id === id ? { ...g, label } : g));
  };

  // Toggle round result: empty → A win → B win → empty
  const toggleRound = (idx) => {
    const r = [...rounds];
    r[idx] = r[idx] === '' ? 'A' : r[idx] === 'A' ? 'B' : '';
    setRounds(r);
  };

  const updatePlayer = (team, idx, field, value) => {
    if (team === 'A') {
      const p = [...playersA]; p[idx] = { ...p[idx], [field]: value }; setPlayersA(p);
    } else {
      const p = [...playersB]; p[idx] = { ...p[idx], [field]: value }; setPlayersB(p);
    }
  };

  // Helper to compute Crossfire totals for the TOTAL PLAYER STATS template
  const getCfTotal = (player, field) => {
    return cfGroups.reduce((sum, g) => {
      if (g.isTotal) return sum;
      const val = player[`${g.id}_${field}`];
      return sum + (Number(val) || 0);
    }, 0);
  };

  // Compute round labels: "1:W", "2:W", "3:L", etc. based on which team's perspective (Team A)
  const roundLabels = useMemo(() => {
    return rounds.map((round, idx) => {
      if (round === '') return '';
      return round === 'A' ? 'W' : 'L';
    });
  }, [rounds]);

  // Count wins per half for display
  const roundStats = useMemo(() => {
    const firstHalf = rounds.slice(0, 12);
    const secondHalf = rounds.slice(12);
    return {
      firstHalfA: firstHalf.filter(r => r === 'A').length,
      firstHalfB: firstHalf.filter(r => r === 'B').length,
      secondHalfA: secondHalf.filter(r => r === 'A').length,
      secondHalfB: secondHalf.filter(r => r === 'B').length,
    };
  }, [rounds]);

  const agents = ['Jett','Fade','Neon','Clove','Chamber','Viper','Omen','Gekko','Reyna','Sage','Breach','Phoenix','Sova','Killjoy','Cypher','Raze','Skye','Kay/O','Astra','Brimstone','Harbor','Deadlock','Iso','Vyse'];
  const valorantMaps = ['Bind','Ascent','Split','Haven','Icebox','Breeze','Fracture','Pearl','Lotus','Sunset','Abyss'];

  // Submit handler
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  // Reset handler
  const handleCancel = () => {
    if (window.confirm('Clear all data? This cannot be undone.')) {
      setGame('Valorant');
      setLeague('');
      setStage('PLAYOFFS - DAY 1');
      setMatch('GAME 1 - BO3');
      setTeamA({ name: '', logo: '' });
      setTeamB({ name: '', logo: '' });
      setWinner('A');
      setMapName('Bind');
      setScoreA(0);
      setScoreB(0);
      setRounds(Array(24).fill(''));
      setPlayersA(Array(5).fill(null).map((_, i) => ({ ign: '', agent: 'Jett', k: 0, d: 0, a: 0, acs: 0, econ: 0 })));
      setPlayersB(Array(5).fill(null).map((_, i) => ({ ign: '', agent: 'Jett', k: 0, d: 0, a: 0, acs: 0, econ: 0 })));
      setNotes('');
      setBroadcast(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#090e14] text-slate-200">
      <style>{`
        .de-scroll::-webkit-scrollbar { width: 5px; }
        .de-scroll::-webkit-scrollbar-track { background: transparent; }
        .de-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .de-scroll::-webkit-scrollbar-thumb:hover { background: #334155; }
        @keyframes submitPulse {
          0%, 100% { box-shadow: 0 0 15px rgba(6,182,212,0.2); }
          50% { box-shadow: 0 0 30px rgba(6,182,212,0.5); }
        }
        @keyframes successFlash {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .submit-pulse { animation: submitPulse 2s ease-in-out infinite; }
        .success-flash { animation: successFlash 0.3s ease; }
        .round-btn { transition: all 0.15s ease; }
        .round-btn:active { transform: scale(0.88); }
      `}</style>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto de-scroll flex flex-col items-center">
        <div className="w-full max-w-[1400px] px-8 lg:px-12 py-6 lg:py-8 flex flex-col gap-5">

          {/* ── Top Bar: Broadcast Toggle ── */}
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-3 bg-slate-800/40 border border-slate-700/50 px-4 py-2.5 rounded-xl">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Broadcast</span>
              <button
                onClick={() => setBroadcast(!broadcast)}
                className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 ${broadcast ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${broadcast ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
              <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${broadcast ? 'text-emerald-400' : 'text-slate-600'}`}>
                {broadcast ? 'ON AIR' : 'OFF'}
              </span>
            </div>
          </div>

          {/* ── Row 1: Match Header + Teams ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Match Header */}
            <div className="lg:col-span-2 bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
              <SectionHeader icon={<IconGame />} label="Main Match Header" sub="Configuration" />
              <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Field label="Select Game:">
                  <div className="relative">
                    <select className={selectBase} value={game} onChange={e => setGame(e.target.value)}>
                      <option value="Valorant">VALORANT</option>
                      <option value="Crossfire">CROSSFIRE</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▾</div>
                  </div>
                </Field>
                <Field label="League/Tournament:">
                  <input type="text" className={inputBase} value={league} onChange={e => setLeague(e.target.value)} placeholder="e.g. VCT Pacific" />
                </Field>
                <Field label="Stage:">
                  <div className="relative">
                    <select className={selectBase} value={stage} onChange={e => setStage(e.target.value)}>
                      <option>PLAYOFFS - DAY 1</option>
                      <option>PLAYOFFS - DAY 2</option>
                      <option>GRAND FINALS</option>
                      <option>GROUP STAGE</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▾</div>
                  </div>
                </Field>
                <Field label="Match">
                  <div className="relative">
                    <select className={selectBase} value={match} onChange={e => setMatch(e.target.value)}>
                      <option>GAME 1 - BO3</option>
                      <option>GAME 2 - BO3</option>
                      <option>GAME 3 - BO3</option>
                      <option>GAME 1 - BO5</option>
                      <option>GAME 2 - BO5</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▾</div>
                  </div>
                </Field>
              </div>
            </div>

            {/* Teams */}
            <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
              <SectionHeader icon={<IconGame />} label="Teams" sub="Matchup" accent="#6366f1" />
              <div className="p-5 flex flex-col gap-3">
                {/* Team A & B side by side */}
                <div className="flex gap-3">
                  {/* Team A */}
                  <div className="flex-1 bg-blue-900/10 border border-blue-900/30 rounded-xl p-3 flex flex-col items-center gap-2 hover:border-blue-700/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-blue-900/30 border border-blue-800/40 flex items-center justify-center text-lg font-black text-blue-400 shrink-0">
                      {teamA.name ? teamA.name[0] : 'A'}
                    </div>
                    <div className="text-center w-full">
                      <div className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-0.5">Team A:</div>
                      <input
                        type="text"
                        className="bg-transparent text-[10px] font-black text-white w-full text-center outline-none border-b border-transparent focus:border-blue-500 transition-colors pb-0.5"
                        value={teamA.name}
                        onChange={e => setTeamA({ ...teamA, name: e.target.value })}
                      />
                    </div>
                  </div>
                  {/* Team B */}
                  <div className="flex-1 bg-red-900/10 border border-red-900/30 rounded-xl p-3 flex flex-col items-center gap-2 hover:border-red-700/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-red-900/30 border border-red-800/40 flex items-center justify-center text-lg font-black text-red-400 shrink-0">
                      {teamB.name ? teamB.name[0] : 'B'}
                    </div>
                    <div className="text-center w-full">
                      <div className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-0.5">Team B:</div>
                      <input
                        type="text"
                        className="bg-transparent text-[10px] font-black text-white w-full text-center outline-none border-b border-transparent focus:border-red-500 transition-colors pb-0.5"
                        value={teamB.name}
                        onChange={e => setTeamB({ ...teamB, name: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                {/* Winner */}
                <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/50 rounded-xl px-3.5 py-2.5">
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Winner:</div>
                    <div className={`text-xs font-black ${winner === 'A' ? 'text-blue-400' : 'text-red-400'}`}>
                      {winner === 'A' ? teamA.name : teamB.name}
                    </div>
                  </div>
                  <button
                    onClick={() => setWinner(winner === 'A' ? 'B' : 'A')}
                    className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 ${winner === 'A' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${winner === 'B' ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Map Module (Visible when Valorant is selected) ── */}
          {game === 'Valorant' && (
            <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
              <SectionHeader
                icon={<IconMap />}
                label="A. Valorant Map Module"
                sub="Visible because valorant is selected"
                accent="#f59e0b"
              />
              <div className="p-5">
                {/* Map selector + score */}
                <div className="flex flex-wrap items-end gap-4 mb-6">
                  <Field label="Map Selection">
                    <div className="relative w-48">
                      <select className={selectBase} value={mapName} onChange={e => setMapName(e.target.value)}>
                        {valorantMaps.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▾</div>
                    </div>
                  </Field>
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Score</div>
                    <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/70 rounded-lg px-3 py-2">
                      <input type="number" className="bg-transparent text-white text-sm font-black w-10 text-center outline-none" value={scoreA} onChange={e => setScoreA(Number(e.target.value) || 0)} min="0" max="99" />
                      <span className="text-slate-500 font-black">—</span>
                      <input type="number" className="bg-transparent text-white text-sm font-black w-10 text-center outline-none" value={scoreB} onChange={e => setScoreB(Number(e.target.value) || 0)} min="0" max="99" />
                    </div>
                  </div>
                </div>

                {/* Round-by-Round Tracker */}
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-3">
                    Round-by-Round Tracker
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {rounds.map((round, idx) => {
                      const isA = round === 'A';
                      const isB = round === 'B';
                      const label = roundLabels[idx];
                      // Determine display text
                      const displayText = isA ? `${idx+1}:W` : isB ? `${idx+1}:L` : '';
                      // W/L label for empty
                      const isHalfBoundary = idx === 11; // divider after round 12

                      return (
                        <React.Fragment key={idx}>
                          {isHalfBoundary && (
                            <div className="flex items-center px-1">
                              <div className="w-px h-5 bg-slate-600/50" />
                              <span className="text-[8px] text-slate-600 font-bold mx-1">W/L</span>
                              <div className="w-px h-5 bg-slate-600/50" />
                            </div>
                          )}
                          <button
                            onClick={() => toggleRound(idx)}
                            title={`Round ${idx + 1}: Click to cycle (Empty → ${teamA.name} win → ${teamB.name} win → Empty)`}
                            className={`round-btn w-10 h-7 rounded-lg flex items-center justify-center text-[8px] font-black tracking-tight shadow-sm border ${
                              isA ? 'bg-emerald-500/80 text-white border-emerald-400/60 shadow-emerald-500/20 shadow-md' :
                              isB ? 'bg-pink-600/80 text-white border-pink-500/60 shadow-pink-500/20 shadow-md' :
                              'bg-slate-800/60 border-slate-700/60 text-slate-600 hover:bg-slate-700/80 hover:text-slate-400'
                            }`}
                          >
                            {isA || isB ? displayText : ''}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Crossfire Map Module (Visible when Crossfire is selected) ── */}
          {game === 'Crossfire' && (
            <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
              <SectionHeader
                icon={<IconMap />}
                label="A. Crossfire Map Module"
                sub="Visible because crossfire is selected"
                accent="#f59e0b"
              />
              <div className="p-5">
                <div className="flex flex-wrap items-end gap-4">
                  <Field label="Map Selection">
                    <div className="relative w-48">
                      <select className={selectBase} value={mapName} onChange={e => setMapName(e.target.value)}>
                        <option>Black Widow</option>
                        <option>Port</option>
                        <option>Sub Base</option>
                        <option>Ankara</option>
                        <option>Ship</option>
                      </select>
                      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▾</div>
                    </div>
                  </Field>
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Score</div>
                    <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/70 rounded-lg px-3 py-2">
                      <input type="number" className="bg-transparent text-white text-sm font-black w-10 text-center outline-none" value={scoreA} onChange={e => setScoreA(Number(e.target.value) || 0)} min="0" max="99" />
                      <span className="text-slate-500 font-black">—</span>
                      <input type="number" className="bg-transparent text-white text-sm font-black w-10 text-center outline-none" value={scoreB} onChange={e => setScoreB(Number(e.target.value) || 0)} min="0" max="99" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Player Stats Table ── */}
          <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
            <SectionHeader icon={<IconStats />} label="Player Stats" sub={game === 'Crossfire' ? 'Adaptive Columns (Scroll horizontally)' : 'Fixed Columns'} accent="#8b5cf6" />
            <div className="overflow-x-auto de-scroll relative">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  {game === 'Crossfire' ? (
                    <>
                      <tr className="text-[9px] uppercase tracking-[0.15em] text-slate-500 border-b border-slate-800/60 bg-slate-900/90 relative z-20">
                        <th rowSpan={2} className="px-5 py-3 border-r border-slate-800/40 font-bold sticky left-0 bg-slate-900/90 z-30 min-w-[200px]">Player IGN</th>
                        {cfGroups.map((g) => (
                          <th key={g.id} colSpan={4} className="px-2 py-3 border-r border-slate-800/40 text-center font-bold relative min-w-[200px]">
                            <div className="flex items-center justify-center gap-2">
                              <input 
                                type="text" 
                                className="bg-transparent border-b border-slate-700 hover:border-slate-500 focus:border-[#00ffcc] text-slate-300 w-full max-w-[120px] text-center text-[10px] uppercase tracking-widest outline-none transition-colors font-black"
                                value={g.label}
                                onChange={(e) => handleUpdateCfGroupLabel(g.id, e.target.value)}
                              />
                              {!g.isTotal && (
                                <button 
                                  onClick={() => handleRemoveCfGroup(g.id)}
                                  className="text-red-500/70 hover:text-red-400 p-1 rounded-md hover:bg-red-500/10 transition-colors flex items-center justify-center"
                                  title="Delete Stats Group"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </th>
                        ))}
                        <th rowSpan={2} className="px-3 py-3 text-center w-24">
                          <button 
                            onClick={handleAddCfGroup}
                            className="text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-3 py-1.5 rounded border border-slate-700 transition-colors whitespace-nowrap font-bold"
                          >
                            + ADD STATS
                          </button>
                        </th>
                      </tr>
                      <tr className="text-[9px] uppercase tracking-[0.15em] text-slate-500 border-b border-slate-800/60 bg-slate-900/40 relative z-10">
                        {cfGroups.map((g) => (
                          <React.Fragment key={`${g.id}-sub`}>
                            <th className="px-3 py-2 border-r border-slate-800/40 text-center font-bold w-12">K</th>
                            <th className="px-3 py-2 border-r border-slate-800/40 text-center font-bold w-12">D</th>
                            <th className="px-3 py-2 border-r border-slate-800/40 text-center font-bold w-12">A</th>
                            <th className="px-3 py-2 border-r border-slate-800/40 text-center font-bold w-12 text-[#00ffcc]">H</th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </>
                  ) : (
                    <tr className="text-[9px] uppercase tracking-[0.15em] text-slate-500 border-b border-slate-800/60 bg-slate-900/90 relative z-20">
                      <th className="px-5 py-3 border-r border-slate-800/40 font-bold sticky left-0 bg-slate-900/90 z-30 min-w-[200px]">Player IGN</th>
                      <th className="px-4 py-3 border-r border-slate-800/40 font-bold min-w-[150px]">Hero/Agent/Class</th>
                      <th className="px-3 py-3 border-r border-slate-800/40 text-center font-bold w-14">K</th>
                      <th className="px-3 py-3 border-r border-slate-800/40 text-center font-bold w-14">D</th>
                      <th className="px-3 py-3 border-r border-slate-800/40 text-center font-bold w-14">A</th>
                      <th className="px-4 py-3 border-r border-slate-800/40 text-center font-bold">ACS</th>
                      <th className="px-4 py-3 text-center font-bold">Econ Rating</th>
                    </tr>
                  )}
                </thead>
                <tbody className="divide-y divide-slate-800/30">
                  {/* Team A players */}
                  {playersA.map((p, idx) => (
                    <tr key={`a-${idx}`} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-5 py-2 border-r border-slate-800/30 sticky left-0 bg-[#0d131c] group-hover:bg-[#111824] z-10 transition-colors">
                        <input type="text" className={`text-[#38bdf8] ${tableInput} text-left font-black`} value={p.ign} onChange={e => updatePlayer('A', idx, 'ign', e.target.value)} />
                      </td>
                      {game === 'Valorant' && (
                        <td className="px-4 py-2 border-r border-slate-800/30">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-slate-700/50 border border-slate-600/40 flex items-center justify-center text-[8px] font-bold text-slate-400 shrink-0">
                              {p.agent ? p.agent[0] : ''}
                            </div>
                            <select className={`text-white ${tableInput} text-left appearance-none cursor-pointer`} value={p.agent} onChange={e => updatePlayer('A', idx, 'agent', e.target.value)}>
                              {agents.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                          </div>
                        </td>
                      )}
                      {game === 'Valorant' ? (
                        <>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.k} onChange={e => updatePlayer('A', idx, 'k', Number(e.target.value) || 0)} /></td>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.d} onChange={e => updatePlayer('A', idx, 'd', Number(e.target.value) || 0)} /></td>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.a} onChange={e => updatePlayer('A', idx, 'a', Number(e.target.value) || 0)} /></td>
                          <td className="px-4 py-2 border-r border-slate-800/30 text-emerald-400"><input type="number" className={`${tableInput} text-emerald-400`} value={p.acs} onChange={e => updatePlayer('A', idx, 'acs', Number(e.target.value) || 0)} /></td>
                          <td className="px-4 py-2 text-emerald-400"><input type="number" className={`${tableInput} text-emerald-400`} value={p.econ} onChange={e => updatePlayer('A', idx, 'econ', Number(e.target.value) || 0)} /></td>
                        </>
                      ) : (
                        <>
                          {cfGroups.map((g) => {
                            if (g.isTotal) {
                              return (
                                <React.Fragment key={g.id}>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">{getCfTotal(p, 'k')}</td>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">{getCfTotal(p, 'd')}</td>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">{getCfTotal(p, 'a')}</td>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-[#00ffcc] text-center font-black bg-emerald-500/10">{getCfTotal(p, 'h')}</td>
                                </React.Fragment>
                              );
                            }
                            return (
                              <React.Fragment key={g.id}>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p[`${g.id}_k`] !== undefined ? p[`${g.id}_k`] : 0} onChange={e => updatePlayer('A', idx, `${g.id}_k`, e.target.value)} /></td>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p[`${g.id}_d`] !== undefined ? p[`${g.id}_d`] : 0} onChange={e => updatePlayer('A', idx, `${g.id}_d`, e.target.value)} /></td>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p[`${g.id}_a`] !== undefined ? p[`${g.id}_a`] : 0} onChange={e => updatePlayer('A', idx, `${g.id}_a`, e.target.value)} /></td>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-[#00ffcc]"><input type="number" className={`${tableInput} text-[#00ffcc]`} value={p[`${g.id}_h`] !== undefined ? p[`${g.id}_h`] : 0} onChange={e => updatePlayer('A', idx, `${g.id}_h`, e.target.value)} /></td>
                              </React.Fragment>
                            );
                          })}
                          <td className="px-2 py-2"></td>
                        </>
                      )}
                    </tr>
                  ))}

                  {/* Divider between teams */}
                  <tr>
                    <td colSpan="7" className="h-0.5 bg-slate-700/30"></td>
                  </tr>

                  {/* Team B players */}
                  {playersB.map((p, idx) => (
                    <tr key={`b-${idx}`} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-5 py-2 border-r border-slate-800/30 sticky left-0 bg-[#0d131c] group-hover:bg-[#111824] z-10 transition-colors">
                        <input type="text" className={`text-[#f87171] ${tableInput} text-left font-black`} value={p.ign} onChange={e => updatePlayer('B', idx, 'ign', e.target.value)} />
                      </td>
                      {game === 'Valorant' && (
                        <td className="px-4 py-2 border-r border-slate-800/30">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-slate-700/50 border border-slate-600/40 flex items-center justify-center text-[8px] font-bold text-slate-400 shrink-0">
                              {p.agent ? p.agent[0] : ''}
                            </div>
                            <select className={`text-white ${tableInput} text-left appearance-none cursor-pointer`} value={p.agent} onChange={e => updatePlayer('B', idx, 'agent', e.target.value)}>
                              {agents.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                          </div>
                        </td>
                      )}
                      {game === 'Valorant' ? (
                        <>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.k} onChange={e => updatePlayer('B', idx, 'k', Number(e.target.value) || 0)} /></td>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.d} onChange={e => updatePlayer('B', idx, 'd', Number(e.target.value) || 0)} /></td>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.a} onChange={e => updatePlayer('B', idx, 'a', Number(e.target.value) || 0)} /></td>
                          <td className="px-4 py-2 border-r border-slate-800/30 text-[#f87171]"><input type="number" className={`${tableInput} text-[#f87171]`} value={p.acs} onChange={e => updatePlayer('B', idx, 'acs', Number(e.target.value) || 0)} /></td>
                          <td className="px-4 py-2 text-[#f87171]"><input type="number" className={`${tableInput} text-[#f87171]`} value={p.econ} onChange={e => updatePlayer('B', idx, 'econ', Number(e.target.value) || 0)} /></td>
                        </>
                      ) : (
                        <>
                          {cfGroups.map((g) => {
                            if (g.isTotal) {
                              return (
                                <React.Fragment key={g.id}>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">{getCfTotal(p, 'k')}</td>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">{getCfTotal(p, 'd')}</td>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">{getCfTotal(p, 'a')}</td>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-[#00ffcc] text-center font-black bg-emerald-500/10">{getCfTotal(p, 'h')}</td>
                                </React.Fragment>
                              );
                            }
                            return (
                              <React.Fragment key={g.id}>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p[`${g.id}_k`] !== undefined ? p[`${g.id}_k`] : 0} onChange={e => updatePlayer('B', idx, `${g.id}_k`, e.target.value)} /></td>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p[`${g.id}_d`] !== undefined ? p[`${g.id}_d`] : 0} onChange={e => updatePlayer('B', idx, `${g.id}_d`, e.target.value)} /></td>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p[`${g.id}_a`] !== undefined ? p[`${g.id}_a`] : 0} onChange={e => updatePlayer('B', idx, `${g.id}_a`, e.target.value)} /></td>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-[#00ffcc]"><input type="number" className={`${tableInput} text-[#00ffcc]`} value={p[`${g.id}_h`] !== undefined ? p[`${g.id}_h`] : 0} onChange={e => updatePlayer('B', idx, `${g.id}_h`, e.target.value)} /></td>
                              </React.Fragment>
                            );
                          })}
                          <td className="px-2 py-2"></td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Footer: Notes + Action Buttons ── */}
          <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
            <SectionHeader icon={<IconNotes />} label="Notes & Submit" sub="Match Commentary" accent="#10b981" />
            <div className="p-5 flex flex-col xl:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Notes:</span>
                </div>
                <textarea
                  rows={2}
                  className="w-full bg-slate-800/50 border border-slate-700/70 text-white text-sm px-4 py-3 rounded-xl outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10 transition-all resize-none placeholder-slate-600"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Add match notes, pause events, technical issues..."
                />
              </div>
              <div className="flex gap-3 w-full xl:w-auto shrink-0">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 xl:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white transition-all active:scale-95 hover:-translate-y-0.5 ${
                    submitSuccess
                      ? 'bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] success-flash'
                      : isSubmitting
                      ? 'opacity-70 cursor-wait'
                      : 'submit-pulse hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                  }`}
                  style={!submitSuccess ? { background: 'linear-gradient(135deg, #0d9488, #2563eb)' } : {}}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <IconSave />
                  )}
                  {submitSuccess ? 'Submitted!' : isSubmitting ? 'Submitting...' : 'Submit Data'}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 xl:flex-none px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white transition-all active:scale-95 hover:-translate-y-0.5 border border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  style={{ background: 'linear-gradient(135deg, #991b1b, #dc2626)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Bottom spacer for scroll comfort */}
          <div className="h-4" />

        </div>
      </div>

      {/* Success Toast Notification */}
      {submitSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500/90 backdrop-blur-xl text-white px-6 py-3 rounded-xl shadow-[0_8px_30px_rgba(16,185,129,0.4)] flex items-center gap-3 animate-[fadeIn_0.3s_ease]">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-bold tracking-wide">Data submitted successfully!</span>
        </div>
      )}
    </div>
  );
};

export default DataEntry;