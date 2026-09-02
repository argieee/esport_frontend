import React, { useState, useEffect } from "react";
const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/w0000/svg"
    className="h-10 w-10 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);
const ScaleIcon = () => (
  <svg
    xmlns="http://www.w3.org/w0000/svg"
    className="h-12 w-12 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    />
  </svg>
);
const LadderIcon = () => (
  <svg
    xmlns="http://www.w3.org/w0000/svg"
    className="h-10 w-10 text-orange-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
);
const RuleBookIcon = () => (
  <svg
    xmlns="http://www.w3.org/w0000/svg"
    className="h-10 w-10 text-blue-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);
const Card = ({ title, children, className = "" }) => (
  <div
    className={`bg-[#0f1722] light:bg-white rounded-xl border border-[#1c2532] light:border-slate-200 shadow-xl light:shadow-sm flex flex-col overflow-hidden relative group ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.01] light:from-blue-100/[0.1] to-transparent pointer-events-none z-0"></div>
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 light:via-blue-300 to-transparent"></div>
    <div className="p-4 border-b border-[#1c2532] light:border-slate-200 bg-[#121a25] light:bg-slate-50 relative z-10 flex justify-between items-center group-hover:bg-[#151e2b] light:group-hover:bg-slate-100 transition-colors">
      <h3 className="text-sm font-bold tracking-wider text-gray-300 light:text-slate-700">
        {title}
      </h3>
    </div>
    <div className="flex-1 p-6 relative z-10">{children}</div>
  </div>
);
const Toggle = ({ enabled, onChange, label, sublabel }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-800/50 light:border-slate-200 last:border-0 hover:bg-white/[0.02] light:hover:bg-black/[0.02] px-2 -mx-2 rounded transition-colors">
    <div className="flex flex-col">
      <span className="text-xs font-bold text-gray-300 light:text-slate-700">
        {label}
      </span>
      {sublabel && (
        <span className="text-[10px] text-gray-500 light:text-slate-500">
          {sublabel}
        </span>
      )}
    </div>
    <button
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? "bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]" : "bg-[#1c2532] light:bg-slate-300"}`}
      onClick={() => onChange(!enabled)}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? "translate-x-4" : "translate-x-0"}`}
      />
    </button>
  </div>
);
const Select = ({ label, options, value, onChange }) => (
  <div className="flex flex-col w-full">
    {label && (
      <label className="text-[10px] font-bold text-gray-400 light:text-slate-500 mb-1 tracking-wider uppercase">
        {label}
      </label>
    )}
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-[#151e2b] light:bg-white border border-[#2a3648] light:border-slate-300 text-white light:text-slate-700 text-xs font-medium rounded-lg py-2.5 pl-3 pr-8 focus:outline-none focus:border-blue-500 transition-colors shadow-inner light:shadow-sm cursor-pointer"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400 light:text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
);
const Input = ({ label, placeholder, type = "text" }) => (
  <div className="flex flex-col w-full">
    {label && (
      <label className="text-[10px] font-bold text-gray-400 light:text-slate-500 mb-1 tracking-wider uppercase">
        {label}
      </label>
    )}
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-[#151e2b] light:bg-white border border-[#2a3648] light:border-slate-300 text-white light:text-slate-700 text-xs font-medium rounded-lg py-2.5 px-3 focus:outline-none focus:border-blue-500 transition-colors shadow-inner light:shadow-sm placeholder-gray-600 light:placeholder-slate-400"
    />
  </div>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative bg-[#0f1722] light:bg-white w-full ${maxWidth} rounded-2xl border border-[#1c2532] light:border-slate-200 shadow-2xl flex flex-col overflow-hidden max-h-[90vh]`}>
        <div className="p-5 border-b border-[#1c2532] light:border-slate-200 flex justify-between items-center bg-[#121a25] light:bg-slate-50">
          <h2 className="text-xl font-black tracking-wider text-white light:text-slate-900 uppercase">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
