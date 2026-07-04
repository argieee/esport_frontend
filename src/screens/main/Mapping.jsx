import React, { useState } from 'react';

const Mapping = () => {
  const [activeTab, setActiveTab] = useState('CURRENT MATCH');
  const [game, setGame] = useState('Valorant');
  const [teamA, setTeamA] = useState('Oasis');
  const [teamB, setTeamB] = useState('Xipto');
  const [turn, setTurn] = useState('TEAM A');

  const tabs = ['CURRENT MATCH', 'MAP POOL SETTINGS', 'BAN HISTORY', 'TEAM SETTINGS', 'ADMIN TOOLS'];

  // Valorant Map Pool (All default to 'none')
  const [valMaps, setValMaps] = useState([
    { id: 'v1', name: 'CORRODE', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600' },
    { id: 'v2', name: 'ABYSS', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600' },
    { id: 'v3', name: 'SUNSET', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1623934199716-f331c19b0f47?q=80&w=600' },
    { id: 'v4', name: 'LOTUS', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600' },
    { id: 'v5', name: 'PEARL', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=600' },
    { id: 'v6', name: 'FRACTURE', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600' },
    { id: 'v7', name: 'BREEZE', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=600' },
    { id: 'v8', name: 'ICEBOX', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600' },
    { id: 'v9', name: 'BIND', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1505775561242-7276188ed08c?q=80&w=600' },
  ]);

  // Crossfire Map Pool (All default to 'none')
  const [cfMaps, setCfMaps] = useState([
    { id: 'c1', name: 'BLACK WIDOW', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1505775561242-7276188ed08c?q=80&w=600' },
    { id: 'c2', name: 'PORT', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600' },
    { id: 'c3', name: 'COMPOUND', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600' },
    { id: 'c4', name: 'ANKARA', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=600' },
    { id: 'c5', name: 'SUB BASE', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1623934199716-f331c19b0f47?q=80&w=600' },
    { id: 'c6', name: 'EAGLE EYE', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=600' },
    { id: 'c7', name: 'MEXICO', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=600' },
    { id: 'c8', name: 'FACTORY', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=600' },
    { id: 'c9', name: 'SANTORIA', status: 'none', by: '', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600' },
  ]);

  const currentMaps = game === 'Valorant' ? valMaps : cfMaps;
  const setCurrentMaps = game === 'Valorant' ? setValMaps : setCfMaps;

  const handleAction = (mapId, action) => {
    setCurrentMaps(currentMaps.map((m) => m.id === mapId ? { ...m, status: action, by: turn } : m));
    setTurn(turn === 'TEAM A' ? 'TEAM B' : 'TEAM A');
  };

  const handleReset = () => {
    setCurrentMaps(currentMaps.map(m => ({ ...m, status: 'none', by: '' })));
    setTurn('TEAM A');
  };

  return (
    <div className="flex-1 p-6 lg:p-8 bg-[#181a20] overflow-y-auto w-full h-full text-white font-sans custom-scrollbar">
      
      {/* Top Navigation Tabs (Inalis na ang duplicate na MAP VETOES title) */}
      <div className="flex flex-wrap items-center gap-6 md:gap-8 border-b border-[#2e344e] pb-3 mb-6 w-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-2 whitespace-nowrap transition-colors text-sm font-bold uppercase tracking-wide ${
              activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-[-3px] left-0 w-full h-1 bg-[#42d3e5] rounded-t-sm shadow-[0_0_8px_rgba(66,211,229,0.5)]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Main Blue-Grey Panel Container */}
      <div className="bg-[#2c334a] rounded-xl border border-[#3e4868] p-6 lg:p-8 shadow-2xl mb-12">
        
        {/* Map Grip Panel Header */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8">
          
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-black text-white tracking-widest uppercase">MAP GRIP PANEL</h2>
            
            {/* Clean Game Select (No overlapping logo) */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">SELECT GAME:</span>
              <select 
                value={game} 
                onChange={(e) => setGame(e.target.value)}
                className="bg-[#1e2336] border border-[#3e4868] hover:border-[#42d3e5] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md outline-none cursor-pointer transition-colors"
              >
                <option value="Valorant">Valorant</option>
                <option value="Crossfire">Crossfire</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-transparent">
            {/* Team A Input (Pill Shape) */}
            <select 
              value={teamA}
              onChange={(e) => setTeamA(e.target.value)}
              className="bg-[#1d4ed8] text-white text-sm font-bold px-6 py-2 rounded-full border border-[#2563eb] shadow-lg outline-none cursor-pointer text-center"
            >
              <option value="Oasis">Oasis</option>
              <option value="Gryphon">Gryphon</option>
            </select>

            <span className="text-xl font-black italic text-gray-400">VS</span>
            
            {/* Team B Input (Pill Shape) */}
            <select 
              value={teamB}
              onChange={(e) => setTeamB(e.target.value)}
              className="bg-[#b91c1c] text-white text-sm font-bold px-6 py-2 rounded-full border border-[#dc2626] shadow-lg outline-none cursor-pointer text-center"
            >
              <option value="Xipto">Xipto</option>
              <option value="Storm">Storm</option>
            </select>
            
            {/* Turn Indicator (Pill Shape) */}
            <div className="border border-[#42d3e5] bg-[#1e2336] px-5 py-2 rounded-full font-black text-xs tracking-wide ml-2 shadow-[0_0_10px_rgba(66,211,229,0.2)]">
              <span className="text-white">Turn: </span>
              <span className="text-[#42d3e5]">{turn}</span>
            </div>
          </div>
        </div>

        {/* Maps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {currentMaps.map((m) => (
            <div 
              key={m.id} 
              className={`relative aspect-[16/8] rounded-xl overflow-hidden group transition-all duration-300 ${
                m.status === 'banned' ? 'border-[3px] border-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.3)]' :
                m.status === 'picked' ? 'border-[3px] border-[#2dd4bf] shadow-[0_0_15px_rgba(45,212,191,0.3)]' :
                'border-[3px] border-transparent hover:border-[#60a5fa] bg-[#1e2336]'
              }`}
            >
              {/* Background Image */}
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${
                  m.status === 'banned' ? 'opacity-30 blur-[2px] grayscale' : 
                  m.status === 'picked' ? 'opacity-70' : 'opacity-90 group-hover:scale-105'
                }`}
                style={{ backgroundImage: `url(${m.img})` }}
              ></div>

              {/* White Map Name Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-white text-black px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest shadow-md">
                  {m.name}
                </span>
              </div>
              
              {/* Hover state for Picking/Banning */}
              {m.status === 'none' && (
                <div className="absolute inset-x-0 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-3 z-20">
                  <button 
                    onClick={() => handleAction(m.id, 'picked')} 
                    className="bg-[#22c55e] hover:bg-[#16a34a] text-white text-[11px] font-black tracking-widest px-4 py-1.5 rounded border border-[#14532d] shadow-lg transition-transform hover:-translate-y-1"
                  >
                    [PICK]
                  </button>
                  <button 
                    onClick={() => handleAction(m.id, 'banned')} 
                    className="bg-[#ef4444] hover:bg-[#dc2626] text-white text-[11px] font-black tracking-widest px-4 py-1.5 rounded border border-[#7f1d1d] shadow-lg transition-transform hover:-translate-y-1"
                  >
                    [BAN]
                  </button>
                </div>
              )}

              {/* Banned State */}
              {m.status === 'banned' && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                  <span className="text-8xl font-black text-[#ef4444] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">✕</span>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-[#7f1d1d] text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase shadow-lg border border-[#450a0a] tracking-widest">
                      BAN BY {m.by}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Picked State */}
              {m.status === 'picked' && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0d9488]/20 backdrop-blur-[1px]">
                  <span className="text-8xl font-black text-[#4ade80] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">✓</span>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-[#115e59] text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase shadow-lg border border-[#042f2e] tracking-widest">
                      PICK BY {m.by}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* PROPER BUTTONS: Visual Separation, Colors, and Spacing (gap-8) */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-10 pt-8 border-t border-[#3e4868]">
          
          <button 
            onClick={handleReset}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-black px-8 py-3.5 rounded-md shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-widest border border-[#1e40af]"
          >
            SYNC MAP POOL DATA
          </button>
          
          <button className="bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-black px-8 py-3.5 rounded-md shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-widest border border-[#115e59]">
            PUBLISH MAP TO BROADCAST
          </button>
          
          <button className="bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-black px-8 py-3.5 rounded-md shadow-lg transition-all transform hover:-translate-y-1 uppercase tracking-widest border border-[#166534]">
            FINALIZE MAP SELECTION
          </button>

        </div>

      </div>
    </div>
  );
};

export default Mapping;