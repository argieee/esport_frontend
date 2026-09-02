import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../utils/api';
const Card = ({ title, children, className = "" }) => (
  <div className={`bg-[#121a25] light:bg-white rounded-xl border border-[#232f40] light:border-slate-200 shadow-xl light:shadow-sm flex flex-col overflow-hidden relative group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] light:from-transparent to-transparent pointer-events-none z-0"></div>
    <div className="p-4 border-b border-[#232f40] light:border-slate-200 bg-[#151e2b] light:bg-slate-50 relative z-10 flex justify-between items-center shrink-0">
      <h3 className="text-sm font-bold tracking-wider text-gray-200 light:text-slate-800">{title}</h3>
    </div>
    <div className="flex-1 p-4 relative z-10 min-h-[300px]">
      {children}
    </div>
  </div>
);
const MapBpResults = ({ globalGame, globalTournament }) => {
  const activeGame = (globalGame || 'VALORANT').toUpperCase();
  const [dbVetoes, setDbVetoes] = useState([]);
  useEffect(() => {
    apiFetch(`/api/vetoes?tournament=${encodeURIComponent(globalTournament)}&game=${encodeURIComponent(activeGame === 'VALORANT' ? 'Valorant' : 'Crossfire')}`)
      .then(r => r.json())
      .then(data => setDbVetoes(data))
      .catch(console.error);
  }, [globalTournament, activeGame]);
  return (
    <div className="flex-1 bg-[#090e14] light:bg-[#f8fafc] text-white light:text-slate-900 overflow-y-auto flex flex-col h-full custom-scrollbar relative p-8">
      <div className="w-full mx-auto pb-16 h-full flex flex-col">
        <Card title="Map BP Results" className="w-full flex-1">
          <div className="overflow-x-auto flex-1">
            <table className="w-full table-fixed text-center text-sm">
              <thead>
                <tr className="border-b border-[#232f40] text-[10px] font-black tracking-widest text-slate-400 uppercase bg-[#0d131c]">
                  <th className="px-4 py-3">Team 1</th>
                  <th className="px-4 py-3">Team 2</th>
                  <th className="px-4 py-3">Ban 1</th>
                  <th className="px-4 py-3">Ban 2</th>
                  <th className="px-4 py-3">Ban 3</th>
                  <th className="px-4 py-3">Ban 4</th>
                  <th className="px-4 py-3">Map 1</th>
                  <th className="px-4 py-3">Map 2</th>
                  <th className="px-4 py-3">Map 3</th>
                  <th className="px-4 py-3">Map 4</th>
                  <th className="px-4 py-3">Map 5</th>
                </tr>
              </thead>
              <tbody>
                {dbVetoes.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center py-8 text-slate-500 font-bold uppercase tracking-widest text-[10px]">No Map Veto results found</td>
                  </tr>
                ) : (
                  dbVetoes.map((v, i) => (
                    <tr key={v.id} className={`border-b border-[#232f40]/50 hover:bg-slate-800/30 transition-colors ${i % 2 === 0 ? 'bg-[#121a25]/50' : 'bg-[#151e2b]/50'}`}>
                      <td className="px-4 py-4 font-black text-blue-400 truncate">{v.team_a}</td>
                      <td className="px-4 py-4 font-black text-red-400 truncate">{v.team_b}</td>
                      <td className="px-4 py-4 text-rose-400/80 font-semibold">{v.ban_1 || '-'}</td>
                      <td className="px-4 py-4 text-rose-400/80 font-semibold">{v.ban_2 || '-'}</td>
                      <td className="px-4 py-4 text-rose-400/80 font-semibold">{v.ban_3 || '-'}</td>
                      <td className="px-4 py-4 text-rose-400/80 font-semibold">{v.ban_4 || '-'}</td>
                      <td className="px-4 py-4 text-emerald-400 font-bold">{v.map_1 || '-'}</td>
                      <td className="px-4 py-4 text-emerald-400 font-bold">{v.map_2 || '-'}</td>
                      <td className="px-4 py-4 text-emerald-400 font-bold">{v.map_3 || '-'}</td>
                      <td className="px-4 py-4 text-emerald-400 font-bold">{v.map_4 || '-'}</td>
                      <td className="px-4 py-4 text-emerald-400 font-bold">{v.map_5 || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default MapBpResults;
