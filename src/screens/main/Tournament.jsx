import React, { useState, useRef, useEffect } from 'react';

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
const IconChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);
const IconChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);
const IconPlay = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);
const IconTrophy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 21h8m-4-4v4M7 3H4a1 1 0 00-1 1v3a4 4 0 004 4h.5M17 3h3a1 1 0 011 1v3a4 4 0 01-4 4h-.5M7 3h10v5a5 5 0 01-10 0V3z" />
  </svg>
);
const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const IconBell = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);
const IconTrend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);
const IconReplay = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const DATA = {
  VALORANT: {
    color: '#ff4655',
    colorClass: 'from-[#ff4655]/20',
    borderClass: 'border-[#ff4655]/40',
    textClass: 'text-[#ff4655]',
    liveMatches: [
      { id: 1, title: 'VCT Pacific — Grand Finals', team1: 'LOUD', team2: 'Fnatic', score: '2–1', viewers: '112K', isLive: true, type: 'match' },
      { id: 2, title: 'VCT Challengers', bracket: 'NA FINAL: FNATIC vs. LOUD', mapScore: 'Map 2: 7-9', type: 'bracket', isLive: true },
      { id: 3, title: 'VCT Americas — Semi Finals', team1: 'NRG', team2: 'Cloud9', score: '1–1', viewers: '85K', isLive: true, type: 'match' },
    ],
    rankings: [
      { rank: 1, name: 'Fnatic', abbr: 'FNC', color: '#f97316' },
      { rank: 2, name: 'Team Liquid', abbr: 'TL', color: '#3b82f6' },
      { rank: 3, name: 'LOUD', abbr: 'LDN', color: '#22c55e' },
      { rank: 4, name: 'DRX', abbr: 'DRX', color: '#60a5fa' },
      { rank: 5, name: 'Imperial', abbr: 'IMP', color: '#10b981' },
    ],
    circuit: [
      { event: 'VCT EMEA', match: 'FNATIC vs. NAVI', time: 'In 1h 30m', hot: true },
      { event: 'VCT Americas', match: 'LOUD vs. Cloud9', time: 'Starts tomorrow', hot: false },
    ],
    qualifier: {
      title: 'Valorant Open Qualifier: 5v5 Tactical',
      prize: '$5,000',
      deadline: 'June 15th',
      slots: '24 / 64',
    },
    results: {
      table: [
        { rank: 1, team: 'Team Liquid', abbr: 'TL', color: '#3b82f6', prize: '$5,000', record: '15-22', pts: 25 },
        { rank: 2, team: 'ONIC', abbr: 'ON', color: '#a855f7', prize: '$2,500', record: '15-17', pts: 20 },
        { rank: 3, team: 'Blacklist', abbr: 'BL', color: '#f59e0b', prize: '$1,000', record: '10-10', pts: 20 },
        { rank: 4, team: 'ONIEG', abbr: 'OG', color: '#ef4444', prize: '—', record: '9-9', pts: 13 },
        { rank: 5, team: 'Team Lavar', abbr: 'LV', color: '#64748b', prize: '—', record: '6-8', pts: 13 },
        { rank: 6, team: 'Lmipreot', abbr: 'LP', color: '#06b6d4', prize: '—', record: '6-5', pts: 10 },
        { rank: 7, team: 'Team Aqua', abbr: 'AQ', color: '#0ea5e9', prize: '—', record: '3-3', pts: 9 },
      ],
      brackets: [
        { round: 'Semi-Finals', bestOf: 'Best of 3', team1: 'Team Liquid', team2: 'Fnatic', score1: 3, score2: 1, map: 'Map 2: 7-9' },
        { round: 'Semi-Finals', bestOf: 'Best of 5', team1: 'Fnatic', team2: 'LOUD', score1: 3, score2: 0, map: 'Map 2: 7-9' },
        { round: 'Semi-Finals', bestOf: 'Best of 5', team1: 'Fnatic', team2: 'NRG', score1: 3, score2: 0, map: 'Map 2: 7-9' },
      ],
      timeline: [
        { league: 'VCT', stage: 'Final', team1: 'Ascent', team2: 'Fnatic', score: '3–1' },
        { league: 'CFPL', stage: 'Final', team1: 'AG', team2: 'Black Widow', score: '10–0' },
        { league: 'VCT', stage: 'Semi-Final', team1: 'NRG', team2: 'Cloud9', score: '2–1' },
        { league: 'CFPL', stage: 'Quarter-Final', team1: 'Q9', team2: 'BD', score: '3–2' },
      ],
    },
    schedule: [
      { id: 1, team: 'Fnatic', abbr: 'FNC', color: '#f97316', time: '13:00', timezone: '19:00 PST', reminded: false },
      { id: 2, team: 'Team Liquid', abbr: 'TL', color: '#3b82f6', time: '23:00', timezone: '19:00 PST', reminded: false },
      { id: 3, team: 'AG', abbr: 'AG', color: '#22c55e', time: '24:00', timezone: '19:00 PST', reminded: false },
      { id: 4, team: 'AG', abbr: 'AG', color: '#22c55e', time: '28:00', timezone: '19:00 PST', reminded: true },
    ],
  },
  CROSSFIRE: {
    color: '#4c7fd6',
    colorClass: 'from-[#4c7fd6]/20',
    borderClass: 'border-[#4c7fd6]/40',
    textClass: 'text-[#4c7fd6]',
    liveMatches: [
      { id: 1, title: 'CFS Grand Finals', team1: 'All Gamers', team2: 'Baisha', score: '3–0', viewers: '150K', isLive: true, type: 'match' },
      { id: 2, title: 'CFPL Summer', bracket: 'SEMI: AG vs. BS', mapScore: 'Map 3: 10-8', type: 'bracket', isLive: true },
      { id: 3, title: 'CFS Invitational', team1: 'Q9', team2: 'BD', score: '1–1', viewers: '45K', isLive: true, type: 'match' },
    ],
    rankings: [
      { rank: 1, name: 'All Gamers', abbr: 'AG', color: '#ef4444' },
      { rank: 2, name: 'Baisha Gaming', abbr: 'BS', color: '#eab308' },
      { rank: 3, name: 'Q9', abbr: 'Q9', color: '#3b82f6' },
      { rank: 4, name: 'Imperial', abbr: 'IMP', color: '#10b981' },
      { rank: 5, name: 'Black Dragons', abbr: 'BD', color: '#6b7280' },
    ],
    circuit: [
      { event: 'CFPL', match: 'AG vs. BaiSha', time: 'Starts tomorrow', hot: true },
      { event: 'CFS Invitational', match: 'Q9 vs. BD', time: 'In 2 days', hot: false },
    ],
    qualifier: {
      title: 'Crossfire Open Qualifier: 5v5 Tactical',
      prize: '$10,000',
      deadline: 'July 1st',
      slots: '18 / 64',
    },
    results: {
      table: [
        { rank: 1, team: 'All Gamers', abbr: 'AG', color: '#ef4444', prize: '$10,000', record: '18-5', pts: 36 },
        { rank: 2, team: 'Baisha Gaming', abbr: 'BS', color: '#eab308', prize: '$5,000', record: '15-8', pts: 30 },
        { rank: 3, team: 'Q9', abbr: 'Q9', color: '#3b82f6', prize: '$2,500', record: '12-11', pts: 24 },
        { rank: 4, team: 'Imperial', abbr: 'IMP', color: '#10b981', prize: '—', record: '10-13', pts: 20 },
        { rank: 5, team: 'Black Dragons', abbr: 'BD', color: '#6b7280', prize: '—', record: '7-16', pts: 14 },
      ],
      brackets: [
        { round: 'Grand Finals', bestOf: 'Best of 5', team1: 'All Gamers', team2: 'Baisha', score1: 3, score2: 2, map: 'Map 5: 16-14' },
        { round: 'Semi-Finals', bestOf: 'Best of 3', team1: 'Q9', team2: 'Baisha', score1: 1, score2: 2, map: 'Map 3: 12-16' },
      ],
      timeline: [
        { league: 'CFPL', stage: 'Grand Final', team1: 'AG', team2: 'Baisha', score: '3–2' },
        { league: 'CFS', stage: 'Semi-Final', team1: 'Q9', team2: 'BD', score: '2–0' },
      ],
    },
    schedule: [
      { id: 1, team: 'All Gamers', abbr: 'AG', color: '#ef4444', time: '14:00', timezone: '20:00 PST', reminded: false },
      { id: 2, team: 'Baisha Gaming', abbr: 'BS', color: '#eab308', time: '17:00', timezone: '23:00 PST', reminded: false },
      { id: 3, team: 'Q9', abbr: 'Q9', color: '#3b82f6', time: '20:00', timezone: '02:00 PST', reminded: true },
    ],
  },
};

