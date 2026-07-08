import React, { useState } from 'react';

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

  const initialRounds = Array(24).fill('');
  ['A','A','A','B','A','B','A','A','B','A','B','A','A'].forEach((v, i) => initialRounds[i] = v);
  const [rounds, setRounds] = useState(initialRounds);

  const initialPlayer = { ign: 'Player IGN', agent: 'Jett', k: 0, d: 0, a: 0, acs: 0, econ: 0 };
  const [playersA, setPlayersA] = useState(Array(5).fill(null).map((_, i) => ({ ...initialPlayer, ign: `Player ${i+1}: WOLF` })));
  const [playersB, setPlayersB] = useState(Array(5).fill(null).map((_, i) => ({ ...initialPlayer, ign: `Player ${i+1}: GOAT` })));
  const [notes, setNotes] = useState('Pause at 12:00 due to technical issue');

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

  const agents = ['Jett','Fade','Neon','Clove','Chamber','Viper','Omen','Gekko','Reyna','Sage','Breach','Phoenix'];
  const valorantMaps = ['Bind','Ascent','Split','Haven','Icebox','Breeze','Fracture','Pearl','Lotus','Sunset'];

  return (
    <div className="flex-1 bg-[#090e14] text-slate-200 overflow-y-auto custom-scrollbar">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>

      <div className="max-w-[1300px] mx-auto p-6 lg:p-8 flex flex-col gap-5">

        {/* ── Top Bar: Page Title + Broadcast ── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, #06b6d4, #3b82f6)', boxShadow: '0 0 12px rgba(6,182,212,0.6)' }} />
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-0.5">Match Management</div>
              <h1 className="text-xl md:text-2xl font-black tracking-[0.15em] uppercase text-white">Data Entry</h1>
            </div>
          </div>
          {/* Broadcast toggle */}
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
              <Field label="Game">
                <div className="relative">
                  <select className={selectBase} value={game} onChange={e => setGame(e.target.value)}>
                    <option value="Valorant">VALORANT</option>
                    <option value="Crossfire">CROSSFIRE</option>
                  </select>
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▾</div>
                </div>
              </Field>
              <Field label="League / Tournament">
                <input type="text" className={inputBase} value={league} onChange={e => setLeague(e.target.value)} />
              </Field>
              <Field label="Stage">
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
              <Field label="Match Format">
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
              {/* Team A */}
              <div className="bg-blue-900/10 border border-blue-900/30 rounded-xl p-3 flex items-center gap-3 hover:border-blue-700/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-blue-900/30 border border-blue-800/40 flex items-center justify-center text-sm font-black text-blue-400 shrink-0">
                  {teamA.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-0.5">Team A</div>
                  <input
                    type="text"
                    className="bg-transparent text-xs font-black text-white w-full outline-none border-b border-transparent focus:border-blue-500 transition-colors pb-0.5"
                    value={teamA.name}
                    onChange={e => setTeamA({ ...teamA, name: e.target.value })}
                  />
                </div>
              </div>
              {/* Team B */}
              <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-3 flex items-center gap-3 hover:border-red-700/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-red-900/30 border border-red-800/40 flex items-center justify-center text-sm font-black text-red-400 shrink-0">
                  {teamB.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-0.5">Team B</div>
                  <input
                    type="text"
                    className="bg-transparent text-xs font-black text-white w-full outline-none border-b border-transparent focus:border-red-500 transition-colors pb-0.5"
                    value={teamB.name}
                    onChange={e => setTeamB({ ...teamB, name: e.target.value })}
                  />
                </div>
              </div>
              {/* Winner */}
              <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/50 rounded-xl px-3.5 py-2.5">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Winner</div>
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

        {/* ── Map Module ── */}
        <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
          <SectionHeader
            icon={<IconMap />}
            label={game === 'Valorant' ? 'A. Valorant Map Module' : 'A. Map Module'}
            sub={`Visible — ${game} selected`}
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
                  <input type="number" className="bg-transparent text-white text-sm font-black w-10 text-center outline-none" value={scoreA} onChange={e => setScoreA(e.target.value)} />
                  <span className="text-slate-500 font-black">—</span>
                  <input type="number" className="bg-transparent text-white text-sm font-black w-10 text-center outline-none" value={scoreB} onChange={e => setScoreB(e.target.value)} />
                </div>
              </div>
              {/* Score display pill */}
              <div className="flex items-center gap-2 ml-auto">
                <div className="text-xs text-slate-500 font-bold">Current Map:</div>
                <div className="px-4 py-1.5 rounded-full text-xs font-black text-white border border-slate-700/70 bg-slate-800/50 tracking-wider">
                  {mapName}  <span className="text-cyan-400">{scoreA}–{scoreB}</span>
                </div>
              </div>
            </div>

            {/* Round Tracker */}
            <div>
              <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
                <span>Round-by-Round Tracker</span>
                <div className="flex items-center gap-2 ml-3 text-[9px]">
                  <span className="w-3 h-3 rounded bg-emerald-500/80 inline-block" />W = Team A
                  <span className="w-3 h-3 rounded bg-pink-600/80 inline-block ml-2" />L = Team B
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {rounds.map((round, idx) => {
                  const isA = round === 'A';
                  const isB = round === 'B';
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleRound(idx)}
                      title={`Round ${idx + 1}: Click to cycle`}
                      className={`w-10 h-7 rounded-lg flex items-center justify-center text-[9px] font-black tracking-tight transition-all shadow-sm border active:scale-90 ${
                        isA ? 'bg-emerald-500/80 text-white border-emerald-400/60 shadow-emerald-500/20 shadow-md' :
                        isB ? 'bg-pink-600/80 text-white border-pink-500/60 shadow-pink-500/20 shadow-md' :
                        'bg-slate-800/60 border-slate-700/60 text-slate-600 hover:bg-slate-700/80 hover:text-slate-400'
                      }`}
                    >
                      {isA ? `R${idx+1}` : isB ? `R${idx+1}` : idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Player Stats Table ── */}
        <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
          <SectionHeader icon={<IconStats />} label="Player Stats" sub="Adaptive Columns" accent="#8b5cf6" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="text-[9px] uppercase tracking-[0.15em] text-slate-500 border-b border-slate-800/60 bg-slate-900/40">
                  <th className="px-5 py-3 border-r border-slate-800/40 font-bold">Player IGN</th>
                  <th className="px-4 py-3 border-r border-slate-800/40 font-bold">Hero / Agent</th>
                  <th className="px-3 py-3 border-r border-slate-800/40 text-center font-bold w-14">K</th>
                  <th className="px-3 py-3 border-r border-slate-800/40 text-center font-bold w-14">D</th>
                  <th className="px-3 py-3 border-r border-slate-800/40 text-center font-bold w-14">A</th>
                  <th className="px-4 py-3 border-r border-slate-800/40 text-center font-bold">ACS</th>
                  <th className="px-4 py-3 text-center font-bold">Econ Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {/* Team A label row */}
                <tr>
                  <td colSpan="7" className="px-5 py-2 bg-blue-900/10 border-b border-blue-900/20">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-4 rounded-full bg-blue-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">{teamA.name} — Team A</span>
                    </div>
                  </td>
                </tr>
                {playersA.map((p, idx) => (
                  <tr key={`a-${idx}`} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-2 border-r border-slate-800/30">
                      <input type="text" className={`text-[#38bdf8] ${tableInput} text-left font-black`} value={p.ign} onChange={e => updatePlayer('A', idx, 'ign', e.target.value)} />
                    </td>
                    <td className="px-4 py-2 border-r border-slate-800/30">
                      <select className={`text-white ${tableInput} text-left appearance-none cursor-pointer`} value={p.agent} onChange={e => updatePlayer('A', idx, 'agent', e.target.value)}>
                        {agents.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </td>
                    <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.k} onChange={e => updatePlayer('A', idx, 'k', e.target.value)} /></td>
                    <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.d} onChange={e => updatePlayer('A', idx, 'd', e.target.value)} /></td>
                    <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.a} onChange={e => updatePlayer('A', idx, 'a', e.target.value)} /></td>
                    <td className="px-4 py-2 border-r border-slate-800/30 text-[#38bdf8]"><input type="number" className={tableInput} value={p.acs} onChange={e => updatePlayer('A', idx, 'acs', e.target.value)} /></td>
                    <td className="px-4 py-2 text-[#38bdf8]"><input type="number" className={tableInput} value={p.econ} onChange={e => updatePlayer('A', idx, 'econ', e.target.value)} /></td>
                  </tr>
                ))}

                {/* Team B label row */}
                <tr>
                  <td colSpan="7" className="px-5 py-2 bg-red-900/10 border-b border-red-900/20 border-t border-slate-800/50">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-4 rounded-full bg-red-500" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-red-400">{teamB.name} — Team B</span>
                    </div>
                  </td>
                </tr>
                {playersB.map((p, idx) => (
                  <tr key={`b-${idx}`} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-5 py-2 border-r border-slate-800/30">
                      <input type="text" className={`text-[#f87171] ${tableInput} text-left font-black`} value={p.ign} onChange={e => updatePlayer('B', idx, 'ign', e.target.value)} />
                    </td>
                    <td className="px-4 py-2 border-r border-slate-800/30">
                      <select className={`text-white ${tableInput} text-left appearance-none cursor-pointer`} value={p.agent} onChange={e => updatePlayer('B', idx, 'agent', e.target.value)}>
                        {agents.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </td>
                    <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.k} onChange={e => updatePlayer('B', idx, 'k', e.target.value)} /></td>
                    <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.d} onChange={e => updatePlayer('B', idx, 'd', e.target.value)} /></td>
                    <td className="px-2 py-2 border-r border-slate-800/30 text-white"><input type="number" className={tableInput} value={p.a} onChange={e => updatePlayer('B', idx, 'a', e.target.value)} /></td>
                    <td className="px-4 py-2 border-r border-slate-800/30 text-[#f87171]"><input type="number" className={tableInput} value={p.acs} onChange={e => updatePlayer('B', idx, 'acs', e.target.value)} /></td>
                    <td className="px-4 py-2 text-[#f87171]"><input type="number" className={tableInput} value={p.econ} onChange={e => updatePlayer('B', idx, 'econ', e.target.value)} /></td>
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
              <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">Match Notes</div>
              <textarea
                rows={2}
                className="w-full bg-slate-800/50 border border-slate-700/70 text-white text-sm px-4 py-3 rounded-xl outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10 transition-all resize-none placeholder-slate-600"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add match notes, pause events, technical issues..."
              />
            </div>
            <div className="flex gap-3 w-full xl:w-auto shrink-0">
              <button className="flex-1 xl:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white transition-all active:scale-95 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                style={{ background: 'linear-gradient(135deg, #0d9488, #2563eb)' }}>
                <IconSave />
                Submit Data
              </button>
              <button
                onClick={() => { if (window.confirm('Clear all data?')) window.location.reload(); }}
                className="flex-1 xl:flex-none px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white transition-all active:scale-95 hover:-translate-y-0.5 border border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                style={{ background: 'linear-gradient(135deg, #991b1b, #dc2626)' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DataEntry;