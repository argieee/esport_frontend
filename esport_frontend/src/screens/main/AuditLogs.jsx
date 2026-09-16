import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedLogId, setExpandedLogId] = useState(null);
  useEffect(() => {
    fetchLogs();
  }, []);
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/api/audit-logs');
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch audit logs: ${res.status} ${errData.error || ''}`);
      }
      const data = await res.json();
      setLogs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getGameColor = (game) => {
    if (game === 'Valorant') return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    if (game === 'Crossfire') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
  };
  return (
    <div className="flex-1 bg-[#090e14] light:bg-[#f8fafc] text-white light:text-slate-900 overflow-y-auto flex flex-col h-full relative font-sans custom-scrollbar" style={{ padding: '32px' }}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
        .light-mode .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; }
        .light-mode .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="flex items-center justify-end" style={{ marginBottom: '32px' }}>
          <button 
            onClick={fetchLogs}
            className="flex items-center gap-2 px-6 py-3 bg-[#121a25] light:bg-white hover:bg-[#1a2533] light:hover:bg-slate-50 border border-[#2a3648] light:border-slate-300 rounded-xl text-cyan-400 light:text-cyan-600 text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]" style={{ padding: "12px 24px", borderRadius: "9999px" }}
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Logs
          </button>
        </div>
        {error && (
          <div className="bg-red-500/10 light:bg-red-50 border border-red-500/20 light:border-red-200 text-red-400 light:text-red-600 p-4 rounded-xl mb-6">
            Error: {error}
          </div>
        )}
        <div className="bg-[#0f1722] light:bg-white rounded-xl border border-[#1c2532] light:border-slate-200 shadow-2xl light:shadow-sm flex flex-col overflow-hidden">
           <div className="p-5 border-b border-[#1c2532] light:border-slate-200 bg-[#121a25] light:bg-slate-50 flex justify-between items-center relative overflow-hidden" style={{ padding: "24px 32px" }}>
               <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]"></div>
               <h2 className="text-sm font-bold text-gray-300 light:text-slate-700 tracking-wide uppercase ml-3" style={{ paddingLeft: "12px" }}>Admin and User Activity Audit Logs (PH Context)</h2>
               <div className="flex gap-4">
                 <div className="flex items-center gap-2 px-3 py-1 bg-[#1a2533] light:bg-white rounded-lg border border-[#2a3648] light:border-slate-200 shadow-sm" style={{ padding: "8px 16px", borderRadius: "9999px" }}>
                    <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
                    <span className="text-[10px] font-black tracking-wider text-rose-400 light:text-rose-600 uppercase">Valorant</span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-[#1a2533] light:bg-white rounded-lg border border-[#2a3648] light:border-slate-200 shadow-sm" style={{ padding: "8px 16px", borderRadius: "9999px" }}>
                    <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                    <span className="text-[10px] font-black tracking-wider text-amber-400 light:text-amber-600 uppercase">Crossfire</span>
                 </div>
               </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#151e2b] light:bg-slate-100 text-gray-500 light:text-slate-500 border-b border-[#1c2532] light:border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] w-40" style={{ padding: "16px 24px" }}>Timestamp</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] w-48" style={{ padding: "16px 24px" }}>Admin/System IGN</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] w-48" style={{ padding: "16px 24px" }}>Action Type</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]" style={{ padding: "16px 24px" }}>Description</th>
                    <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px] w-24 text-center" style={{ padding: "16px 24px" }}>Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c2532] light:divide-slate-200">
                  {logs.length === 0 && !loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-slate-500 light:text-slate-400 italic text-sm">
                        No audit logs found.
                      </td>
                    </tr>
                  ) : (
                    logs.map((log) => {
                      const isExpanded = expandedLogId === log.id;
                      const date = new Date(log.created_at);
                      const ign = log.details?.ign || 'System';
                      return (
                        <React.Fragment key={log.id}>
                          <tr className={`hover:bg-[#1a2533]/50 light:hover:bg-slate-50 transition-colors group cursor-pointer ${isExpanded ? 'bg-[#151e2b] light:bg-slate-50' : ''}`}>
                            <td className="px-6 py-4" style={{ padding: "16px 24px" }}>
                              <div className="text-gray-300 light:text-slate-700 font-mono tracking-wider group-hover:text-cyan-400 light:group-hover:text-cyan-600 transition-colors">
                                {date.toLocaleDateString()}
                              </div>
                              <div className="text-[10px] text-gray-500 light:text-slate-400 font-mono tracking-widest">
                                {date.toLocaleTimeString()}
                              </div>
                            </td>
                            <td className="px-6 py-4" style={{ padding: "16px 24px" }}>
                              <span className="text-gray-300 light:text-slate-800 font-bold tracking-wide">{ign}</span>
                            </td>
                            <td className="px-6 py-4" style={{ padding: "16px 24px" }}>
                              <div className="flex flex-col items-start gap-2">
                                <span className="text-gray-400 light:text-slate-600 font-bold text-xs uppercase tracking-wider">{log.action_type}</span>
                                {log.game && (
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${getGameColor(log.game)}`} style={{ padding: "4px 8px", borderRadius: "9999px" }}>
                                    {log.game}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4" style={{ padding: "16px 24px" }}>
                              <span className="text-gray-400 light:text-slate-600 group-hover:text-gray-300 light:group-hover:text-slate-800 transition-colors">{log.description}</span>
                            </td>
                            <td className="px-6 py-4 text-center" style={{ padding: "16px 24px" }}>
                              {log.details && (
                                <button
                                  onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${
                                    ""}
                                    style={{ padding: "8px 16px", borderRadius: "9999px" }}
                                    isExpanded 
                                      ? 'bg-cyan-500/20 light:bg-cyan-50 border-cyan-500/50 light:border-cyan-300 text-cyan-400 light:text-cyan-600 shadow-[0_0_10px_rgba(6,182,212,0.2)]' 
                                      : 'bg-[#121a25] light:bg-white border-[#2a3648] light:border-slate-300 text-gray-400 light:text-slate-500 hover:text-cyan-400 light:hover:text-cyan-600 hover:border-cyan-500/30'
                                  }`}
                                 style={{ padding: "8px 16px", borderRadius: "9999px" }}>
                                  {isExpanded ? 'Hide' : 'View'}
                                </button>
                              )}
                            </td>
                          </tr>
                          {}
                          {isExpanded && log.details && (
                            <tr className="bg-[#0b1018] light:bg-slate-50 border-b border-[#1c2532] light:border-slate-200">
                              <td colSpan="5" className="px-8 py-8 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/30"></div>
                                {log.details.matchHeader && (
                                  <div className="mb-6 bg-[#121a25] light:bg-white border border-[#2a3648] light:border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                    <div className="px-4 py-2 bg-[#151e2b] light:bg-slate-100 border-b border-[#2a3648] light:border-slate-200">
                                      <span className="text-[10px] font-black text-cyan-400 light:text-cyan-600 uppercase tracking-widest">Main Match Header Configuration</span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 text-center">
                                      <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 light:text-slate-400 uppercase tracking-widest mb-1">League</span>
                                        <span className="text-white light:text-slate-800 font-bold text-xs">{log.details.matchHeader.league || '-'}</span>
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 light:text-slate-400 uppercase tracking-widest mb-1">Week</span>
                                        <span className="text-white light:text-slate-800 font-bold text-xs">{log.details.matchHeader.week || '-'}</span>
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 light:text-slate-400 uppercase tracking-widest mb-1">Day</span>
                                        <span className="text-white light:text-slate-800 font-bold text-xs">{log.details.matchHeader.day || '-'}</span>
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 light:text-slate-400 uppercase tracking-widest mb-1">Match</span>
                                        <span className="text-white light:text-slate-800 font-bold text-xs">{log.details.matchHeader.match || '-'}</span>
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 light:text-slate-400 uppercase tracking-widest mb-1">Set</span>
                                        <span className="text-white light:text-slate-800 font-bold text-xs">{log.details.matchHeader.setNum || '-'}</span>
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-[9px] text-gray-500 light:text-slate-400 uppercase tracking-widest mb-1">Map</span>
                                        <span className="text-white light:text-slate-800 font-bold text-xs">{log.details.matchHeader.mapName || '-'}</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                <div className="bg-[#05080c] light:bg-slate-800 border border-slate-800/80 light:border-slate-700 rounded-xl p-5 overflow-x-auto relative">
                                  <div className="absolute top-0 right-0 px-3 py-1 bg-slate-800/50 light:bg-slate-700/50 text-[9px] font-black text-slate-500 light:text-slate-400 uppercase tracking-widest rounded-bl-lg">
                                    Raw JSON Payload
                                  </div>
                                  <pre className="text-xs font-mono text-emerald-400 light:text-emerald-300 mt-2">
                                    {JSON.stringify(log.details, null, 2)}
                                  </pre>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};
export default AuditLogs;
