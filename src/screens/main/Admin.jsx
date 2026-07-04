import React from 'react';

const Admin = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex font-sans">
      <div className="flex-1 p-6 bg-[#1a1b26] space-y-6 overflow-y-auto">
        
        {/* Top Row: Data & Users */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#1f2335] rounded-xl p-4 border border-blue-500/30">
            <h3 className="font-bold text-sm text-gray-300 mb-4">League Quick Data (PH Local Context)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center"><div className="text-2xl font-bold text-cyan-400">12,500</div><div className="text-xs text-gray-500">Players</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-cyan-400">620</div><div className="text-xs text-gray-500">Teams</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-orange-400">15</div><div className="text-xs text-gray-500">Active Tourneys</div></div>
            </div>
          </div>

          <div className="bg-[#1f2335] rounded-xl p-4 border border-gray-700">
            <h3 className="font-bold text-sm text-gray-300 mb-4">User Management & Team Directory</h3>
            <table className="w-full text-xs text-left">
               <thead><tr className="text-gray-500"><th className="pb-2">Player IGN</th><th className="pb-2">Team</th><th className="pb-2">Location</th></tr></thead>
               <tbody>
                 <tr className="border-t border-gray-800"><td className="py-2">Aldrin</td><td>Valiant</td><td>Quezon City</td></tr>
                 <tr className="border-t border-gray-800"><td className="py-2">Eman</td><td>Valiant</td><td>Cebu City</td></tr>
               </tbody>
            </table>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-[#1f2335] rounded-xl p-4 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
             <h3 className="font-bold text-sm text-gray-300">Admin and User Activity Audit Logs</h3>
             <button className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded border border-blue-600">Create Detailed Report</button>
          </div>
          <table className="w-full text-xs text-left font-mono">
             <thead className="bg-[#24283b] text-gray-400">
               <tr><th className="p-2">Timestamp</th><th className="p-2">Admin/System IGN</th><th className="p-2">Action Type</th><th className="p-2">Details</th></tr>
             </thead>
             <tbody>
               {[
                 { t: '[14:15]', sys: 'System', act: 'Manual Sync', det: 'Verified TNC South standings' },
                 { t: '[14:13]', sys: 'Admin(Eman)', act: 'Action Override', det: 'Updated Points Multiplier' },
               ].map((log, i) => (
                 <tr key={i} className="border-b border-gray-800 hover:bg-[#2a3042]">
                   <td className="p-2 text-gray-500">{log.t}</td>
                   <td className="p-2 text-blue-300">{log.sys}</td>
                   <td className="p-2">{log.act}</td>
                   <td className="p-2 text-gray-400">{log.det}</td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;