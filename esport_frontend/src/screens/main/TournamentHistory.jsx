import React, { useState, useEffect, useMemo } from 'react';
import { Search, User, Check, Trophy, Calendar, ChevronRight } from 'lucide-react';
import { apiFetch } from '../../utils/api';
import Bracket from './Bracket';

const TournamentHistory = ({ setGlobalTournament, setActiveTab }) => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTab, setCurrentTab] = useState('ALL');
  const [selectedComplete, setSelectedComplete] = useState(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const res = await apiFetch('/api/tournaments-dashboard');
        if (res.ok) {
          const data = await res.json();
          setTournaments(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch tournament history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTournaments();
  }, []);

  const filteredTournaments = useMemo(() => {
    let list = tournaments;
    if (currentTab !== 'ALL') {
      list = list.filter(t => t.status === currentTab);
    }
    if (searchQuery.trim()) {
      list = list.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list;
  }, [tournaments, currentTab, searchQuery]);

  const counts = useMemo(() => {
    const c = { ALL: tournaments.length, PENDING: 0, 'IN PROGRESS': 0, COMPLETE: 0, ARCHIVED: 0 };
    tournaments.forEach(t => {
      if (c[t.status] !== undefined) c[t.status]++;
    });
    return c;
  }, [tournaments]);

  if (selectedComplete) {
    return (
      <div className="w-full h-full flex flex-col relative animate-fade-in bg-slate-950">
        <div className="w-full h-16 bg-slate-900 border-b border-slate-800 flex items-center px-8 z-50 shrink-0">
          <button 
            onClick={() => setSelectedComplete(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-bold tracking-widest uppercase bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-lg"
          >
            <ChevronRight size={16} className="rotate-180" /> Back to History
          </button>
          <div className="ml-auto text-sm font-black tracking-widest uppercase text-slate-300 flex items-center gap-3">
             <Trophy size={16} className="text-cyan-400" />
             {selectedComplete.name}
             <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded shadow-sm text-[10px] ml-2">READ ONLY</span>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden">
          {/* We pass the active format via localStorage so the bracket component picks it up initially */}
          
          <Bracket globalGame={selectedComplete.game_title} globalTournament={selectedComplete.name} isReadOnly={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-8 md:p-12 overflow-y-auto custom-scrollbar relative" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}>
      
      <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-20 relative z-10">
        
        {/* Header & Tabs */}
        <div className="flex flex-col gap-6 border-b border-slate-700/50 pb-2">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            
            <div className="flex items-center gap-6 text-[11px] font-black uppercase text-slate-500 tracking-widest">
              {['ALL', 'PENDING', 'IN PROGRESS', 'COMPLETE', 'ARCHIVED'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setCurrentTab(tab)}
                  className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${
                    currentTab === tab 
                      ? 'text-cyan-400 border-cyan-400' 
                      : 'border-transparent hover:text-slate-300'
                  }`}
                >
                  {tab} <span className="bg-slate-800/80 px-2 py-0.5 rounded-full text-slate-300 border border-white/5">{counts[tab]}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl flex items-center px-4 py-2.5 w-full lg:w-64 focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/50 transition-all shadow-inner">
              <Search size={16} className="text-slate-500 mr-3" />
              <input 
                type="text" 
                placeholder="Search tournaments..." 
                className="bg-transparent border-none outline-none text-sm text-slate-200 w-full placeholder-slate-600 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="flex justify-center py-20 text-cyan-400 animate-pulse">
              <span className="text-sm font-black tracking-widest uppercase flex items-center gap-2">
                <Trophy size={16} className="animate-bounce" /> Loading History...
              </span>
            </div>
          ) : filteredTournaments.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4">
              <Trophy size={48} className="text-slate-700" />
              <div className="text-slate-400 font-medium tracking-wide">No tournaments found in this category.</div>
            </div>
          ) : (
            filteredTournaments.map((t, idx) => (
              <div 
                key={t.id}
                onClick={() => {
                  if (t.status === 'COMPLETE') {
                    localStorage.setItem('activeFormat', t.format !== 'Unspecified Format' ? t.format : 'Single Elimination');
                    setSelectedComplete(t);
                  } else {
                    setGlobalTournament(t.name);
                    localStorage.setItem('activeFormat', t.format !== 'Unspecified Format' ? t.format : 'Single Elimination');
                    setActiveTab('Bracket');
                  }
                }}
                className="group flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/60 border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-slate-800/80 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden"
              >
                {/* Decoration */}
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 group-hover:bg-cyan-500 transition-colors"></div>

                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-14 h-14 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-110 transition-transform group-hover:bg-cyan-500/10">
                    <Trophy size={24} className="opacity-80 group-hover:opacity-100" />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[15px] font-black text-slate-100 uppercase tracking-wide group-hover:text-cyan-400 transition-colors leading-none">{t.name}</h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {t.format !== 'Unspecified Format' && (
                         <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded shadow-sm">{t.format}</span>
                      )}
                      {t.game_title && (
                        <span className="text-slate-400">{t.game_title}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto justify-end">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold bg-slate-950/50 px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
                    <User size={14} className="text-slate-500" />
                    <span>{t.participant_count}</span>
                  </div>
                  
                  <div className="w-28 flex items-center justify-end">
                    {t.status === 'COMPLETE' ? (
                      <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                        <Check size={14} />
                        {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    ) : t.status === 'IN PROGRESS' ? (
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-amber-400 w-[60%] shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
                      </div>
                    ) : t.status === 'PENDING' ? (
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full shadow-inner"></div>
                    ) : (
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full shadow-inner"></div>
                    )}
                  </div>

                  <ChevronRight size={20} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all hidden md:block" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default TournamentHistory;
