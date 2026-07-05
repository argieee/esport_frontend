import React, { useState, useEffect, useRef } from 'react';

const Mapping = () => {
  const [activeTab, setActiveTab] = useState('CURRENT MATCH');
  const [game, setGame] = useState('Valorant');
  
  // Editable Team Names
  const [teamA, setTeamA] = useState('Team A');
  const [teamB, setTeamB] = useState('Team B');

  // Veto State
  const [vetoActive, setVetoActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const timerRef = useRef(null);

  const tabs = ['CURRENT MATCH', 'MAP POOL SETTINGS', 'BAN HISTORY', 'TEAM SETTINGS', 'ADMIN TOOLS'];

  const initialValMaps = [
    { id: 'v1', name: 'CORRODE', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600' },
    { id: 'v2', name: 'ABYSS', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600' },
    { id: 'v3', name: 'SUNSET', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1623934199716-f331c19b0f47?q=80&w=600' },
    { id: 'v4', name: 'LOTUS', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600' },
    { id: 'v5', name: 'PEARL', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=600' },
    { id: 'v6', name: 'FRACTURE', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600' },
    { id: 'v7', name: 'BREEZE', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=600' },
    { id: 'v8', name: 'ICEBOX', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600' },
    { id: 'v9', name: 'BIND', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1505775561242-7276188ed08c?q=80&w=600' },
  ];

  const initialCfMaps = [
    { id: 'c1', name: 'BLACK WIDOW', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1505775561242-7276188ed08c?q=80&w=600' },
    { id: 'c2', name: 'PORT', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600' },
    { id: 'c3', name: 'COMPOUND', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600' },
    { id: 'c4', name: 'ANKARA', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=600' },
    { id: 'c5', name: 'SUB BASE', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1623934199716-f331c19b0f47?q=80&w=600' },
    { id: 'c6', name: 'EAGLE EYE', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600' },
    { id: 'c7', name: 'MEXICO', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=600' },
    { id: 'c8', name: 'FACTORY', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600' },
    { id: 'c9', name: 'SANTORIA', status: 'none', byTeam: null, img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600' },
  ];

  const [valMaps, setValMaps] = useState(initialValMaps);
  const [cfMaps, setCfMaps] = useState(initialCfMaps);

  const currentMaps = game === 'Valorant' ? valMaps : cfMaps;
  const setCurrentMaps = game === 'Valorant' ? setValMaps : setCfMaps;

  // Veto sequence for 9 maps (8 actions to leave 1 decider)
  const vetoSequence = [
    { team: 'A', action: 'ban' },
    { team: 'B', action: 'ban' },
    { team: 'A', action: 'pick' },
    { team: 'B', action: 'pick' },
    { team: 'A', action: 'ban' },
    { team: 'B', action: 'ban' },
    { team: 'A', action: 'ban' },
    { team: 'B', action: 'ban' },
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
    const availableMaps = currentMaps.filter(m => m.status === 'none');
    if (availableMaps.length > 0) {
      const randomMap = availableMaps[Math.floor(Math.random() * availableMaps.length)];
      handleMapClick(randomMap.id);
    }
  };

  const checkDecider = (maps) => {
    const availableMaps = maps.filter(m => m.status === 'none');
    if (availableMaps.length === 1) {
      // Auto-set decider
      const updatedMaps = maps.map(m => m.id === availableMaps[0].id ? { ...m, status: 'decider', byTeam: 'none' } : m);
      setCurrentMaps(updatedMaps);
      setVetoActive(false);
    }
  };

  const handleMapClick = (mapId) => {
    if (!vetoActive || !currentPhase) return;

    const map = currentMaps.find(m => m.id === mapId);
    if (map.status !== 'none') return; // already acted upon

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
    setTimeLeft(30);

    // If all actions done, find decider
    if (nextPhaseIndex === vetoSequence.length) {
      checkDecider(updatedMaps);
    }
  };

  const toggleVeto = () => {
    if (phaseIndex >= vetoSequence.length && !vetoActive) return; // Veto complete
    setVetoActive(!vetoActive);
  };

  const resetVeto = () => {
    setVetoActive(false);
    setPhaseIndex(0);
    setTimeLeft(30);
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
    setTimeLeft(30);
  };

  // SVG Circle calculations
  const circleRadius = 36;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (timeLeft / 30) * circleCircumference;
  const isTimeLow = timeLeft <= 5;

  return (
    <div className="flex-1 p-6 lg:p-8 bg-[#040814] overflow-y-auto w-full h-full text-white font-sans custom-scrollbar">
      
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
              <div className="absolute bottom-[-2px] left-0 w-full h-0.5 bg-[#00ffcc] shadow-[0_0_8px_rgba(0,255,204,0.6)]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Main Panel */}
      <div className="bg-[#0B1120] rounded-2xl border border-slate-800/60 p-6 lg:p-8 shadow-2xl mb-12">
        
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
                    {/* Background ring */}
                    <circle cx="50" cy="50" r={40} fill="transparent" stroke="#1e293b" strokeWidth="6" />
                    {/* Progress ring */}
                    <circle 
                      cx="50" cy="50" r={40} fill="transparent" 
                      stroke={isTimeLow ? '#ef4444' : '#00ffcc'} 
                      strokeWidth="6" 
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={2 * Math.PI * 40 - (timeLeft / 30) * (2 * Math.PI * 40)}
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
            
            {/* Turn Indicator positioned safely below */}
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
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-2 bg-slate-900/60 rounded-xl border border-slate-800/60">
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {currentMaps.map((m) => {
            const isClickable = vetoActive && currentPhase && m.status === 'none';
            const teamColorStr = m.byTeam === 'A' ? 'blue' : m.byTeam === 'B' ? 'red' : 'gray';
            const teamHex = m.byTeam === 'A' ? '#3b82f6' : '#ef4444'; // blue-500 : red-500
            
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

                {/* Gradient overlays for team colors */}
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
                {isClickable && currentPhase && (
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

                {/* Banned State */}
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
                
                {/* Picked State */}
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

                {/* Decider State */}
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

      </div>
    </div>
  );
};

export default Mapping;