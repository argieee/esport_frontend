import React, { useState, useEffect } from 'react';
import { CalendarX, Trophy, ClipboardList, ArrowRight } from 'lucide-react';
import { apiFetch } from '../../utils/api';
const Predictions = ({ globalGame, globalTournament }) => {
  const [matches, setMatches] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [myPredictions, setMyPredictions] = useState([]);
  const [username, setUsername] = useState('Player1'); 
  const activeGame = (globalGame || 'VALORANT').toLowerCase();
  const accent = activeGame === 'valorant' ? '#06b6d4' : '#f59e0b';
  const secondaryAccent = activeGame === 'valorant' ? '#f43f5e' : '#8b5cf6';
  const API_URL = 'http://localhost:5000/api';
  useEffect(() => {
    fetchMatches();
    fetchLeaderboard();
    fetchMyPredictions();
  }, [activeGame, username, globalTournament]);
  const fetchMatches = async () => {
    try {
      const res = await apiFetch(`/api/predictions/matches?tournament=${encodeURIComponent(globalTournament || 'Default')}`);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
  };
  const fetchLeaderboard = async () => {
    try {
      const res = await apiFetch(`/api/predictions/leaderboard`);
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };
  const fetchMyPredictions = async () => {
    try {
      const res = await apiFetch(`/api/predictions/user/${username}`);
      const data = await res.json();
      setMyPredictions(data);
    } catch (err) {
      console.error('Error fetching user predictions:', err);
    }
  };
  const handlePredict = async (matchId, teamId) => {
    try {
      await apiFetch(`/api/predictions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          match_id: matchId,
          predicted_winner_team_id: teamId
        })
      });
      fetchMyPredictions();
    } catch (err) {
      console.error('Error submitting prediction:', err);
    }
  };
  const getPredictionForMatch = (matchId) => {
    return myPredictions.find(p => p.match_id === matchId);
  };
  return (
    <div className="w-full h-full bg-bg-base text-theme-text-base overflow-y-auto flex flex-col items-center" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}>
      {}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: accent }} />
      </div>
      <div className="relative z-10 w-full max-w-[1400px] px-8 md:px-12 py-6 pb-16 flex flex-col gap-7">
        {}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full" style={{ background: `linear-gradient(180deg, ${accent}, #3b82f6)`, boxShadow: `0 0 12px ${accent}80` }} />
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-theme-text-muted">Community</div>
              <h1 className="text-xl font-black uppercase tracking-[0.15em] text-theme-text-base">Predictions</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-bg-300/80 border border-white/5 pl-6 pr-4 py-2 rounded-full shadow-sm backdrop-blur-sm shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-text-muted whitespace-nowrap shrink-0">Playing as:</span>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent text-sm font-black text-theme-text-base focus:outline-none w-24 placeholder-slate-600"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {}
          <div className="xl:col-span-2 flex flex-col gap-8">
            {/* UPCOMING MATCHES SECTION */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pl-2">
                <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accent }}></div>
                <h2 className="text-sm font-black uppercase tracking-widest text-theme-text-base">Upcoming Matches</h2>
              </div>
              <div className="bg-bg-300/90 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl hover:border-white/10 transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
              <div className="p-6">
              {matches.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-slate-900/20 rounded-xl border border-slate-700/30 border-dashed group">
                  <CalendarX size={48} strokeWidth={1} className="text-slate-600 mb-4 group-hover:text-cyan-500/70 transition-colors duration-500" />
                  <div className="text-theme-text-base font-semibold text-sm mb-2">No upcoming matches right now.</div>
                  <div className="text-theme-text-muted text-xs">Check back when the new season drops!</div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {matches.map(match => {
                    const prediction = getPredictionForMatch(match.match_id);
                    return (
                      <div key={match.match_id} className="bg-white/[0.03] border border-white/5 rounded-xl p-5 flex flex-col gap-4">
                        <div className="text-[10px] text-theme-text-muted font-bold uppercase tracking-widest text-center">
                          {new Date(match.match_schedule).toLocaleString()}
                        </div>
                        <div className="flex items-center justify-between">
                          {}
                          <div 
                            onClick={() => handlePredict(match.match_id, match.team_a.team_id)}
                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all border ${prediction?.predicted_winner_team_id === match.team_a.team_id ? 'bg-cyan-500/20 border-cyan-500/50 scale-105 z-10' : 'bg-slate-900/50 border-transparent hover:bg-slate-800'}`}
                          >
                            <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center font-black">
                              {match.team_a.logo_url ? <img src={match.team_a.logo_url} alt="" className="w-8 h-8 object-contain" /> : match.team_a.team_name.substring(0, 2)}
                            </div>
                            <div className="text-sm font-bold text-center">{match.team_a.team_name}</div>
                          </div>
                          {}
                          {match.system_prediction ? (
                            <div className="flex flex-col items-center justify-center mx-4 w-32 gap-3 z-10">
                               <div className="flex justify-between items-center w-full px-1 font-black text-xl">
                                  <span className="text-cyan-400 drop-shadow-md">{match.system_prediction.probability_a}%</span>
                                  <span className="text-[10px] text-theme-text-muted mx-2 mt-1">VS</span>
                                  <span className="text-red-400 drop-shadow-md">{match.system_prediction.probability_b}%</span>
                               </div>
                               <div className="flex items-end gap-2 h-20">
                                  {}
                                  <div className="w-6 bg-slate-800/80 rounded-t-lg relative flex items-end justify-center h-full shadow-inner overflow-hidden">
                                     <div 
                                        className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg transition-all duration-1000 ease-out"
                                        style={{ height: `${match.system_prediction.probability_a}%` }}
                                     ></div>
                                  </div>
                                  {}
                                  <div className="w-6 bg-slate-800/80 rounded-t-lg relative flex items-end justify-center h-full shadow-inner overflow-hidden">
                                     <div 
                                        className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg transition-all duration-1000 ease-out"
                                        style={{ height: `${match.system_prediction.probability_b}%` }}
                                     ></div>
                                  </div>
                               </div>
                               <div className="text-[9px] text-theme-text-muted font-bold tracking-widest uppercase">Win Probability</div>
                            </div>
                          ) : (
                            <div className="text-xl font-black italic text-slate-700 mx-6">VS</div>
                          )}
                          {}
                          <div 
                            onClick={() => handlePredict(match.match_id, match.team_b.team_id)}
                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all border ${prediction?.predicted_winner_team_id === match.team_b.team_id ? 'bg-red-500/20 border-red-500/50 scale-105 z-10' : 'bg-slate-900/50 border-transparent hover:bg-slate-800'}`}
                          >
                            <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center font-black text-red-400">
                              {match.team_b.team_name[0]}
                            </div>
                            <span className="font-bold text-sm">{match.team_b.team_name}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              </div>
              </div>
            </div>
            
            {/* MY PAST PREDICTIONS SECTION */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pl-2">
                <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accent }}></div>
                <h2 className="text-sm font-black uppercase tracking-widest text-theme-text-base">My Past Predictions</h2>
              </div>
              <div className="bg-bg-300/90 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl hover:border-white/10 transition-colors duration-500 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-[0.15em] font-semibold text-theme-text-base border-b border-slate-700/50">
                      <th className="py-4" style={{ paddingLeft: '32px', paddingRight: '24px' }}>Match ID</th>
                      <th className="py-4" style={{ paddingLeft: '24px', paddingRight: '24px' }}>Predicted Winner</th>
                      <th className="py-4" style={{ paddingLeft: '24px', paddingRight: '24px' }}>Status</th>
                      <th className="py-4 text-right" style={{ paddingLeft: '24px', paddingRight: '32px' }}>Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {myPredictions.filter(p => p.status !== 'pending').length === 0 && (
                      <tr><td colSpan="4" className="py-12 px-6 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <ClipboardList size={32} strokeWidth={1} className="text-slate-600 mb-3" />
                          <div className="text-theme-text-base text-sm font-semibold mb-1">No predictions on record yet.</div>
                          <div className="text-theme-text-muted text-xs">Make a call on an upcoming match!</div>
                        </div>
                      </td></tr>
                    )}
                    {myPredictions.filter(p => p.status !== 'pending').map(p => (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 text-sm text-theme-text-muted" style={{ paddingLeft: '32px', paddingRight: '24px' }}>#{p.match_id}</td>
                        <td className="py-4 text-sm font-bold text-theme-text-base" style={{ paddingLeft: '24px', paddingRight: '24px' }}>Team {p.predicted_winner_team_id}</td>
                        <td className="py-4 text-xs" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                          <span className="px-2 py-1 rounded bg-slate-800 text-theme-text-base">{p.status}</span>
                        </td>
                        <td className="py-4 text-sm font-black text-right text-green-400" style={{ paddingLeft: '24px', paddingRight: '32px' }}>+{p.points_awarded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>
          {}
          <div className="xl:col-span-1 flex flex-col gap-8">
             <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pl-2">
                <div className="w-1.5 h-4 rounded-full" style={{ backgroundColor: accent }}></div>
                <div>
                  <h2 className="text-sm font-black uppercase tracking-widest text-theme-text-base leading-none">Global Leaderboard</h2>
                  <p className="text-[9px] text-theme-text-muted mt-1 font-bold tracking-widest uppercase">Top prediction scores</p>
                </div>
              </div>
              <div className="bg-bg-300/90 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden flex flex-col shadow-xl hover:border-white/10 transition-colors duration-500 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-[60px] -z-10 pointer-events-none"></div>
              <div className="flex-1 p-5 overflow-y-auto max-h-[500px] custom-scrollbar">
                {leaderboard.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 bg-slate-900/20 rounded-xl border border-slate-700/30 border-dashed m-1 group">
                    <Trophy size={40} strokeWidth={1} className="text-slate-600 mb-3 group-hover:text-amber-500/60 transition-colors" />
                    <div className="text-theme-text-base font-semibold text-sm mb-1">No scores posted yet.</div>
                    <div className="text-theme-text-muted text-xs">Be the first to claim the top spot!</div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {leaderboard.map((user, idx) => (
                      <div key={user.username} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-black ${idx === 0 ? 'bg-yellow-500/20 text-yellow-500' : idx === 1 ? 'bg-slate-300/20 text-theme-text-base' : idx === 2 ? 'bg-amber-700/20 text-amber-600' : 'bg-slate-800 text-theme-text-muted'}`}>
                            {idx + 1}
                          </div>
                          <span className="font-bold text-sm">{user.username}</span>
                        </div>
                        <span className="font-black" style={{ color: accent }}>{user.total_points}</span>
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
export default Predictions;
