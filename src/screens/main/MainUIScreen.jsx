import React, { useState } from "react";

// Components
import Dashboard from "./Dashboard.jsx";
import Tournament from "./Tournament.jsx";
import Mapping from "./Mapping.jsx";
import DataEntry from "./DataEntry.jsx";
import Leaderboards from "./Leaderboards.jsx";
import Analytics from "./Analytics.jsx";
import Admin from "./Admin.jsx";
import Settings from "./Settings.jsx";

// Modern SVG Icons para sa mas propesyonal na look (pinalitan ang Emojis)
const Icons = {
  Dashboard: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Tournament: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  MapVetoes: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
  DataEntry: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  Leaderboards: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  Analytics: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
  Admin: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Settings: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};

const MainUIScreen = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Updated Sidebar Structure as requested
  const sidebarData = [
    { 
      category: 'MAIN', 
      links: [
        { name: 'Dashboard', icon: Icons.Dashboard }, 
        { name: 'Tournament', icon: Icons.Tournament }
      ] 
    },
    { 
      category: 'MANAGEMENT', 
      links: [
        { name: 'Map Vetoes', icon: Icons.MapVetoes }, 
        { name: 'Data Entry', icon: Icons.DataEntry }
      ] 
    },
    { 
      category: 'ANALYTICS', 
      links: [
        { name: 'Leaderboards', icon: Icons.Leaderboards }, 
        { name: 'Analytics', icon: Icons.Analytics }
      ] 
    },
    { 
      category: 'SYSTEM', 
      links: [
        { name: 'Admin', icon: Icons.Admin }, 
        { name: 'Settings', icon: Icons.Settings }
      ] 
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <Dashboard />;
      case 'Tournament': return <Tournament />;
      case 'Map Vetoes': return <Mapping />;
      case 'Data Entry': return <DataEntry />;
      case 'Leaderboards': return <Leaderboards />;
      case 'Analytics': return <Analytics />;
      case 'Admin': return <Admin />;
      case 'Settings': return <Settings />;
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center p-10 bg-[#070b14]">
            <div className="border border-slate-800 bg-slate-900/40 rounded-2xl p-12 text-center animate-fade-in shadow-2xl backdrop-blur-sm max-w-lg w-full">
              <div className="text-cyan-500 mb-6 flex justify-center">
                {Icons.Settings}
              </div>
              <h2 className="text-2xl font-black text-slate-200 mb-3 uppercase tracking-widest">{activeTab}</h2>
              <p className="text-sm font-medium text-slate-500">This module is currently under active development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#040814] text-slate-200 font-sans overflow-hidden selection:bg-cyan-500/30">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } 
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}} />

      {/* SIDEBAR */}
      <aside className="w-70 bg-[#0B1120] flex flex-col justify-between border-r border-slate-800/60 z-20 shrink-0 shadow-2xl transition-all duration-300">
        <div className="px-8 py-8 mb-4">
          <h1 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#00ffcc] to-blue-500 tracking-[0.15em] drop-shadow-sm uppercase">
            ESPORT DASH
          </h1>
        </div>
        
        <div className="flex-1 overflow-y-auto px-5 space-y-8 custom-scrollbar">
          {sidebarData.map((section, idx) => (
            <div key={idx}>
              <p className="text-[10px] text-slate-500/80 uppercase tracking-[0.2em] mb-4 font-bold px-3">
                {section.category}
              </p>
              <ul className="space-y-1.5">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <button 
                      onClick={() => setActiveTab(link.name)} 
                      className={`w-full flex items-center gap-4 text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group
                        ${activeTab === link.name 
                          ? 'bg-linear-to-r from-cyan-600/20 to-blue-600/10 text-[#00ffcc] border border-cyan-500/30 shadow-[inset_0_0_20px_rgba(0,255,204,0.05)]' 
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                        }`}
                    >
                      <span className={`transition-transform duration-300 ${activeTab === link.name ? 'scale-110 drop-shadow-[0_0_8px_rgba(0,255,204,0.5)]' : 'group-hover:scale-110'}`}>
                        {link.icon}
                      </span> 
                      <span className="tracking-wide">{link.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* PROFILE / LOGOUT AREA */}
        <div className="px-6 py-6 border-t border-slate-800/60 bg-[#0B1120] mt-auto">
          <div className="flex items-center gap-4 mb-6 px-2 bg-slate-900/50 p-3 rounded-xl border border-slate-800/50">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#00ffcc] to-blue-600 p-0.5">
               <div className="w-full h-full bg-[#0B1120] rounded-full flex items-center justify-center text-xs font-bold text-white">
                 AD
               </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-200 tracking-wide">Admin User</p>
              <p className="text-[10px] font-bold text-[#00ffcc] flex items-center gap-1.5 mt-1 tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffcc] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ffcc]"></span>
                </span>
                Online
              </p>
            </div>
          </div>
          <button 
            onClick={onLogout} 
            className="w-full bg-slate-800/50 hover:bg-red-500/20 border border-slate-700/50 hover:border-red-500/50 text-slate-300 hover:text-red-400 px-6 py-3.5 rounded-xl font-bold text-xs tracking-[0.15em] transition-all duration-300 uppercase shadow-sm flex justify-center items-center gap-2 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 bg-[#040814] flex flex-col overflow-hidden relative">
        {/* Modern Glassmorphism Header */}
        <header className="h-22.5 border-b border-slate-800/50 flex items-center justify-between px-10 bg-[#0B1120]/80 backdrop-blur-xl z-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
             <div className="w-2 h-8 bg-linear-to-b from-[#00ffcc] to-blue-500 rounded-full"></div>
             <h2 className="text-2xl font-black text-white tracking-[0.15em] uppercase drop-shadow-sm">
               {activeTab}
             </h2>
          </div>
          
          <div className="flex items-center gap-4 text-slate-400">
             {/* Example Top Right Actions (Search / Notifications) */}
             <button className="p-2.5 rounded-full hover:bg-slate-800/80 hover:text-white transition-colors border border-transparent hover:border-slate-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </button>
             <button className="p-2.5 rounded-full hover:bg-slate-800/80 hover:text-[#00ffcc] transition-colors border border-transparent hover:border-slate-700 relative">
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B1120]"></span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
             </button>
          </div>
        </header>
        
        {/* Dynamic Rendering of Components */}
        <div className="flex-1 overflow-hidden relative z-10 flex bg-[#040814]">
            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default MainUIScreen;