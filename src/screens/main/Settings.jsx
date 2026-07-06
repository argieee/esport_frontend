import React, { useState } from 'react';

// --- ICONS ---
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const ScaleIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>
);

const LadderIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-10 w-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const RuleBookIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const KeysIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-10 w-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);


// --- REUSABLE COMPONENTS ---

const Card = ({ title, children, className = "" }) => (
  <div className={`bg-[#0f1722] rounded-xl border border-[#1c2532] shadow-xl flex flex-col overflow-hidden relative group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.01] to-transparent pointer-events-none z-0"></div>
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
    <div className="p-4 border-b border-[#1c2532] bg-[#121a25] relative z-10 flex justify-between items-center group-hover:bg-[#151e2b] transition-colors">
      <h3 className="text-sm font-bold tracking-wider text-gray-300">{title}</h3>
    </div>
    <div className="flex-1 p-6 relative z-10">
      {children}
    </div>
  </div>
);

const Toggle = ({ enabled, onChange, label, sublabel }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0 hover:bg-white/[0.02] px-2 -mx-2 rounded transition-colors">
    <div className="flex flex-col">
       <span className="text-xs font-bold text-gray-300">{label}</span>
       {sublabel && <span className="text-[10px] text-gray-500">{sublabel}</span>}
    </div>
    <button 
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]' : 'bg-[#1c2532]'}`}
      onClick={() => onChange(!enabled)}
    >
      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
  </div>
);

