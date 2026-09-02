import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
const Predictions = ({ globalGame }) => {
  const [matches, setMatches] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [myPredictions, setMyPredictions] = useState([]);
  const [username, setUsername] = useState('Player1'); 
  const activeGame = (globalGame || 'VALORANT').toLowerCase();
  const accent = activeGame === 'valorant' ? '#06b6d4' : '#f59e0b';
  const API_URL = 'http://localhost:5000/api';
  useEffect(() => {
    fetchMatches();
    fetchLeaderboard();
    fetchMyPredictions();
  }, [activeGame, username]);
  const fetchMatches = async () => {
    try {
      const res = await apiFetch(`/predictions/matches?tournament=Default`);
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
  };
  const fetchLeaderboard = async () => {
    try {
      const res = await apiFetch(`/predictions/leaderboard`);
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };
  const fetchMyPredictions = async () => {
    try {
      const res = await apiFetch(`/predictions/user/${username}`);
      const data = await res.json();
      setMyPredictions(data);
    } catch (err) {
      console.error('Error fetching user predictions:', err);
    }
  };
  const handlePredict = async (matchId, teamId) => {
    try {
      await apiFetch(`/predictions`, {
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
    <div className="w-full h-full bg-[#05080f] text-white overflow-y-auto flex flex-col items-center" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}>
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
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Community</div>
              <h1 className="text-xl font-black uppercase tracking-[0.15em] text-white">Predictions</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Playing as:</span>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-3 py-1 text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {}
          <div className="xl:col-span-2 flex flex-col gap-6">
            <div className="bg-[#0d131c] rounded-2xl border border-slate-800/60 p-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-300 mb-6">Upcoming Matches</h2>
              {matches.length === 0 ? (
                <div className="text-center text-slate-500 py-8 text-sm">No scheduled matches available for prediction.</div>
              ) : (
                <div className="flex flex-col gap-4">
                  {matches.map(match => {
                    const prediction = getPredictionForMatch(match.match_id);
                    return (
                      <div key={match.match_id} className="bg-white/[0.03] border border-white/5 rounded-xl p-5 flex flex-col gap-4">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">
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
                                  <span className="text-[10px] text-slate-500 mx-2 mt-1">VS</span>
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
                               <div className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">Win Probability</div>
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
            <div className="bg-[#0d131c] rounded-2xl border border-slate-800/60 p-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-300 mb-6">My Past Predictions</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-800/50">
                      <th className="pb-3 font-bold">Match ID</th>
                      <th className="pb-3 font-bold">Predicted Winner</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/30">
                    {myPredictions.filter(p => p.status !== 'pending').length === 0 && (
                      <tr><td colSpan="4" className="py-4 text-center text-slate-500 text-sm">No evaluated predictions yet.</td></tr>
                    )}
                    {myPredictions.filter(p => p.status !== 'pending').map(p => (
                      <tr key={p.id}>
                        <td className="py-3 text-sm text-slate-400">#{p.match_id}</td>
                        <td className="py-3 text-sm font-bold text-white">Team {p.predicted_winner_team_id}</td>
                        <td className="py-3 text-xs">
                          <span className="px-2 py-1 rounded bg-slate-800 text-slate-300">{p.status}</span>
                        </td>
                        <td className="py-3 text-sm font-black text-right text-green-400">+{p.points_awarded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {}
          <div className="xl:col-span-1 flex flex-col gap-6">
             <div className="bg-[#0d131c] rounded-2xl border border-slate-800/60 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-800/50">
                <h2 className="text-sm font-black uppercase tracking-widest text-slate-300">Global Leaderboard</h2>
                <p className="text-[10px] text-slate-500 mt-1">Top prediction scores</p>
              </div>
              <div className="flex-1 p-4 overflow-y-auto max-h-[500px]">
                {leaderboard.length === 0 ? (
                  <div className="text-center text-slate-500 py-8 text-sm">No scores yet.</div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {leaderboard.map((user, idx) => (
                      <div key={user.username} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-black ${idx === 0 ? 'bg-yellow-500/20 text-yellow-500' : idx === 1 ? 'bg-slate-300/20 text-slate-300' : idx === 2 ? 'bg-amber-700/20 text-amber-600' : 'bg-slate-800 text-slate-500'}`}>
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
  );
};
export default Predictions;
