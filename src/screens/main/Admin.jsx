import React, { useState } from 'react';

// --- ICONS ---
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClipboardCheckIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);


// --- MOCK DATA ---
const userDirectoryData = [
  { ign: 'Argie', team: 'Valorant', location: 'Quezon City', country: 'PH', contact: '09xx-xxx-xxxx', verified: true },
  { ign: 'Argie', team: 'Valorant', location: 'Cebu City', country: 'PH', contact: '09xx-xxx-xxxx', verified: false, pending: true },
  { ign: 'Crossfire', team: 'Crossfire', location: 'Cebu City', country: 'PH', contact: '09xx-xxx-xxxx', verified: false, rejected: true },
  { ign: 'Sarah', team: 'Crossfire', location: 'Davao City', country: 'PH', contact: '09xx-xxx-xxxx', verified: false, info: 'Linked PH ID/Facebook Profile' },
  { ign: 'EliteSniper', team: 'TNC South', location: 'Makati', country: 'PH', contact: '09xx-xxx-xxxx', verified: true },
];

const auditLogsData = [
  { time: '[14:15]', ign: 'System', type: 'Manual Type', details: "Verified 'TNC South' seedings list" },
  { time: '[14:15]', ign: 'Admin(Argie)', type: 'Action Overrides', details: "Updated Points Multiplier for TNC Community Cup" },
  { time: '[14:02]', ign: 'Admin(Sarah)', type: 'Approved', details: "Approved 'TNC Luzon' Valorant Points Multiplier" },
  { time: '[14:02]', ign: 'Admin(Sarah)', type: 'Audit Process', details: "Verified 5 new players" },
  { time: '[13:45]', ign: 'System', type: 'Automated Event', details: "Season 4 Round Robin Bracket generated" },
];

const maps = ['Ascent', 'Fracture', 'Pearl', 'Haven', 'Crossfire', 'Crossfire(Luzon)', 'Crossfire(Visayas)'];
const modes = ['Single Elimination', 'Round Robin'];

// --- COMPONENTS ---