const Settings = ({ globalGame }) => {
  const activeGame = globalGame === "CROSSFIRE" ? "Crossfire" : "Valorant";
  const [manualOverride, setManualOverride] = useState(true);
  const [decayRate, setDecayRate] = useState(false);
  const [mapVeto, setMapVeto] = useState(true);
  const [adminControl, setAdminControl] = useState(false);
  const [friendlyFire, setFriendlyFire] = useState(false);
  const [tacticalTimeouts, setTacticalTimeouts] = useState(false);
  const [integrityVeto, setIntegrityVeto] = useState(true);

  // Modal State
  const [activeModal, setActiveModal] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  
  // Ban Action State
  const [isBanning, setIsBanning] = useState(false);
  const [banDuration, setBanDuration] = useState('7 Days');

  const [admins, setAdmins] = useState([]);
  const [bans, setBans] = useState([]);
  const [reports, setReports] = useState([]);
  const [health, setHealth] = useState(null);

  // Dynamic Formula State
  const [formulas, setFormulas] = useState([]);
  const [selectedRole, setSelectedRole] = useState('Global');
  
  const activeFormula = formulas.find(f => f.role === selectedRole) || {
    id: null, kill_weight: 1.0, death_weight: 1.0, assist_weight: 0.5, base_multiplier: 78.0, base_rating: 60.0
  };

  const fetchFormulas = async () => {
    try {
      const res = await fetch('/api/settings/formula');
      const data = await res.json();
      if (Array.isArray(data)) setFormulas(data);
    } catch (e) { console.error(e); }
  };

  const handleFormulaUpdate = async (field, value) => {
    const updated = { ...activeFormula, [field]: parseFloat(value) || 0 };
    setFormulas(prev => prev.map(f => f.role === selectedRole ? updated : f));
  };

  const saveFormula = async () => {
    if (!activeFormula.id) return alert('Cannot save default formula directly. Ensure database is seeded.');
    try {
      const res = await fetch(`/api/settings/formula/${activeFormula.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeFormula)
      });
      if (res.ok) alert('Formula successfully saved to the database!');
      else alert('Failed to save formula.');
    } catch (e) {
      console.error(e);
      alert('Error saving formula.');
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await fetch('/api/settings/admins');
      const data = await res.json();
      if (Array.isArray(data)) setAdmins(data);
    } catch (e) { console.error(e); }
  };
  
  const fetchReports = async () => {
    try {
      const res = await fetch('/api/settings/reports');
      const data = await res.json();
      if (Array.isArray(data)) setReports(data);
    } catch (e) { console.error(e); }
  };

  const fetchBans = async () => {
    try {
      const res = await fetch('/api/settings/bans');
      const data = await res.json();
      if (Array.isArray(data)) setBans(data);
    } catch (e) { console.error(e); }
  };

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/settings/health');
      const data = await res.json();
      if (data) setHealth(data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchAdmins();
    fetchReports();
    fetchBans();
    fetchHealth();
    fetchFormulas();
  }, []);
  return (
    <div className="flex-1 bg-[#090e14] light:bg-[#f8fafc] text-white light:text-slate-900 overflow-y-auto flex flex-col h-full relative font-sans custom-scrollbar">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
        .light-mode .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; }
        .light-mode .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
      {}
      <div className="flex-1 px-8 md:px-12 py-6 pb-16 flex flex-col items-center">
        <div className="w-full max-w-[1400px] flex flex-col gap-8">
          {}
          <div className="flex items-center space-x-4 mb-4 border-b border-[#1c2532] light:border-slate-200 pb-6">
            <div className="w-1.5 h-10 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
            <div>
              <h1 className="text-3xl font-black tracking-[0.1em] uppercase text-white light:text-slate-900 drop-shadow-md">
                SYSTEM SETTINGS
              </h1>
              <p className="text-gray-500 light:text-slate-500 text-xs mt-1">
                Configure global platform parameters, integrations, and access
                controls.
              </p>
            </div>
          </div>
          {}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {}
            <Card title="Game API & Metadata Configuration (Manual & Auto)">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[10px] font-bold text-gray-400 light:text-slate-500 tracking-wider uppercase">
                      External API Key
                    </label>
                    <div className="flex items-center space-x-2 bg-[#121a25] light:bg-slate-50 px-3 py-1 rounded-full border border-[#2a3648] light:border-slate-300">
                      <span className="text-[9px] text-gray-400 light:text-slate-500 uppercase font-bold tracking-widest">
                        Manual Override
                      </span>
                      <Toggle
                        enabled={manualOverride}
                        onChange={setManualOverride}
                      />
                    </div>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter External Key..."
                    value={manualOverride ? "************************" : ""}
                    disabled={!manualOverride}
                    className="w-full bg-[#151e2b] light:bg-white border border-[#2a3648] light:border-slate-300 text-white light:text-slate-700 text-xs font-medium rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500 transition-colors shadow-inner disabled:opacity-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 items-end">
                  <Select
                    label="Metadata Sources (Auto/Manual)"
                    options={[
                      "Crossfire API Key",
                      "Valorant Tracker API",
                      "Custom JSON Webhook",
                    ]}
                    value="Crossfire API Key"
                    onChange={() => {}}
                  />
                  <button className="w-full py-2.5 rounded-lg border border-gray-600 light:border-slate-300 bg-[#1c2532] light:bg-slate-100 text-gray-300 light:text-slate-700 text-xs font-bold hover:bg-gray-700 light:hover:bg-slate-200 hover:text-white light:hover:text-slate-900 transition-colors shadow-md light:shadow-sm">
                    Preview Data Source
                  </button>
                </div>
              </div>
            </Card>
            {}
            <Card title="Dynamic Formula Tuning Dashboard">
              <div className="flex flex-col mb-4">
                 <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
                   <div className="flex items-center space-x-3">
                     <ScaleIcon />
                     <div>
                       <h4 className="text-white font-bold tracking-wide">Evaluation Formula</h4>
                       <p className="text-gray-500 text-xs">Adjust weights for calculating the final rating.</p>
                     </div>
                   </div>
                   <div className="flex flex-col w-48">
                     <Select 
                       label="Formula Role Target" 
                       options={['Global', 'Rifler', 'Sniper']} 
                       value={selectedRole} 
                       onChange={(e) => setSelectedRole(e.target.value)} 
                     />
                   </div>
                 </div>

                 <div className="grid grid-cols-3 gap-6 mb-6">
                    <Input label="Kill Weight" type="number" step="0.01" value={activeFormula.kill_weight} onChange={(e) => handleFormulaUpdate('kill_weight', e.target.value)} />
                    <Input label="Death Weight" type="number" step="0.01" value={activeFormula.death_weight} onChange={(e) => handleFormulaUpdate('death_weight', e.target.value)} />
                    <Input label="Assist Weight" type="number" step="0.01" value={activeFormula.assist_weight} onChange={(e) => handleFormulaUpdate('assist_weight', e.target.value)} />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6 mb-6">
                    <Input label="Base Multiplier (e.g. 78.0)" type="number" step="0.1" value={activeFormula.base_multiplier} onChange={(e) => handleFormulaUpdate('base_multiplier', e.target.value)} />
                    <Input label="Base Rating (e.g. 60.0)" type="number" step="0.1" value={activeFormula.base_rating} onChange={(e) => handleFormulaUpdate('base_rating', e.target.value)} />
                 </div>

                 <div className="flex justify-end mt-4 pt-4 border-t border-gray-800">
                   <button onClick={saveFormula} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded shadow-[0_0_10px_rgba(37,99,235,0.5)] transition-colors">
                     Save Formula
                   </button>
                 </div>
              </div>
            </Card>
            {}
            <Card title="Tournament Rule Sets (Integration Defaults)">
              <div className="grid grid-cols-2 gap-8 mb-6">
                <div className="space-y-4">
                  <Select
                    label="Drag-and-drop maps (Active Pool)"
                    options={[
                      "Haven, Split, Ascent",
                      "All Maps",
                      "Custom Pool",
                    ]}
                    value="Haven, Split, Ascent"
                    onChange={() => {}}
                  />
                  <div className="bg-[#121a25] light:bg-slate-50 rounded-xl border border-[#2a3648] light:border-slate-200 p-3 space-y-1">
                    <Toggle
                      enabled={mapVeto}
                      onChange={setMapVeto}
                      label="Match Map Veto Process"
                    />
                    <Toggle
                      enabled={adminControl}
                      onChange={setAdminControl}
                      label="Admin Control Override"
                      sublabel="Forces admin approval for vetos"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Select
                    label="Tie-breaker Logic"
                    options={[
                      "Headshot %",
                      "Round Differential",
                      "First Bloods",
                    ]}
                    value="Headshot %"
                    onChange={() => {}}
                  />
                  <div className="bg-[#121a25] light:bg-slate-50 rounded-xl border border-[#2a3648] light:border-slate-200 p-3 space-y-1">
                    <Toggle
                      enabled={friendlyFire}
                      onChange={setFriendlyFire}
                      label="Manual Friendly Fire"
                    />
                    <Toggle
                      enabled={tacticalTimeouts}
                      onChange={setTacticalTimeouts}
                      label="Manual Tactical Timeouts"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-800 light:border-slate-200 pt-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <ShieldIcon />
                    <RuleBookIcon className="absolute -bottom-2 -right-2 h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-300 light:text-slate-800">
                      Integrity Controls
                    </h4>
                    <div className="mt-2 space-y-2">
                      <Toggle
                        enabled={integrityVeto}
                        onChange={setIntegrityVeto}
                        label="Automatic Integrity Veto"
                      />
                    </div>
                  </div>
                </div>
                <button className="px-6 py-2.5 rounded-lg border border-blue-500/50 light:border-blue-300 bg-blue-900/20 light:bg-blue-50 text-blue-400 light:text-blue-600 font-bold tracking-wider text-xs hover:bg-blue-600 hover:text-white transition-all shadow-[0_0_15px_rgba(37,99,235,0.15)]">
                  Test Local Override
                </button>
              </div>
            </Card>
            {}
          </div>
          {}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <button onClick={() => setActiveModal('admins')} className="bg-[#0f1722] light:bg-white border border-blue-500/30 light:border-blue-200 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-blue-900/20 light:hover:bg-blue-50 transition-all group shadow-lg light:shadow-sm">
              <span className="text-xs font-black uppercase tracking-widest text-blue-400 light:text-blue-600 mb-2">
                Match Admins
              </span>
              <div className="flex -space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-[#0f1722] light:border-white"></div>
                <div className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-[#0f1722] light:border-white"></div>
                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-[#0f1722] light:border-white"></div>
              </div>
            </button>
            <button onClick={() => setActiveModal('reports')} className="bg-[#0f1722] light:bg-white border border-red-500/30 light:border-red-200 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-red-900/20 light:hover:bg-red-50 transition-all group shadow-lg light:shadow-sm">
              <span className="text-xs font-black uppercase tracking-widest text-red-400 light:text-red-600 mb-2">
                Cheat Reports
              </span>
              <svg
                className="w-8 h-8 text-red-500 light:text-red-600 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </button>
            <button onClick={() => setActiveModal('bans')} className="bg-[#0f1722] light:bg-white border border-red-700/50 light:border-red-300 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-red-900/30 light:hover:bg-red-100 transition-all group shadow-lg light:shadow-sm">
              <span className="text-xs font-black uppercase tracking-widest text-red-600 light:text-red-700 mb-2">
                Bans
              </span>
              <svg
                className="w-8 h-8 text-red-600 light:text-red-700 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            </button>
            <button onClick={() => setActiveModal('health')} className="bg-[#0f1722] light:bg-white border border-teal-500/30 light:border-teal-200 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-teal-900/20 light:hover:bg-teal-50 transition-all group shadow-lg light:shadow-sm">
              <span className="text-xs font-black uppercase tracking-widest text-teal-400 light:text-teal-600 mb-2">
                Regional Health
              </span>
              <svg
                className="w-8 h-8 text-teal-500 light:text-teal-600 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={activeModal === 'admins'} onClose={() => setActiveModal(null)} title="Match Admins" maxWidth="max-w-3xl">
        <div className="overflow-hidden rounded-lg border border-[#2a3648] light:border-slate-200">
          <table className="min-w-full divide-y divide-[#2a3648] light:divide-slate-200">
            <thead className="bg-[#121a25] light:bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Admin Name</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Last Active</th>
              </tr>
            </thead>
            <tbody className="bg-[#151e2b] light:bg-white divide-y divide-[#2a3648] light:divide-slate-200">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-white/[0.02] light:hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white light:text-slate-900">{admin.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 light:text-blue-600">{admin.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${admin.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 light:text-slate-500">{admin.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'reports'} onClose={() => setActiveModal(null)} title="Submitted Cheat Reports" maxWidth="max-w-4xl">
        <div className="overflow-hidden rounded-lg border border-[#2a3648] light:border-slate-200">
          <table className="min-w-full divide-y divide-[#2a3648] light:divide-slate-200">
            <thead className="bg-[#121a25] light:bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Reported Player</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Reported By</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Reason</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-center text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-[#151e2b] light:bg-white divide-y divide-[#2a3648] light:divide-slate-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-white/[0.02] light:hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-400 light:text-red-600">{report.reported}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 light:text-slate-700">{report.reporter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 light:text-slate-500">{report.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 light:text-slate-500">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-[10px] font-bold uppercase tracking-wider rounded-full ${
                      report.status === 'Pending' ? 'bg-orange-900/50 text-orange-400 border border-orange-500/30' :
                      report.status === 'Under Review' ? 'bg-blue-900/50 text-blue-400 border border-blue-500/30' :
                      'bg-green-900/50 text-green-400 border border-green-500/30'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button 
                      onClick={() => setSelectedReport(report)}
                      className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-500/30 underline-offset-4"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal isOpen={!!selectedReport} onClose={() => setSelectedReport(null)} title="Review Cheat Report" maxWidth="max-w-2xl">
        {selectedReport && (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-[#1c2532] light:border-slate-200 pb-4">
              <div>
                <h3 className="text-lg font-black text-white light:text-slate-900">{selectedReport.reported}</h3>
                <p className="text-xs text-gray-500 light:text-slate-500 mt-1">Reported by: <span className="font-bold text-gray-300 light:text-slate-700">{selectedReport.reporter}</span></p>
              </div>
              <span className={`px-3 py-1 inline-flex text-xs font-bold uppercase tracking-wider rounded-full ${
                selectedReport.status === 'Pending' ? 'bg-orange-900/50 text-orange-400 border border-orange-500/30' :
                selectedReport.status === 'Under Review' ? 'bg-blue-900/50 text-blue-400 border border-blue-500/30' :
                'bg-green-900/50 text-green-400 border border-green-500/30'
              }`}>
                {selectedReport.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider mb-2">Reported Reason</h4>
                <div className="bg-[#121a25] light:bg-slate-50 p-3 rounded-lg border border-[#2a3648] light:border-slate-200 text-sm text-red-400 light:text-red-600 font-bold">
                  {selectedReport.reason}
                </div>
              </div>
              
              <div>
                <h4 className="text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider mb-2">Statement</h4>
                <div className="bg-[#121a25] light:bg-slate-50 p-4 rounded-lg border border-[#2a3648] light:border-slate-200 text-sm text-gray-300 light:text-slate-700 italic">
                  "Player was tracking through walls consistently during round 4 and 7. Included video evidence below."
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider mb-2">Evidence</h4>
                <div className="w-full h-48 bg-[#0f1722] light:bg-slate-200 rounded-lg border border-[#2a3648] light:border-slate-300 flex items-center justify-center relative overflow-hidden group">
                  <svg className="w-12 h-12 text-gray-600 light:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white font-bold tracking-widest text-sm">PLAY VIDEO</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col pt-4 border-t border-[#1c2532] light:border-slate-200">
              {!isBanning ? (
                <div className="flex justify-between items-center w-full">
                  <button onClick={() => {setSelectedReport(null); setIsBanning(false);}} className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">Close</button>
                  <div className="space-x-3">
                    <button onClick={async () => {
                      try {
                        await fetch(`/api/settings/reports/${selectedReport.id}`, { method: 'DELETE' });
                        await fetchReports();
                        setSelectedReport(null);
                      } catch (e) { console.error(e); }
                    }} className="px-4 py-2 bg-[#1c2532] hover:bg-[#2a3648] text-white text-sm font-bold rounded-lg transition-all">Dismiss</button>
                    <button onClick={() => setIsBanning(true)} className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all">Ban Player</button>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-[#121a25] light:bg-slate-50 p-4 rounded-xl border border-[#2a3648] light:border-slate-200 flex flex-col space-y-4">
                  <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Configure Ban Duration</h4>
                  <div className="flex items-end space-x-4">
                    <Select 
                      label="Duration" 
                      options={['7 Days', '14 Days', '30 Days', 'Permanent']} 
                      value={banDuration} 
                      onChange={setBanDuration} 
                    />
                    <div className="flex space-x-2">
                      <button onClick={() => setIsBanning(false)} className="px-4 py-2.5 text-xs font-bold text-gray-400 hover:text-white transition-colors">Cancel</button>
                      <button onClick={async () => {
                        try {
                          await fetch('/api/settings/bans', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              player_name: selectedReport.reported,
                              reason: selectedReport.reason,
                              duration: banDuration,
                              report_id: selectedReport.id
                            })
                          });
                          await fetchReports();
                          await fetchBans();
                          setSelectedReport(null);
                          setIsBanning(false);
                        } catch (e) { console.error(e); }
                      }} className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all whitespace-nowrap">
                        Confirm Ban
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={activeModal === 'bans'} onClose={() => setActiveModal(null)} title="Banned Players List" maxWidth="max-w-3xl">
        <div className="overflow-hidden rounded-lg border border-[#2a3648] light:border-slate-200">
          <table className="min-w-full divide-y divide-[#2a3648] light:divide-slate-200">
            <thead className="bg-[#121a25] light:bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Player Name</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Reason</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 light:text-slate-500 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-[#151e2b] light:bg-white divide-y divide-[#2a3648] light:divide-slate-200">
              {bans.map((ban) => (
                <tr key={ban.id} className="hover:bg-white/[0.02] light:hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white light:text-slate-900">{ban.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-400 light:text-red-600">{ban.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 light:text-slate-500">{ban.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ban.duration === 'Permanent' ? 'bg-red-900/50 text-red-400 border border-red-500/30' : 'bg-orange-900/50 text-orange-400 border border-orange-500/30'}`}>
                      {ban.duration}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal isOpen={activeModal === 'health'} onClose={() => setActiveModal(null)} title="Regional System Health">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#151e2b] light:bg-slate-50 p-5 rounded-xl border border-[#2a3648] light:border-slate-200 flex flex-col justify-between h-32">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Server Status</span>
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)] animate-pulse ${health?.server_status === 'OPTIMAL' ? 'bg-teal-400' : 'bg-red-400'}`}></div>
              <span className="text-2xl font-black text-white">{health?.server_status || 'LOADING...'}</span>
            </div>
          </div>
          <div className="bg-[#151e2b] light:bg-slate-50 p-5 rounded-xl border border-[#2a3648] light:border-slate-200 flex flex-col justify-between h-32">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Server Load</span>
              <span className="text-xs font-bold text-teal-400">{health?.server_load || 0}%</span>
            </div>
            <div className="w-full bg-[#0f1722] light:bg-slate-200 rounded-full h-3 mt-4 overflow-hidden border border-[#1c2532] light:border-slate-300">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{ width: `${health?.server_load || 0}%` }}></div>
            </div>
          </div>
          <div className="bg-[#151e2b] light:bg-slate-50 p-5 rounded-xl border border-[#2a3648] light:border-slate-200 flex flex-col justify-between h-32">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Avg Latency (US-East)</span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-3xl font-black text-white">{health?.avg_latency || 0}</span>
              <span className="text-sm font-bold text-gray-500">ms</span>
            </div>
          </div>
          <div className="bg-[#151e2b] light:bg-slate-50 p-5 rounded-xl border border-[#2a3648] light:border-slate-200 flex flex-col justify-between h-32">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Matches</span>
            <div className="flex items-baseline space-x-2 mt-2">
              <span className="text-3xl font-black text-white">{health?.active_matches || 0}</span>
              <span className="text-sm font-bold text-green-500">{health?.active_matches_trend || '+0%'}</span>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default Settings;