/* ─────────────────────────────────────────────
   VALORANT LOGO SVG
───────────────────────────────────────────── */
const ValorantLogo = ({ size = 20, color = '#ff4655' }) => (
  <svg viewBox="0 0 100 100" style={{ width: size, height: size, fill: color }} xmlns="http://www.w3.org/2000/svg">
    <path d="M99 0L35.2 61.2 53.6 100zM0 0l31.2 65.6L19 100 0 60z" />
  </svg>
);

/* ─────────────────────────────────────────────
   CROSSFIRE LOGO SVG
───────────────────────────────────────────── */
const CrossfireLogo = ({ size = 20, color = '#4c7fd6' }) => (
  <svg viewBox="0 0 100 100" style={{ width: size, height: size }} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="14" fill="none" />
    <circle cx="50" cy="50" r="10" fill={color} />
    <line x1="50" y1="0" x2="50" y2="100" stroke={color} strokeWidth="8" />
    <line x1="0" y1="50" x2="100" y2="50" stroke={color} strokeWidth="8" />
  </svg>
);

/* ─────────────────────────────────────────────
   MATCH CARD
───────────────────────────────────────────── */
const MatchCard = ({ match, game }) => {
  const d = DATA[game];
  return (
    <div className="w-[300px] md:w-[340px] flex-shrink-0 snap-center rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-500/70 transition-all duration-300 shadow-2xl group relative bg-[#0d131c]">
      {/* Gradient bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${d.colorClass} to-transparent opacity-60 pointer-events-none`} />

      {/* Header row */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          {game === 'VALORANT'
            ? <ValorantLogo size={18} color={d.color} />
            : <CrossfireLogo size={18} color={d.color} />}
          <span className="text-[11px] font-black tracking-widest uppercase" style={{ color: d.color }}>{game}</span>
        </div>
        {match.isLive && (
          <div className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 rounded-full px-2.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-black text-red-400 tracking-widest">LIVE</span>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="relative z-10 text-center text-[11px] font-bold text-slate-300 tracking-wider px-4 pb-3 truncate border-b border-slate-700/40">
        {match.title}
      </div>

      {/* Content */}
      <div className="relative z-10 p-4">
        {match.type === 'match' ? (
          <div className="flex items-center justify-between gap-3">
            {/* Team 1 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-black text-emerald-400">
                {match.team1?.[0]}
              </div>
              <span className="text-xs font-bold text-white text-center leading-tight">{match.team1}</span>
              <span className="text-[9px] text-slate-500">{match.viewers} viewers</span>
            </div>
            {/* Score */}
            <div className="flex flex-col items-center gap-1">
              <div className="text-3xl font-black text-white tracking-widest">{match.score}</div>
              <div className="text-[9px] text-slate-500 italic tracking-wider">VS</div>
            </div>
            {/* Team 2 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-black text-orange-400">
                {match.team2?.[0]}
              </div>
              <span className="text-xs font-bold text-white text-center leading-tight">{match.team2}</span>
              <span className="text-[9px] text-slate-500">{match.viewers} viewers</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-2">
            {/* Bracket graphic */}
            <div className="w-full flex justify-between items-center opacity-60 px-6">
              <div className="flex flex-col gap-1.5">
                {[0,1,2,3].map(i => <div key={i} className="h-[2px] w-6 bg-slate-500 rounded" />)}
              </div>
              <div className="flex-1 h-8 border-t-2 border-b-2 border-r-2 border-slate-600 rounded-r-lg mx-3 flex items-center justify-end pr-2">
                <div className="w-3 h-[2px] rounded" style={{ backgroundColor: d.color }} />
              </div>
            </div>
            <div className="text-xs font-bold text-white text-center">{match.bracket}</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">{match.mapScore}</div>
          </div>
        )}
      </div>

      {/* Watch Live Button */}
      <div className="relative z-10 px-4 pb-4">
        <button
          onClick={() => alert(`Connecting to: ${match.title}...`)}
          className="w-full py-2 rounded-lg border border-cyan-500/40 bg-cyan-900/20 text-cyan-400 font-bold tracking-widest text-[10px] uppercase flex items-center justify-center gap-2 hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95"
        >
          <IconPlay />
          Watch Live
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   TAB: LIVE & UPCOMING
───────────────────────────────────────────── */
const LiveUpcomingTab = ({ game }) => {
  const d = DATA[game];
  const carouselRef = useRef(null);
  const scrollLeft = () => carouselRef.current?.scrollBy({ left: -360, behavior: 'smooth' });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 360, behavior: 'smooth' });

  return (
    <div className="flex flex-col gap-8">
      {/* Carousel + Rankings */}
      <div className="flex flex-col xl:flex-row gap-6">

        {/* Carousel */}
        <div className="flex-1 min-w-0 relative bg-[#0d131c] rounded-2xl border border-slate-800/50 p-4 md:p-6 group overflow-hidden">
          {/* Gradient edges */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#0d131c] to-transparent pointer-events-none z-10 rounded-l-2xl" />
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#0d131c] to-transparent pointer-events-none z-10 rounded-r-2xl" />

          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 border border-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-800 hover:scale-110 shadow-xl text-white"
          >
            <IconChevronLeft />
          </button>

          {/* Scroll track */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2 w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {d.liveMatches.map(match => (
              <MatchCard key={match.id} match={match} game={game} />
            ))}
            <div className="min-w-[20px] shrink-0" />
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/70 border border-slate-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-800 hover:scale-110 shadow-xl text-white"
          >
            <IconChevronRight />
          </button>

          {/* Scroll dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {d.liveMatches.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === 0 ? 'bg-cyan-400 w-4' : 'bg-slate-600'}`} />
            ))}
          </div>
        </div>

        {/* Rankings Sidebar */}
        <div className="w-full xl:w-[280px] shrink-0 bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl flex flex-col">
          <div className="px-5 py-4 border-b border-slate-800/50 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Global</div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Team Rankings</h2>
            </div>
            <div className="text-slate-600"><IconTrend /></div>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-1">
            {d.rankings.map((team) => (
              <div key={team.rank} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-800/50 transition-all group border border-transparent hover:border-slate-700/50">
                <span className="w-5 text-right font-bold text-slate-500 text-sm shrink-0">{team.rank}.</span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black text-white shrink-0 shadow-lg"
                  style={{ backgroundColor: team.color + '33', border: `1px solid ${team.color}55` }}
                >
                  <span style={{ color: team.color }}>{team.abbr[0]}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors truncate">{team.name}</span>
                  <span className="text-[9px] font-bold text-slate-600 tracking-widest uppercase">{game === 'VALORANT' ? 'VAL' : 'CF'}</span>
                </div>
              </div>
            ))}
            <button className="mt-3 py-2.5 px-3 rounded-xl text-[10px] font-black tracking-widest uppercase text-cyan-500 border border-cyan-900/40 bg-cyan-900/10 hover:bg-cyan-900/30 hover:text-cyan-400 transition-all group">
              View all Rankings <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Circuit Snapshot + Qualifiers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* FPS Circuit Snapshot */}
        <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
          <div className="px-5 py-4 border-b border-slate-800/50">
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">FPS Circuit</div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Snapshot: Valorant & Crossfire</h2>
          </div>
          <div className="p-5 flex flex-col gap-6">
            {/* Valorant section */}
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/40">
                <ValorantLogo size={14} color="#ff4655" />
                <span className="text-xs font-black tracking-widest uppercase text-white">VALORANT</span>
              </div>
              <div className="flex flex-col gap-2">
                {DATA.VALORANT.circuit.map((c, i) => (
                  <div key={i} className="flex flex-col gap-1 px-3 py-2.5 rounded-xl bg-slate-800/30 hover:bg-slate-800/60 border-l-[3px] border-l-transparent hover:border-l-[#ff4655] transition-all cursor-pointer group">
                    <div className="flex items-start gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${c.hot ? 'bg-orange-500' : 'bg-red-500'} animate-pulse mt-0.5 shrink-0`} />
                      <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors leading-snug">
                        <span className="text-slate-500">{c.event}</span> — <span className="text-white font-bold">{c.match}</span>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 pl-4.5">{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Crossfire section */}
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/40">
                <CrossfireLogo size={14} color="#4c7fd6" />
                <span className="text-xs font-black tracking-widest uppercase text-white">CROSSFIRE</span>
              </div>
              <div className="flex flex-col gap-2">
                {DATA.CROSSFIRE.circuit.map((c, i) => (
                  <div key={i} className="flex flex-col gap-1 px-3 py-2.5 rounded-xl bg-slate-800/30 hover:bg-slate-800/60 border-l-[3px] border-l-transparent hover:border-l-[#4c7fd6] transition-all cursor-pointer group">
                    <div className="flex items-start gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${c.hot ? 'bg-blue-400' : 'bg-slate-500'} animate-pulse mt-0.5 shrink-0`} />
                      <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors leading-snug">
                        <span className="text-slate-500">{c.event}</span> — <span className="text-white font-bold">{c.match}</span>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 pl-4.5">{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Open Qualifiers */}
        <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl relative group">
          <div className={`absolute inset-0 bg-gradient-to-br ${d.colorClass} to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none`} />
          <div className="absolute right-0 bottom-0 w-64 h-64 opacity-5 blur-3xl rounded-full pointer-events-none" style={{ backgroundColor: d.color }} />

          <div className="relative z-10 px-5 py-4 border-b border-slate-800/50 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">FPS</div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Open Qualifiers</h2>
            </div>
            {game === 'VALORANT' ? <ValorantLogo size={22} color={d.color} /> : <CrossfireLogo size={22} color={d.color} />}
          </div>

          <div className="relative z-10 p-5">
            <div className="bg-[#080d14]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/50">
                {game === 'VALORANT' ? <ValorantLogo size={20} color={d.color} /> : <CrossfireLogo size={20} color={d.color} />}
                <span className="font-black tracking-widest text-white text-sm">{game}</span>
              </div>
              <h3 className="font-black text-white text-base mb-4 leading-snug">{d.qualifier.title}</h3>
              <div className="space-y-2.5 mb-5 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/50">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Prize Pool</span>
                  <span className="font-black text-emerald-400 text-sm">{d.qualifier.prize}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Deadline</span>
                  <span className="font-black text-white text-sm">{d.qualifier.deadline}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Slots Taken</span>
                  <span className="font-black text-cyan-400 text-sm">{d.qualifier.slots}</span>
                </div>
              </div>
              <button
                onClick={() => alert(`Redirecting to ${d.qualifier.title} registration...`)}
                className="w-full py-3 rounded-lg font-black tracking-widest text-xs uppercase transition-all duration-300 active:scale-95 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
                style={{ background: `linear-gradient(135deg, ${d.color}22, #06b6d422)`, border: `1px solid ${d.color}44`, color: d.color }}
                onMouseEnter={e => { e.target.style.background = d.color; e.target.style.color = '#fff'; }}
                onMouseLeave={e => { e.target.style.background = `linear-gradient(135deg, ${d.color}22, #06b6d422)`; e.target.style.color = d.color; }}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   TAB: RESULT
───────────────────────────────────────────── */
const ResultTab = ({ game }) => {
  const d = DATA[game];
  const medalColors = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };

  return (
    <div className="flex flex-col gap-6">
      {/* Results Table + Brackets Row */}
      <div className="flex flex-col xl:flex-row gap-6">

        {/* Final Results Table */}
        <div className="flex-1 min-w-0 bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
          <div className="px-5 py-4 border-b border-slate-800/50 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <IconTrophy />
            </div>
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Tournament</div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white">Final Results & Key Stats</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="text-[9px] uppercase tracking-widest text-slate-500 border-b border-slate-800/60 bg-slate-900/40">
                  <th className="px-4 py-3">Rank</th>
                  <th className="px-4 py-3">Team</th>
                  <th className="px-4 py-3 text-center">Prize</th>
                  <th className="px-4 py-3 text-center">Record</th>
                  <th className="px-4 py-3 text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                {d.results.table.map((row) => (
                  <tr key={row.rank} className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors group">
                    <td className="px-4 py-3">
                      {row.rank <= 3 ? (
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                          style={{ backgroundColor: medalColors[row.rank] + '20', color: medalColors[row.rank], border: `1px solid ${medalColors[row.rank]}40` }}
                        >
                          {row.rank}
                        </div>
                      ) : (
                        <span className="text-slate-500 font-bold text-sm pl-2">{row.rank}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black" style={{ backgroundColor: row.color + '22', border: `1px solid ${row.color}44`, color: row.color }}>
                          {row.abbr}
                        </div>
                        <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{row.team}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-bold text-emerald-400">{row.prize}</td>
                    <td className="px-4 py-3 text-center text-sm font-mono text-slate-400">{row.record}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-black text-white bg-slate-800/60 px-2.5 py-0.5 rounded-full">{row.pts}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bracket Results Sidebar */}
        <div className="w-full xl:w-[300px] shrink-0 bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl flex flex-col">
          <div className="px-5 py-4 border-b border-slate-800/50">
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Playoff</div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Bracket Results</h2>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
            {d.results.brackets.map((b, i) => (
              <div key={i} className="bg-slate-900/60 rounded-xl border border-slate-800/50 p-3.5 hover:border-slate-700/70 transition-colors">
                <div className="flex justify-between items-center mb-2.5 text-[9px] uppercase tracking-widest font-bold text-slate-500">
                  <span>{b.round}</span>
                  <span className="text-cyan-600">{b.bestOf}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-slate-400">
                      {b.team1[0]}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 text-center leading-tight">{b.team1}</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-black text-white">{b.score1}</span>
                      <span className="text-slate-600 font-bold">–</span>
                      <span className="text-xl font-black text-slate-400">{b.score2}</span>
                    </div>
                    <span className="text-[8px] text-slate-600 font-mono">{b.map}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-slate-400">
                      {b.team2[0]}
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 text-center leading-tight">{b.team2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tournament Match Timeline */}
      <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800/50 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">Match History</div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white">Tournament Match Timeline</h2>
          </div>
          <button
            onClick={() => alert('Opening tournament replay...')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-black tracking-widest uppercase transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
            style={{ borderColor: '#06b6d480', color: '#06b6d4', backgroundColor: '#06b6d415' }}
          >
            <IconReplay />
            Tournament Replay
          </button>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* VCT Column */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ValorantLogo size={14} color="#ff4655" />
                <span className="text-xs font-black tracking-widest uppercase text-white">VCT</span>
              </div>
              <div className="flex flex-col gap-2">
                {d.results.timeline.filter(t => t.league === 'VCT').map((t, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-900/50 rounded-xl px-4 py-3 border border-slate-800/40 hover:border-slate-700/50 transition-colors group cursor-pointer">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{t.stage}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center text-[9px] font-black text-slate-400">{t.team1[0]}</div>
                        <span className="text-sm font-black text-white">{t.score}</span>
                        <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center text-[9px] font-black text-slate-400">{t.team2[0]}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-300">{t.team1}</div>
                      <div className="text-[9px] text-slate-600">vs {t.team2}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* CFPL Column */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CrossfireLogo size={14} color="#4c7fd6" />
                <span className="text-xs font-black tracking-widest uppercase text-white">CFPL</span>
              </div>
              <div className="flex flex-col gap-2">
                {d.results.timeline.filter(t => t.league === 'CFPL').map((t, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-900/50 rounded-xl px-4 py-3 border border-slate-800/40 hover:border-slate-700/50 transition-colors group cursor-pointer">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">{t.stage}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center text-[9px] font-black text-slate-400">{t.team1[0]}</div>
                        <span className="text-sm font-black text-white">{t.score}</span>
                        <div className="w-7 h-7 rounded bg-slate-800 flex items-center justify-center text-[9px] font-black text-slate-400">{t.team2[0]}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-300">{t.team1}</div>
                      <div className="text-[9px] text-slate-600">vs {t.team2}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MINI CALENDAR COMPONENT
───────────────────────────────────────────── */
const MiniCalendar = ({ highlightDays = [9, 14, 16, 23, 26, 29, 30] }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  // July 2026: starts on Wednesday (offset 2)
  const offset = 2;
  const totalDays = 31;
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const today = 9;
  return (
    <div className="select-none">
      {/* Month header */}
      <div className="flex items-center justify-between mb-4">
        <button className="text-slate-500 hover:text-white transition-colors p-1 rounded"><IconChevronLeft /></button>
        <span className="text-sm font-black uppercase tracking-widest text-white">July 2026</span>
        <button className="text-slate-500 hover:text-white transition-colors p-1 rounded"><IconChevronRight /></button>
      </div>
      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((d, i) => (
          <div key={i} className="text-[9px] font-black text-slate-600 uppercase tracking-wider text-center">{d}</div>
        ))}
      </div>
      {/* Date grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const isToday = day === today;
          const isHighlighted = highlightDays.includes(day);
          const isSelected = selectedDay === day;
          return (
            <button
              key={i}
              onClick={() => setSelectedDay(day === selectedDay ? null : day)}
              className={`h-7 w-full rounded-lg text-[11px] font-bold transition-all flex items-center justify-center
                ${isSelected ? 'bg-cyan-500 text-white scale-110 shadow-[0_0_10px_rgba(6,182,212,0.5)]' :
                  isToday ? 'bg-blue-600 text-white ring-2 ring-blue-400/50' :
                  isHighlighted ? 'bg-pink-600/80 text-white hover:bg-pink-500' :
                  'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   TAB: SCHEDULE
───────────────────────────────────────────── */
const ScheduleTab = ({ game }) => {
  const d = DATA[game];
  const [activeGame, setActiveGame] = useState(game);
  const [filterByGame, setFilterByGame] = useState(true);
  const [reminders, setReminders] = useState({});

  const scheduleData = DATA[activeGame].schedule;
  const toggleReminder = (id) => setReminders(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left: Calendar + Filter */}
      <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
        {/* Calendar card */}
        <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-slate-400"><IconCalendar /></div>
            <span className="text-sm font-black uppercase tracking-widest text-white">Schedule</span>
          </div>
          <MiniCalendar />
          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-slate-800/50 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-600" />
              <span className="text-[9px] text-slate-500">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-pink-600" />
              <span className="text-[9px] text-slate-500">Match day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-cyan-500" />
              <span className="text-[9px] text-slate-500">Selected</span>
            </div>
          </div>
        </div>

        {/* Filter by game toggle */}
        <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-widest text-white">Filter by Game</span>
            <button
              onClick={() => setFilterByGame(!filterByGame)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 ${filterByGame ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-700'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${filterByGame ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          {/* Game selector buttons */}
          <div className="flex flex-col gap-2">
            {['VALORANT', 'CROSSFIRE'].map(g => (
              <button
                key={g}
                onClick={() => setActiveGame(g)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                  activeGame === g
                    ? 'bg-slate-800/80 border-slate-600 text-white'
                    : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full ${activeGame === g ? 'animate-pulse' : ''}`} style={{ backgroundColor: DATA[g].color }} />
                {g}
                {activeGame === g && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Schedule List */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Game header */}
        <div className="flex items-center gap-4">
          {activeGame === 'VALORANT'
            ? <ValorantLogo size={28} color={DATA[activeGame].color} />
            : <CrossfireLogo size={28} color={DATA[activeGame].color} />}
          <div className="pb-1 border-b-2 border-slate-700/50 flex-1">
            <span className="text-lg font-black uppercase tracking-widest" style={{ color: DATA[activeGame].color }}>{activeGame}</span>
          </div>
        </div>

        {/* Match schedule items */}
        <div className="flex flex-col gap-3">
          {scheduleData.map((s) => {
            const reminded = reminders[s.id] !== undefined ? reminders[s.id] : s.reminded;
            return (
              <div key={s.id} className="bg-[#0d131c] rounded-2xl border border-slate-800/50 hover:border-slate-700/70 transition-all duration-300 p-4 flex items-center gap-4 group">
                {/* Team badge */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black shrink-0 shadow-lg"
                  style={{ backgroundColor: s.color + '22', border: `2px solid ${s.color}55`, color: s.color }}
                >
                  {s.abbr}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white group-hover:text-slate-100 truncate">{s.team}</div>
                  <div className="text-[9px] uppercase tracking-widest text-slate-600 font-bold">
                    {activeGame === 'VALORANT' ? 'VCT' : 'CFPL'} — Scheduled Match
                  </div>
                </div>

                {/* Time */}
                <div className="text-right shrink-0 hidden sm:block">
                  <div className="text-sm font-black text-white">{s.time}</div>
                  <div className="text-[9px] text-slate-500 font-mono">{s.timezone}</div>
                </div>

                {/* Reminder button */}
                <button
                  onClick={() => toggleReminder(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-black tracking-wider uppercase transition-all active:scale-95 shrink-0 ${
                    reminded
                      ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-400'
                      : 'bg-red-600 text-white hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]'
                  }`}
                >
                  <IconBell />
                  {reminded ? 'Reminded' : 'Set Reminder'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Empty placeholder if no matches */}
        {scheduleData.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-20 text-slate-600 text-sm font-bold tracking-widest uppercase">
            No scheduled matches
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN TOURNAMENT COMPONENT
───────────────────────────────────────────── */
const Tournament = () => {
  const [activeGame, setActiveGame] = useState('VALORANT');
  const [activeTab, setActiveTab] = useState('LIVE & UPCOMING');
  const tabs = ['LIVE & UPCOMING', 'RESULT', 'SCHEDULE'];

  const renderTab = () => {
    switch (activeTab) {
      case 'LIVE & UPCOMING': return <LiveUpcomingTab game={activeGame} />;
      case 'RESULT':          return <ResultTab game={activeGame} />;
      case 'SCHEDULE':        return <ScheduleTab game={activeGame} />;
      default:                return null;
    }
  };

  return (
    <div className="flex-1 bg-[#090e14] text-white flex flex-col h-full overflow-hidden">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>

      {/* ── Sticky Top Bar ── */}
      <div className="shrink-0 px-6 md:px-8 pt-6 pb-0 bg-[#090e14]">

        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]" style={{ background: 'linear-gradient(180deg, #00ffcc, #3b82f6)' }} />
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-0.5">Esport League</div>
              <h1 className="text-xl md:text-2xl font-black tracking-[0.15em] uppercase text-white">Tournaments</h1>
            </div>
          </div>

          {/* Game selector */}
          <div className="flex items-center bg-[#0d131c] rounded-xl border border-slate-800/60 p-1 gap-1">
            {['VALORANT', 'CROSSFIRE'].map(g => (
              <button
                key={g}
                onClick={() => setActiveGame(g)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${
                  activeGame === g
                    ? 'bg-slate-700/70 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {g === 'VALORANT' ? <ValorantLogo size={12} color={activeGame === g ? '#ff4655' : '#64748b'} /> : <CrossfireLogo size={12} color={activeGame === g ? '#4c7fd6' : '#64748b'} />}
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-6 border-b border-slate-800/60">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-4 text-[11px] font-black tracking-widest uppercase whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-sm bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-8 py-6">
        <div className="max-w-[1400px] mx-auto">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default Tournament;