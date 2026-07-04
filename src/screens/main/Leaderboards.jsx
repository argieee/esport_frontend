import React, { useState } from 'react';

const Leaderboards = () => {
  const [activeGame, setActiveGame] = useState('VALORANT');

  const standingsData = [
    { rank: 1, team: 'EVOS Esport', w: 8, l: 1 },
    { rank: 2, team: 'UBECMANIAC', w: 7, l: 2 },
    { rank: 3, team: 'Pacific', w: 6, l: 3 },
  ];

  return (
    <div className="flex-1 p-8 bg-[#0f1923] overflow-y-auto custom-scrollbar">
       <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center border-b border-gray-800 pb-4">
            <div className="flex space-x-6 text-sm font-bold uppercase tracking-widest">
                <button onClick={() => setActiveGame('VALORANT')} className={`pb-4 relative ${activeGame === 'VALORANT' ? 'text-white' : 'text-gray-500'}`}>
                    VALORANT {activeGame === 'VALORANT' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00ffcc]"></div>}
                </button>
                <button onClick={() => setActiveGame('CROSSFIRE')} className={`pb-4 relative ${activeGame === 'CROSSFIRE' ? 'text-white' : 'text-gray-500'}`}>
                    CROSSFIRE {activeGame === 'CROSSFIRE' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00ffcc]"></div>}
                </button>
            </div>
          </div>

          <div className="bg-[#182433] rounded-2xl p-6 border border-gray-700/50 shadow-xl">
             <h3 className="text-sm font-black text-white tracking-widest uppercase mb-6">STANDINGS</h3>
             <table className="w-full text-left text-sm">
                <thead className="text-gray-400 bg-[#111620]">
                   <tr><th className="p-4">RANK</th><th className="p-4">TEAM NAME</th><th className="p-4">W</th><th className="p-4">L</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                   {standingsData.map((row) => (
                      <tr key={row.rank} className="hover:bg-white/[0.02] text-gray-200">
                         <td className="p-4 font-mono">{row.rank}</td>
                         <td className="p-4 font-bold">{row.team}</td>
                         <td className="p-4 text-cyan-400">{row.w}</td>
                         <td className="p-4 text-red-400">{row.l}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};

export default Leaderboards;