const Select = ({ label, options, value, onChange }) => (
  <div className="flex flex-col w-full">
    {label && <label className="text-[10px] font-bold text-gray-400 mb-1 tracking-wider uppercase">{label}</label>}
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-[#151e2b] border border-[#2a3648] text-white text-xs font-medium rounded-lg py-2.5 pl-3 pr-8 focus:outline-none focus:border-blue-500 transition-colors shadow-inner cursor-pointer"
      >
        {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>
  </div>
);

const Input = ({ label, placeholder, type = "text" }) => (
  <div className="flex flex-col w-full">
    {label && <label className="text-[10px] font-bold text-gray-400 mb-1 tracking-wider uppercase">{label}</label>}
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-[#151e2b] border border-[#2a3648] text-white text-xs font-medium rounded-lg py-2.5 px-3 focus:outline-none focus:border-blue-500 transition-colors shadow-inner placeholder-gray-600"
    />
  </div>
);

const CustomCheckbox = ({ checked, onChange }) => (
  <button 
    onClick={() => onChange(!checked)}
    className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${checked ? 'bg-blue-600 border-blue-500 shadow-[0_0_5px_rgba(37,99,235,0.5)]' : 'bg-[#151e2b] border-[#2a3648]'}`}
  >
    {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
  </button>
);


// --- MAIN SETTINGS COMPONENT ---

const Settings = () => {
  // Config States
  const [activeGame, setActiveGame] = useState('Valorant');
  const [manualOverride, setManualOverride] = useState(true);
  const [decayRate, setDecayRate] = useState(false);
  const [mapVeto, setMapVeto] = useState(true);
  const [adminControl, setAdminControl] = useState(false);
  const [friendlyFire, setFriendlyFire] = useState(false);
  const [tacticalTimeouts, setTacticalTimeouts] = useState(false);
  const [integrityVeto, setIntegrityVeto] = useState(true);

  // Permissions Data Mock
  const permissionsData = [
    { role: 'Head Admin', full: true, match: true, score: true },
    { role: 'Tournament Mod', full: false, match: true, score: true },
    { role: 'Observer', full: false, match: false, score: false },
    { role: 'League Operator', full: true, match: true, score: true },
  ];

  const [permissions, setPermissions] = useState(permissionsData);

  const togglePermission = (index, field) => {
    const newPerms = [...permissions];
    newPerms[index][field] = !newPerms[index][field];
    setPermissions(newPerms);
  };

  return (
    <div className="flex-1 bg-[#090e14] text-white overflow-hidden flex flex-col h-full relative font-sans">
      
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
        <div className="max-w-[1500px] mx-auto flex flex-col gap-8">

          {/* Header */}
          <div className="flex items-center space-x-4 mb-4 border-b border-[#1c2532] pb-6">
             <div className="w-1.5 h-10 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
             <div>
                <h1 className="text-3xl font-black tracking-[0.1em] uppercase text-white drop-shadow-md">
                    SYSTEM SETTINGS
                </h1>
                <p className="text-gray-500 text-xs mt-1">Configure global platform parameters, integrations, and access controls.</p>
             </div>
          </div>

          {/* Main Grid Setup */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* CARD 1: API Configuration */}
            <Card title="Game API & Metadata Configuration (Manual & Auto)">
              <div className="flex space-x-6 mb-8">
                 <button 
                   onClick={() => setActiveGame('Valorant')}
                   className={`flex items-center space-x-2 pb-2 border-b-2 transition-all ${activeGame === 'Valorant' ? 'border-[#ff4655] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                 >
                   <svg viewBox="0 0 100 100" className={`h-5 w-5 ${activeGame === 'Valorant' ? 'fill-[#ff4655]' : 'fill-gray-500'}`}><path d="M99 0L35.2 61.2 53.6 100zM0 0l31.2 65.6L19 100 0 60z"/></svg>
                   <span className="font-bold tracking-wider">Valorant</span>
                 </button>
                 <button 
                   onClick={() => setActiveGame('Crossfire')}
                   className={`flex items-center space-x-2 pb-2 border-b-2 transition-all ${activeGame === 'Crossfire' ? 'border-[#4c7fd6] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                 >
                   <svg viewBox="0 0 100 100" className={`h-5 w-5 ${activeGame === 'Crossfire' ? 'fill-[#4c7fd6]' : 'fill-gray-500'}`}><circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="15" fill="none"/><circle cx="50" cy="50" r="10" fill="currentColor"/></svg>
                   <span className="font-bold tracking-wider">Crossfire</span>
                 </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">External API Key</label>
                    <div className="flex items-center space-x-2 bg-[#121a25] px-3 py-1 rounded-full border border-[#2a3648]">
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Manual Override</span>
                      <Toggle enabled={manualOverride} onChange={setManualOverride} />
                    </div>
                  </div>
                  <input 
                    type="password" 
                    placeholder="Enter External Key..." 
                    value={manualOverride ? "************************" : ""}
                    disabled={!manualOverride}
                    className="w-full bg-[#151e2b] border border-[#2a3648] text-white text-xs font-medium rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 transition-colors shadow-inner disabled:opacity-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 items-end">
                  <Select label="Metadata Sources (Auto/Manual)" options={['Crossfire API Key', 'Valorant Tracker API', 'Custom JSON Webhook']} value="Crossfire API Key" onChange={() => {}} />
                  <button className="w-full py-2.5 rounded-lg border border-gray-600 bg-[#1c2532] text-gray-300 text-xs font-bold hover:bg-gray-700 hover:text-white transition-colors shadow-md">
                    Preview Data Source
                  </button>
                </div>
              </div>
            </Card>

            {/* CARD 2: Ranking Algorithm */}
            <Card title="Live Ranking Algorithm & Point System Rules">
               <div className="flex items-start justify-between mb-8">
                  <ScaleIcon />
                  <div className="flex space-x-4">
                     <Input label="Win Multiplier" placeholder="1.5" type="number" />
                     <Input label="Kill Multiplier" placeholder="1.0" type="number" />
                     <Input label="MVP Multiplier" placeholder="2.0" type="number" />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8 mt-8 border-t border-gray-800 pt-6">
                  <div className="flex flex-col justify-center">
                     <Toggle enabled={decayRate} onChange={setDecayRate} label="Decay Rate" sublabel="Active/Inactive Toggle" />
                     <p className="text-[10px] text-gray-500 mt-3">When active, players lose points for inactivity over 14 days.</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                     <LadderIcon />
                     <div className="flex-1">
                        <Select label="Leaderboard Reset Cycle" options={['Weekly', 'Monthly', 'Seasonal']} value="Seasonal" onChange={() => {}} />
                     </div>
                  </div>
               </div>
            </Card>

            {/* CARD 3: Tournament Rule Sets */}
            <Card title="Tournament Rule Sets (Integration Defaults)">
               <div className="grid grid-cols-2 gap-8 mb-6">
                  <div className="space-y-4">
                     <Select label="Drag-and-drop maps (Active Pool)" options={['Haven, Split, Ascent', 'All Maps', 'Custom Pool']} value="Haven, Split, Ascent" onChange={() => {}} />
                     
                     <div className="bg-[#121a25] rounded-xl border border-[#2a3648] p-3 space-y-1">
                        <Toggle enabled={mapVeto} onChange={setMapVeto} label="Match Map Veto Process" />
                        <Toggle enabled={adminControl} onChange={setAdminControl} label="Admin Control Override" sublabel="Forces admin approval for vetos" />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <Select label="Tie-breaker Logic" options={['Headshot %', 'Round Differential', 'First Bloods']} value="Headshot %" onChange={() => {}} />
                     
                     <div className="bg-[#121a25] rounded-xl border border-[#2a3648] p-3 space-y-1">
                        <Toggle enabled={friendlyFire} onChange={setFriendlyFire} label="Manual Friendly Fire" />
                        <Toggle enabled={tacticalTimeouts} onChange={setTacticalTimeouts} label="Manual Tactical Timeouts" />
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-between border-t border-gray-800 pt-6">
                  <div className="flex items-center space-x-4">
                     <div className="relative">
                       <ShieldIcon />
                       <RuleBookIcon className="absolute -bottom-2 -right-2 h-6 w-6" />
                     </div>
                     <div>
                        <h4 className="text-xs font-bold text-gray-300">Integrity Controls</h4>
                        <div className="mt-2 space-y-2">
                           <Toggle enabled={integrityVeto} onChange={setIntegrityVeto} label="Automatic Integrity Veto" />
                        </div>
                     </div>
                  </div>
                  <button className="px-6 py-2.5 rounded-lg border border-blue-500/50 bg-blue-900/20 text-blue-400 font-bold tracking-wider text-xs hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_15px_rgba(37,99,235,0.15)]">
                    Test Local Override
                  </button>
               </div>
            </Card>

            {/* CARD 4: Access Controls */}
            <Card title="Admin & Access Controls (Detailed Permissions)">
               <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="border-2 border-dashed border-[#2a3648] rounded-xl bg-[#121a25] p-6 flex flex-col items-center justify-center text-center group hover:border-blue-500 hover:bg-[#151e2b] transition-all cursor-pointer">
                     <div className="bg-[#1c2532] p-3 rounded-full mb-3 group-hover:scale-110 transition-transform shadow-lg">
                        <UploadIcon />
                     </div>
                     <span className="text-xs font-bold text-gray-300">Upload File</span>
                     <span className="text-[9px] text-gray-500 mt-1">Ready for upload (Sample CSV/JSON included)</span>
                     <span className="text-[10px] text-blue-400 mt-2 font-medium hover:underline">Download Template File</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center space-y-4">
                     <KeysIcon />
                     <button className="w-full py-3 rounded-lg bg-white text-black font-black tracking-widest text-xs uppercase hover:bg-gray-200 transition-colors shadow-lg">
                       Create New Role
                     </button>
                  </div>
               </div>

               <div className="border border-[#1c2532] rounded-xl overflow-hidden">
                  <div className="bg-[#151e2b] p-3 border-b border-[#1c2532]">
                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Admins Permissions</span>
                  </div>
                  <div className="divide-y divide-[#1c2532]">
                     {permissions.map((perm, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 hover:bg-[#121a25] transition-colors">
                           <div className="flex items-center space-x-2 w-1/3">
                              <div className={`w-2 h-2 rounded-full ${perm.full ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : 'bg-red-500'}`}></div>
                              <span className="text-xs font-bold text-gray-300 truncate">{perm.role}</span>
                           </div>
                           <div className="flex items-center space-x-2 w-1/4">
                              <CustomCheckbox checked={perm.full} onChange={() => togglePermission(idx, 'full')} />
                              <span className="text-[10px] text-gray-400">Full Access</span>
                           </div>
                           <div className="flex items-center space-x-2 w-1/4">
                              <CustomCheckbox checked={perm.match} onChange={() => togglePermission(idx, 'match')} />
                              <span className="text-[10px] text-gray-400">Pause/Resume</span>
                           </div>
                           <div className="flex items-center space-x-2">
                              <CustomCheckbox checked={perm.score} onChange={() => togglePermission(idx, 'score')} />
                              <span className="text-[10px] text-gray-400">Score Update</span>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </Card>

          </div>

          {/* Bottom Action Quick Links */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
             <button className="bg-[#0f1722] border border-blue-500/30 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-blue-900/20 transition-all group shadow-lg">
                <span className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">Match Admins</span>
                <div className="flex -space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                   <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-[#0f1722]"></div>
                   <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-[#0f1722]"></div>
                   <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-[#0f1722]"></div>
                </div>
             </button>

             <button className="bg-[#0f1722] border border-red-500/30 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-red-900/20 transition-all group shadow-lg">
                <span className="text-xs font-black uppercase tracking-widest text-red-400 mb-2">Cheat Reports</span>
                <svg className="w-8 h-8 text-red-500 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             </button>

             <button className="bg-[#0f1722] border border-red-700/50 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-red-900/30 transition-all group shadow-lg">
                <span className="text-xs font-black uppercase tracking-widest text-red-600 mb-2">Bans</span>
                <svg className="w-8 h-8 text-red-600 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
             </button>

             <button className="bg-[#0f1722] border border-teal-500/30 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-teal-900/20 transition-all group shadow-lg">
                <span className="text-xs font-black uppercase tracking-widest text-teal-400 mb-2">Regional Health</span>
                <svg className="w-8 h-8 text-teal-500 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;