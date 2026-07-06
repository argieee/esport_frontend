import React, { useState, useRef } from 'react';

// --- ICONS ---
const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/w0000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// --- MOCK DATA ---
const valorantData = {
  theme: '#ff4655',
  liveMatches: [
    { id: 1, title: 'VCT Pacific - Grand Finals', team1: 'LOUD', team2: 'Fnatic', score: '2-1', viewers: '112K', type: 'match' },
    { id: 2, title: 'VCT Challengers', bracket: 'NA FINAL: FNATIC vs. LOUD', mapScore: 'Map 2: 7-9', type: 'bracket' },
    { id: 3, title: 'VCT Americas - Semi Finals', team1: 'NRG', team2: 'C9', score: '0-0', viewers: '85K', type: 'match' },
  ],
  rankings: [
    { rank: 1, name: 'Fnatic', logo: 'bg-orange-500', game: 'VAL' },
    { rank: 2, name: 'Team Liquid', logo: 'bg-blue-800', game: 'VAL' },
    { rank: 3, name: 'LOUD', logo: 'bg-green-500', game: 'VAL' },
    { rank: 4, name: 'DRX', logo: 'bg-blue-500', game: 'VAL' },
    { rank: 5, name: 'Imperial', logo: 'bg-emerald-500', game: 'CF' },
  ],
  circuit: [
    { event: 'VCT EMEA', match: 'FNATIC vs. NAVI', time: 'Starts in 1h 30m', icon: 'bg-orange-500' },
    { event: 'VCT Americas', match: 'LOUD vs. Cloud9', time: 'Starts tomorrow', icon: 'bg-red-500' },
  ],
  qualifier: {
    game: 'VALORANT',
    title: 'Valorant Open Qualifier: 5v5 Tactical',
    prize: '$5,000',
    deadline: 'June 15th',
    bgClass: 'from-red-900/40 to-[#0f1722]'
  }
};

const crossfireData = {
  theme: '#4c7fd6',
  liveMatches: [
    { id: 1, title: 'CFS Grand Finals', team1: 'All Gamers', team2: 'Baisha', score: '3-0', viewers: '150K', type: 'match' },
    { id: 2, title: 'CFPL Summer', bracket: 'SEMI: AG vs. BS', mapScore: 'Map 3: 10-8', type: 'bracket' },
    { id: 3, title: 'CFS Invitational', team1: 'Q9', team2: 'BD', score: '1-1', viewers: '45K', type: 'match' },
  ],
  rankings: [
    { rank: 1, name: 'All Gamers', logo: 'bg-red-600', game: 'CF' },
    { rank: 2, name: 'Baisha Gaming', logo: 'bg-yellow-500', game: 'CF' },
    { rank: 3, name: 'Q9', logo: 'bg-blue-600', game: 'CF' },
    { rank: 4, name: 'Imperial', logo: 'bg-emerald-500', game: 'CF' },
    { rank: 5, name: 'Black Dragons', logo: 'bg-black', game: 'CF' },
  ],
  circuit: [
    { event: 'CFPL', match: 'AG vs. BaiSha', time: 'Starts tomorrow', icon: 'bg-gray-400' },
    { event: 'CFS Invitational', match: 'Q9 vs. BD', time: 'Starts in 2 days', icon: 'bg-blue-400' },
  ],
  qualifier: {
    game: 'CROSSFIRE',
    title: 'Crossfire Open Qualifier: 5v5 Tactical',
    prize: '$10,000',
    deadline: 'July 1st',
    bgClass: 'from-blue-900/40 to-[#0f1722]'
  }
};

// --- COMPONENTS ---

