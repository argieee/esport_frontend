import React, { useState } from 'react';

// --- ICONS ---
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// --- TOOLTIP COMPONENT ---
const Tooltip = ({ x, y, content, visible }) => {
  if (!visible) return null;
  return (
    <div 
      className="absolute z-50 bg-[#0a0f16] border border-[#2a3648] text-white text-xs p-3 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] pointer-events-none transform -translate-x-1/2 -translate-y-full backdrop-blur-md"
      style={{ left: x, top: y - 10, transition: 'all 0.1s ease-out' }}
    >
      {content}
    </div>
  );
};

// --- HELPER COMPONENTS ---
const Card = ({ title, children, className = "" }) => (
  <div className={`bg-[#121a25] rounded-xl border border-[#232f40] shadow-xl flex flex-col overflow-hidden relative group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none z-0"></div>
    <div className="p-4 border-b border-[#232f40] bg-[#151e2b] relative z-10 flex justify-between items-center shrink-0">
      <h3 className="text-sm font-bold tracking-wider text-gray-200">{title}</h3>
    </div>
    <div className="flex-1 p-4 relative z-10 min-h-[300px]">
      {children}
    </div>
  </div>
);

// --- CHART COMPONENTS ---

// 1. Radar Chart
const RadarChart = ({ data, axes, onSelect }) => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: null });
  const size = 320;
  const center = size / 2;
  const radius = center - 60;
  const angleStep = (Math.PI * 2) / axes.length;

  const getPoint = (val, max, angle) => ({
    x: center + (val / max) * radius * Math.sin(angle),
    y: center - (val / max) * radius * Math.cos(angle)
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible" onMouseLeave={() => setTooltip({ visible: false })}>
        {/* Background Grid */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
          <polygon
            key={`grid-${i}`}
            points={axes.map((_, idx) => {
              const pt = getPoint(level, 1, idx * angleStep);
              return `${pt.x},${pt.y}`;
            }).join(' ')}
            fill="none"
            stroke="#232f40"
            strokeWidth="1"
          />
        ))}
        {/* Axes Lines & Labels */}
        {axes.map((axis, idx) => {
          const ptEnd = getPoint(1, 1, idx * angleStep);
          const ptLabel = getPoint(1.25, 1, idx * angleStep);
          return (
            <g key={`axis-${idx}`}>
              <line x1={center} y1={center} x2={ptEnd.x} y2={ptEnd.y} stroke="#232f40" strokeWidth="1" />
              <text x={ptLabel.x} y={ptLabel.y} fill="#9ca3af" fontSize="10" textAnchor="middle" dominantBaseline="middle" className="font-semibold">{axis}</text>
            </g>
          );
        })}
        {/* Data Polygons */}
        {data.map((player, pIdx) => {
          const points = axes.map((_, idx) => {
             const pt = getPoint(player.stats[idx], 100, idx * angleStep);
             return `${pt.x},${pt.y}`;
          }).join(' ');
          return (
            <g key={`poly-${pIdx}`}>
              <polygon
                points={points}
                fill={player.color}
                fillOpacity="0.15"
                stroke={player.color}
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-opacity-40 cursor-pointer drop-shadow-md"
                onClick={() => onSelect(player)}
                onMouseMove={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  setTooltip({ 
                    visible: true, 
                    x: e.clientX - rect.left + 80, 
                    y: e.clientY - rect.top, 
                    content: (
                      <div className="flex flex-col gap-1">
                        <div className="font-black border-b border-gray-700 pb-1 mb-1 tracking-wider" style={{color: player.color}}>{player.name}</div>
                        {axes.map((ax, i) => (
                          <div key={i} className="flex justify-between gap-4 text-[10px]">
                            <span className="text-gray-400">{ax}</span>
                            <span className="font-bold text-white">{player.stats[i]}</span>
                          </div>
                        ))}
                        <div className="text-[9px] text-gray-500 mt-1 text-center italic">Click for detailed overview</div>
                      </div>
                    ) 
                  });
                }}
              />
              {axes.map((_, idx) => {
                 const pt = getPoint(player.stats[idx], 100, idx * angleStep);
                 return <circle key={`dot-${idx}`} cx={pt.x} cy={pt.y} r="3" fill={player.color} className="pointer-events-none" />;
              })}
            </g>
          );
        })}
      </svg>
      <Tooltip {...tooltip} />
      
      {/* Legend inside chart area */}
      <div className="absolute right-0 top-0 flex flex-col space-y-2 bg-[#121a25]/80 p-2 rounded-lg border border-[#232f40] backdrop-blur-sm">
        {data.length === 0 ? <span className="text-xs text-gray-500">No players found</span> : null}
        {data.map((p, i) => (
          <div key={i} className="flex items-center space-x-2 text-[10px] text-gray-300 font-bold tracking-wider">
            <div className="w-4 h-[2px] rounded-full shadow-[0_0_5px_currentColor]" style={{backgroundColor: p.color, color: p.color}}></div>
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Combo Chart (Economic Efficiency)
const EconChart = ({ data, theme, onSelect }) => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: null });
  const w = 450, h = 260;
  const padX = 60, padY = 30;
  
  const maxMoney = 10000;
  const maxProb = 100;
  const barW = (w - padX * 2) / data.length - 6;

  const pathD = data.map((d, i) => {
    const x = padX + i * (w - padX * 2) / data.length + barW / 2;
    const y = h - padY - (d.prob / maxProb) * (h - padY * 2);
    return `${i===0?'M':'L'}${x},${y}`;
  }).join(' ');

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width={w} height={h} onMouseLeave={() => setTooltip({visible: false})}>
        {/* Y Axis Grid (Money) */}
        {[0, 2500, 5000, 7500, 10000].map((val, i) => {
          const y = h - padY - (val / maxMoney) * (h - padY * 2);
          return (
            <g key={`y-${i}`}>
              <line x1={padX} y1={y} x2={w-padX} y2={y} stroke="#232f40" strokeDasharray={i === 0 ? "" : "4,4"} />
              <text x={padX-10} y={y+3} fill="#6b7280" fontSize="10" textAnchor="end" className="font-mono">{val}</text>
            </g>
          );
        })}
        {/* Y Axis Labels (Prob) */}
        {[0, 20, 40, 60, 80, 100].map((val, i) => {
          const y = h - padY - (val / maxProb) * (h - padY * 2);
          return <text key={`yp-${i}`} x={w-padX+10} y={y+3} fill="#6b7280" fontSize="10" textAnchor="start" className="font-mono">{val}</text>;
        })}

        {/* Axis Titles */}
        <text x={15} y={h/2} transform={`rotate(-90 15 ${h/2})`} fill="#9ca3af" fontSize="10" textAnchor="middle" className="font-bold tracking-widest uppercase">Money</text>
        <text x={w-15} y={h/2} transform={`rotate(-90 ${w-15} ${h/2})`} fill="#9ca3af" fontSize="10" textAnchor="middle" className="font-bold tracking-widest uppercase">Win Prob %</text>

        {/* Bars */}
        {data.map((d, i) => {
          const x = padX + i * (w - padX * 2) / data.length;
          const hSpent = (d.spent / maxMoney) * (h - padY * 2);
          const hRem = (d.remaining / maxMoney) * (h - padY * 2);
          return (
            <g 
              key={`bar-${i}`} 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onSelect(d)}
              onMouseMove={(e) => {
                const rect = e.target.parentElement.getBoundingClientRect();
                setTooltip({
                  visible: true, x: e.clientX - rect.left, y: e.clientY - rect.top,
                  content: (
                    <div className="flex flex-col gap-1">
                      <div className="font-black text-white border-b border-gray-700 pb-1 uppercase tracking-wider">Round {d.round}</div>
                      <div style={{color: theme.color1}}>Spent: ${d.spent}</div>
                      <div style={{color: theme.color2}}>Remaining: ${d.remaining}</div>
                      <div style={{color: theme.color3}}>Win Prob: {d.prob}%</div>
                      <div className="text-[9px] text-gray-500 mt-1 text-center italic">Click for economy details</div>
                    </div>
                  )
                });
              }}
            >
              {/* Spent */}
              <rect x={x} y={h - padY - hSpent} width={barW} height={hSpent} fill={theme.color1} rx="2" />
              {/* Remaining */}
              <rect x={x} y={h - padY - hSpent - hRem} width={barW} height={hRem} fill={theme.color2} rx="2" />
              {/* X axis label */}
              <text x={x+barW/2} y={h-10} fill="#9ca3af" fontSize="10" textAnchor="middle" className="font-mono">{d.round}</text>
            </g>
          );
        })}
        
        {/* Probability Line */}
        <path d={pathD} fill="none" stroke={theme.color3} strokeWidth="3" className="drop-shadow-[0_0_8px_currentColor]" style={{color: theme.color3}} />
        {data.map((d, i) => {
          const x = padX + i * (w - padX * 2) / data.length + barW / 2;
          const y = h - padY - (d.prob / maxProb) * (h - padY * 2);
          return <circle key={`dot-${i}`} cx={x} cy={y} r="4" fill="#0f1722" stroke={theme.color3} strokeWidth="2" className="pointer-events-none" />;
        })}
      </svg>
      <Tooltip {...tooltip} />
      
      {/* Legend */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex space-x-4 text-[10px] font-bold text-gray-300 tracking-wider">
         <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-sm" style={{backgroundColor: theme.color1}}></div><span>Spent</span></div>
         <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-sm" style={{backgroundColor: theme.color2}}></div><span>Remaining</span></div>
         <div className="flex items-center space-x-1"><div className="w-4 h-[2px]" style={{backgroundColor: theme.color3}}></div><span>Win Prob</span></div>
      </div>
    </div>
  );
};

// 3. Bubble Chart (Synergies)
const BubbleChart = ({ data, theme, onSelect }) => {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: null });
  const w = 450, h = 260;
  const padX = 60, padY = 20, padBottom = 60;
  
  const agents = [...new Set(data.map(d => d.agent))];
  const maps = [...new Set(data.map(d => d.map))];

  if (agents.length === 0 || maps.length === 0) {
    return <div className="flex w-full h-full items-center justify-center text-gray-500 font-bold">No synergies found for your search.</div>;
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width={w} height={h} onMouseLeave={() => setTooltip({visible: false})}>
        {/* Grid */}
        {agents.map((_, i) => (
          <line key={`hy-${i}`} x1={padX} y1={padY + i * (h - padY - padBottom) / (agents.length-1 || 1)} x2={w-padX+20} y2={padY + i * (h - padY - padBottom) / (agents.length-1 || 1)} stroke="#1e2938" />
        ))}
        {maps.map((_, i) => (
          <line key={`hx-${i}`} x1={padX + i * (w - padX*2 - 20) / (maps.length-1 || 1)} y1={padY} x2={padX + i * (w - padX*2 - 20) / (maps.length-1 || 1)} y2={h-padBottom} stroke="#1e2938" />
        ))}

        {/* Y Axis Agents */}
        {agents.map((agent, i) => {
          const y = padY + i * (h - padY - padBottom) / (agents.length-1 || 1);
          return <text key={`a-${i}`} x={padX-10} y={y+3} fill="#9ca3af" fontSize="10" textAnchor="end" className="font-semibold">{agent}</text>;
        })}
        {/* X Axis Maps */}
        {maps.map((m, i) => {
          const x = padX + i * (w - padX*2 - 20) / (maps.length-1 || 1);
          return (
            <text key={`m-${i}`} x={x-5} y={h-padBottom+15} fill="#9ca3af" fontSize="10" textAnchor="end" transform={`rotate(-45 ${x-5} ${h-padBottom+15})`} className="font-semibold">{m}</text>
          );
        })}
        
        {/* Bubbles */}
        {data.map((d, i) => {
          const aIdx = agents.indexOf(d.agent);
          const mIdx = maps.indexOf(d.map);
          const y = padY + aIdx * (h - padY - padBottom) / (agents.length-1 || 1);
          const x = padX + mIdx * (w - padX*2 - 20) / (maps.length-1 || 1);
          const r = Math.max(2, (d.pickRate / 300) * 12);
          
          // Color scale
          let color = theme.color1;
          if (d.winRate > 60) color = theme.color2;
          if (d.winRate > 70) color = theme.color3;

          return (
            <circle 
              key={`bub-${i}`} cx={x} cy={y} r={r} fill={color} fillOpacity="0.8" 
              className="cursor-pointer hover:stroke-white hover:stroke-[3px] transition-all hover:fill-opacity-100 drop-shadow-[0_0_5px_currentColor]"
              style={{color}}
              onClick={() => onSelect(d)}
              onMouseMove={(e) => {
                const rect = e.target.parentElement.getBoundingClientRect();
                setTooltip({
                  visible: true, x: e.clientX - rect.left, y: e.clientY - rect.top,
                  content: (
                    <div className="flex flex-col gap-1">
                      <div className="font-black text-white border-b border-gray-700 pb-1">{d.agent} on {d.map}</div>
                      <div className="text-gray-300">Pick Rate: <span className="font-bold text-white">{d.pickRate}</span></div>
                      <div style={{color}}>Win Rate: <span className="font-bold">{d.winRate}%</span></div>
                      <div className="text-[9px] text-gray-500 mt-1 text-center italic">Click for map synergy details</div>
                    </div>
                  )
                });
              }}
            />
          );
        })}
      </svg>
      <Tooltip {...tooltip} />
      
      {/* Axis Titles */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-[10px] font-black tracking-widest text-gray-500 uppercase">Agents</div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[10px] font-black tracking-widest text-gray-500 uppercase">Maps</div>

      {/* Legend */}
      <div className="absolute right-0 top-0 flex flex-col bg-[#121a25]/90 p-2 rounded border border-[#232f40] backdrop-blur-sm pointer-events-none">
        <span className="text-[9px] font-bold text-gray-400 mb-1">Pick Rate</span>
        <div className="flex items-center space-x-2 mb-1"><circle cx="4" cy="4" r="4" fill="#4b5563"/><span className="text-[9px] text-gray-300">200+</span></div>
        <div className="flex items-center space-x-2 mb-2"><circle cx="3" cy="3" r="3" fill="#4b5563"/><span className="text-[9px] text-gray-300">100+</span></div>
        <span className="text-[9px] font-bold text-gray-400 mb-1">Win Rate</span>
        <div className="flex items-center space-x-2 mb-1"><div className="w-2 h-2" style={{backgroundColor: theme.color3}}></div><span className="text-[9px] text-gray-300">High</span></div>
        <div className="flex items-center space-x-2"><div className="w-2 h-2" style={{backgroundColor: theme.color1}}></div><span className="text-[9px] text-gray-300">Low</span></div>
      </div>
    </div>
  );
};

// 4. Strategy Heatmap
const StrategyMap = ({ theme, onSelect }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 cursor-pointer group" onClick={() => onSelect({ type: 'Heatmap', area: 'Haven A-Main', details: 'High success rate observed when pushing A-Main through standard utility combo.' })}>
       <div className="absolute top-2 left-4 z-10 text-sm font-black text-white tracking-widest drop-shadow-md group-hover:text-blue-400 transition-colors">Haven A-Main</div>
       
       <div className="relative w-full max-w-[320px] aspect-[4/3] bg-[#0a0f16] rounded-xl border border-[#2a3648] overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-blue-500 transition-all">
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 240">
             {/* Map Base - Stylized polygons */}
             <path d="M 60 40 L 140 30 L 180 80 L 260 70 L 300 130 L 250 200 L 180 220 L 120 170 L 40 190 Z" fill="#1e2938" />
             <path d="M 80 60 L 120 50 L 150 90 L 100 120 Z" fill="#2a3648" />
             <path d="M 160 110 L 240 90 L 270 140 L 190 180 Z" fill="#2a3648" />
             
             {/* Walls */}
             <path d="M 140 30 L 140 90 M 180 80 L 180 140 M 260 70 L 260 160 M 120 170 L 120 110" stroke="#0f1722" strokeWidth="6" strokeLinecap="round" />
             
             {/* Heat Gradients */}
             <defs>
               <radialGradient id="heatPrimary">
                 <stop offset="0%" stopColor={theme.color1} stopOpacity="0.8" />
                 <stop offset="30%" stopColor={theme.color1} stopOpacity="0.5" />
                 <stop offset="100%" stopColor={theme.color1} stopOpacity="0" />
               </radialGradient>
               <radialGradient id="heatSecondary">
                 <stop offset="0%" stopColor={theme.color3} stopOpacity="0.8" />
                 <stop offset="30%" stopColor={theme.color3} stopOpacity="0.5" />
                 <stop offset="100%" stopColor={theme.color3} stopOpacity="0" />
               </radialGradient>
             </defs>

             {/* Hotspots */}
             <circle cx="100" cy="100" r="50" fill="url(#heatPrimary)" className="animate-pulse" style={{animationDuration: '3s'}} />
             <circle cx="240" cy="110" r="60" fill="url(#heatPrimary)" className="animate-pulse" style={{animationDuration: '4s'}} />
             <circle cx="160" cy="180" r="45" fill="url(#heatSecondary)" />

             {/* Strategy Path Arrows */}
             <defs>
               <marker id="arrowPrimary" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill={theme.color3} />
               </marker>
               <marker id="arrowSecondary" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill={theme.color1} />
               </marker>
             </defs>
             
             <path d="M 100 100 Q 160 160 160 180" fill="none" stroke={theme.color3} strokeWidth="3" strokeDasharray="6,6" markerEnd="url(#arrowPrimary)" className="drop-shadow-md" />
             <path d="M 160 180 Q 210 140 240 110" fill="none" stroke={theme.color3} strokeWidth="3" strokeDasharray="6,6" markerEnd="url(#arrowPrimary)" className="drop-shadow-md" />
             <path d="M 100 100 L 150 80 L 240 110" fill="none" stroke={theme.color1} strokeWidth="3" markerEnd="url(#arrowSecondary)" className="drop-shadow-md" />
          </svg>
       </div>

       {/* Heatmap Legend */}
       <div className="absolute bottom-4 right-4 bg-[#0a0f16]/90 p-2 rounded border border-[#232f40] flex flex-col items-center backdrop-blur-md pointer-events-none">
         <span className="text-[9px] font-bold text-white mb-1 uppercase tracking-widest">Success Rate</span>
         <div className="w-4 h-24 rounded bg-gradient-to-t" style={{backgroundImage: `linear-gradient(to top, ${theme.color3}, ${theme.color1})`}}></div>
         <div className="flex justify-between w-full text-[8px] text-gray-400 mt-1"><span>0</span><span>100</span></div>
       </div>
       <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-4 py-2 rounded-full font-bold text-white pointer-events-none">
          Click for Heatmap Analysis
       </div>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---

const Analytics = () => {
  const [activeGame, setActiveGame] = useState('VALORANT');
  const [dataType, setDataType] = useState('ALL PLAYERS');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalData, setModalData] = useState(null);

  // --- MOCK DATA ---
  const valorantTheme = {
    color1: '#ff3366', // Red
    color2: '#00d0eb', // Cyan
    color3: '#a78bfa', // Purple
  };

  const crossfireTheme = {
    color1: '#4c7fd6', // Blue
    color2: '#f59e0b', // Amber
    color3: '#10b981', // Green
  };

  const valData = {
    theme: valorantTheme,
    radarAxes: ['Agent Proficiency', 'Reaction Time', 'Econ Management', 'Headshot %', 'Utility Usage', 'Clutch %'],
    radar: [
      { name: 'Elite Player', color: '#00d0eb', stats: [90, 85, 75, 80, 85, 70] },
      { name: 'Pro Player', color: '#ff3366', stats: [75, 95, 60, 90, 65, 85] },
      { name: 'Average Player', color: '#a78bfa', stats: [50, 60, 45, 55, 40, 50] }
    ],
    econ: [
      { round: 1, spent: 800, remaining: 150, prob: 45 },
      { round: 2, spent: 1500, remaining: 1000, prob: 52 },
      { round: 3, spent: 3900, remaining: 200, prob: 60 },
      { round: 4, spent: 4200, remaining: 500, prob: 65 },
      { round: 5, spent: 3000, remaining: 2000, prob: 58 },
      { round: 6, spent: 4500, remaining: 1500, prob: 70 },
      { round: 7, spent: 5000, remaining: 3000, prob: 75 },
      { round: 8, spent: 4800, remaining: 4500, prob: 82 },
      { round: 9, spent: 5500, remaining: 6000, prob: 90 },
    ],
    synergy: [
      { agent: 'Jett', map: 'Haven', pickRate: 280, winRate: 52 },
      { agent: 'Omen', map: 'Haven', pickRate: 220, winRate: 65 },
      { agent: 'Sova', map: 'Ascent', pickRate: 290, winRate: 72 },
      { agent: 'Killjoy', map: 'Ascent', pickRate: 250, winRate: 68 },
      { agent: 'Viper', map: 'Breeze', pickRate: 260, winRate: 75 },
      { agent: 'Raze', map: 'Split', pickRate: 240, winRate: 58 },
      { agent: 'Breach', map: 'Fracture', pickRate: 180, winRate: 62 },
      { agent: 'Cypher', map: 'Split', pickRate: 150, winRate: 48 },
      { agent: 'Phoenix', map: 'Haven', pickRate: 120, winRate: 45 },
    ]
  };

  const cfData = {
    theme: crossfireTheme,
    radarAxes: ['Weapon Mastery', 'Reaction Time', 'Positioning', 'Headshot %', 'Utility Usage', 'Clutch %'],
    radar: [
      { name: 'CF Elite', color: '#f59e0b', stats: [95, 90, 85, 88, 60, 80] },
      { name: 'CF Pro', color: '#4c7fd6', stats: [80, 95, 70, 92, 50, 85] },
      { name: 'Average Player', color: '#10b981', stats: [60, 55, 50, 45, 30, 40] }
    ],
    econ: [
      { round: 1, spent: 500, remaining: 200, prob: 50 },
      { round: 2, spent: 1200, remaining: 800, prob: 55 },
      { round: 3, spent: 2500, remaining: 1000, prob: 62 },
      { round: 4, spent: 3000, remaining: 1500, prob: 68 },
      { round: 5, spent: 2800, remaining: 2500, prob: 64 },
      { round: 6, spent: 3500, remaining: 3000, prob: 72 },
      { round: 7, spent: 4000, remaining: 4000, prob: 78 },
      { round: 8, spent: 4500, remaining: 5000, prob: 85 },
      { round: 9, spent: 5000, remaining: 7000, prob: 95 },
    ],
    synergy: [
      { agent: 'Sniper', map: 'Black Widow', pickRate: 270, winRate: 70 },
      { agent: 'Rifler', map: 'Black Widow', pickRate: 290, winRate: 55 },
      { agent: 'Assault', map: 'Port', pickRate: 250, winRate: 60 },
      { agent: 'Support', map: 'Port', pickRate: 180, winRate: 65 },
      { agent: 'Sniper', map: 'Eagle Eye', pickRate: 240, winRate: 75 },
      { agent: 'Rifler', map: 'Eagle Eye', pickRate: 260, winRate: 58 },
      { agent: 'Assault', map: 'Sub Base', pickRate: 210, winRate: 62 },
      { agent: 'Support', map: 'Sub Base', pickRate: 150, winRate: 48 },
      { agent: 'Sniper', map: 'Ankara', pickRate: 190, winRate: 50 },
    ]
  };

  const currentData = activeGame === 'VALORANT' ? valData : cfData;

  // Filter Data based on Search Query
  const sq = searchQuery.toLowerCase();
  const filteredRadar = currentData.radar.filter(p => p.name.toLowerCase().includes(sq));
  const filteredSynergy = currentData.synergy.filter(s => s.agent.toLowerCase().includes(sq) || s.map.toLowerCase().includes(sq));

  // Modal Handlers
  const openRadarOverview = (player) => {
    setModalData({
      title: `${player.name} Skill Overview`,
      description: 'Comprehensive breakdown of player statistics across all calculated metrics. Displays the raw dataset being visualized.',
      data: player
    });
  };

  const openEconOverview = (round) => {
    setModalData({
      title: `Round ${round.round} Economic Analysis`,
      description: 'Deep dive into the financial decisions made during this specific round and how it impacted the overall win probability.',
      data: round
    });
  };

  const openSynergyOverview = (synergy) => {
    setModalData({
      title: `${synergy.agent} on ${synergy.map} Synergy`,
      description: 'Detailed metrics explaining the effectiveness of this specific agent pick on this map.',
      data: synergy
    });
  };

  const openHeatmapOverview = (heatmap) => {
    setModalData({
      title: `Heatmap: ${heatmap.area}`,
      description: heatmap.details,
      data: heatmap
    });
  };

  return (
    <div className="flex-1 bg-[#090e14] text-white overflow-y-auto flex flex-col h-full custom-scrollbar relative">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
      
      {/* Top Header Controls */}
      <div className="bg-[#0f1722]/80 backdrop-blur-xl border-b border-[#1c2532] shadow-xl py-4 px-8 relative z-30">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          
          {/* Dropdowns - Increased Spacing */}
          <div className="flex space-x-12">
            <div className="flex flex-col">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Game:</label>
              <div className="relative group cursor-pointer">
                <select 
                  className="appearance-none bg-[#121a25] border border-[#2a3648] text-white font-bold tracking-wider rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-[#406899] hover:bg-[#1a2533] transition-colors shadow-inner"
                  value={activeGame}
                  onChange={(e) => {
                    setActiveGame(e.target.value);
                    setSearchQuery(''); // Reset search on game change
                  }}
                >
                  <option value="VALORANT">VALORANT</option>
                  <option value="CROSSFIRE">CROSSFIRE</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <ChevronDown />
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Data Type:</label>
              <div className="relative group cursor-pointer">
                <select 
                  className="appearance-none bg-[#121a25] border border-[#2a3648] text-white font-bold tracking-wider rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:border-[#406899] hover:bg-[#1a2533] transition-colors shadow-inner"
                  value={dataType}
                  onChange={(e) => setDataType(e.target.value)}
                >
                  <option value="ALL PLAYERS">ALL PLAYERS</option>
                  <option value="PRO PLAYERS">PRO PLAYERS</option>
                  <option value="CASUAL">CASUAL</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <ChevronDown />
                </div>
              </div>
            </div>
          </div>

          {/* Search - Connected to State */}
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input 
              type="text" 
              placeholder="Filter by Player, Agent, or Map..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#e2e8f0] text-gray-900 font-medium rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner transition-all placeholder-gray-500"
            />
          </div>

        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 pb-16">
          
          <Card title="Global Player Skill Matrix">
             <RadarChart data={filteredRadar} axes={currentData.radarAxes} theme={currentData.theme} onSelect={openRadarOverview} />
          </Card>

          <Card title="Economic Efficiency over Rounds">
             <EconChart data={currentData.econ} theme={currentData.theme} onSelect={openEconOverview} />
          </Card>

          <Card title="Agent/Map Synergies" className="min-h-[350px]">
             <BubbleChart data={filteredSynergy} theme={currentData.theme} onSelect={openSynergyOverview} />
          </Card>

          <Card title={`${activeGame === 'VALORANT' ? 'Valorant' : 'Crossfire'} Team Round-Start Strategy Heatmap`} className="min-h-[350px]">
             <StrategyMap theme={currentData.theme} onSelect={openHeatmapOverview} />
          </Card>

        </div>
      </div>

      {/* Interactive Detail Modal (Mockup) */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setModalData(null)}>
          <div className="bg-[#121a25] border border-[#232f40] rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100 opacity-100" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 border-b border-[#232f40] pb-2">
               <h2 className="text-xl font-black text-white">{modalData.title}</h2>
               <button onClick={() => setModalData(null)} className="text-gray-400 hover:text-white transition-colors">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">{modalData.description}</p>
            
            <div className="bg-[#0f1722] p-4 rounded-lg border border-[#1c2532] overflow-x-auto">
               <div className="text-[10px] font-black tracking-widest text-gray-500 mb-2 uppercase">Raw Analytic Node Data</div>
               <pre className="text-xs font-mono text-blue-400">
                 {JSON.stringify(modalData.data, null, 2)}
               </pre>
            </div>
            
            <button 
              onClick={() => setModalData(null)} 
              className="mt-6 w-full py-3 bg-[#1e293b] hover:bg-[#2a3648] border border-[#334155] rounded-lg text-white font-bold tracking-wider transition-colors"
            >
              Close Analysis
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Analytics;