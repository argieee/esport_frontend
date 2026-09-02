import React, { useState, useRef, useCallback, useEffect } from "react";
import { apiFetch } from "../../utils/api.js";
import { ErrorBoundary } from "../../ErrorBoundary.jsx";
import Dashboard from "./Dashboard.jsx";
import Tournament from "./Tournament.jsx";
import Mapping from "./Mapping.jsx";
import DataEntry from "./DataEntry.jsx";
import PRSEntry from "./PRSEntry.jsx";
import Leaderboards from "./Leaderboards.jsx";
import Analytics from "./Analytics.jsx";import Admin from "./Admin.jsx";import PlayerManagement from "./PlayerManagement.jsx";
import AuditLogs from "./AuditLogs.jsx";
import PlayerRankings from "./PlayerRankings.jsx";
import PlayerStatsTab from "./PlayerStatsTab.jsx";
import RawRecords from "./RawRecords.jsx";
import MapBpResults from "./MapBpResults.jsx";
import Bracket from "./Bracket.jsx";
import Predictions from "./Predictions.jsx";
import Settings from "./Settings.jsx";

const IconPRSEntry = () => (
  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const IconDashboard = () => (  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>    <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10-1a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5z" />  </svg>);const IconTournament = () => (  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>    <path strokeLinecap="round" strokeLinejoin="round" d="M16 4h2a2 2 0 012 2v1a4 4 0 01-4 4m-4 0a4 4 0 01-4-4V6a2 2 0 012-2h2m-2 0h4m-2 7v4m-4 4h8a1 1 0 001-1v-1a3 3 0 00-3-3h-4a3 3 0 00-3 3v1a1 1 0 001 1z" />  </svg>);const IconMapVetoes = () => (  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />  </svg>);const IconDataEntry = () => (  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />  </svg>);const IconLeaderboards = () => (  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4v10H3V10zm7-6h4v16h-4V4zm7 8h4v8h-4v-8z" />  </svg>);const IconAnalytics = () => (  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />  </svg>);const IconAdmin = () => (  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />  </svg>);const IconSettings = () => (  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />  </svg>);const IconMoon = () => (  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />  </svg>);const IconSun = () => (  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />  </svg>);const IconLogout = () => (  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />  </svg>);const IconWarning = () => (  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />  </svg>);const IconGeneric = () => (
  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const iconMap = {
  'Dashboard': IconDashboard,
  'Tournament': IconTournament,
  'Bracket': IconTournament,
  'Predictions': IconAnalytics,
  'Map Vetoes': IconMapVetoes,
  'Data Entry': IconDataEntry,
  'PRS Entry': IconPRSEntry,
  'Player Management': IconAdmin,
  'Map BP Results': IconMapVetoes,
  'Admin': IconAdmin,
  'Settings': IconSettings,
  'Player Management': IconGeneric,
  'Audit Logs': IconGeneric,
  'Player Rankings': IconGeneric,
  'Player Stats': IconGeneric,
  'Raw Records': IconGeneric,
  'Map BP Results': IconGeneric,
  'Bracket': IconGeneric,
  'Predictions': IconGeneric,
};
const MainUIScreen = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [globalGame, setGlobalGame] = useState('VALORANT');
  const [globalTournament, setGlobalTournament] = useState('');
  const [tournaments, setTournaments] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [lightMode, setLightMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderGame, setNewFolderGame] = useState('VALORANT');
  const [logoutHovered, setLogoutHovered] = useState(false);
  const logoutBtnRef = useRef(null);
  const handleRipple = useCallback((e, ref) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.className = 'logout-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);
  const loadTournaments = useCallback(async () => {
    try {
      const res = await apiFetch('/api/tournaments');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setTournaments(data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch tournaments:', err);
    }
  }, []);
  useEffect(() => {
    loadTournaments();
  }, [loadTournaments]);
  useEffect(() => {
    if (globalTournament && tournaments.length > 0) {
      const selected = tournaments.find(t => t.id == globalTournament);
      if (selected && selected.game) {
        setGlobalGame(selected.game);
      }
    }
  }, [globalTournament, tournaments]);
  const sidebarData = [
    { 
      category: 'MAIN', 
      links: [
        { name: 'Dashboard' }, 
        { name: 'Tournament' },
        { name: 'Bracket' },
        { name: 'Predictions' }
      ] 
    },
    { 
      category: 'MANAGEMENT', 
      links: [
        { name: 'Map Vetoes' }, 
        { name: 'Data Entry' },
        ...(globalGame === 'CROSSFIRE' ? [{ name: 'PRS Entry' }] : []),
        { name: 'Player Management' },
        { name: 'Map BP Results' }
      ] 
    },
    { 
      category: 'ANALYTICS', 
      links: [
        { name: 'Leaderboards' }, 
        { name: 'Analytics' },
        { name: 'Player Rankings' },
        { name: 'Player Stats' },
        { name: 'Raw Records' }
      ] 
    },
    { 
      category: 'SYSTEM', 
      links: [
        { name: 'Admin' }, 
        { name: 'Audit Logs' },
        { name: 'Settings' }
      ] 
    }
  ];
  const renderContent = () => {
    const requiresFolder = ['Dashboard', 'Tournament', 'Bracket', 'Predictions', 'Map Vetoes', 'Data Entry', 'PRS Entry', 'Player Management', 'Map BP Results', 'Leaderboards', 'Analytics', 'Player Rankings', 'Player Stats', 'Raw Records'];
    if (requiresFolder.includes(activeTab) && !globalTournament) {
       return (
         <div className="p-8 w-full h-full flex flex-col items-center animate-fade-in text-white overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}>
            <div className="flex flex-col items-center justify-center w-full max-w-[1200px] mt-12 mb-10">
               <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#00ffcc] to-transparent mb-6 opacity-50"></div>
               <h1 className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] drop-shadow-lg text-white mb-2">Select a Folder</h1>
               <p className="text-slate-400 font-medium tracking-widest text-sm uppercase">Choose a tournament to view its {activeTab}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] w-full pb-20">
               {tournaments.map(t => (
                 <div 
                   key={t.id} 
                   onClick={() => setGlobalTournament(t.id)}
                   className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 cursor-pointer hover:border-[#00ffcc] hover:bg-slate-800/80 shadow-lg hover:shadow-[0_0_30px_rgba(0,255,204,0.15)] transition-all flex items-center gap-5 group"
                 >
                    <div className="w-16 h-16 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-center text-[#00ffcc] group-hover:scale-110 transition-transform shadow-inner">
                       <svg className="w-8 h-8 opacity-80 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <h3 className="text-xl font-black text-white truncate">{t.name}</h3>
                       <div className="flex items-center gap-2 mt-1.5">
                         <span className="w-2 h-2 rounded-full bg-[#00ffcc]"></span>
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.game}</p>
                       </div>
                    </div>
                 </div>
               ))}
               <div 
                 onClick={() => {
                   setNewFolderGame(globalGame || 'VALORANT');
                   setNewFolderName('');
                   setShowCreateFolderModal(true);
                 }}
                 className="bg-transparent border-2 border-dashed border-slate-700/50 rounded-2xl p-6 cursor-pointer hover:border-[#00ffcc] hover:bg-[#00ffcc]/5 transition-all flex items-center gap-5 group opacity-60 hover:opacity-100"
               >
                  <div className="w-16 h-16 rounded-xl border border-slate-600 flex items-center justify-center text-slate-400 group-hover:text-[#00ffcc] group-hover:border-[#00ffcc]/50 group-hover:scale-110 transition-all">
                     <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-slate-300 group-hover:text-[#00ffcc]">Create New</h3>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Add Folder</p>
                  </div>
               </div>
            </div>
         </div>
       );
    }
    switch (activeTab) {
      case 'Dashboard': return <ErrorBoundary><Dashboard globalGame={globalGame} globalTournament={globalTournament} /></ErrorBoundary>;
      case 'Tournament': return <Tournament globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Bracket': return <Bracket globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Predictions': return <Predictions globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Map Vetoes': return <Mapping globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Data Entry': return <DataEntry key={`de-${globalTournament}`} globalGame={globalGame} globalTournament={globalTournament} />;
      case 'PRS Entry': return <PRSEntry key={`prs-${globalTournament}`} globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Player Management': return <PlayerManagement globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Map BP Results': return <MapBpResults globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Leaderboards': return <Leaderboards globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Analytics': return <Analytics globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Player Rankings': return <PlayerRankings globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Player Stats': return <PlayerStatsTab globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Raw Records': return <RawRecords globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Admin': return <Admin globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Audit Logs': return <AuditLogs globalGame={globalGame} globalTournament={globalTournament} />;
      case 'Settings': return <Settings globalGame={globalGame} globalTournament={globalTournament} />;
      default:        return (          <div className="h-full flex flex-col items-center justify-center p-10 bg-[#070b14]">            <div className="border border-slate-800 bg-slate-900/40 rounded-[2rem] p-12 text-center animate-fade-in shadow-2xl backdrop-blur-sm max-w-lg w-full">              <h2 className="text-2xl font-black text-slate-200 mb-3 uppercase tracking-[0.2em]">{activeTab}</h2>              <p className="text-sm font-medium text-slate-500 tracking-wider">This module is currently under active development.</p>            </div>          </div>        );    }  };  return (    <div className="flex h-screen bg-[#040814] text-slate-200 font-sans overflow-hidden selection:bg-cyan-500/30">      <style dangerouslySetInnerHTML={{__html: `        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }         .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }        .custom-scrollbar::-webkit-scrollbar { width: 5px; }        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }        /* Toggle Switch */        .toggle-switch { position: relative; width: 48px; height: 26px; border-radius: 13px; cursor: pointer; transition: background-color 0.35s ease; }        .toggle-switch.off { background-color: #1e293b; }        .toggle-switch.on { background-color: #00ffcc; box-shadow: 0 0 16px rgba(0,255,204,0.4); }        .toggle-knob { position: absolute; top: 3px; width: 20px; height: 20px; border-radius: 50%; background: #fff; transition: left 0.35s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 2px 6px rgba(0,0,0,0.3); }        .toggle-switch.off .toggle-knob { left: 3px; }        .toggle-switch.on .toggle-knob { left: 25px; }        /* Nav item underline indicator */        .nav-underline {          position: absolute;          bottom: 4px;          left: 50%;          transform: translateX(-50%) scaleX(0);          width: 40%;          height: 2px;          border-radius: 2px;          background: linear-gradient(90deg, transparent, #00ffcc, transparent);          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease;          opacity: 0;        }        .nav-underline.active {          transform: translateX(-50%) scaleX(1);          opacity: 1;        }        /* Active nav glow pulse */        @keyframes glowPulse {          0%, 100% { box-shadow: 0 0 12px rgba(0,255,204,0.1), inset 0 0 12px rgba(0,255,204,0.03); }          50% { box-shadow: 0 0 24px rgba(0,255,204,0.18), inset 0 0 20px rgba(0,255,204,0.06); }        }        .nav-active-glow { animation: glowPulse 3s ease-in-out infinite; }        /* Title gradient animation */        @keyframes gradientShift {          0% { background-position: 0% 50%; }          50% { background-position: 100% 50%; }          100% { background-position: 0% 50%; }        }        .title-gradient {          background: linear-gradient(135deg, #00ffcc, #3b82f6, #00ffcc, #60a5fa);          background-size: 300% 300%;          -webkit-background-clip: text;          background-clip: text;          -webkit-text-fill-color: transparent;          animation: gradientShift 6s ease-in-out infinite;        }        /* Title underline */        @keyframes underlineGlow {          0% { transform: scaleX(0.3); opacity: 0.4; }          50% { transform: scaleX(1); opacity: 1; }          100% { transform: scaleX(0.3); opacity: 0.4; }        }        .title-underline {          height: 2px;          border-radius: 2px;          background: linear-gradient(90deg, transparent, #00ffcc, #3b82f6, transparent);          animation: underlineGlow 4s ease-in-out infinite;        }        /* Logout button ripple */        .logout-ripple {          position: absolute;          border-radius: 50%;          background: rgba(255,255,255,0.3);          width: 10px; height: 10px;          transform: translate(-50%, -50%) scale(0);          animation: rippleOut 0.6s ease-out forwards;          pointer-events: none;        }        @keyframes rippleOut {          to { transform: translate(-50%, -50%) scale(20); opacity: 0; }        }        /* Logout shimmer sweep */        @keyframes logoutShimmer {          0% { transform: translateX(-100%); }          100% { transform: translateX(250%); }        }        .logout-btn-styled::after {          content: '';          position: absolute;          top: 0; left: 0;          width: 40%; height: 100%;          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);          transform: translateX(-100%);        }        .logout-btn-styled:hover::after {          animation: logoutShimmer 0.8s ease-in-out;        }        /* Subtle glow pulse on logout */        @keyframes logoutGlow {          0%, 100% { box-shadow: 0 0 0px rgba(220,38,38,0), 0 4px 12px rgba(0,0,0,0.3); }          50% { box-shadow: 0 0 18px rgba(220,38,38,0.25), 0 4px 12px rgba(0,0,0,0.3); }        }        .logout-btn-styled { animation: logoutGlow 3s ease-in-out infinite; }        /* Modal overlay */        @keyframes modalOverlayIn { from { opacity: 0; } to { opacity: 1; } }        @keyframes modalOverlayOut { from { opacity: 1; } to { opacity: 0; } }        @keyframes modalScaleIn { from { opacity: 0; transform: scale(0.85) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }        @keyframes modalScaleOut { from { opacity: 1; transform: scale(1) translateY(0); } to { opacity: 0; transform: scale(0.85) translateY(20px); } }        .modal-overlay-enter { animation: modalOverlayIn 0.3s ease forwards; }        .modal-content-enter { animation: modalScaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }        /* Hover icon bounce */        @keyframes iconBounce {          0%, 100% { transform: scale(1); }          50% { transform: scale(1.15); }        }        .nav-btn:hover .nav-icon { animation: iconBounce 0.35s ease; }      `}} />      {}      {showLogoutModal && (        <div           className="fixed inset-0 z-50 flex items-center justify-center modal-overlay-enter"          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}          onClick={() => setShowLogoutModal(false)}        >          <div             className="modal-content-enter bg-[#0f1729] border border-slate-700/60 rounded-3xl p-8 w-full max-w-sm mx-4 shadow-[0_25px_60px_rgba(0,0,0,0.5)]"            onClick={(e) => e.stopPropagation()}          >            {}            <div className="flex justify-center mb-5">              <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">                <IconWarning />              </div>            </div>            <h3 className="text-xl font-black text-white text-center tracking-wider uppercase mb-2">              End Session?            </h3>            <p className="text-sm text-slate-400 text-center mb-8 leading-relaxed">              You're about to log out of the dashboard. Any unsaved changes will be lost.            </p>            <div className="flex gap-3">              <button                onClick={() => setShowLogoutModal(false)}                className="flex-1 px-5 py-3.5 rounded-2xl text-sm font-bold text-slate-300 bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/60 hover:text-white transition-all duration-300 tracking-wider uppercase"              >                Cancel              </button>              <button                onClick={() => {                  setShowLogoutModal(false);                  onLogout();                }}                className="flex-1 px-5 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-[0_4px_20px_rgba(239,68,68,0.3)] hover:shadow-[0_6px_30px_rgba(239,68,68,0.5)] transition-all duration-300 tracking-wider uppercase active:scale-95"              >                Logout              </button>            </div>          </div>        </div>      )}      {}      <aside         className={`bg-[#0B1120] border-slate-800/60 z-20 shrink-0 shadow-[4px_0_30px_rgba(0,0,0,0.3)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden          ${isSidebarOpen ? 'w-[300px] border-r opacity-100' : 'w-0 border-r-0 opacity-0'}        `}      >        {}        <div className="w-[300px] h-full flex flex-col">          {}          <div className="px-8 pt-10 pb-6">            <h1 className="text-[28px] font-black title-gradient tracking-[0.25em] uppercase text-center">              ESPORT            </h1>            <div className="title-underline mt-3 w-full"></div>          </div>          {}          <div className="flex-1 overflow-y-auto px-5 custom-scrollbar pb-4 mt-1">            {sidebarData.map((section, idx) => (              <div key={idx} className={idx > 0 ? 'mt-6' : ''}>                <p className="text-[10px] text-slate-500/70 uppercase tracking-[0.3em] mb-2 font-bold px-5">                  {section.category}                </p>                <ul className="space-y-3">                  {section.links.map((link, linkIdx) => {                    const IconComponent = iconMap[link.name];                    const isActive = activeTab === link.name;                    return (                      <li key={linkIdx}>                        <button                           onClick={() => setActiveTab(link.name)}                           className={`nav-btn w-full flex items-center gap-4 relative text-left px-5 py-[16px] rounded-2xl text-[15px] font-semibold transition-all duration-300 group                            ${isActive                               ? 'bg-white/[0.07] text-[#00ffcc]'                               : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-100'                            }`}                        >                          {/* Left accent bar */}                          <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all duration-300 ${isActive ? 'h-[55%] bg-[#00ffcc] shadow-[0_0_12px_rgba(0,255,204,0.9)]' : 'h-0 bg-transparent'}`}></div>                          {/* Icon */}                          <span className={`nav-icon flex-shrink-0 transition-all duration-300 ${isActive ? 'text-[#00ffcc]' : 'text-slate-500 group-hover:text-slate-200'}`}>                            {IconComponent && <IconComponent />}                          </span>                          {/* Label */}                          <span className="tracking-wide">{link.name}</span>                          {/* Bottom underline indicator */}                          <div className={`nav-underline ${isActive ? 'active' : ''}`}></div>                        </button>                      </li>                    );                  })}                </ul>              </div>            ))}          </div>          {/* BOTTOM AREA: Logout + Light Mode (matching reference order) */}          <div className="px-5 pb-6 pt-4 border-t border-slate-800/40 mt-auto shrink-0">            {/* Logout - simple menu item style */}            <button               ref={logoutBtnRef}              onClick={(e) => {                handleRipple(e, logoutBtnRef);                setShowLogoutModal(true);              }}              onMouseEnter={() => setLogoutHovered(true)}              onMouseLeave={() => setLogoutHovered(false)}              className="logout-btn-styled w-full flex items-center gap-4 relative text-left px-5 py-[16px] rounded-2xl text-[15px] font-semibold overflow-hidden transition-all duration-300 group                text-slate-400 hover:bg-white/[0.04] hover:text-slate-100 mb-3 cursor-pointer"            >              <span className={`flex-shrink-0 transition-all duration-300 ${logoutHovered ? 'text-red-400' : 'text-slate-500 group-hover:text-slate-200'}`}>                <IconLogout />              </span>              <span className="tracking-wide">Logout</span>            </button>            {/* Light Mode Toggle - at very bottom */}            <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white/[0.03] transition-all duration-300 cursor-pointer group"                 onClick={() => setLightMode(!lightMode)}>              <div className="flex items-center gap-4">                <span className={`transition-all duration-300 ${lightMode ? 'text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]' : 'text-slate-500 group-hover:text-slate-300'}`}>                  {lightMode ? <IconSun /> : <IconMoon />}                </span>                <span className="text-[14px] font-semibold text-slate-400 tracking-wide group-hover:text-slate-200 transition-colors">Light Mode</span>              </div>              <div                 className={`toggle-switch ${lightMode ? 'on' : 'off'}`}                 role="switch"                aria-checked={lightMode}              >                <div className="toggle-knob"></div>              </div>            </div>          </div>        </div>      </aside>      {/* MAIN CONTENT AREA */}      <main className="flex-1 bg-[#040814] flex flex-col overflow-hidden relative">        {/* Modern Glassmorphism Header */}        <header className="h-24 border-b border-slate-800/50 flex items-center justify-between px-8 md:px-10 bg-[#0B1120]/80 backdrop-blur-xl z-10 shrink-0 shadow-sm transition-all duration-500">          <div className="flex items-center gap-6">             {/* Sidebar Toggle Button */}             <button                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}                className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 group"             >                <svg className={`w-5 h-5 transform transition-transform duration-300 ${!isSidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />                </svg>             </button>             <div className="flex items-center gap-4">                <div className="w-1.5 h-8 bg-gradient-to-b from-[#00ffcc] to-blue-500 rounded-full shadow-[0_0_15px_rgba(0,255,204,0.5)]"></div>                <h2 className="text-xl md:text-2xl font-black text-white tracking-[0.2em] uppercase drop-shadow-sm">                  {activeTab}                </h2>             </div>             {/* Folder Selection Dropdown */}             <select               value={globalTournament}               onChange={(e) => {                 const val = e.target.value;                 if (val === 'create_new') {                   setNewFolderGame(globalGame || 'VALORANT');                   setNewFolderName('');                   setShowCreateFolderModal(true);                   e.target.value = globalTournament;                 } else {                   setGlobalTournament(val);                 }               }}               className="bg-slate-800 text-white rounded-xl px-4 py-2 outline-none border border-slate-700/50 hover:border-[#00ffcc]/50 transition-colors cursor-pointer ml-6"             >               <option value="">Select a Folder...</option>               {tournaments.map((t) => (                 <option key={t.id} value={t.id}>{t.name}</option>               ))}               <option value="create_new" className="font-bold text-[#00ffcc]">+ Create New Folder...</option>             </select>          </div>          <div className="flex items-center gap-4 text-slate-400">             <button className="p-3 rounded-2xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-white transition-colors border border-transparent hover:border-white/10">                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>             </button>             <button className="p-3 rounded-2xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-[#00ffcc] transition-colors border border-transparent hover:border-white/10 relative">                <span className="absolute top-3 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B1120]"></span>                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>             </button>          </div>        </header>        {/* Dynamic Rendering of Components */}        <div className="flex-1 overflow-auto relative z-10 bg-[#040814]">            {renderContent()}        </div>      </main>      {/* Create Folder Modal */}      {showCreateFolderModal && (        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ffcc] to-transparent"></div>            <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">               <svg className="w-6 h-6 text-[#00ffcc]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>               Create New Folder            </h2>            <div className="space-y-5">              <div>                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Folder Name</label>                <input                   type="text"                   value={newFolderName}                  onChange={(e) => setNewFolderName(e.target.value)}                  placeholder="e.g. VCT Champions 2026"                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00ffcc] transition-colors"                />              </div>              <div>                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Game Title</label>                <select                   value={newFolderGame}                  onChange={(e) => setNewFolderGame(e.target.value)}                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00ffcc] transition-colors appearance-none cursor-pointer"                >                  <option value="VALORANT">Valorant</option>                  <option value="CROSSFIRE">Crossfire</option>                </select>              </div>            </div>            <div className="flex items-center justify-end gap-3 mt-8">              <button                 onClick={() => setShowCreateFolderModal(false)}                className="px-6 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-bold text-sm"              >                Cancel              </button>              <button                 onClick={async () => {                  if (!newFolderName.trim()) return;                  try {                    const res = await apiFetch('/api/tournaments', {                      method: 'POST',                      body: JSON.stringify({ name: newFolderName.trim(), game: newFolderGame })                    });                    if (res.ok) {                      const data = await res.json();                      await loadTournaments();                      if (data && data.length > 0) {                        setGlobalTournament(data[0].id);                      }                      setShowCreateFolderModal(false);                    } else {                      alert("Failed to create folder. You might not have admin permissions.");                    }                  } catch (err) {                    alert("Error creating folder.");                  }                }}                className="px-6 py-2.5 rounded-xl bg-[#00ffcc] text-slate-950 font-bold text-sm hover:bg-white transition-colors"              >                Create Folder              </button>            </div>          </div>        </div>      )}    </div>  );};export default MainUIScreen;