const MatchCard = ({ match, themeColor, gameName }) => {
  return (
    <div className="w-[300px] md:w-[350px] h-[250px] rounded-2xl overflow-hidden relative flex-shrink-0 snap-center group border border-[#232f40] hover:border-gray-500 transition-colors shadow-2xl">
      {/* Background Stylized Image */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gameName === 'VALORANT' ? 'from-[#ff4655]/20' : 'from-[#4c7fd6]/20'} to-[#0a0f16] z-0`}>
         {/* Placeholder silhouette/pattern */}
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
      </div>
      
      {/* Game Logo Overlay */}
      <div className="absolute top-4 left-6 z-20 text-lg font-black italic tracking-widest text-white drop-shadow-md">
         {gameName}
      </div>

      {/* Inner Content Box */}
      <div className="absolute inset-x-4 bottom-4 top-12 bg-[#121a25]/90 backdrop-blur-md rounded-xl border border-[#2a3648] flex flex-col p-3 z-10 shadow-inner group-hover:bg-[#151e2b]/95 transition-colors">
         
         <div className="text-center font-bold text-gray-300 text-[11px] uppercase tracking-wider mb-3 border-b border-gray-700/50 pb-2 truncate">{match.title}</div>
         
         {match.type === 'match' ? (
           <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center justify-between w-full px-2 mb-2">
                 <div className="flex flex-col items-center w-1/3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg mb-2 flex items-center justify-center font-black text-lg text-green-500">&gt;</div>
                    <span className="font-bold text-white text-xs truncate w-full text-center">{match.team1}</span>
                    <span className="text-[9px] text-gray-500">{match.viewers} Viewers</span>
                 </div>
                 <div className="flex flex-col items-center justify-center w-1/3">
                    <div className="text-red-500 font-bold text-[9px] flex items-center animate-pulse mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></div> LIVE
                    </div>
                    <div className="text-3xl font-black text-white tracking-widest">{match.score}</div>
                    <div className="text-[9px] text-gray-500 mt-1 italic">vs.</div>
                 </div>
                 <div className="flex flex-col items-center w-1/3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg mb-2 flex items-center justify-center font-black text-lg text-orange-500">x</div>
                    <span className="font-bold text-white text-xs truncate w-full text-center">{match.team2}</span>
                    <span className="text-[9px] text-gray-500">{match.viewers} Viewers</span>
                 </div>
              </div>
           </div>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center px-4">
              {/* Bracket Placeholder */}
              <div className="w-full flex justify-between items-center opacity-60 mb-4 px-4">
                 <div className="w-6 flex flex-col space-y-1.5">
                    <div className="h-[2px] bg-gray-500 w-full"></div>
                    <div className="h-[2px] bg-gray-500 w-full"></div>
                    <div className="h-[2px] bg-gray-500 w-full"></div>
                    <div className="h-[2px] bg-gray-500 w-full"></div>
                 </div>
                 <div className="flex-1 h-6 border-t-2 border-b-2 border-r-2 border-gray-600 rounded-r-lg mx-2 flex items-center justify-end pr-2">
                    <div className="w-3 h-[2px] bg-orange-500"></div>
                 </div>
              </div>
              <div className="text-xs font-bold text-white tracking-wider text-center">{match.bracket}</div>
              <div className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest">{match.mapScore}</div>
           </div>
         )}

         <button 
           className="mt-auto w-full py-2 rounded border border-cyan-500/50 bg-cyan-900/20 text-cyan-400 font-bold tracking-widest text-[10px] uppercase flex items-center justify-center space-x-2 hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_15px_rgba(0,208,235,0.15)] hover:shadow-[0_0_20px_rgba(0,208,235,0.4)]"
           onClick={() => alert(`Connecting to stream for ${match.title}...`)}
         >
           <PlayIcon />
           <span>Watch Live</span>
         </button>
      </div>
    </div>
  );
};


// --- MAIN COMPONENT ---

const Tournament = () => {
  const [activeGame, setActiveGame] = useState('VALORANT');
  const [activeTab, setActiveTab] = useState('LIVE & UPCOMING');
  
  const carouselRef = useRef(null);
  const data = activeGame === 'VALORANT' ? valorantData : crossfireData;

  const scrollLeft = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
  };

  return (
    <div className="flex-1 bg-[#090e14] text-white overflow-hidden flex flex-col h-full relative">
      
      {/* Main Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
          
          {/* Header Row: Title & Clean Game Selection */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
             <div className="flex items-center space-x-4">
                <div className="w-1.5 h-8 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(0,208,235,0.6)]"></div>
                <h1 className="text-2xl md:text-3xl font-black tracking-[0.15em] uppercase text-white drop-shadow-md">
                    TOURNAMENTS
                </h1>
             </div>
             
             {/* Integrated Game Selection */}
             <div className="flex items-center bg-[#121a25] rounded-xl border border-[#232f40] shadow-xl p-1 relative">
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <ChevronDown />
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-4 pr-2">GAME:</span>
                <select 
                  className="appearance-none bg-transparent text-white font-bold tracking-widest pl-2 pr-10 py-2 focus:outline-none cursor-pointer"
                  value={activeGame}
                  onChange={(e) => setActiveGame(e.target.value)}
                >
                  <option className="bg-[#121a25]" value="VALORANT">VALORANT</option>
                  <option className="bg-[#121a25]" value="CROSSFIRE">CROSSFIRE</option>
                </select>
             </div>
          </div>

          {/* Section: Subtitle & Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#232f40] pb-4 gap-6">
             <h2 className="text-xl font-bold tracking-widest text-gray-300 uppercase">
                 ESPORT LEAGUE TOURNAMENTS
             </h2>
             <div className="flex space-x-6 md:space-x-12 font-black text-[11px] tracking-widest uppercase overflow-x-auto scrollbar-hide">
               {['LIVE & UPCOMING', 'RESULT', 'SCHEDULE'].map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`whitespace-nowrap relative transition-colors ${
                         activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                     }`}
                   >
                     {tab}
                     {activeTab === tab && (
                       <div className="absolute -bottom-[17px] left-0 right-0 h-[3px] bg-cyan-400 drop-shadow-[0_0_5px_rgba(0,208,235,0.8)] rounded-t-sm"></div>
                     )}
                   </button>
               ))}
             </div>
          </div>

          {/* Top Section: Carousel & Rankings */}
          <div className="flex flex-col xl:flex-row gap-8">
            
            {/* Carousel Container (Takes remaining flexible space) */}
            <div className="flex-1 min-w-0 relative flex items-center group bg-[#0d131c] rounded-2xl border border-[#1c2532] shadow-inner p-2 md:p-6">
               
               {/* Left Arrow */}
               <button onClick={scrollLeft} className="absolute left-2 md:-left-5 z-20 w-10 h-10 rounded-full bg-black/80 border border-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-800 hover:scale-110 shadow-2xl">
                  <ChevronLeft />
               </button>
               
               {/* Scroll View */}
               <div ref={carouselRef} className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2 px-2 w-full items-center">
                  {data.liveMatches.map((match) => (
                    <MatchCard key={match.id} match={match} themeColor={data.theme} gameName={activeGame} />
                  ))}
                  {/* Empty state padding to allow scrolling past the last item cleanly */}
                  <div className="min-w-[20px] shrink-0"></div>
               </div>

               {/* Right Arrow */}
               <button onClick={scrollRight} className="absolute right-2 md:-right-5 z-20 w-10 h-10 rounded-full bg-black/80 border border-gray-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-800 hover:scale-110 shadow-2xl">
                  <ChevronRight />
               </button>
               
               {/* Subtle gradient edges to hint at scroll */}
               <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0d131c] to-transparent pointer-events-none rounded-l-2xl"></div>
               <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0d131c] to-transparent pointer-events-none rounded-r-2xl"></div>
            </div>

            {/* Global Team Rankings Sidebar (Fixed width) */}
            <div className="w-full xl:w-[300px] shrink-0 bg-[#121a25] rounded-xl border border-[#232f40] flex flex-col overflow-hidden shadow-xl">
               <div className="bg-[#1a2332] p-4 border-b border-[#2a3648] flex items-center justify-between">
                 <h2 className="text-xs font-black tracking-widest uppercase text-white drop-shadow-md leading-tight">GLOBAL TEAM<br/>RANKINGS</h2>
                 <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
               </div>
               <div className="flex-1 p-4 flex flex-col gap-1">
                  {data.rankings.map((team, idx) => (
                    <div key={idx} className="flex items-center group cursor-pointer hover:bg-[#1a2332] p-2.5 rounded-lg transition-colors border border-transparent hover:border-[#2a3648]">
                       <span className="font-bold text-gray-500 w-5 text-right mr-3 text-sm">{team.rank}.</span>
                       <div className={`w-6 h-6 ${team.logo} rounded-md mr-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}></div>
                       <div className="flex flex-col">
                          <span className="font-bold text-gray-200 text-sm group-hover:text-cyan-400 transition-colors">{team.name}</span>
                          <span className="text-[9px] font-black text-gray-600 tracking-widest uppercase">{team.game}</span>
                       </div>
                    </div>
                  ))}
                  <button className="mt-4 text-[10px] text-cyan-500 hover:text-cyan-400 font-bold tracking-widest uppercase text-center w-full group py-2 border border-cyan-900/30 rounded bg-cyan-900/10 transition-all hover:bg-cyan-900/30">
                     View all Rankings <span className="ml-1 inline-block group-hover:translate-x-1 transition-transform">-&gt;</span>
                  </button>
               </div>
            </div>
          </div>

          {/* Bottom Section: Circuit Snapshot & Qualifiers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* FPS Circuit Snapshot */}
            <div className="bg-[#121a25] rounded-xl border border-[#232f40] flex flex-col overflow-hidden shadow-xl">
               <div className="bg-[#1a2332] p-4 border-b border-[#2a3648]">
                 <h2 className="text-xs font-black tracking-widest uppercase text-white drop-shadow-md leading-tight">FPS CIRCUIT SNAPSHOT:<br/><span className="text-gray-400">VALORANT & CROSSFIRE</span></h2>
               </div>
               <div className="p-6 space-y-8">
                  {/* Valorant List */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4 text-white font-black tracking-widest text-xs border-b border-[#1c2532] pb-2">
                       <svg viewBox="0 0 100 100" className="h-4 w-4 fill-[#ff4655]"><path d="M99 0L35.2 61.2 53.6 100zM0 0l31.2 65.6L19 100 0 60z"/></svg>
                       <span>VALORANT</span>
                    </div>
                    <div className="space-y-4">
                       {valorantData.circuit.map((c, i) => (
                         <div key={i} className="flex justify-between items-center text-xs border-l-[3px] border-transparent hover:border-[#ff4655] pl-3 transition-colors cursor-pointer group bg-[#151e2b] p-2 rounded-r-lg hover:bg-[#1a2533]">
                           <div className="flex items-center space-x-3">
                             <div className={`w-2 h-2 ${c.icon} rounded-full animate-pulse`}></div>
                             <span className="font-bold text-gray-400 group-hover:text-gray-300">{c.event} - <span className="text-white">{c.match}</span></span>
                           </div>
                           <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">{c.time}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* Crossfire List */}
                  <div>
                    <div className="flex items-center space-x-2 mb-4 text-white font-black tracking-widest text-xs border-b border-[#1c2532] pb-2">
                       <svg viewBox="0 0 100 100" className="h-4 w-4 fill-[#4c7fd6]"><circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="15" fill="none"/><circle cx="50" cy="50" r="10" fill="currentColor"/></svg>
                       <span>CROSSFIRE</span>
                    </div>
                    <div className="space-y-4">
                       {crossfireData.circuit.map((c, i) => (
                         <div key={i} className="flex justify-between items-center text-xs border-l-[3px] border-transparent hover:border-[#4c7fd6] pl-3 transition-colors cursor-pointer group bg-[#151e2b] p-2 rounded-r-lg hover:bg-[#1a2533]">
                           <div className="flex items-center space-x-3">
                             <div className={`w-2 h-2 ${c.icon} rounded-full animate-pulse`}></div>
                             <span className="font-bold text-gray-400 group-hover:text-gray-300">{c.event} - <span className="text-white">{c.match}</span></span>
                           </div>
                           <span className="text-gray-500 font-mono text-[10px] uppercase tracking-wider">{c.time}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* FPS Open Qualifiers */}
            <div className="bg-[#121a25] rounded-xl border border-[#232f40] flex flex-col overflow-hidden shadow-xl relative group h-full min-h-[300px]">
               <div className={`absolute inset-0 bg-gradient-to-br ${data.qualifier.bgClass} z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
               
               {/* Decorative character placeholder silhouette */}
               <div className="absolute right-0 bottom-0 w-72 h-72 bg-white opacity-5 rounded-tl-[100px] blur-2xl pointer-events-none z-0 mix-blend-overlay"></div>

               <div className="bg-[#1a2332]/50 backdrop-blur-sm p-4 relative z-10 border-b border-gray-700/30">
                 <h2 className="text-xs font-black tracking-widest uppercase text-white drop-shadow-md leading-tight">FPS OPEN QUALIFIERS</h2>
               </div>
               
               <div className="flex-1 p-6 relative z-10 flex flex-col justify-center items-center">
                  <div className="w-full max-w-sm border border-[#334155] bg-[#0a0f16]/80 backdrop-blur-xl rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform transition-transform group-hover:scale-[1.02]">
                     
                     <div className="flex items-center space-x-3 mb-6 border-b border-[#2a3648] pb-4">
                        {activeGame === 'VALORANT' ? (
                          <svg viewBox="0 0 100 100" className="h-6 w-6 fill-[#ff4655]"><path d="M99 0L35.2 61.2 53.6 100zM0 0l31.2 65.6L19 100 0 60z"/></svg>
                        ) : (
                          <svg viewBox="0 0 100 100" className="h-6 w-6 fill-[#4c7fd6]"><circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="15" fill="none"/><circle cx="50" cy="50" r="10" fill="currentColor"/></svg>
                        )}
                        <span className="text-xl font-black tracking-widest text-white">{activeGame}</span>
                     </div>
                     
                     <h3 className="font-black text-white text-lg mb-6 leading-tight">{data.qualifier.title}</h3>
                     
                     <div className="space-y-3 mb-8 bg-[#121a25] p-4 rounded-lg border border-[#1e293b]">
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Prize Pool</span>
                           <span className="font-black text-emerald-400">{data.qualifier.prize}</span>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Deadline</span>
                           <span className="font-black text-white">{data.qualifier.deadline}</span>
                        </div>
                     </div>

                     <button 
                       className="w-full py-4 rounded-lg border border-cyan-500/30 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 text-cyan-400 font-black tracking-[0.2em] text-xs uppercase hover:from-cyan-600 hover:to-blue-600 hover:text-white transition-all shadow-[0_0_20px_rgba(0,208,235,0.1)] hover:shadow-[0_0_30px_rgba(0,208,235,0.5)] active:scale-95"
                       onClick={() => alert(`Redirecting to registration for ${data.qualifier.title}`)}
                     >
                       Register Now
                     </button>
                  </div>
               </div>
            </div>

          </div>

        </div>
      </div>
      
      {/* Hide scrollbar utility class logic */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Tournament;