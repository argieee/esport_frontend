import React, { useState } from 'react';

const Tournament = () => {
  const [activeTab, setActiveTab] = useState('LIVE & UPCOMING');

  return (
    <div className="flex-1 p-8 bg-[#0f1923] overflow-y-auto w-full h-full custom-scrollbar">
      <div className="max-w-[1400px] mx-auto">
          <h1 className="text-3xl lg:text-4xl font-black mb-10 tracking-[0.1em] uppercase drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              ESPORT LEAGUE TOURNAMENTS
          </h1>
          
          <div className="flex space-x-10 border-b border-gray-800 mb-10 font-black text-xs tracking-widest uppercase">
            {['LIVE & UPCOMING', 'RESULT', 'SCHEDULE'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 transition-all relative ${
                      activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00ffcc] shadow-[0_0_10px_#00ffcc]"></div>
                  )}
                </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center h-[50vh] text-center border-2 border-dashed border-gray-800 rounded-2xl bg-[#111620]/50">
              <span className="text-5xl mb-4 opacity-50">🏆</span>
              <h2 className="text-2xl font-black text-gray-400 tracking-widest uppercase mb-2">{activeTab}</h2>
              <p className="text-sm text-gray-500">Tournament data integration in progress.</p>
          </div>
      </div>
    </div>
  );
};

export default Tournament;