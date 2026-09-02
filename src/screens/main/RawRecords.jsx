import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
const RawRecords = ({ globalTournament }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameFilter, setGameFilter] = useState('All'); 
  useEffect(() => {
    fetchRecords();
  }, [globalTournament]);
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await apiFetch(`/api/match-records?tournament=${encodeURIComponent(globalTournament || 'Default')}`);
      if (!res.ok) throw new Error('Failed to fetch match records');
      const data = await res.json();
      setRecords(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const filteredRecords = gameFilter === 'All' 
    ? records 
    : records.filter(r => r.game === gameFilter);
  const columns = ['Game', 'Week', 'Day', 'Match', 'Set', 'Team', 'Player', 'Win', 'Kills', 'Deaths', 'Assists'];
  if (gameFilter === 'All' || gameFilter === 'Crossfire') columns.push('Headshots');
  if (gameFilter === 'All' || gameFilter === 'Valorant') {
    columns.push('ACS');
    columns.push('Econ');
  }
  columns.push('Rounds', 'Map');
  return (
    <div className="flex-1 bg-[#05080f] light:bg-[#f8fafc] text-white light:text-slate-900 overflow-y-auto flex flex-col h-full relative font-sans custom-scrollbar">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0b1018; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
        .spreadsheet-table th, .spreadsheet-table td {
          white-space: nowrap;
        }
        .title-gradient {
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      {}
      <div className="p-8 pb-6 border-b border-slate-800/80 light:border-slate-200 bg-[#0a0f18]/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between flex-shrink-0 shadow-lg">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest mb-1 title-gradient">Raw Match Records</h1>
          <p className="text-slate-400 light:text-slate-500 text-sm tracking-wide font-medium">Spreadsheet view of every individual player's match performance.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-3">
            {['All', 'Valorant', 'Crossfire'].map(filter => (
              <button
                key={filter}
                onClick={() => setGameFilter(filter)}
                className={`px-6 py-2.5 text-sm font-black uppercase tracking-widest rounded-xl transition-all duration-300 border ${
                  gameFilter === filter 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25)] scale-105' 
                    : 'bg-slate-900/50 border-slate-800/60 text-slate-500 hover:text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button 
            onClick={fetchRecords}
            className="group flex items-center gap-2 px-6 py-2.5 bg-slate-800/80 hover:bg-slate-700 light:bg-white light:hover:bg-slate-50 border border-slate-700/80 light:border-slate-300 rounded-xl text-white light:text-slate-700 text-xs font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-95"
          >
            <svg className={`w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 m-8 rounded-xl flex-shrink-0 animate-pulse">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}
      {}
      <div className="flex-1 p-8 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto custom-scrollbar rounded-2xl border border-slate-700/50 light:border-slate-300 shadow-2xl light:shadow-md bg-[#0b1018] light:bg-white relative">
          <table className="min-w-full text-left border-collapse spreadsheet-table">
            <thead className="bg-[#0f1522] light:bg-slate-50 sticky top-0 z-10 shadow-md">
              <tr>
                {columns.map((col, i) => (
                  <th 
                    key={col}
                    className={`px-4 py-4 text-[10px] font-black text-slate-400 light:text-slate-600 uppercase tracking-widest border-b border-slate-700/60 light:border-slate-200 border-r border-slate-800/40 last:border-r-0 
                    ${['Team', 'Player', 'Win'].includes(col) ? 'bg-[#121926] light:bg-slate-100' : ''} 
                    ${['Kills', 'Deaths', 'Assists', 'Headshots', 'ACS', 'Econ', 'Rounds'].includes(col) ? 'bg-[#151c29] light:bg-slate-200/50' : ''}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 light:divide-slate-100 bg-[#0a0f16] light:bg-white">
              {loading && records.length === 0 ? (
                <tr>
                  <td colSpan="16" className="px-6 py-12 text-center text-slate-500 light:text-slate-400 italic text-sm">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                      Loading match records...
                    </div>
                  </td>
                </tr>
              ) : filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="16" className="px-6 py-12 text-center text-slate-500 light:text-slate-400 italic text-sm">
                    No match records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((row, idx) => (
                  <tr key={row.id || idx} className="hover:bg-[#121a25] light:hover:bg-slate-50 transition-colors group">
                    <td className="px-4 py-3 text-xs border-r border-slate-800/40 light:border-slate-200 text-slate-400 light:text-slate-600 font-medium group-hover:text-cyan-400 transition-colors">{row.game}</td>
                    <td className="px-4 py-3 text-xs border-r border-slate-800/40 light:border-slate-200 text-slate-500">{row.week || '-'}</td>
                    <td className="px-4 py-3 text-xs border-r border-slate-800/40 light:border-slate-200 text-slate-500">{row.day || '-'}</td>
                    <td className="px-4 py-3 text-xs border-r border-slate-800/40 light:border-slate-200 text-slate-500">{row.match || '-'}</td>
                    <td className="px-4 py-3 text-xs border-r border-slate-800/40 light:border-slate-200 font-mono text-cyan-500/80 light:text-blue-600/80">{row.set_num || '-'}</td>
                    <td className="px-4 py-3 text-xs border-r border-slate-800/40 light:border-slate-200 text-slate-300 light:text-slate-700 font-bold bg-[#111824]/40 light:bg-slate-50/50">{row.team_name || '-'}</td>
                    <td className="px-4 py-3 text-sm border-r border-slate-800/40 light:border-slate-200 font-black text-white light:text-slate-900 bg-[#111824]/40 light:bg-slate-50/50 tracking-wide">{row.ign}</td>
                    <td className="px-4 py-3 text-xs border-r border-slate-800/40 light:border-slate-200 bg-[#111824]/40 light:bg-slate-50/50">
                      {row.win === true ? (
                        <div className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                          Win
                        </div>
                      ) : row.win === false ? (
                        <div className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_8px_rgba(244,63,94,0.15)]">
                          Loss
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm border-r border-slate-800/40 light:border-slate-200 text-white light:text-slate-800 bg-[#151c29]/30 light:bg-slate-100/50 font-mono font-medium">{row.kills}</td>
                    <td className="px-4 py-3 text-sm border-r border-slate-800/40 light:border-slate-200 text-white light:text-slate-800 bg-[#151c29]/30 light:bg-slate-100/50 font-mono font-medium">{row.deaths}</td>
                    <td className="px-4 py-3 text-sm border-r border-slate-800/40 light:border-slate-200 text-white light:text-slate-800 bg-[#151c29]/30 light:bg-slate-100/50 font-mono font-medium">{row.assists}</td>
                    {columns.includes('Headshots') && (
                      <td className="px-4 py-3 text-sm border-r border-slate-800/40 light:border-slate-200 text-slate-400 light:text-slate-600 bg-[#151c29]/30 light:bg-slate-100/50 font-mono">
                        {row.game === 'Crossfire' ? <span className="text-cyan-400">{row.headshots}</span> : '-'}
                      </td>
                    )}
                    {columns.includes('ACS') && (
                      <td className="px-4 py-3 text-sm border-r border-slate-800/40 light:border-slate-200 text-slate-400 light:text-slate-600 bg-[#151c29]/30 light:bg-slate-100/50 font-mono">
                        {row.game === 'Valorant' ? <span className="text-emerald-400">{row.acs}</span> : '-'}
                      </td>
                    )}
                    {columns.includes('Econ') && (
                      <td className="px-4 py-3 text-sm border-r border-slate-800/40 light:border-slate-200 text-slate-400 light:text-slate-600 bg-[#151c29]/30 light:bg-slate-100/50 font-mono">
                        {row.game === 'Valorant' ? <span className="text-emerald-400">{row.econ}</span> : '-'}
                      </td>
                    )}
                    <td className="px-4 py-3 text-sm border-r border-slate-800/40 light:border-slate-200 text-slate-300 light:text-slate-700 bg-[#151c29]/30 light:bg-slate-100/50 font-mono">{row.rounds}</td>
                    <td className="px-4 py-3 text-xs border-r border-slate-800/40 light:border-slate-200 text-slate-500 light:text-slate-600 truncate max-w-[120px]">{row.map || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default RawRecords;
