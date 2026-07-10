import React, { useState, useEffect, useRef } from 'react';

// --- ICONS ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
);
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
);
const ExclamationIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-10 w-10 text-amber-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);

// --- REUSABLE UI ELEMENTS ---
const ToggleSwitch = ({ enabled, onChange }) => (
  <button 
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shadow-inner ${enabled ? 'bg-[#00ffcc]' : 'bg-slate-700'}`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);


// --- MAIN COMPONENT ---
const Mapping = () => {
  const [activeTab, setActiveTab] = useState('CURRENT MATCH');
  const [game, setGame] = useState('Valorant');
  
  // Editable Team Names
  const [teamA, setTeamA] = useState('Team A');
  const [teamB, setTeamB] = useState('Team B');

  // Veto State
  const [vetoActive, setVetoActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const timerRef = useRef(null);

  const tabs = ['CURRENT MATCH', 'MAP POOL SETTINGS', 'BAN HISTORY', 'TEAM SETTINGS', 'ADMIN TOOLS'];

  const initialValMaps = [
    { id: 'v1', name: 'CORRODE', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600' },
    { id: 'v2', name: 'ABYSS', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600' },
    { id: 'v3', name: 'SUNSET', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1623934199716-f331c19b0f47?q=80&w=600' },
    { id: 'v4', name: 'LOTUS', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600' },
    { id: 'v5', name: 'PEARL', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=600' },
    { id: 'v6', name: 'FRACTURE', status: 'none', byTeam: null, side: null, enabled: false, img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600' },
    { id: 'v7', name: 'BREEZE', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=600' },
    { id: 'v8', name: 'ICEBOX', status: 'none', byTeam: null, side: null, enabled: false, img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600' },
    { id: 'v9', name: 'BIND', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1505775561242-7276188ed08c?q=80&w=600' },
  ];

  const initialCfMaps = [
    { id: 'c1', name: 'BLACK WIDOW', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1505775561242-7276188ed08c?q=80&w=600' },
    { id: 'c2', name: 'PORT', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600' },
    { id: 'c3', name: 'COMPOUND', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600' },
    { id: 'c4', name: 'ANKARA', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=600' },
    { id: 'c5', name: 'SUB BASE', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1623934199716-f331c19b0f47?q=80&w=600' },
    { id: 'c6', name: 'EAGLE EYE', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600' },
    { id: 'c7', name: 'MEXICO', status: 'none', byTeam: null, side: null, enabled: true, img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=600' },
    { id: 'c8', name: 'FACTORY', status: 'none', byTeam: null, side: null, enabled: false, img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600' },
    { id: 'c9', name: 'SANTORIA', status: 'none', byTeam: null, side: null, enabled: false, img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600' },
  ];

  const [valMaps, setValMaps] = useState(initialValMaps);
  const [cfMaps, setCfMaps] = useState(initialCfMaps);

  const currentMaps = game === 'Valorant' ? valMaps : cfMaps;
  const setCurrentMaps = game === 'Valorant' ? setValMaps : setCfMaps;

  // Alternating BO3 veto sequence (Leaves 1 Decider from 7 maps)
  const vetoSequence = [
    { team: 'A', action: 'ban', label: 'BAN 1' },
    { team: 'B', action: 'ban', label: 'BAN 2' },
    { team: 'A', action: 'pick', label: 'PICK 1' },
    { team: 'B', action: 'side', label: 'SIDE 1' },
    { team: 'B', action: 'pick', label: 'PICK 2' },
    { team: 'A', action: 'side', label: 'SIDE 2' },
    { team: 'A', action: 'ban', label: 'BAN 3' },
    { team: 'B', action: 'ban', label: 'BAN 4' },
    { team: 'A', action: 'side', label: 'DECIDER SIDE' },
  ];

  const currentPhase = phaseIndex < vetoSequence.length ? vetoSequence[phaseIndex] : null;

  // Auto-skip logic when timer hits 0
  useEffect(() => {
    if (vetoActive && timeLeft === 0 && currentPhase) {
      autoPlayTurn();
    }
  }, [timeLeft, vetoActive, currentPhase]);

  // Timer interval
  useEffect(() => {
    if (vetoActive && currentPhase) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [vetoActive, currentPhase]);

  const autoPlayTurn = () => {
    if (currentPhase.action === 'side') {
      const sides = game === 'Valorant' ? ['ATK', 'DEF'] : ['BL', 'GR'];
      const randomSide = sides[Math.floor(Math.random() * sides.length)];
      handleSidePick(randomSide);
      return;
    }

    const availableMaps = currentMaps.filter(m => m.status === 'none' && m.enabled);
    if (availableMaps.length > 0) {
      const randomMap = availableMaps[Math.floor(Math.random() * availableMaps.length)];
      handleMapClick(randomMap.id);
    }
  };

  const checkDecider = (maps) => {
    const availableMaps = maps.filter(m => m.status === 'none' && m.enabled);
    if (availableMaps.length === 1) {
      // Auto-set decider
      const updatedMaps = maps.map(m => m.id === availableMaps[0].id ? { ...m, status: 'decider', byTeam: 'none' } : m);
      setCurrentMaps(updatedMaps);
    }
  };

  const handleMapClick = (mapId) => {
    if (!vetoActive || !currentPhase || currentPhase.action === 'side') return;

    const map = currentMaps.find(m => m.id === mapId);
    if (map.status !== 'none' || !map.enabled) return; // already acted upon or disabled

    const updatedMaps = currentMaps.map((m) => {
      if (m.id === mapId) {
        return {
          ...m,
          status: currentPhase.action === 'ban' ? 'banned' : 'picked',
          byTeam: currentPhase.team,
        };
      }
      return m;
    });

    setCurrentMaps(updatedMaps);
    
    // Advance Phase
    const nextPhaseIndex = phaseIndex + 1;
    setPhaseIndex(nextPhaseIndex);
    setTimeLeft(45);

    // If all actions done, find decider (or we check decider before side pick of decider)
    checkDecider(updatedMaps);
  };

  const handleSidePick = (sideStr) => {
    if (!vetoActive || !currentPhase || currentPhase.action !== 'side') return;

    // Find the last picked or decider map that doesn't have a side yet
    const targetMap = currentMaps.slice().reverse().find(m => 
      (m.status === 'picked' || m.status === 'decider') && m.side === null
    );

    if (targetMap) {
      const updatedMaps = currentMaps.map((m) => {
        if (m.id === targetMap.id) {
          return { ...m, side: sideStr, sideByTeam: currentPhase.team };
        }
        return m;
      });
      setCurrentMaps(updatedMaps);
    }

    // Advance Phase
    const nextPhaseIndex = phaseIndex + 1;
    setPhaseIndex(nextPhaseIndex);
    setTimeLeft(45);
    
    if (nextPhaseIndex >= vetoSequence.length) {
      setVetoActive(false); // Veto completely finished
    }
  };

  const toggleVeto = () => {
    if (phaseIndex >= vetoSequence.length && !vetoActive) return; // Veto complete
    setVetoActive(!vetoActive);
  };

  const resetVeto = () => {
    setVetoActive(false);
    setPhaseIndex(0);
    setTimeLeft(45);
    if (game === 'Valorant') {
      setValMaps(initialValMaps);
    } else {
      setCfMaps(initialCfMaps);
    }
  };

  const handleGameSwitch = (e) => {
    setGame(e.target.value);
    setVetoActive(false);
    setPhaseIndex(0);
    setTimeLeft(45);
  };

  // --- SUB-VIEWS RENDERERS ---

  const renderCurrentMatch = () => {
    const circleRadius = 36;
    const circleCircumference = 2 * Math.PI * circleRadius;
    const isTimeLow = timeLeft <= 5;
    
    return (
      <>
        {/* Header Section */}
        <div className="flex flex-col xl:flex-row justify-between items-center gap-6 mb-10 pb-8 border-b border-slate-800/60">
          
          {/* Left: Game Switcher */}
          <div className="flex items-center gap-3 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.05] shrink-0">
            <button 
              onClick={() => handleGameSwitch({target: {value: 'Valorant'}})}
              className={`px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase transition-all ${game === 'Valorant' ? 'bg-[#ff4655] text-white shadow-[0_0_15px_rgba(255,70,85,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}
            >
              Valorant
            </button>
            <button 
              onClick={() => handleGameSwitch({target: {value: 'Crossfire'}})}
              className={`px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase transition-all ${game === 'Crossfire' ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'}`}
            >
              Crossfire
            </button>
          </div>

          {/* Center: Veto Controls & Timer */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-8 bg-slate-900/50 p-5 rounded-3xl border border-slate-800/50 shadow-lg">
              
              {/* Team A (Blue) */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] text-blue-400 font-bold tracking-[0.2em] uppercase">Team A</span>
                <input 
                  type="text" 
                  value={teamA} 
                  onChange={(e) => setTeamA(e.target.value)}
                  className="bg-[#1d4ed8]/20 border border-[#1d4ed8]/50 text-white text-base font-black px-4 py-2.5 rounded-xl outline-none text-center w-36 focus:border-[#60a5fa] transition-colors focus:bg-[#1d4ed8]/40 shadow-[0_0_15px_rgba(29,78,216,0.2)]"
                />
              </div>

              {/* Timer */}
              <div className="relative flex flex-col items-center justify-center">
                <div className={`relative flex items-center justify-center rounded-full ${isTimeLow && vetoActive ? 'timer-pulse' : ''} bg-slate-900 shadow-inner`}>
                  <svg width="100" height="100" className="transform -rotate-90">
                    <circle cx="50" cy="50" r={40} fill="transparent" stroke="#1e293b" strokeWidth="6" />
                    <circle 
                      cx="50" cy="50" r={40} fill="transparent" 
                      stroke={isTimeLow ? '#ef4444' : '#00ffcc'} 
                      strokeWidth="6" 
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 - (timeLeft / 45) * (2 * Math.PI * 40)}
                      className="transition-all duration-1000 ease-linear"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className={`text-3xl font-black ${isTimeLow ? 'text-red-500' : 'text-white'}`}>{timeLeft}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest -mt-1">Sec</span>
                  </div>
                </div>
              </div>

              {/* Team B (Red) */}
              <div className="flex flex-col items-center gap-3">
                <span className="text-[10px] text-red-400 font-bold tracking-[0.2em] uppercase">Team B</span>
                <input 
                  type="text" 
                  value={teamB} 
                  onChange={(e) => setTeamB(e.target.value)}
                  className="bg-[#b91c1c]/20 border border-[#b91c1c]/50 text-white text-base font-black px-4 py-2.5 rounded-xl outline-none text-center w-36 focus:border-[#f87171] transition-colors focus:bg-[#b91c1c]/40 shadow-[0_0_15px_rgba(185,28,28,0.2)]"
                />
              </div>

            </div>
            
            {/* Turn Indicator */}
            <div className="whitespace-nowrap text-center">
              {currentPhase ? (
                <span className="text-[12px] font-black uppercase tracking-[0.25em]">
                  <span className="text-slate-400">TURN: </span>
                  <span className={currentPhase.team === 'A' ? 'text-blue-400' : 'text-red-400'}>
                    {currentPhase.team === 'A' ? teamA : teamB}
                  </span>
                </span>
              ) : (
                <span className="text-[12px] font-black uppercase tracking-[0.25em] text-[#00ffcc]">DECIDER</span>
              )}
            </div>
          </div>
          
          {/* Right: Veto Actions */}
          <div className="flex flex-row xl:flex-col gap-3 shrink-0">
            <button 
              onClick={toggleVeto}
              disabled={!currentPhase}
              className={`px-8 py-3.5 rounded-xl text-[13px] font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 shadow-lg border ${
                !currentPhase ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed' :
                vetoActive 
                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                  : 'bg-[#00ffcc]/10 text-[#00ffcc] border-[#00ffcc]/30 hover:bg-[#00ffcc]/20 shadow-[0_0_20px_rgba(0,255,204,0.2)]'
              }`}
            >
              {vetoActive ? 'PAUSE VETO' : (phaseIndex > 0 && currentPhase ? 'RESUME' : 'START VETO')}
            </button>
            <button 
              onClick={resetVeto}
              className="px-8 py-3.5 rounded-xl text-[13px] font-black uppercase tracking-[0.2em] transition-all transform hover:scale-105 active:scale-95 bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700/50"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Phase Timeline / Status Bar */}
        <div className="flex justify-center mb-8 w-full max-w-full overflow-x-auto pb-2 custom-scrollbar">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-slate-900/60 rounded-xl border border-slate-800/60 min-w-max">
            {vetoSequence.map((seq, idx) => (
              <div 
                key={idx} 
                className={`px-4 py-2 rounded-lg flex flex-col items-center justify-center transition-colors border ${
                  idx < phaseIndex ? 'bg-slate-800 border-slate-700 opacity-50' :
                  idx === phaseIndex ? 'bg-white/[0.08] border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]' :
                  'bg-transparent border-transparent opacity-40'
                }`}
              >
                <span className={`text-[10px] font-bold tracking-widest ${seq.team === 'A' ? 'text-blue-400' : 'text-red-400'}`}>T-{seq.team}</span>
                <span className={`text-[11px] font-black tracking-widest uppercase ${seq.action === 'ban' ? 'text-red-500' : 'text-green-400'}`}>{seq.action}</span>
              </div>
            ))}
            <div className={`px-4 py-2 rounded-lg flex items-center justify-center transition-colors border ${
              !currentPhase ? 'bg-[#00ffcc]/20 border-[#00ffcc]/50 shadow-[0_0_15px_rgba(0,255,204,0.3)]' : 'bg-transparent border-transparent opacity-40'
            }`}>
              <span className="text-[11px] font-black tracking-widest text-[#00ffcc]">DECIDER</span>
            </div>
          </div>
        </div>

        {/* Maps Grid */}
        <div className="relative mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentMaps.map((m) => {
            const isClickable = vetoActive && currentPhase && m.status === 'none' && m.enabled;
            const teamColorStr = m.byTeam === 'A' ? 'blue' : m.byTeam === 'B' ? 'red' : 'gray';
            const teamHex = m.byTeam === 'A' ? '#3b82f6' : '#ef4444';
            
            if (!m.enabled) return null; // Hide disabled maps from veto UI

            return (
              <div 
                key={m.id} 
                onClick={() => isClickable && handleMapClick(m.id)}
                className={`veto-card-enter relative aspect-[16/8] rounded-2xl overflow-hidden transition-all duration-400 
                  ${isClickable ? 'cursor-pointer hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] group border-[2px] border-slate-700 hover:border-slate-400' : 'border-[2px] border-slate-800/60'}
                  ${m.status === 'banned' ? `border-${teamColorStr}-500 shadow-[0_0_20px_rgba(${m.byTeam === 'A' ? '59,130,246' : '239,68,68'},0.3)]` : ''}
                  ${m.status === 'picked' ? `border-${teamColorStr}-500 shadow-[0_0_20px_rgba(${m.byTeam === 'A' ? '59,130,246' : '239,68,68'},0.3)]` : ''}
                  ${m.status === 'decider' ? 'border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)] scale-[1.02] z-10' : ''}
                `}
              >
                {/* Background Image */}
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 
                    ${m.status === 'banned' ? 'opacity-30 blur-[3px] grayscale' : 
                      m.status === 'picked' ? 'opacity-50' : 
                      m.status === 'decider' ? 'opacity-100 scale-105' : 'opacity-60'}
                    ${isClickable ? 'group-hover:opacity-100 group-hover:scale-105' : ''}
                  `}
                  style={{ backgroundImage: `url(${m.img})` }}
                ></div>

                {/* Gradient overlays */}
                {m.status === 'picked' && (
                  <div className={`absolute inset-0 opacity-70 bg-gradient-to-t from-transparent ${m.byTeam === 'A' ? 'to-blue-900' : 'to-red-900'}`}></div>
                )}
                {m.status === 'banned' && (
                  <div className={`absolute inset-0 opacity-50 bg-gradient-to-t from-transparent ${m.byTeam === 'A' ? 'to-blue-900' : 'to-red-900'}`}></div>
                )}

                {/* Map Name Badge */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className={`px-4 py-1.5 rounded-lg text-sm font-black uppercase tracking-[0.3em] backdrop-blur-md shadow-lg border ${
                    m.status === 'decider' ? 'bg-amber-400 text-amber-950 border-amber-300' : 'bg-black/60 text-white border-white/10'
                  }`}>
                    {m.name}
                  </span>
                </div>
                
                {/* Hover interaction overlay */}
                {isClickable && currentPhase && currentPhase.action !== 'side' && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20">
                    <div className={`px-6 py-3 rounded-xl border-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ${
                      currentPhase.action === 'ban' 
                        ? currentPhase.team === 'A' ? 'bg-blue-600/90 border-blue-400 text-white' : 'bg-red-600/90 border-red-400 text-white'
                        : currentPhase.team === 'A' ? 'bg-blue-500/90 border-blue-300 text-white' : 'bg-red-500/90 border-red-300 text-white'
                    }`}>
                      <span className="text-sm font-black uppercase tracking-[0.2em]">
                        CLICK TO {currentPhase.action.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Side Indicator */}
                {m.side && (
                  <div className="absolute top-4 left-4 z-30">
                    <span className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-slate-900/90 border border-slate-700 text-white shadow-lg">
                      SIDE: <span className="text-[#00ffcc]">{m.side}</span>
                    </span>
                  </div>
                )}

                {/* Action States (✓, ✕, Decider) */}
                {m.status === 'banned' && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                    <span className="text-8xl font-black drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] opacity-90" style={{color: teamHex}}>✕</span>
                    <div className="absolute top-4 right-4">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase shadow-xl tracking-[0.2em] border ${
                        m.byTeam === 'A' ? 'bg-blue-600/90 text-white border-blue-400' : 'bg-red-600/90 text-white border-red-400'
                      }`}>
                        BANNED BY {m.byTeam === 'A' ? teamA : teamB}
                      </span>
                    </div>
                  </div>
                )}
                {m.status === 'picked' && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                    <span className="text-8xl font-black drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] opacity-90" style={{color: teamHex}}>✓</span>
                    <div className="absolute top-4 right-4">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase shadow-xl tracking-[0.2em] border ${
                        m.byTeam === 'A' ? 'bg-blue-600/90 text-white border-blue-400' : 'bg-red-600/90 text-white border-red-400'
                      }`}>
                        PICKED BY {m.byTeam === 'A' ? teamA : teamB}
                      </span>
                    </div>
                  </div>
                )}
                {m.status === 'decider' && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-amber-500/10">
                    <div className="absolute top-4 right-4">
                      <span className="bg-amber-400 text-amber-950 border border-amber-300 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase shadow-[0_0_15px_rgba(251,191,36,0.5)] tracking-[0.2em]">
                        DECIDER MAP
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          </div>

          {/* SIDE PICK OVERLAY */}
          {vetoActive && currentPhase?.action === 'side' && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#040814]/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <div className="bg-[#0b121e] border border-slate-700/60 p-10 rounded-3xl flex flex-col items-center gap-8 shadow-2xl transform animate-[fadeInScale_0.3s_ease-out] min-w-[500px]">
                <h3 className="text-2xl font-black uppercase tracking-widest text-white text-center">
                  <span className={currentPhase.team === 'A' ? 'text-blue-400' : 'text-red-400'}>{currentPhase.team === 'A' ? teamA : teamB}</span>
                  <br />
                  <span className="text-slate-400 text-lg mt-2 inline-block">SELECT STARTING SIDE</span>
                </h3>
                
                <div className="flex gap-6 w-full">
                  {game === 'Valorant' ? (
                    <>
                      <button onClick={() => handleSidePick('ATK')} className="flex-1 py-8 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/20 text-amber-500 font-black text-xl uppercase tracking-widest transition-all">ATTACKER</button>
                      <button onClick={() => handleSidePick('DEF')} className="flex-1 py-8 rounded-2xl bg-teal-500/10 border-2 border-teal-500/30 hover:border-teal-500 hover:bg-teal-500/20 text-teal-500 font-black text-xl uppercase tracking-widest transition-all">DEFENDER</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleSidePick('BL')} className="flex-1 py-8 rounded-2xl bg-slate-900 border-2 border-yellow-500/30 hover:border-yellow-500 hover:bg-yellow-500/10 text-yellow-500 font-black text-xl uppercase tracking-widest transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">BL <br/><span className="text-xs text-yellow-500/60">Black List</span></button>
                      <button onClick={() => handleSidePick('GR')} className="flex-1 py-8 rounded-2xl bg-slate-900 border-2 border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 text-blue-500 font-black text-xl uppercase tracking-widest transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]">GR <br/><span className="text-xs text-blue-500/60">Global Risk</span></button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const renderMapPoolSettings = () => {
    // Allows enabling/disabling maps from the pool
    const toggleMapEnabled = (id) => {
      const updated = currentMaps.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m);
      setCurrentMaps(updated);
    };

    return (
      <div className="animate-[fadeInScale_0.3s_ease-out]">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800/60 pb-6">
          <div>
            <h2 className="text-2xl font-black tracking-widest uppercase">Map Pool Settings</h2>
            <p className="text-slate-400 text-sm mt-1">Configure which maps are available for the veto process in {game}.</p>
          </div>
          <div className="flex space-x-4">
             <button onClick={() => setCurrentMaps(currentMaps.map(m => ({...m, enabled: true})))} className="px-5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold transition-colors">Select All</button>
             <button onClick={() => setCurrentMaps(currentMaps.map(m => ({...m, enabled: false})))} className="px-5 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold transition-colors">Deselect All</button>
             <button className="px-5 py-2 rounded-lg bg-[#00ffcc]/20 text-[#00ffcc] border border-[#00ffcc]/30 hover:bg-[#00ffcc]/30 text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,255,204,0.2)]">Save Configuration</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentMaps.map((m) => (
             <div key={m.id} className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all ${m.enabled ? 'border-slate-600' : 'border-slate-800 opacity-60'}`}>
                <div className={`absolute inset-0 bg-cover bg-center ${!m.enabled ? 'grayscale brightness-50' : ''}`} style={{ backgroundImage: `url(${m.img})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                   <span className="text-sm font-black uppercase tracking-widest">{m.name}</span>
                   <ToggleSwitch enabled={m.enabled} onChange={() => toggleMapEnabled(m.id)} />
                </div>
             </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBanHistory = () => {
    // Mock History Data
    const history = [
      { id: '1', date: 'Oct 24, 2026', game: 'Valorant', teamA: 'TNC', teamB: 'LOUD', decider: 'ASCENT', result: 'Completed' },
      { id: '2', date: 'Oct 22, 2026', game: 'Crossfire', teamA: 'AG', teamB: 'Q9', decider: 'BLACK WIDOW', result: 'Completed' },
      { id: '3', date: 'Oct 20, 2026', game: 'Valorant', teamA: 'Fnatic', teamB: 'Paper Rex', decider: 'LOTUS', result: 'Completed' },
      { id: '4', date: 'Oct 15, 2026', game: 'Valorant', teamA: 'Sentinels', teamB: '100T', decider: 'SPLIT', result: 'Admin Aborted' },
    ];

    return (
      <div className="animate-[fadeInScale_0.3s_ease-out]">
        <div className="flex justify-between items-center mb-8 border-b border-slate-800/60 pb-6">
          <div>
            <h2 className="text-2xl font-black tracking-widest uppercase">Veto History Log</h2>
            <p className="text-slate-400 text-sm mt-1">Review past map vetoes, bans, and picks.</p>
          </div>
          <div className="flex space-x-4">
             <div className="relative">
                <input type="text" placeholder="Search team or map..." className="bg-slate-900 border border-slate-700 text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#00ffcc] w-64 transition-colors text-white" />
                <div className="absolute left-3 top-2.5"><SearchIcon /></div>
             </div>
             <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-bold text-slate-300 transition-colors border border-slate-700">
                <DownloadIcon />
                <span>Export CSV</span>
             </button>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl border border-slate-800/60 overflow-hidden">
           <table className="w-full text-left text-sm">
              <thead className="bg-slate-800 text-slate-400">
                 <tr>
                    <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs">Date</th>
                    <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs">Game</th>
                    <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs">Matchup</th>
                    <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs">Decider Map</th>
                    <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs text-center">Status</th>
                    <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                 {history.map(row => (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition-colors group">
                       <td className="px-6 py-4 text-slate-300">{row.date}</td>
                       <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${row.game === 'Valorant' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>{row.game}</span></td>
                       <td className="px-6 py-4 font-bold text-white">{row.teamA} <span className="text-slate-500 font-normal mx-2">vs</span> {row.teamB}</td>
                       <td className="px-6 py-4 font-black tracking-widest text-[#00ffcc]">{row.decider}</td>
                       <td className="px-6 py-4 text-center">
                          <span className={`text-xs font-bold ${row.result === 'Completed' ? 'text-green-400' : 'text-red-400'}`}>{row.result}</span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button className="text-[#00ffcc] hover:text-white text-xs font-bold uppercase tracking-wider underline opacity-0 group-hover:opacity-100 transition-opacity">View Details</button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    );
  };

  const renderTeamSettings = () => {
    return (
      <div className="animate-[fadeInScale_0.3s_ease-out]">
        <div className="mb-8 border-b border-slate-800/60 pb-6">
          <h2 className="text-2xl font-black tracking-widest uppercase">Team Settings</h2>
          <p className="text-slate-400 text-sm mt-1">Configure team identities, logos, and accent colors for the veto interface.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
           {/* Team A Card */}
           <div className="bg-slate-900/50 rounded-2xl border border-blue-900/50 p-8 shadow-[0_0_30px_rgba(29,78,216,0.1)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none"></div>
              <h3 className="text-lg font-black tracking-widest text-blue-400 uppercase mb-6">Team A Settings</h3>
              
              <div className="space-y-6 relative z-10">
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Display Name</label>
                    <input type="text" value={teamA} onChange={(e)=>setTeamA(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                 </div>
                 
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Accent Color</label>
                    <div className="flex space-x-3">
                       <button className="w-10 h-10 rounded-full bg-blue-600 ring-2 ring-white shadow-lg"></button>
                       <button className="w-10 h-10 rounded-full bg-indigo-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                       <button className="w-10 h-10 rounded-full bg-cyan-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Team Logo</label>
                    <div className="border-2 border-dashed border-slate-700 bg-slate-800/50 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-slate-800 transition-colors cursor-pointer">
                       <UploadIcon />
                       <span className="text-sm text-blue-400 font-bold">Click to upload logo</span>
                       <span className="text-[10px] text-slate-500 mt-1">PNG, JPG up to 2MB (Square aspect ratio recommended)</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Team B Card */}
           <div className="bg-slate-900/50 rounded-2xl border border-red-900/50 p-8 shadow-[0_0_30px_rgba(185,28,28,0.1)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent pointer-events-none"></div>
              <h3 className="text-lg font-black tracking-widest text-red-400 uppercase mb-6">Team B Settings</h3>
              
              <div className="space-y-6 relative z-10">
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Display Name</label>
                    <input type="text" value={teamB} onChange={(e)=>setTeamB(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors" />
                 </div>
                 
                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Accent Color</label>
                    <div className="flex space-x-3">
                       <button className="w-10 h-10 rounded-full bg-red-600 ring-2 ring-white shadow-lg"></button>
                       <button className="w-10 h-10 rounded-full bg-orange-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                       <button className="w-10 h-10 rounded-full bg-pink-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Team Logo</label>
                    <div className="border-2 border-dashed border-slate-700 bg-slate-800/50 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-red-500 hover:bg-slate-800 transition-colors cursor-pointer">
                       <UploadIcon />
                       <span className="text-sm text-red-400 font-bold">Click to upload logo</span>
                       <span className="text-[10px] text-slate-500 mt-1">PNG, JPG up to 2MB (Square aspect ratio recommended)</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>
        <div className="mt-8 flex justify-end">
           <button className="px-8 py-3 rounded-lg bg-[#00ffcc]/20 text-[#00ffcc] border border-[#00ffcc]/30 hover:bg-[#00ffcc] hover:text-black font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,255,204,0.2)]">Save Team Profiles</button>
        </div>
      </div>
    );
  };

  const renderAdminTools = () => {
    return (
      <div className="animate-[fadeInScale_0.3s_ease-out]">
        <div className="mb-8 border-b border-slate-800/60 pb-6">
          <h2 className="text-2xl font-black tracking-widest uppercase">Admin Veto Tools</h2>
          <p className="text-slate-400 text-sm mt-1">Powerful overrides and match controls. Use with caution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
           <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-600 transition-colors">
              <div>
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Reverse Last Action</h3>
                 <p className="text-xs text-slate-500 mb-6">Undo the last map ban or pick. Restores the timer and phase state to the previous turn.</p>
              </div>
              <button className="w-full py-2.5 rounded bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider border border-slate-700 transition-colors">Undo Action</button>
           </div>

           <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-600 transition-colors">
              <div>
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Override Turn Timer</h3>
                 <p className="text-xs text-slate-500 mb-6">Manually adjust the current turn's timer countdown.</p>
                 <div className="flex space-x-2 mb-4">
                    <button className="flex-1 py-1 bg-slate-800 rounded text-xs font-bold text-slate-300 hover:bg-slate-700">+10s</button>
                    <button className="flex-1 py-1 bg-slate-800 rounded text-xs font-bold text-slate-300 hover:bg-slate-700">+30s</button>
                    <button className="flex-1 py-1 bg-slate-800 rounded text-xs font-bold text-red-400 hover:bg-slate-700">Force 0s</button>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-600 transition-colors">
              <div>
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Manual Map Status Override</h3>
                 <p className="text-xs text-slate-500 mb-6">Force a specific map to be banned, picked, or selected as the decider.</p>
                 <select className="w-full bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded py-2 px-3 mb-2 focus:outline-none">
                    <option>Select Map...</option>
                    {currentMaps.map(m => <option key={m.id}>{m.name}</option>)}
                 </select>
              </div>
              <div className="flex space-x-2 mt-2">
                 <button className="flex-1 py-2 bg-red-900/30 text-red-400 border border-red-900/50 rounded text-xs font-bold hover:bg-red-900/50 transition-colors">Force Ban</button>
                 <button className="flex-1 py-2 bg-blue-900/30 text-blue-400 border border-blue-900/50 rounded text-xs font-bold hover:bg-blue-900/50 transition-colors">Force Pick</button>
              </div>
           </div>

           <div className="col-span-full mt-6 bg-red-950/20 rounded-xl border border-red-900/30 p-8 flex flex-col items-center justify-center text-center">
              <ExclamationIcon />
              <h3 className="text-lg font-black text-red-500 uppercase tracking-widest mb-2">Danger Zone</h3>
              <p className="text-sm text-red-400/80 mb-6 max-w-lg">Performing a hard reset will wipe all current veto progress, map states, and timer data. This cannot be undone.</p>
              <button onClick={resetVeto} className="px-8 py-3 rounded-lg bg-red-600 text-white font-black uppercase tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:bg-red-500 hover:scale-105 transition-all">Hard Reset Match Data</button>
           </div>

        </div>
      </div>
    );
  };


  return (
    <div className="flex-1 bg-[#040814] overflow-y-auto w-full h-full text-white font-sans custom-scrollbar flex flex-col items-center">
      <div className="w-full max-w-[1400px] px-8 lg:px-12 py-6 lg:py-8">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          50% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
        }
        .timer-pulse {
          animation: pulse-red 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .veto-card-enter {
          animation: fadeInScale 0.4s ease-out forwards;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />

      {/* Top Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-6 md:gap-8 border-b border-slate-800/60 pb-3 mb-6 w-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-2 whitespace-nowrap transition-colors text-sm font-bold uppercase tracking-wide ${
              activeTab === tab ? 'text-[#00ffcc]' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-[#00ffcc] shadow-[0_0_8px_rgba(0,255,204,0.6)] animate-[fadeInScale_0.2s_ease-out]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Dynamic Main Panel */}
      <div className="bg-[#0B1120] rounded-2xl border border-slate-800/60 p-6 lg:p-8 shadow-2xl mb-12 min-h-[600px]">
        {activeTab === 'CURRENT MATCH' && renderCurrentMatch()}
        {activeTab === 'MAP POOL SETTINGS' && renderMapPoolSettings()}
        {activeTab === 'BAN HISTORY' && renderBanHistory()}
        {activeTab === 'TEAM SETTINGS' && renderTeamSettings()}
        {activeTab === 'ADMIN TOOLS' && renderAdminTools()}
      </div>
      
      </div>
    </div>
  );
};

export default Mapping;