import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
const IconUsers = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);
const IconShield = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const SectionHeader = ({ icon, label, sub, accent = '#06b6d4' }) => (
  <div className="border-b border-slate-800/60 light:border-slate-200 flex items-center gap-8 bg-slate-900/30 light:bg-slate-50" style={{ padding: '32px 48px' }}>
    <div className="rounded-xl flex-shrink-0" style={{ backgroundColor: accent + '18', border: `1px solid ${accent}30`, padding: '16px' }}>
      <span style={{ color: accent }}>{icon}</span>
    </div>
    <div className="flex flex-col gap-4">
      {sub && <div className="text-[10px] font-black uppercase tracking-[0.25em] text-theme-text-muted light:text-theme-text-muted">{sub}</div>}
      <h2 className="text-sm font-black text-theme-text-base light:text-slate-800 uppercase tracking-[0.2em]">{label}</h2>
    </div>
  </div>
);
const PlayerManagement = ({ globalGame, globalTournament }) => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamLogo, setNewTeamLogo] = useState(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerTeamId, setNewPlayerTeamId] = useState('');
  const [newPlayerRole, setNewPlayerRole] = useState('');
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkPlayerNames, setBulkPlayerNames] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(true);
  const fetchTeams = async () => {
    try {
      const res = await apiFetch(`/api/teams?tournament=${encodeURIComponent(globalTournament)}`);
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchPlayers = async () => {
    try {
      const res = await apiFetch(`/api/players?tournament=${encodeURIComponent(globalTournament)}`);
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchTeams(), fetchPlayers()]).finally(() => setLoading(false));
  }, [globalTournament]);
  const handleAddTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName) return;
    try {
      const formData = new FormData();
      formData.append('team_name', newTeamName);
      formData.append('tournament_name', globalTournament);
      if (newTeamLogo) {
        formData.append('logo', newTeamLogo);
      }
      const res = await apiFetch('/api/teams', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setNewTeamName('');
        setNewTeamLogo(null);
        if (document.getElementById('team-logo-input')) {
          document.getElementById('team-logo-input').value = '';
        }
        fetchTeams();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteTeam = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team? All associated players will also be deleted.')) return;
    try {
      const res = await apiFetch(`/api/teams/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTeams();
        fetchPlayers();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleAddPlayer = async (e) => {
    e.preventDefault();
    if (!newPlayerTeamId) return;
    let playersToAdd = [];
    if (isBulkMode) {
      playersToAdd = bulkPlayerNames.map(p => p.trim()).filter(p => p);
    } else {
      if (!newPlayerName) return;
      playersToAdd = [newPlayerName.trim()];
    }
    if (playersToAdd.length === 0) return;
    try {
      await Promise.all(playersToAdd.map(pName =>
        apiFetch('/api/players', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ player_name: pName, team_id: newPlayerTeamId, role_in_game: newPlayerRole })
        })
      ));
      if (isBulkMode) {
        setBulkPlayerNames(['', '', '', '', '', '']);
      } else {
        setNewPlayerName('');
        setNewPlayerRole('');
      }
      fetchPlayers();
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeletePlayer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this player?')) return;
    try {
      const res = await apiFetch(`/api/players/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPlayers();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const inputBase = "bg-slate-800/50 light:bg-white border border-slate-700/70 light:border-slate-300 text-theme-text-base light:text-slate-800 text-xs font-bold px-3 py-2.5 rounded-lg outline-none focus:border-cyan-500/70 light:focus:border-blue-500/70 focus:ring-2 focus:ring-cyan-500/10 light:focus:ring-blue-500/10 transition-all w-full placeholder-slate-600 light:placeholder-slate-400";
  const selectBase = "bg-slate-800/50 light:bg-white border border-slate-700/70 light:border-slate-300 text-theme-text-base light:text-slate-800 text-xs font-bold px-3 py-2.5 rounded-lg outline-none focus:border-cyan-500/70 light:focus:border-blue-500/70 focus:ring-2 focus:ring-cyan-500/10 light:focus:ring-blue-500/10 transition-all w-full cursor-pointer appearance-none";
  const btnBase = "bg-cyan-600 hover:bg-cyan-500 text-theme-text-base font-bold py-2.5 px-4 rounded-lg transition-colors text-xs tracking-wider uppercase";
  if (loading) return <div className="p-10 text-theme-text-base light:text-slate-900 text-center">Loading...</div>;
  return (
    <div className="h-full flex flex-col bg-bg-100 light:bg-slate-50 text-theme-text-base light:text-slate-900">
      <div className="flex-1 overflow-y-auto de-scroll flex flex-col items-center">
        <div className="w-full max-w-[95%] flex flex-col" style={{ padding: '64px 32px', gap: '48px' }}>
          <div className="grid grid-cols-1 xl:grid-cols-2" style={{ gap: '64px' }}>
            {/* Teams Management Panel */}
            <div className="bg-bg-200 light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm flex flex-col">
              <SectionHeader icon={<IconShield />} label="Teams Management" sub="Add & Remove Teams" accent="#3b82f6" />
              <div className="flex-1 flex flex-col" style={{ padding: '56px 24px', gap: '32px' }}>
                <form onSubmit={handleAddTeam} className="flex flex-col max-w-xl self-center" style={{ width: '85%', gap: '32px' }}>
                  <div className="flex flex-col gap-8 w-full">
                    <input
                      type="text"
                      className={`${inputBase} p-3.5 text-xs rounded-xl`}
                      placeholder="Enter Team Name..."
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                    />
                    <div className="flex flex-col gap-4">
                      <label htmlFor="team-logo-input" className="text-[10px] font-black uppercase tracking-[0.2em] text-theme-text-muted ml-1">Team Logo (Optional)</label>
                      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-1.5">
                        <input
                          id="team-logo-input"
                          type="file"
                          accept="image/*"
                          className="text-theme-text-base light:text-slate-800 text-[11px] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[11px] file:font-bold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20 cursor-pointer w-full transition-all"
                          onChange={(e) => setNewTeamLogo(e.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-8">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-theme-text-base font-black text-xs tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/25" style={{ padding: '12px 32px', borderRadius: '9999px' }}>
                      Add Team
                    </button>
                  </div>
                </form>
                <div className="flex-1 overflow-y-auto max-h-[400px] custom-scrollbar">
                  {teams.length === 0 ? (
                    <div className="flex w-full justify-center pt-4 pb-10">
                      <div className="text-theme-text-muted light:text-theme-text-muted text-xs uppercase tracking-widest font-bold text-center" style={{ paddingLeft: '0.1em' }}>No teams added yet</div>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {teams.map(t => (
                        <li key={t.team_id} className="flex items-center justify-between bg-slate-800/30 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 px-4 py-3 rounded-xl hover:bg-slate-800/50 light:hover:bg-slate-100 transition-colors">
                          <div className="flex items-center gap-3">
                            {t.logo_url && (
                              <img src={t.logo_url} alt={t.team_name} className="w-6 h-6 object-contain rounded" />
                            )}
                            <span className="font-bold text-sm tracking-wide text-theme-text-base light:text-slate-800">{t.team_name}</span>
                          </div>
                          <button onClick={() => handleDeleteTeam(t.team_id)} className="text-red-500 hover:text-red-400 p-1 bg-red-500/10 rounded-lg transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            {/* Players Management Panel */}
            <div className="bg-bg-200 light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm flex flex-col">
              <SectionHeader icon={<IconUsers />} label="Players Management" sub="Roster Configuration" accent="#00ffcc" />
              <div className="flex-1 flex flex-col" style={{ padding: '56px 24px', gap: '32px' }}>
                <div className="max-w-xl flex justify-center self-center" style={{ width: '85%' }}>
                  <div className="flex w-full gap-4 bg-slate-900/50 p-1.5 rounded-xl">
                    <button onClick={() => setIsBulkMode(false)} className={`flex-1 px-4 py-3 text-[11px] uppercase tracking-widest font-bold rounded-lg transition-all ${!isBulkMode ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_color-mix(in_srgb,var(--color--)_%,transparent)]' : 'text-theme-text-muted hover:text-theme-text-base'}`}>Single Add</button>
                    <button onClick={() => setIsBulkMode(true)} className={`flex-1 px-4 py-3 text-[11px] uppercase tracking-widest font-bold rounded-lg transition-all ${isBulkMode ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_color-mix(in_srgb,var(--color--)_%,transparent)]' : 'text-theme-text-muted hover:text-theme-text-base'}`}>Bulk Add (6 Players)</button>
                  </div>
                </div>
                <form onSubmit={handleAddPlayer} className="flex flex-col max-w-xl self-center" style={{ width: '85%', gap: '32px' }}>
                  <div className="relative">
                    <select
                      className={`${selectBase} p-3.5 text-xs rounded-xl`}
                      value={newPlayerTeamId}
                      onChange={(e) => setNewPlayerTeamId(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Team</option>
                      {teams.map(t => (
                        <option key={t.team_id} value={t.team_id}>{t.team_name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-theme-text-muted">▼</div>
                  </div>
                  {!isBulkMode ? (
                    <div className="flex flex-col gap-8 mt-2">
                      <input
                        type="text"
                        className={`${inputBase} p-3.5 text-xs rounded-xl`}
                        placeholder="Player IGN"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        className={`${inputBase} p-3.5 text-xs rounded-xl`}
                        placeholder="Role (e.g. IGL, Rifler, Sniper) - Optional"
                        value={newPlayerRole}
                        onChange={(e) => setNewPlayerRole(e.target.value)}
                      />
                      <div className="flex justify-center mt-8">
                        <button type="submit" className="bg-cyan-400 text-[#090e14] font-black text-xs tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-400/25" style={{ padding: '12px 32px', borderRadius: '9999px' }}>
                          Add Player
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-8 mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bulkPlayerNames.map((name, idx) => (
                          <input
                            key={idx}
                            type="text"
                            className={`${inputBase} p-3.5 text-xs rounded-xl`}
                            placeholder={`Player ${idx + 1} IGN`}
                            value={name}
                            onChange={(e) => {
                              const newNames = [...bulkPlayerNames];
                              newNames[idx] = e.target.value;
                              setBulkPlayerNames(newNames);
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-center mt-8">
                        <button type="submit" className="bg-cyan-400 text-[#090e14] font-black text-xs tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-400/25" style={{ padding: '12px 32px', borderRadius: '9999px' }}>
                          Add All 6 Players
                        </button>
                      </div>
                    </div>
                  )}
                </form>
                <div className="flex-1 overflow-y-auto max-h-[400px] custom-scrollbar">
                  {players.length === 0 ? (
                    <div className="flex w-full justify-center pt-4 pb-10">
                      <div className="text-theme-text-muted light:text-theme-text-muted text-xs uppercase tracking-widest font-bold text-center" style={{ paddingLeft: '0.1em' }}>No players added yet</div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Object.entries(
                        players.reduce((acc, player) => {
                          const teamName = player.teams?.team_name || 'Unknown Team';
                          if (!acc[teamName]) acc[teamName] = [];
                          acc[teamName].push(player);
                          return acc;
                        }, {})
                      )
                        .sort(([teamA], [teamB]) => teamA.localeCompare(teamB))
                        .map(([teamName, teamPlayers]) => (
                          <div key={teamName}>
                            <div className="flex items-center gap-2 px-2 mb-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                              <h3 className="text-[10px] font-black text-theme-text-muted light:text-theme-text-muted uppercase tracking-widest">{teamName} ({teamPlayers.length})</h3>
                            </div>
                            <ul className="space-y-2">
                              {teamPlayers.map(p => (
                                <li key={p.player_id} className="flex items-center justify-between bg-slate-800/30 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-800/50 light:hover:bg-slate-100 transition-colors">
                                  <div>
                                    <div className="font-bold text-sm tracking-wide text-theme-text-base light:text-slate-800">{p.player_name}</div>
                                    {p.role_in_game && (
                                      <div className="text-[9px] text-cyan-400/80 font-bold uppercase tracking-widest mt-0.5">
                                        {p.role_in_game}
                                      </div>
                                    )}
                                  </div>
                                  <button onClick={() => handleDeletePlayer(p.player_id)} className="text-red-500 hover:text-red-400 p-1.5 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerManagement;
