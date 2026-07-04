import React from 'react';

const SideNav = ({ activePage, setActivePage, onLogout }) => {
  const navItems = [
    { label: 'MAIN', isHeader: true },
    { label: 'Dashboard' },
    { label: 'Tournament' },
    { label: 'MANAGEMENT', isHeader: true },
    { label: 'Players & Teams' },
    { label: 'Data Entry' },
    { label: 'Mappings' },
    { label: 'ANALYTICS', isHeader: true },
    { label: 'Leaderboards' },
    { label: 'Analytics' },
    { label: 'SYSTEM', isHeader: true },
    { label: 'Admin' },
    { label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-[#111111] border-r border-gray-800 h-full flex-shrink-0 flex flex-col p-6 overflow-y-auto custom-scrollbar">
      <div className="text-xl font-bold text-gray-300 tracking-wider mb-8 uppercase">
        Esport Dash
      </div>
      
      <div className="flex-1 space-y-1.5">
        {navItems.map((item, idx) => (
          <div key={idx}>
            {item.isHeader ? (
              <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] mt-6 mb-2 uppercase">
                {item.label}
              </p>
            ) : (
              <button 
                onClick={() => setActivePage(item.label)}
                className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                  activePage === item.label 
                  ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span>{item.label}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-full text-sm transition-all duration-200 tracking-widest uppercase shadow-md shadow-red-600/20"
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default SideNav;