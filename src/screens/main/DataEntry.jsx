import React, { useState } from 'react';

const DataEntry = () => {
  // Global Match Data
  const [broadcast, setBroadcast] = useState(false);
  const [game, setGame] = useState('Valorant');
  const [league, setLeague] = useState('VCT Pacific');
  const [stage, setStage] = useState('PLAYOFFS - DAY 2');
  const [match, setMatch] = useState('GAME 1 - BO3');

  // Teams
  const [teamA, setTeamA] = useState({ name: 'WOLF ESPORT', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200' });
  const [teamB, setTeamB] = useState({ name: 'GOAT GAMING', logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=200' });
  const [winner, setWinner] = useState('A');

  // Map Module
  const [mapName, setMapName] = useState('Bind');
  const [scoreA, setScoreA] = useState(13);
  const [scoreB, setScoreB] = useState(11);
  
  // Round Tracker (24 rounds standard)
  const initialRounds = Array(24).fill('');
  // Fill first 13 rounds for example
  ['A','A','A','B','A','B','A','A','B','A','B','A','A'].forEach((val, i) => initialRounds[i] = val);
  const [rounds, setRounds] = useState(initialRounds);

  // Player Stats
  const initialPlayer = { ign: 'Player IGN', agent: 'Jett', k: 0, d: 0, a: 0, acs: 0, econ: 0 };
  const [playersA, setPlayersA] = useState(Array(5).fill({ ...initialPlayer, ign: 'Player 1: WOLF' }));
  const [playersB, setPlayersB] = useState(Array(5).fill({ ...initialPlayer, ign: 'Player 1: GOAT' }));

  // Footer
  const [notes, setNotes] = useState('Pause at 12:00 due to technical issue');

  // Handlers
  const toggleRound = (idx) => {
    const newRounds = [...rounds];
    if (newRounds[idx] === '') newRounds[idx] = 'A';
    else if (newRounds[idx] === 'A') newRounds[idx] = 'B';
    else newRounds[idx] = '';
    setRounds(newRounds);
  };

  const updatePlayer = (team, idx, field, value) => {
    if (team === 'A') {
      const newPlayers = [...playersA];
      newPlayers[idx] = { ...newPlayers[idx], [field]: value };
      setPlayersA(newPlayers);
    } else {
      const newPlayers = [...playersB];
      newPlayers[idx] = { ...newPlayers[idx], [field]: value };
      setPlayersB(newPlayers);
    }
  };

  // Common input classes
  const inputClass = "bg-slate-800/50 border border-slate-700 text-white text-xs font-bold px-3 py-2 rounded outline-none focus:border-blue-500 transition-colors w-full";
  const selectClass = "bg-slate-800/50 border border-slate-700 text-white text-xs font-bold px-3 py-2 rounded outline-none focus:border-blue-500 transition-colors w-full cursor-pointer appearance-none";
  const tableInputClass = "bg-transparent w-full text-center outline-none focus:bg-slate-800/80 focus:ring-1 focus:ring-blue-500 rounded py-1 transition-colors";

  return (
    <div className="flex-1 p-6 lg:p-8 bg-[#040814] overflow-y-auto w-full h-full text-slate-300 font-sans custom-scrollbar">
      
      {/* Top Broadcast Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-3 bg-slate-800/40 px-4 py-2 rounded-lg border border-slate-700/50 shadow-md">
          <span className="text-xs font-black uppercase tracking-widest text-slate-300">Broadcast</span>
          <button 
            onClick={() => setBroadcast(!broadcast)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${broadcast ? 'bg-emerald-500' : 'bg-slate-600'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${broadcast ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Main Match Header (Spans 2 cols on lg) */}
        <div className="lg:col-span-2 bg-[#0B1120] rounded-xl border border-slate-800/60 shadow-xl overflow-hidden">
          <div className="bg-slate-800/40 px-5 py-3 border-b border-slate-800/60">
            <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">MAIN MATCH HEADER</h2>
          </div>
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">Select Game:</label>
              <select className={selectClass} value={game} onChange={(e) => setGame(e.target.value)}>
                <option value="Valorant">VALORANT</option>
                <option value="Crossfire">CROSSFIRE</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">League/Tournament:</label>
              <input type="text" className={inputClass} value={league} onChange={(e) => setLeague(e.target.value)} />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">Stage:</label>
              <select className={selectClass} value={stage} onChange={(e) => setStage(e.target.value)}>
                <option value="PLAYOFFS - DAY 1">PLAYOFFS - DAY 1</option>
                <option value="PLAYOFFS - DAY 2">PLAYOFFS - DAY 2</option>
                <option value="GRAND FINALS">GRAND FINALS</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1">Match:</label>
              <select className={selectClass} value={match} onChange={(e) => setMatch(e.target.value)}>
                <option value="GAME 1 - BO3">GAME 1 - BO3</option>
                <option value="GAME 2 - BO3">GAME 2 - BO3</option>
                <option value="GAME 3 - BO3">GAME 3 - BO3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Teams Panel */}
        <div className="bg-[#0B1120] rounded-xl border border-slate-800/60 shadow-xl overflow-hidden">
          <div className="bg-slate-800/40 px-5 py-3 border-b border-slate-800/60">
            <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">TEAMS</h2>
          </div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex gap-4">
              {/* Team A */}
              <div className="flex-1 bg-blue-900/10 border border-blue-900/30 rounded-lg p-3 flex items-center gap-3">
                <img src={teamA.logo} alt="Team A" className="w-10 h-10 rounded object-cover border border-blue-500/50" />
                <div className="flex-1">
                  <div className="text-[9px] uppercase tracking-widest text-blue-400 font-bold mb-0.5">TEAM A:</div>
                  <input type="text" className="bg-transparent text-xs font-black text-white w-full outline-none focus:border-b border-blue-500 transition-colors" value={teamA.name} onChange={(e) => setTeamA({...teamA, name: e.target.value})} />
                </div>
              </div>
              {/* Team B */}
              <div className="flex-1 bg-red-900/10 border border-red-900/30 rounded-lg p-3 flex items-center gap-3">
                <img src={teamB.logo} alt="Team B" className="w-10 h-10 rounded object-cover border border-red-500/50" />
                <div className="flex-1">
                  <div className="text-[9px] uppercase tracking-widest text-red-400 font-bold mb-0.5">TEAM B:</div>
                  <input type="text" className="bg-transparent text-xs font-black text-white w-full outline-none focus:border-b border-red-500 transition-colors" value={teamB.name} onChange={(e) => setTeamB({...teamB, name: e.target.value})} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between bg-slate-800/40 p-3 rounded-lg border border-slate-700/50 shadow-inner">
              <span className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
                WINNER: <span className={winner === 'A' ? 'text-blue-400' : 'text-red-400'}>{winner === 'A' ? teamA.name : teamB.name}</span>
              </span>
              <button 
                onClick={() => setWinner(winner === 'A' ? 'B' : 'A')}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${winner === 'A' ? 'bg-blue-500' : 'bg-red-500'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${winner === 'B' ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Module */}
      <div className="bg-[#0B1120] rounded-xl border border-slate-800/60 shadow-xl overflow-hidden mb-6">
        <div className="bg-slate-800/40 px-5 py-3 border-b border-slate-800/60 flex items-center gap-2">
          <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">{game === 'Valorant' ? 'A. VALORANT MAP MODULE' : 'A. MAP MODULE'}</h2>
          <span className="text-[10px] text-slate-500 tracking-widest">(Visible because {game} is selected)</span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-4 mb-6">
            <select className={`${selectClass} w-48`} value={mapName} onChange={(e) => setMapName(e.target.value)}>
              <option value="Bind">Bind</option>
              <option value="Ascent">Ascent</option>
              <option value="Split">Split</option>
              <option value="Haven">Haven</option>
              <option value="Icebox">Icebox</option>
              <option value="Breeze">Breeze</option>
              <option value="Fracture">Fracture</option>
              <option value="Pearl">Pearl</option>
              <option value="Lotus">Lotus</option>
            </select>
            <div className="flex items-center gap-2 bg-slate-800/40 p-1.5 rounded-lg border border-slate-700/50 shadow-inner">
              <input type="number" className="bg-transparent text-white text-sm font-black w-12 text-center outline-none" value={scoreA} onChange={(e) => setScoreA(e.target.value)} />
              <span className="text-slate-500 font-bold">-</span>
              <input type="number" className="bg-transparent text-white text-sm font-black w-12 text-center outline-none" value={scoreB} onChange={(e) => setScoreB(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-3">Round-by-Round Tracker</label>
            <div className="flex flex-wrap gap-2">
              {rounds.map((round, idx) => {
                const isA = round === 'A';
                const isB = round === 'B';
                return (
                  <button 
                    key={idx}
                    onClick={() => toggleRound(idx)}
                    className={`w-10 h-6 rounded flex items-center justify-center text-[10px] font-black tracking-tighter transition-all shadow-sm border ${
                      isA ? 'bg-emerald-500 text-white border-emerald-400' : 
                      isB ? 'bg-pink-600 text-white border-pink-400' : 
                      'bg-slate-800/50 border-slate-700 text-transparent hover:bg-slate-700'
                    }`}
                  >
                    {isA ? `${idx+1}:W` : isB ? `${idx+1}:L` : ''}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Player Stats Table */}
      <div className="bg-[#0B1120] rounded-xl border border-slate-800/60 shadow-xl overflow-hidden mb-6">
        <div className="bg-slate-800/40 px-5 py-3 border-b border-slate-800/60 flex items-center gap-2">
          <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">PLAYER STATS</h2>
          <span className="text-[10px] text-slate-500 tracking-widest">(Adaptive Columns)</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-800/20 text-[10px] uppercase tracking-[0.2em] text-slate-400 border-b border-slate-800/60">
                <th className="px-5 py-3 border-r border-slate-800/60 w-1/4">PLAYER IGN</th>
                <th className="px-5 py-3 border-r border-slate-800/60">HERO/AGENT/CLASS</th>
                <th className="px-3 py-3 border-r border-slate-800/60 text-center w-16">K</th>
                <th className="px-3 py-3 border-r border-slate-800/60 text-center w-16">D</th>
                <th className="px-3 py-3 border-r border-slate-800/60 text-center w-16">A</th>
                <th className="px-5 py-3 border-r border-slate-800/60 text-center">ACS</th>
                <th className="px-5 py-3 text-center">ECON RATING</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold">
              {/* Team A Rows */}
              {playersA.map((p, idx) => (
                <tr key={`a-${idx}`} className="border-b border-slate-800/40 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-2 border-r border-slate-800/60">
                    <input type="text" className={`text-[#38bdf8] ${tableInputClass} text-left font-black`} value={p.ign} onChange={(e) => updatePlayer('A', idx, 'ign', e.target.value)} />
                  </td>
                  <td className="px-5 py-2 border-r border-slate-800/60">
                    <select className={`text-white ${tableInputClass} text-left appearance-none cursor-pointer`} value={p.agent} onChange={(e) => updatePlayer('A', idx, 'agent', e.target.value)}>
                      <option value="Jett">Jett</option>
                      <option value="Fade">Fade</option>
                      <option value="Neon">Neon</option>
                      <option value="Clove">Clove</option>
                      <option value="Chamber">Chamber</option>
                      <option value="Viper">Viper</option>
                      <option value="Omen">Omen</option>
                      <option value="Gekko">Gekko</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 border-r border-slate-800/60 text-white"><input type="number" className={tableInputClass} value={p.k} onChange={(e) => updatePlayer('A', idx, 'k', e.target.value)} /></td>
                  <td className="px-3 py-2 border-r border-slate-800/60 text-white"><input type="number" className={tableInputClass} value={p.d} onChange={(e) => updatePlayer('A', idx, 'd', e.target.value)} /></td>
                  <td className="px-3 py-2 border-r border-slate-800/60 text-white"><input type="number" className={tableInputClass} value={p.a} onChange={(e) => updatePlayer('A', idx, 'a', e.target.value)} /></td>
                  <td className="px-5 py-2 border-r border-slate-800/60 text-[#38bdf8]"><input type="number" className={tableInputClass} value={p.acs} onChange={(e) => updatePlayer('A', idx, 'acs', e.target.value)} /></td>
                  <td className="px-5 py-2 text-[#38bdf8]"><input type="number" className={tableInputClass} value={p.econ} onChange={(e) => updatePlayer('A', idx, 'econ', e.target.value)} /></td>
                </tr>
              ))}
              
              {/* Divider */}
              <tr><td colSpan="7" className="h-1 bg-slate-800/60"></td></tr>

              {/* Team B Rows */}
              {playersB.map((p, idx) => (
                <tr key={`b-${idx}`} className="border-b border-slate-800/40 hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-2 border-r border-slate-800/60">
                    <input type="text" className={`text-[#f87171] ${tableInputClass} text-left font-black`} value={p.ign} onChange={(e) => updatePlayer('B', idx, 'ign', e.target.value)} />
                  </td>
                  <td className="px-5 py-2 border-r border-slate-800/60">
                    <select className={`text-white ${tableInputClass} text-left appearance-none cursor-pointer`} value={p.agent} onChange={(e) => updatePlayer('B', idx, 'agent', e.target.value)}>
                      <option value="Jett">Jett</option>
                      <option value="Fade">Fade</option>
                      <option value="Neon">Neon</option>
                      <option value="Clove">Clove</option>
                      <option value="Chamber">Chamber</option>
                      <option value="Viper">Viper</option>
                      <option value="Omen">Omen</option>
                      <option value="Gekko">Gekko</option>
                    </select>
                  </td>
                  <td className="px-3 py-2 border-r border-slate-800/60 text-white"><input type="number" className={tableInputClass} value={p.k} onChange={(e) => updatePlayer('B', idx, 'k', e.target.value)} /></td>
                  <td className="px-3 py-2 border-r border-slate-800/60 text-white"><input type="number" className={tableInputClass} value={p.d} onChange={(e) => updatePlayer('B', idx, 'd', e.target.value)} /></td>
                  <td className="px-3 py-2 border-r border-slate-800/60 text-white"><input type="number" className={tableInputClass} value={p.a} onChange={(e) => updatePlayer('B', idx, 'a', e.target.value)} /></td>
                  <td className="px-5 py-2 border-r border-slate-800/60 text-[#f87171]"><input type="number" className={tableInputClass} value={p.acs} onChange={(e) => updatePlayer('B', idx, 'acs', e.target.value)} /></td>
                  <td className="px-5 py-2 text-[#f87171]"><input type="number" className={tableInputClass} value={p.econ} onChange={(e) => updatePlayer('B', idx, 'econ', e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer / Notes */}
      <div className="flex flex-col xl:flex-row gap-6 items-center justify-between mt-8">
        <div className="flex-1 flex items-center gap-4 w-full">
          <label className="text-xl font-black text-white tracking-widest uppercase shrink-0">NOTES:</label>
          <input 
            type="text" 
            className="flex-1 bg-slate-800/50 border border-slate-700 text-white text-sm px-4 py-3 rounded-lg outline-none focus:border-[#00ffcc] transition-colors"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 w-full xl:w-auto">
          <button className="flex-1 xl:flex-none px-10 py-3 rounded-lg text-sm font-black uppercase tracking-widest bg-gradient-to-r from-[#0d9488] to-[#2563eb] hover:from-[#0f766e] hover:to-[#1d4ed8] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transform transition-all hover:-translate-y-0.5 active:scale-95">
            SUBMIT DATA
          </button>
          <button className="flex-1 xl:flex-none px-10 py-3 rounded-lg text-sm font-black uppercase tracking-widest bg-gradient-to-r from-[#991b1b] to-[#dc2626] hover:from-[#7f1d1d] hover:to-[#b91c1c] text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] transform transition-all hover:-translate-y-0.5 active:scale-95 border border-[#ef4444]/50">
            CANCEL
          </button>
        </div>
      </div>

    </div>
  );
};

export default DataEntry;