const ToggleSwitch = ({ enabled, onChange }) => (
  <button 
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-cyan-500' : 'bg-[#1c2532] border border-[#2a3648]'}`}
    onClick={() => onChange(!enabled)}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const SelectDropdown = ({ label, options, defaultValue }) => (
  <div className="relative">
    <select className="appearance-none w-full bg-[#121a25] border border-[#2a3648] text-gray-300 font-medium text-xs rounded py-2 pl-3 pr-8 focus:outline-none focus:border-cyan-500 transition-colors">
      {options.map((opt, i) => <option key={i} value={opt} selected={opt === defaultValue}>{opt}</option>)}
    </select>
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <ChevronDownIcon />
    </div>
  </div>
);


const Admin = () => {
  const [banOverride, setBanOverride] = useState(false);
  const [seasonReset, setSeasonReset] = useState(true);
  const [activeMap, setActiveMap] = useState('Ascent');

  return (
    <div className="flex-1 bg-[#090e14] text-white overflow-y-auto flex flex-col h-full relative font-sans custom-scrollbar">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
      
      {/* Scrollable Container */}
      <div className="flex-1 p-6 md:p-8 pb-16">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
          
          {/* TOP SECTION: Stats & User Management */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* League Quick Stats */}
            <div className="xl:col-span-5 bg-[#0f1722] rounded-xl border border-[#1c2532] shadow-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#1c2532] bg-[#121a25]">
                 <h2 className="text-sm font-bold text-gray-300 tracking-wide">League Quick Stats (PH Local Context)</h2>
              </div>
              <div className="p-5 grid grid-cols-3 gap-4 flex-1">
                 
                 {/* Top Row Stats */}
                 <div className="flex flex-col items-center justify-center bg-[#151e2b] border border-[#1c2532] rounded-lg p-3">
                    <span className="text-xs text-gray-400 mb-2">Total Registered Players</span>
                    <div className="flex items-center space-x-3 mb-1">
                       <UsersIcon />
                       <div className="flex flex-col">
                         <span className="text-2xl font-black text-cyan-400 leading-none">12,500</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Players</span>
                       </div>
                    </div>
                    <span className="text-[9px] text-gray-500 mt-2 text-center">Verified (PH: 98%)</span>
                 </div>

                 <div className="flex flex-col items-center justify-center bg-[#151e2b] border border-[#1c2532] rounded-lg p-3">
                    <span className="text-xs text-gray-400 mb-2">Total Teams</span>
                    <div className="flex items-center space-x-3 mb-1">
                       <TrophyIcon />
                       <div className="flex flex-col">
                         <span className="text-2xl font-black text-cyan-400 leading-none">620</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Teams</span>
                       </div>
                    </div>
                    <span className="text-[9px] text-gray-500 mt-2 text-center text-balance">Active Teams (Local Leagues)</span>
                 </div>

                 <div className="flex flex-col items-center justify-center bg-[#151e2b] border border-[#1c2532] rounded-lg p-3">
                    <span className="text-xs text-gray-400 mb-2">Active Tournaments</span>
                    <div className="flex items-center space-x-3 mb-1">
                       <CalendarIcon />
                       <div className="flex flex-col">
                         <span className="text-2xl font-black text-orange-400 leading-none">15</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Tournaments</span>
                       </div>
                    </div>
                    <span className="text-[9px] text-gray-500 mt-2 text-center text-balance">Ongoing (Metro Manila, Cebu, etc.)</span>
                 </div>

                 {/* Bottom Row Stats */}
                 <div className="col-span-2 flex flex-col items-center justify-center bg-[#151e2b] border border-[#1c2532] rounded-lg p-3">
                    <span className="text-xs text-gray-400 mb-2">Pending Verifications</span>
                    <div className="flex items-center space-x-4 mb-1">
                       <ClipboardCheckIcon />
                       <div className="flex flex-col">
                         <span className="text-2xl font-black text-orange-400 leading-none">45</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Verifications</span>
                       </div>
                    </div>
                    <span className="text-[9px] text-gray-500 mt-2">New Player IDs to review</span>
                 </div>

                 <div className="flex flex-col items-center justify-center bg-[#151e2b] border border-[#1c2532] rounded-lg p-3">
                    <span className="text-xs text-gray-400 mb-2">New Admin Logins</span>
                    <div className="flex items-center space-x-3 mb-1">
                       <LockIcon />
                       <div className="flex flex-col">
                         <span className="text-2xl font-black text-cyan-400 leading-none">12</span>
                         <span className="text-[10px] text-gray-500 font-bold uppercase">Admins</span>
                       </div>
                    </div>
                    <span className="text-[9px] text-gray-500 mt-2 text-center text-balance">Admins (Central & Local PH)</span>
                 </div>

              </div>
            </div>

            {/* User Management Directory */}
            <div className="xl:col-span-7 bg-[#0f1722] rounded-xl border border-[#1c2532] shadow-xl overflow-hidden flex flex-col">
              <div className="p-4 border-b border-[#1c2532] bg-[#121a25] flex justify-between items-center">
                 <div>
                   <h2 className="text-sm font-bold text-gray-300 tracking-wide">User Management & Team Directory (PH Players)</h2>
                   <span className="text-[10px] text-gray-500 font-mono italic">(Verification Hub - PH Local)</span>
                 </div>
                 <div className="flex space-x-2">
                    <div className="relative w-48">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <SearchIcon />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Search (IGN, Team, Location)" 
                        className="w-full bg-[#151e2b] border border-[#2a3648] text-gray-300 text-xs rounded py-1.5 pl-8 pr-2 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <SelectDropdown options={['Game (VAL/CF)', 'VALORANT', 'CROSSFIRE']} />
                    <SelectDropdown options={['Verification Status', 'Verified', 'Pending', 'Rejected']} />
                 </div>
              </div>

              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151e2b] text-gray-500 sticky top-0 shadow-sm z-10 border-b border-[#1c2532]">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-1/5">Player IGN</th>
                      <th className="px-4 py-3 font-semibold">Team</th>
                      <th className="px-4 py-3 font-semibold">Registration Status</th>
                      <th className="px-4 py-3 font-semibold">Country</th>
                      <th className="px-4 py-3 font-semibold">Contact</th>
                      <th className="px-4 py-3 font-semibold text-center w-20">Verified</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c2532]">
                    {userDirectoryData.map((user, idx) => (
                      <tr key={idx} className="hover:bg-[#151e2b]/50 transition-colors cursor-pointer group">
                        <td className="px-4 py-3 text-gray-300 font-medium group-hover:text-cyan-400">{user.ign}</td>
                        <td className="px-4 py-3 text-gray-400">{user.team}</td>
                        <td className="px-4 py-3">
                           <div className="flex items-center space-x-2">
                             <div className="w-4 h-3 bg-gradient-to-r from-blue-700 to-red-600 rounded-sm"></div>
                             <span className="text-gray-400">{user.location}</span>
                           </div>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{user.country}</td>
                        <td className="px-4 py-3 text-gray-400 font-mono tracking-wider">{user.contact}</td>
                        <td className="px-4 py-3 text-center flex flex-col items-center justify-center">
                          {user.verified && (
                            <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          )}
                          {user.pending && (
                            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                          )}
                          {user.rejected && (
                            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.071 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
                          )}
                          {user.info && <span className="text-[8px] text-orange-400 mt-1 whitespace-nowrap">{user.info}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Table Actions */}
              <div className="p-3 border-t border-[#1c2532] bg-[#121a25] flex justify-between items-center">
                 <div className="flex items-center space-x-2 font-black text-xl italic tracking-wider text-orange-500 drop-shadow-md">
                    <svg viewBox="0 0 100 100" className="w-6 h-6 fill-orange-500"><path d="M50 0L90 20v50L50 100 10 70V20z"/></svg>
                    <span>TNC Hub</span>
                 </div>
                 <div className="flex space-x-3">
                    <button className="px-4 py-1.5 rounded bg-transparent border border-cyan-700/50 text-cyan-500 text-xs font-bold hover:bg-cyan-900/30 transition-colors">Create New Player</button>
                    <button className="px-4 py-1.5 rounded bg-transparent border border-cyan-700/50 text-cyan-500 text-xs font-bold hover:bg-cyan-900/30 transition-colors">Import Teams via CSV</button>
                 </div>
              </div>
            </div>
            
          </div>

          {/* MIDDLE SECTION: Core Ruleset */}
          <div className="bg-[#0f1722] rounded-xl border border-[#1c2532] shadow-xl flex flex-col">
             <div className="p-4 border-b border-[#1c2532] bg-[#121a25] flex justify-between items-center">
                 <h2 className="text-sm font-bold text-gray-300 tracking-wide">Core Ruleset and Bracket Seedings (Manual Veto & PH Local)</h2>
                 <button className="px-3 py-1 rounded bg-transparent border border-[#2a3648] text-gray-400 text-[10px] font-bold hover:bg-[#1c2532] transition-colors">Drag and Drop</button>
             </div>
             
             <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
               
               {/* Maps & Modes Selection */}
               <div className="xl:col-span-2 flex flex-col">
                  <div className="flex flex-wrap gap-4 mb-6">
                    {maps.map((map) => (
                      <div 
                        key={map} 
                        onClick={() => setActiveMap(map)}
                        className={`flex flex-col items-center cursor-pointer transition-all ${activeMap === map ? 'scale-105' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
                      >
                        <div className={`w-20 h-16 rounded-md mb-2 overflow-hidden border-2 ${activeMap === map ? 'border-cyan-400 shadow-[0_0_10px_rgba(0,208,235,0.4)]' : 'border-[#2a3648]'} relative bg-[#151e2b]`}>
                           {/* Placeholder stylish background */}
                           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-transparent"></div>
                           {/* Decorative generic shape to act as thumbnail */}
                           <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                        </div>
                        <span className={`text-[10px] font-bold ${activeMap === map ? 'text-cyan-400' : 'text-gray-400'}`}>{map}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-[#1c2532]">
                    {modes.map((mode) => (
                      <div key={mode} className="flex flex-col items-center cursor-pointer opacity-70 hover:opacity-100 transition-all">
                        <div className="w-16 h-16 rounded-md mb-2 bg-[#151e2b] border border-[#2a3648] flex items-center justify-center">
                           <svg className="w-8 h-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400">{mode}</span>
                      </div>
                    ))}

                    <div className="flex flex-col ml-8 border-l border-[#1c2532] pl-8">
                       <span className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest">Manual Rule-Set Overrides</span>
                       <span className="text-[10px] text-gray-600 font-mono">History log: Not localized</span>
                       <span className="text-[10px] text-gray-600 font-mono">History log: Not localized</span>
                       <span className="text-[10px] text-gray-600 font-mono">History log: Not localized</span>
                    </div>
                  </div>
               </div>

               {/* Configurations & Bracket Seedings */}
               <div className="flex flex-col gap-6 border-l border-[#1c2532] pl-8">
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-[10px] font-bold text-gray-400 block mb-1">Point System Multiplier</label>
                       <SelectDropdown options={['1.5', '1.0', '2.0']} defaultValue="1.5" />
                     </div>
                     <div>
                       <label className="text-[10px] font-bold text-gray-400 block mb-1">Ban Logic Override</label>
                       <SelectDropdown options={['None', 'Global', 'Strict']} defaultValue="None" />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                     <div>
                       <SelectDropdown options={['Single Elimination', 'Double Elim']} defaultValue="Single Elimination" />
                     </div>
                     <div className="flex justify-end">
                       <ToggleSwitch enabled={banOverride} onChange={setBanOverride} />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                     <div>
                       <label className="text-[10px] font-bold text-gray-400 block mb-1">Season Reset Schedule</label>
                       <SelectDropdown options={['Time', 'Manual']} defaultValue="Time" />
                     </div>
                     <div className="flex justify-end mt-4">
                       <ToggleSwitch enabled={false} onChange={() => {}} />
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 items-center">
                     <div>
                       <SelectDropdown options={['Monday', 'Tuesday', 'Sunday']} defaultValue="Monday" />
                     </div>
                     <div className="flex justify-end">
                       <ToggleSwitch enabled={seasonReset} onChange={setSeasonReset} />
                     </div>
                  </div>

                  {/* Seedings Mockup */}
                  <div className="mt-4 border border-[#2a3648] bg-[#151e2b] rounded-lg p-3 relative">
                     <span className="absolute -top-2 left-3 bg-[#151e2b] px-1 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Manual Bracket Seeding Control (PH Seedings)</span>
                     <div className="text-[9px] text-gray-600 mb-3 mt-1 text-center italic">Drag and Drop</div>
                     
                     <div className="grid grid-cols-2 gap-2">
                        <div className="bg-[#0f1722] border border-[#2a3648] rounded px-2 py-1.5 flex items-center space-x-2 text-[10px] font-medium text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div>
                          <span className="truncate">Seed 1 (TNC North)</span>
                        </div>
                        <div className="bg-[#0f1722] border border-cyan-500/50 rounded px-2 py-1.5 flex items-center space-x-2 text-[10px] font-medium text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div>
                          <span className="truncate">Seed 2 (TNC South)</span>
                        </div>
                        <div className="bg-[#0f1722] border border-[#2a3648] rounded px-2 py-1.5 flex items-center space-x-2 text-[10px] font-medium text-gray-300">
                          <div className="w-4 h-3 bg-gradient-to-r from-blue-700 to-red-600 rounded-sm"></div>
                          <span className="truncate">Seed 2 (TNC South)</span>
                        </div>
                        <div className="bg-[#0f1722] border border-[#2a3648] rounded px-2 py-1.5 flex items-center space-x-2 text-[10px] font-medium text-gray-300">
                          <div className="w-4 h-3 bg-gradient-to-r from-blue-700 to-red-600 rounded-sm"></div>
                        </div>
                        <div className="bg-[#0f1722] border border-[#2a3648] rounded px-2 py-1.5 flex items-center space-x-2 text-[10px] font-medium text-gray-300">
                          <div className="w-3 h-3 rounded-full bg-orange-500 shadow-sm"></div>
                          <span className="truncate">Seed 3 (TNC North)</span>
                        </div>
                        <div className="bg-[#0f1722] border border-[#2a3648] rounded px-2 py-1.5 flex items-center space-x-2 text-[10px] font-medium text-gray-300">
                        </div>
                        <div className="bg-[#0f1722] border border-[#2a3648] rounded px-2 py-1.5 flex items-center space-x-2 text-[10px] font-medium text-gray-300">
                          <div className="w-4 h-3 bg-gradient-to-r from-blue-700 to-red-600 rounded-sm"></div>
                          <span className="truncate">Seed 4 (TNC North)</span>
                        </div>
                        <div className="bg-[#0f1722] border border-[#2a3648] rounded px-2 py-1.5 flex items-center space-x-2 text-[10px] font-medium text-gray-300">
                        </div>
                     </div>
                  </div>

               </div>
             </div>
          </div>

          {/* BOTTOM SECTION: Audit Logs */}
          <div className="bg-[#0f1722] rounded-xl border border-[#1c2532] shadow-xl flex flex-col">
             <div className="p-4 border-b border-[#1c2532] bg-[#121a25] flex justify-between items-center">
                 <h2 className="text-sm font-bold text-gray-300 tracking-wide">Admin and User Activity Audit Logs (PH Context)</h2>
                 <button className="px-4 py-1.5 rounded bg-[#1c2532] border border-[#2a3648] text-cyan-400 text-xs font-bold hover:bg-[#232f40] transition-colors">Create Detailed Report</button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#151e2b] text-gray-500 border-b border-[#1c2532]">
                    <tr>
                      <th className="px-6 py-3 font-semibold w-32">Timestamp</th>
                      <th className="px-6 py-3 font-semibold w-48">Admin/System IGN</th>
                      <th className="px-6 py-3 font-semibold w-48">Action Type</th>
                      <th className="px-6 py-3 font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c2532]">
                    {auditLogsData.map((log, idx) => (
                      <tr key={idx} className="hover:bg-[#151e2b]/50 transition-colors cursor-pointer group">
                        <td className="px-6 py-3 text-gray-400 font-mono tracking-wide group-hover:text-cyan-400">{log.time}</td>
                        <td className="px-6 py-3 text-gray-300 font-medium">{log.ign}</td>
                        <td className="px-6 py-3 text-gray-400">{log.type}</td>
                        <td className="px-6 py-3 text-gray-400">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Admin;