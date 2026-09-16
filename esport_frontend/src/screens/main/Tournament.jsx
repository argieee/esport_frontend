import React, { useState, useRef, useEffect, useMemo } from "react";

function useStickyState(defaultValue, key) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.sessionStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const IconChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);
const IconChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);
const IconPlay = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);
const IconTrophy = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 21h8m-4-4v4M7 3H4a1 1 0 00-1 1v3a4 4 0 004 4h.5M17 3h3a1 1 0 011 1v3a4 4 0 01-4 4h-.5M7 3h10v5a5 5 0 01-10 0V3z"
    />
  </svg>
);
const IconCalendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const IconBell = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
    />
  </svg>
);
const IconTrend = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);
const IconReplay = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);
const DATA = {
  VALORANT: {
    color: "#ff4655",
    colorClass: "from-[#ff4655]/20",
    borderClass: "border-[#ff4655]/40",
    textClass: "text-[#ff4655]",
    liveMatches: [
      {
        id: 1,
        title: "VCT Pacific — Grand Finals",
        team1: "LOUD",
        team2: "Fnatic",
        score: "2–1",
        viewers: "112K",
        isLive: true,
        type: "match",
      },
      {
        id: 2,
        title: "VCT Challengers",
        team1: "Sentinels",
        team2: "100 Thieves",
        score: "0–0",
        viewers: "95K",
        isLive: true,
        type: "match",
      },
      {
        id: 3,
        title: "VCT Americas — Semi Finals",
        team1: "NRG",
        team2: "Cloud9",
        score: "1–1",
        viewers: "85K",
        isLive: true,
        type: "match",
      },
      {
        id: 4,
        title: "VCT EMEA — Group Stage",
        team1: "NAVI",
        team2: "Team Liquid",
        score: "0–2",
        viewers: "70K",
        isLive: true,
        type: "match",
      },
      {
        id: 5,
        title: "VCT Pacific",
        team1: "Paper Rex",
        team2: "ZETA DIVISION",
        score: "",
        isLive: false,
        type: "match",
      },
      {
        id: 6,
        title: "VCT Americas",
        team1: "Leviatán",
        team2: "KRÜ Esports",
        score: "",
        isLive: false,
        type: "match",
      },
    ],
    rankings: [
      { rank: 1, name: "Fnatic", abbr: "FNC", color: "#f97316" },
      { rank: 2, name: "Team Liquid", abbr: "TL", color: "#3b82f6" },
      { rank: 3, name: "LOUD", abbr: "LDN", color: "#22c55e" },
      { rank: 4, name: "DRX", abbr: "DRX", color: "#60a5fa" },
      { rank: 5, name: "Imperial", abbr: "IMP", color: "#10b981" },
      { rank: 6, name: "Paper Rex", abbr: "PRX", color: "#e11d48" },
      { rank: 7, name: "Sentinels", abbr: "SEN", color: "#dc2626" },
      { rank: 8, name: "Cloud9", abbr: "C9", color: "#0ea5e9" },
      { rank: 9, name: "NRG", abbr: "NRG", color: "#000000" },
      { rank: 10, name: "NAVI", abbr: "NAV", color: "#eab308" },
      { rank: 11, name: "ZETA DIVISION", abbr: "ZET", color: "#737373" },
      { rank: 12, name: "100 Thieves", abbr: "100T", color: "#ef4444" },
    ],
    circuit: [
      {
        event: "VCT EMEA",
        match: "FNATIC vs. NAVI",
        time: "In 1h 30m",
        hot: true,
      },
      {
        event: "VCT Americas",
        match: "LOUD vs. Cloud9",
        time: "Starts tomorrow",
        hot: false,
      },
    ],
    qualifier: {
      title: "Valorant Open Qualifier: 5v5 Tactical",
      prize: "$5,000",
      deadline: "June 15th",
      slots: "24 / 64",
    },
    results: {
      table: [
        {
          rank: 1,
          team: "Team Liquid",
          abbr: "TL",
          color: "#3b82f6",
          prize: "$5,000",
          record: "15-22",
          pts: 25,
        },
        {
          rank: 2,
          team: "ONIC",
          abbr: "ON",
          color: "#a855f7",
          prize: "$2,500",
          record: "15-17",
          pts: 20,
        },
        {
          rank: 3,
          team: "Blacklist",
          abbr: "BL",
          color: "#f59e0b",
          prize: "$1,000",
          record: "10-10",
          pts: 20,
        },
        {
          rank: 4,
          team: "ONIEG",
          abbr: "OG",
          color: "#ef4444",
          prize: "—",
          record: "9-9",
          pts: 13,
        },
        {
          rank: 5,
          team: "Team Lavar",
          abbr: "LV",
          color: "#64748b",
          prize: "—",
          record: "6-8",
          pts: 13,
        },
        {
          rank: 6,
          team: "Lmipreot",
          abbr: "LP",
          color: "#06b6d4",
          prize: "—",
          record: "6-5",
          pts: 10,
        },
        {
          rank: 7,
          team: "Team Aqua",
          abbr: "AQ",
          color: "#0ea5e9",
          prize: "—",
          record: "3-3",
          pts: 9,
        },
      ],
      brackets: [
        {
          round: "Semi-Finals",
          bestOf: "Best of 3",
          team1: "Team Liquid",
          team2: "Fnatic",
          score1: 3,
          score2: 1,
          map: "Map 2: 7-9",
        },
        {
          round: "Semi-Finals",
          bestOf: "Best of 5",
          team1: "Fnatic",
          team2: "LOUD",
          score1: 3,
          score2: 0,
          map: "Map 2: 7-9",
        },
        {
          round: "Semi-Finals",
          bestOf: "Best of 5",
          team1: "Fnatic",
          team2: "NRG",
          score1: 3,
          score2: 0,
          map: "Map 2: 7-9",
        },
      ],
      timeline: [
        {
          league: "VCT",
          stage: "Final",
          team1: "Ascent",
          team2: "Fnatic",
          score: "3–1",
        },
        {
          league: "CFPL",
          stage: "Final",
          team1: "AG",
          team2: "Black Widow",
          score: "10–0",
        },
        {
          league: "VCT",
          stage: "Semi-Final",
          team1: "NRG",
          team2: "Cloud9",
          score: "2–1",
        },
        {
          league: "CFPL",
          stage: "Quarter-Final",
          team1: "Q9",
          team2: "BD",
          score: "3–2",
        },
      ],
    },
    schedule: [
      {
        id: 1,
        team: "Fnatic",
        abbr: "FNC",
        color: "#f97316",
        time: "13:00",
        timezone: "19:00 PST",
        reminded: false,
      },
      {
        id: 2,
        team: "Team Liquid",
        abbr: "TL",
        color: "#3b82f6",
        time: "23:00",
        timezone: "19:00 PST",
        reminded: false,
      },
      {
        id: 3,
        team: "AG",
        abbr: "AG",
        color: "#22c55e",
        time: "24:00",
        timezone: "19:00 PST",
        reminded: false,
      },
      {
        id: 4,
        team: "AG",
        abbr: "AG",
        color: "#22c55e",
        time: "28:00",
        timezone: "19:00 PST",
        reminded: true,
      },
    ],
  },
  CROSSFIRE: {
    color: "#4c7fd6",
    colorClass: "from-[#4c7fd6]/20",
    borderClass: "border-[#4c7fd6]/40",
    textClass: "text-[#4c7fd6]",
    liveMatches: [
      {
        id: 1,
        title: "CFS Grand Finals",
        team1: "All Gamers",
        team2: "Baisha",
        score: "3–0",
        viewers: "150K",
        isLive: true,
        type: "match",
      },
      {
        id: 2,
        title: "CFPL Summer",
        team1: "Q9",
        team2: "eStar",
        score: "1–2",
        viewers: "65K",
        isLive: true,
        type: "match",
      },
      {
        id: 3,
        title: "CFS Invitational",
        team1: "Black Dragons",
        team2: "Imperial",
        score: "1–1",
        viewers: "45K",
        isLive: true,
        type: "match",
      },
      {
        id: 4,
        title: "CFPL Autumn",
        team1: "WE",
        team2: "R.LGD",
        score: "",
        isLive: false,
        type: "match",
      },
      {
        id: 5,
        title: "CFS Qualifier",
        team1: "Vincit",
        team2: "Anubis",
        score: "",
        isLive: false,
        type: "match",
      },
    ],
    rankings: [
      { rank: 1, name: "All Gamers", abbr: "AG", color: "#ef4444" },
      { rank: 2, name: "Baisha Gaming", abbr: "BS", color: "#eab308" },
      { rank: 3, name: "Q9", abbr: "Q9", color: "#3b82f6" },
      { rank: 4, name: "Imperial", abbr: "IMP", color: "#10b981" },
      { rank: 5, name: "Black Dragons", abbr: "BD", color: "#6b7280" },
      { rank: 6, name: "eStar", abbr: "EST", color: "#f97316" },
      { rank: 7, name: "R.LGD", abbr: "LGD", color: "#dc2626" },
      { rank: 8, name: "Team WE", abbr: "WE", color: "#ef4444" },
      { rank: 9, name: "Vincit Gaming", abbr: "VIN", color: "#8b5cf6" },
      { rank: 10, name: "Anubis Gaming", abbr: "ANU", color: "#d946ef" },
      { rank: 11, name: "Extenzy", abbr: "EXT", color: "#14b8a6" },
      { rank: 12, name: "Lazarus", abbr: "LZR", color: "#06b6d4" },
    ],
    circuit: [
      {
        event: "CFPL",
        match: "AG vs. BaiSha",
        time: "Starts tomorrow",
        hot: true,
      },
      {
        event: "CFS Invitational",
        match: "Q9 vs. BD",
        time: "In 2 days",
        hot: false,
      },
    ],
    qualifier: {
      title: "Crossfire Open Qualifier: 5v5 Tactical",
      prize: "$10,000",
      deadline: "July 1st",
      slots: "18 / 64",
    },
    results: {
      table: [
        {
          rank: 1,
          team: "All Gamers",
          abbr: "AG",
          color: "#ef4444",
          prize: "$10,000",
          record: "18-5",
          pts: 36,
        },
        {
          rank: 2,
          team: "Baisha Gaming",
          abbr: "BS",
          color: "#eab308",
          prize: "$5,000",
          record: "15-8",
          pts: 30,
        },
        {
          rank: 3,
          team: "Q9",
          abbr: "Q9",
          color: "#3b82f6",
          prize: "$2,500",
          record: "12-11",
          pts: 24,
        },
        {
          rank: 4,
          team: "Imperial",
          abbr: "IMP",
          color: "#10b981",
          prize: "—",
          record: "10-13",
          pts: 20,
        },
        {
          rank: 5,
          team: "Black Dragons",
          abbr: "BD",
          color: "#6b7280",
          prize: "—",
          record: "7-16",
          pts: 14,
        },
      ],
      brackets: [
        {
          round: "Grand Finals",
          bestOf: "Best of 5",
          team1: "All Gamers",
          team2: "Baisha",
          score1: 3,
          score2: 2,
          map: "Map 5: 16-14",
        },
        {
          round: "Semi-Finals",
          bestOf: "Best of 3",
          team1: "Q9",
          team2: "Baisha",
          score1: 1,
          score2: 2,
          map: "Map 3: 12-16",
        },
      ],
      timeline: [
        {
          league: "CFPL",
          stage: "Grand Final",
          team1: "AG",
          team2: "Baisha",
          score: "3–2",
        },
        {
          league: "CFS",
          stage: "Semi-Final",
          team1: "Q9",
          team2: "BD",
          score: "2–0",
        },
      ],
    },
    schedule: [
      {
        id: 1,
        team: "All Gamers",
        abbr: "AG",
        color: "#ef4444",
        time: "14:00",
        timezone: "20:00 PST",
        reminded: false,
      },
      {
        id: 2,
        team: "Baisha Gaming",
        abbr: "BS",
        color: "#eab308",
        time: "17:00",
        timezone: "23:00 PST",
        reminded: false,
      },
      {
        id: 3,
        team: "Q9",
        abbr: "Q9",
        color: "#3b82f6",
        time: "20:00",
        timezone: "02:00 PST",
        reminded: true,
      },
    ],
  },
};
const ValorantLogo = ({ size = 20, color = "#ff4655" }) => (
  <svg
    viewBox="0 0 100 100"
    style={{ width: size, height: size, fill: color }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M99 0L35.2 61.2 53.6 100zM0 0l31.2 65.6L19 100 0 60z" />
  </svg>
);
const CrossfireLogo = ({ size = 20, color = "#4c7fd6" }) => (
  <svg
    viewBox="0 0 100 100"
    style={{ width: size, height: size }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke={color}
      strokeWidth="14"
      fill="none"
    />
    <circle cx="50" cy="50" r="10" fill={color} />
    <line x1="50" y1="0" x2="50" y2="100" stroke={color} strokeWidth="8" />
    <line x1="0" y1="50" x2="100" y2="50" stroke={color} strokeWidth="8" />
  </svg>
);
const MatchCard = ({ match, showCountdown, game, index = 0 }) => {
  const isLive = match.isLive;
  return (
    <div 
      className="match-card snap-center animate-slide-in-right shrink-0 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          Day {match.day || 2}
        </span>
        {isLive ? (
          <div className="live-indicator">
            <span className="live-dot"></span> LIVE
          </div>
        ) : showCountdown ? (
          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-slate-200 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-inner group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {match.countdown || "2h 13m"}
          </div>
        ) : null}
      </div>

      {/* Team 1 Row */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          {match.team1Logo ? (
            <img src={match.team1Logo} alt={match.team1} className="team-logo" />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-full font-bold text-white text-xs shadow-md">{match.team1?.[0]}</div>
          )}
          <span className="text-white font-semibold truncate max-w-[120px]">{match.team1}</span>
        </div>
        <span className="text-xl text-white font-bold">{match.score?.split("–")[0]}</span>
      </div>

      {/* VS Divider */}
      <div className="text-center text-[10px] text-slate-500 mb-3 font-semibold relative flex items-center justify-center">
        <div className="absolute top-1/2 left-0 w-full h-px bg-slate-700/50 z-0"></div>
        <span className="bg-[#182029] px-2 relative z-10">VS</span>
      </div>

      {/* Team 2 Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {match.team2Logo ? (
            <img src={match.team2Logo} alt={match.team2} className="team-logo" />
          ) : (
             <div className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-full font-bold text-white text-xs shadow-md">{match.team2?.[0]}</div>
          )}
          <span className="text-white font-semibold truncate max-w-[120px]">{match.team2}</span>
        </div>
        <span className="text-xl text-white font-bold">{match.score?.split("–")[1]}</span>
      </div>
    </div>
  );
};
const LiveUpcomingTab = ({ game }) => {
  const d = DATA[game];
  const [showCountdown, setShowCountdown] = useState(true);
  const [showAllRankings, setShowAllRankings] = useState(false);
  const scrollRef = useRef(null);
  
  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' });
    }
  };
  
  // Parse qualifier slots for progress bar
  const slotsMatch = d.qualifier.slots.match(/(\d+)\s*\/\s*(\d+)/);
  const slotsFilled = slotsMatch ? parseInt(slotsMatch[1]) : 0;
  const slotsTotal = slotsMatch ? parseInt(slotsMatch[2]) : 64;
  const slotsPercent = Math.round((slotsFilled / slotsTotal) * 100);
  
  return (
    <div className="flex flex-col gap-8">
      {/* Upcoming Matches Section */}
      <section className="relative bg-[#0d131c] rounded-3xl border border-slate-700/40 shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden animate-fade-in-up w-full" style={{ padding: '24px 32px', boxSizing: 'border-box', marginBottom: '32px' }}>
        {/* Abstract Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] blur-[80px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" style={{ backgroundColor: `${d.color}15` }} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-5 mb-5">
            <div />
            <div className="flex items-center gap-4">
              {/* Scroll arrows */}
              <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => scroll(-1)} 
                  className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-500 transition-all active:scale-90"
                >
                  <IconChevronLeft />
                </button>
                <button 
                  onClick={() => scroll(1)} 
                  className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-500 transition-all active:scale-90"
                >
                  <IconChevronRight />
                </button>
              </div>
              <div className="flex items-center gap-3 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-800">
                <button 
                  onClick={() => setShowCountdown(!showCountdown)}
                  className={`w-10 h-5 rounded-full relative transition-colors duration-300 shadow-inner ${showCountdown ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-slate-700'}`}
                >
                  <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-transform duration-300 ${showCountdown ? 'translate-x-[22px]' : 'translate-x-[3px]'}`} />
                </button>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Countdown</span>
              </div>
            </div>
          </div>
        <div className="relative z-10 w-full pt-4">
          <div 
            ref={scrollRef}
            className="match-scroll-container snap-x snap-mandatory items-start w-full pb-4" 
          >
            {d.liveMatches.map((match, idx) => (
              <MatchCard 
                key={match.id || idx} 
                match={{...match, countdown: `${idx + 1}d ${idx + 2}h 13m`, day: idx + 2}} 
                showCountdown={showCountdown} 
                game={game}
                index={idx}
              />
            ))}
            <div className="min-w-[20px] shrink-0" />
          </div>
        </div>
        </div>
      </section>
      
      {/* Team Rankings Section */}
      <section className="w-full flex flex-col gap-6">
        <div className="bg-[#0d131c] light:bg-white rounded-3xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm flex flex-col animate-fade-in-up stagger-1 w-full" style={{ padding: '24px 32px', boxSizing: 'border-box', marginBottom: '32px' }}>
          <div className="pb-5 border-b border-slate-800/50 light:border-slate-200 flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest text-white light:text-slate-900 flex items-center gap-3">
                <IconTrophy /> Team Rankings
              </h2>
            </div>
            <div className="text-slate-600 bg-slate-800/40 p-2 rounded-xl">
              <IconTrend />
            </div>
          </div>
          <div className="flex-1 overflow-auto max-h-[500px]" style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}>
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-[#1a2332] text-white sticky top-0 z-10 shadow-md">
                <tr>
                  <th className="py-4 px-6 text-xs font-black tracking-widest uppercase text-center w-20">Pos</th>
                  <th className="py-4 px-6 text-xs font-black tracking-widest uppercase">Team</th>
                  <th className="py-4 px-4 text-xs font-black tracking-widest uppercase text-center w-16">W</th>
                  <th className="py-4 px-4 text-xs font-black tracking-widest uppercase text-center w-16">L</th>
                  <th className="py-4 px-4 text-xs font-black tracking-widest uppercase text-center w-16">D</th>
                  <th className="py-4 px-4 text-xs font-black tracking-widest uppercase text-center w-16">Pts</th>
                  <th className="py-4 px-6 text-xs font-black tracking-widest uppercase text-center w-24">Form</th>
                </tr>
              </thead>
              <tbody>
                {d.rankings.map((team, idx) => {
                  const isGold = team.rank === 1;
                  const isSilver = team.rank === 2;
                  const isBronze = team.rank === 3;
                  
                  // Dark theme compatible striping and medal colors
                  const bgClass = isGold ? 'bg-yellow-500/10' : 
                                  isSilver ? 'bg-slate-300/10' : 
                                  isBronze ? 'bg-orange-500/10' : 
                                  idx % 2 === 0 ? 'bg-slate-800/20' : 'bg-transparent';
                                  
                  const textColor = isGold ? 'text-yellow-500' : 
                                    isSilver ? 'text-slate-300' : 
                                    isBronze ? 'text-orange-400' : 
                                    'text-slate-300';
                                    
                  const borderColor = isGold ? 'border-yellow-500/20' : 
                                      isSilver ? 'border-slate-300/20' : 
                                      isBronze ? 'border-orange-500/20' : 
                                      'border-slate-800/50';

                  return (
                    <tr 
                      key={team.rank}
                      className={`${bgClass} ${textColor} hover:bg-slate-800/40 transition-all duration-200 border-b ${borderColor} last:border-0`}
                    >
                      <td className={`py-3 px-6 text-center font-black text-sm border-r ${borderColor} bg-black/20`}>
                        {team.rank}
                      </td>
                      <td className="py-3 px-6 font-black text-sm tracking-wide uppercase">
                        {team.name}
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-sm">{20 - Math.floor(idx/3)}</td>
                      <td className="py-3 px-4 text-center font-bold text-sm">{5 + Math.floor(idx/4)}</td>
                      <td className="py-3 px-4 text-center font-bold text-sm">2</td>
                      <td className="py-3 px-4 text-center font-black text-sm">{63 - idx}</td>
                      <td className={`py-3 px-6 text-center text-sm font-black bg-black/20 border-l ${borderColor}`}>
                        {idx % 4 !== 3 ? (
                          <span className="text-emerald-500">▲</span>
                        ) : (
                          <span className="text-red-500">▼</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
const ResultTab = ({ game, globalTournament }) => {
  const d = DATA[game];
  const medalColors = { 1: "#FFD700", 2: "#C0C0C0", 3: "#CD7F32" };
  const [liveBrackets, setLiveBrackets] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:5000/api/brackets?tournament=${globalTournament?.name || "Default"}&game_title=${game}`,
    )
      .then((res) => res.json())
      .then((data) =>
        setLiveBrackets(
          data.map((b) => ({
            round: b.round,
            bestOf: b.best_of,
            team1: b.team_a?.team_name || "TBD",
            team2: b.team_b?.team_name || "TBD",
            score1: b.score_a,
            score2: b.score_b,
            map: b.map_info,
            team1Logo: b.team_a?.logo_url,
            team2Logo: b.team_b?.logo_url,
          })),
        ),
      )
      .catch(console.error);
  }, [game, globalTournament?.name]);

  // Dynamically group matches by their league property
  const groupedTimeline = (d.results?.timeline || []).reduce((acc, match) => {
    const league = match.league || 'OTHER';
    if (!acc[league]) {
      acc[league] = [];
    }
    acc[league].push(match);
    return acc;
  }, {});

  return (
    <div className="dashboard-wrapper">
      
      {/* Top Left: Leaderboard Panel */}
      <div className="glass-panel">
        <h2 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
          <span className="text-yellow-500"><IconTrophy /></span> FINAL RESULTS & KEY STATS
        </h2>
        
        <table className="stats-table">
          <thead>
            <tr>
              <th className="text-left w-16">RANK</th>
              <th className="text-left">TEAM</th>
              <th className="text-center">PRIZE</th>
              <th className="text-center">RECORD</th>
              <th className="text-center">PTS</th>
            </tr>
          </thead>
          <tbody>
            {d.results.table.map((row) => {
              const rank = row.rank;
              const rankClass = rank <= 3 ? `rank-${rank}` : 'text-gray-400';
              
              return (
                <tr key={row.rank} className="rounded-lg">
                  <td>
                    <div className="flex items-center gap-2">
                      <span className={`rank-pill ${rankClass}`}>{rank}</span>
                      {rank === 1 && <span className="text-yellow-500 text-sm">🏆</span>}
                      {rank === 2 && <span className="text-gray-300 text-sm">🥈</span>}
                      {rank === 3 && <span className="text-orange-400 text-sm">🥉</span>}
                    </div>
                  </td>
                  <td className="text-white font-semibold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[10px] shadow-sm">
                      {row.abbr}
                    </div>
                    {row.team}
                  </td>
                  <td className="text-center text-emerald-400 font-mono">
                    {row.prize}
                  </td>
                  <td className="text-center text-slate-300 font-mono">{row.record}</td>
                  <td className="text-center text-white font-bold">{row.pts}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Top Right: Bracket Visualization */}
      <div className="bracket-panel">
        <h2 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
          <span className="text-cyan-400"><IconTrend /></span> BRACKET RESULTS
        </h2>
        {liveBrackets.length > 0 ? (
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-4">
             {liveBrackets.map((b, i) => (
                <div
                  key={i}
                  className="bg-slate-900/40 rounded-xl border border-slate-800/50 p-4 transition-colors shadow-sm hover:border-slate-700/80"
                >
                  <div className="flex justify-between items-center mb-2.5 text-[9px] uppercase tracking-widest font-bold text-slate-400">
                    <span>{b.round}</span>
                    <span className="text-cyan-500">{b.bestOf}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-inner overflow-hidden">
                        {b.team1Logo ? <img src={b.team1Logo} className="w-full h-full object-contain"/> : b.team1[0]}
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 text-center leading-tight truncate w-full">{b.team1}</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-lg font-black text-white">{b.score1}</span>
                        <span className="text-slate-600 font-bold">–</span>
                        <span className="text-lg font-black text-slate-400">{b.score2}</span>
                      </div>
                      <span className="text-[8px] text-slate-500 font-mono">{b.map}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-inner overflow-hidden">
                        {b.team2Logo ? <img src={b.team2Logo} className="w-full h-full object-contain"/> : b.team2[0]}
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 text-center leading-tight truncate w-full">{b.team2}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="empty-bracket-placeholder">
            <span className="text-sm tracking-wider uppercase">
              Bracket data pending
            </span>
          </div>
        )}
      </div>

      {/* Bottom Full Width: Timeline Section */}
      <div className="glass-panel w-full" style={{ gridColumn: 'span 2' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: "40px" }}>
          <h2 className="text-white font-bold text-lg flex items-center gap-2">
            <span className="text-purple-400">🗓️</span> TOURNAMENT MATCH TIMELINE
          </h2>
          <button className="btn-glow-cyan flex items-center gap-2 text-[10px] uppercase tracking-widest">
            <span className="mr-1">🔄</span> TOURNAMENT REPLAY
          </button>
        </div>

        {/* Dynamically render a separate row for each league */}
        <div className="flex flex-col gap-8">
          {Object.entries(groupedTimeline).map(([league, matches]) => (
            <div key={league} className="timeline-category">
              {/* League Header */}
              <div className="flex items-center gap-3 mb-3">
                <span className={`league-indicator indicator-${league.toLowerCase()}`}></span>
                <h3 className="text-sm text-slate-300 font-bold uppercase tracking-widest">
                  {league} Timeline
                </h3>
              </div>

              {/* Independent Horizontal Scroll */}
              <div className="timeline-scroll-row">
                {matches.map((match, idx) => (
                  <div key={idx} className="timeline-card">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-2 block">
                      {match.stage}
                    </span>
                    <div className="flex items-center gap-4 text-white font-bold text-xl">
                      <div className="team-circle">{match.team1[0]}</div>
                      <span className="text-cyan-400">{match.score}</span>
                      <div className="team-circle">{match.team2[0]}</div>
                    </div>
                    <div className="text-right text-[10px] text-slate-500 mt-2 flex flex-col items-end">
                      <span>{match.team1} vs {match.team2}</span>
                      <span>Map: {match.map}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
const MiniCalendar = ({ highlightDays = [], selectedDay, onSelectDay }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // Default to July 2026
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();
  
  let startDay = new Date(year, month, 1).getDay();
  startDay = startDay === 0 ? 6 : startDay - 1; // Make Monday first day
  
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Using 9 as static today for mockup purposes when in July 2026
  const today = month === 6 && year === 2026 ? 9 : null; 

  return (
    <div className="calendar-card">
      <div className="calendar-header-wrapper">
        {/* Subtitle */}
        <div className="calendar-subtitle">
          <IconCalendar /> SCHEDULE
        </div>

        {/* Month Navigation */}
        <div className="calendar-month-nav">
          <button onClick={prevMonth} className="nav-arrow">
            <IconChevronLeft />
          </button>
          <h2 className="calendar-month-title">{monthName} {year}</h2>
          <button onClick={nextMonth} className="nav-arrow">
            <IconChevronRight />
          </button>
        </div>

        {/* Days of the Week */}
        <div className="calendar-days-row">
          {daysOfWeek.map((day, idx) => (
            <span key={idx}>{day}</span>
          ))}
        </div>
      </div>

      {/* Dates Grid */}
      <div className="calendar-grid">
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} className="date-cell empty"></div>;
          
          const isSelected = date === selectedDay;
          const isToday = date === today;
          const isMatchDay = highlightDays.includes(date);

          return (
            <div 
              key={idx} 
              onClick={() => onSelectDay(date === selectedDay ? null : date)}
              className={`date-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
            >
              {date}
              {isMatchDay && <div className="match-dot"></div>}
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-700/50 my-4"></div>

      {/* Legend */}
      <div className="flex flex-col gap-3">
        <div className="legend-item">
          <div className="legend-dot bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
          TODAY
        </div>
        <div className="legend-item">
          <div className="legend-dot bg-[#ff0055] shadow-[0_0_8px_#ff0055]"></div>
          MATCH DAY
        </div>
        <div className="legend-item">
          <div className="legend-dot bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
          SELECTED
        </div>
      </div>
    </div>
  );
};
const ManageBracketTab = ({ globalGame, globalTournament }) => {
  const activeGame = (globalGame || "VALORANT").toUpperCase();
  const safeFolder = globalTournament?.name
    ? globalTournament.name.replace(/[^a-zA-Z0-9]/g, "_")
    : "default";
  const key = `tourney_bracket_${safeFolder}_${activeGame}`;

  const [brackets, setBrackets] = useState([]);

  const [teamA, setTeamA] = useStickyState("", `${key}_teamA`);
  const [teamALogo, setTeamALogo] = useStickyState("", `${key}_teamALogo`);
  const [teamAFile, setTeamAFile] = useState(null);
  const [scoreA, setScoreA] = useStickyState(0, `${key}_scoreA`);

  const [teamB, setTeamB] = useStickyState("", `${key}_teamB`);
  const [teamBLogo, setTeamBLogo] = useStickyState("", `${key}_teamBLogo`);
  const [teamBFile, setTeamBFile] = useState(null);
  const [scoreB, setScoreB] = useStickyState(0, `${key}_scoreB`);

  const [round, setRound] = useStickyState("Semi-Finals", `${key}_round`);
  const [bestOf, setBestOf] = useStickyState("Best of 3", `${key}_bestOf`);
  const [mapInfo, setMapInfo] = useStickyState("Map 2: 7-9", `${key}_mapInfo`);

  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBrackets = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/brackets?tournament=${globalTournament?.name || "Default"}&game_title=${activeGame}`,
      );
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((b) => ({
          id: b.id,
          teamA: b.team_a?.team_name || "TBD",
          teamALogo: b.team_a?.logo_url || null,
          teamB: b.team_b?.team_name || "TBD",
          teamBLogo: b.team_b?.logo_url || null,
          scoreA: b.score_a,
          scoreB: b.score_b,
          round: b.round,
          bestOf: b.best_of,
          mapInfo: b.map_info,
        }));
        setBrackets(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBrackets();
  }, [globalTournament?.name, activeGame]);

  const getOrCreateTeam = async (teamName, teamLogoUrl, teamFile) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:5000/api/teams?tournament=${globalTournament?.name || "Default"}`,
    );
    const teams = await res.json();
    const existing = teams.find(
      (t) => t.team_name.toLowerCase() === teamName.toLowerCase(),
    );
    if (existing) return existing.team_id;

    const formData = new FormData();
    formData.append("team_name", teamName);
    formData.append("tournament_name", globalTournament?.name || "Default");

    if (teamFile) {
      formData.append("logo", teamFile);
    } else if (teamLogoUrl && teamLogoUrl.startsWith("data:")) {
      const res = await fetch(teamLogoUrl);
      const blob = await res.blob();
      formData.append("logo", blob, "logo.png");
    }

    const createRes = await fetch("http://localhost:5000/api/teams", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (createRes.ok) {
      const newTeam = await createRes.json();
      return newTeam.team_id;
    }
    return null;
  };

  const addBracket = async () => {
    if (!teamA || !teamB || !round || !bestOf || !mapInfo) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    const teamAId = await getOrCreateTeam(teamA, teamALogo, teamAFile);
    const teamBId = await getOrCreateTeam(teamB, teamBLogo, teamBFile);

    if (teamAId && teamBId) {
      await fetch("http://localhost:5000/api/brackets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tournament_name: globalTournament?.name || "Default",
          game_title: activeGame,
          round,
          best_of: bestOf,
          team_a_id: teamAId,
          team_b_id: teamBId,
          score_a: parseInt(scoreA, 10),
          score_b: parseInt(scoreB, 10),
          map_info: mapInfo,
        }),
      });
      await fetchBrackets();

      setTeamA("");
      setTeamALogo("");
      setTeamAFile(null);
      setScoreA(0);
      setTeamB("");
      setTeamBLogo("");
      setTeamBFile(null);
      setScoreB(0);
      setShowErrors(false);
    }
    setIsSubmitting(false);
  };

  const removeBracket = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/brackets/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setBrackets(brackets.filter((b) => b.id !== id));
  };

  const inputClass = (val) =>
    `w-full bg-slate-900/50 rounded-xl px-4 py-3 text-white transition-all ${showErrors && !val && val !== 0 ? "border-2 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "border border-slate-800 focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] outline-none"}`;

  return (
    <div className="flex justify-center w-full mb-10">
      <div className="flex flex-col w-full px-4 lg:px-8">
      <div 
        className="bg-[#0b1017] light:bg-white rounded-3xl border border-slate-800/60 light:border-slate-200 shadow-2xl w-full"
        style={{ padding: '32px', boxSizing: 'border-box', marginBottom: '24px', marginTop: '24px' }}
      >
        <h2 className="text-2xl font-black uppercase text-white light:text-slate-900 text-center tracking-widest m-0" style={{ marginBottom: '32px' }}>
          Manage Brackets
        </h2>

        <div className="flex flex-col gap-8 mb-10 w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500  text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
                ROUND
              </label>
              <input
                type="text"
                value={round}
                onChange={(e) => setRound(e.target.value)}
                className={inputClass(round)}
                placeholder="e.g. Semi-Finals"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500  text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
                BEST OF
              </label>
              <input
                type="text"
                value={bestOf}
                onChange={(e) => setBestOf(e.target.value)}
                className={inputClass(bestOf)}
                placeholder="e.g. Best of 3"
                disabled={isSubmitting}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500  text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
                MAP INFO
              </label>
              <input
                type="text"
                value={mapInfo}
                onChange={(e) => setMapInfo(e.target.value)}
                className={inputClass(mapInfo)}
                placeholder="e.g. Map 2: 7-9"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 border border-slate-800/80 rounded-2xl relative mt-4" style={{ padding: '24px' }}>
            <div className="absolute -top-3 left-6 bg-[#0d131c] px-3 font-bold text-cyan-500 text-sm uppercase tracking-widest">Team A</div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-[2]">
                <label className="block text-xs font-bold text-slate-500  text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
                  NAME
                </label>
                <input
                  type="text"
                  value={teamA}
                  onChange={(e) => setTeamA(e.target.value)}
                  className={inputClass(teamA)}
                  placeholder="e.g. All Gamers"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex-[3]">
                <label className="block text-xs font-bold text-slate-500  text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
                  LOGO
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isSubmitting}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setTeamAFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => setTeamALogo(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-3 py-2 text-white text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-900 hover:file:bg-cyan-400 cursor-pointer"
                  />
                  {teamALogo && (
                    <img
                      src={teamALogo}
                      alt="Preview"
                      className="w-10 h-10 object-contain rounded bg-slate-800 shrink-0"
                    />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500  text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
                  SCORE
                </label>
                <input
                  type="number"
                  value={scoreA}
                  onChange={(e) => setScoreA(e.target.value)}
                  className={inputClass(scoreA)}
                  placeholder="0"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 border border-slate-800/80 rounded-2xl relative mt-4" style={{ padding: '24px' }}>
            <div className="absolute -top-3 left-6 bg-[#0d131c] px-3 font-bold text-cyan-500 text-sm uppercase tracking-widest">Team B</div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-[2]">
                <label className="block text-xs font-bold text-slate-500  text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
                  NAME
                </label>
                <input
                  type="text"
                  value={teamB}
                  onChange={(e) => setTeamB(e.target.value)}
                  className={inputClass(teamB)}
                  placeholder="e.g. Baisha Gaming"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex-[3]">
                <label className="block text-xs font-bold text-slate-500  text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
                  LOGO
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isSubmitting}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setTeamBFile(file);
                        const reader = new FileReader();
                        reader.onloadend = () => setTeamBLogo(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-3 py-2 text-white text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-900 hover:file:bg-cyan-400 cursor-pointer"
                  />
                  {teamBLogo && (
                    <img
                      src={teamBLogo}
                      alt="Preview"
                      className="w-10 h-10 object-contain rounded bg-slate-800 shrink-0"
                    />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500  text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
                  SCORE
                </label>
                <input
                  type="number"
                  value={scoreB}
                  onChange={(e) => setScoreB(e.target.value)}
                  className={inputClass(scoreB)}
                  placeholder="0"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
        {showErrors && (
          <div className="text-red-500 text-xs font-bold mb-6 text-center uppercase animate-pulse">
            Please fill in all required fields.
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <button
            onClick={addBracket}
            disabled={isSubmitting}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 uppercase rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] disabled:opacity-50"
            style={{ padding: '12px 32px', fontWeight: 'bold', letterSpacing: '0.5px', fontSize: '12px' }}
          >
            {isSubmitting ? "Saving..." : "Add Bracket"}
          </button>
        </div>
      </div>

      <div 
        className="bg-[#0d131c] light:bg-white rounded-3xl border border-slate-800/50 light:border-slate-200 shadow-2xl mt-6"
        style={{ padding: '32px', boxSizing: 'border-box' }}
      >
        <h3 className="text-sm font-black uppercase text-slate-400 mb-4 mt-0">
          Current Brackets
        </h3>
        <div className="flex flex-col gap-2">
          {brackets.length === 0 && (
            <div className="text-slate-500 text-sm">No bracket data found.</div>
          )}
          {brackets.map((b) => (
            <div
              key={b.id}
              className="flex items-center justify-between bg-slate-900/30 p-3 rounded border border-slate-800/50"
            >
              <div className="flex items-center gap-3">
                {b.teamALogo ? (
                  <img
                    src={b.teamALogo}
                    alt="Team A"
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-500">
                    ?
                  </div>
                )}
                <div className="text-white font-bold text-sm">
                  {b.teamA} {b.scoreA} - {b.scoreB} {b.teamB}
                </div>
                {b.teamBLogo ? (
                  <img
                    src={b.teamBLogo}
                    alt="Team B"
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-500">
                    ?
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="text-slate-400 text-xs">
                  {b.round} | {b.mapInfo}
                </div>
                <button
                  onClick={() => removeBracket(b.id)}
                  className="text-red-500 hover:text-red-400 text-[10px] font-bold uppercase"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

const ManageScheduleTab = ({ globalGame, globalTournament }) => {
  const activeGame = (globalGame || "VALORANT").toUpperCase();
  const safeFolder = globalTournament?.name
    ? globalTournament.name.replace(/[^a-zA-Z0-9]/g, "_")
    : "default";
  const key = `tourney_schedule_${safeFolder}_${activeGame}`;

  const [schedule, setSchedule] = useState([]);

  const [teamA, setTeamA] = useStickyState("", `${key}_teamA`);
  const [teamALogo, setTeamALogo] = useStickyState("", `${key}_teamALogo`);
  const [teamAFile, setTeamAFile] = useState(null);

  const [teamB, setTeamB] = useStickyState("", `${key}_teamB`);
  const [teamBLogo, setTeamBLogo] = useStickyState("", `${key}_teamBLogo`);
  const [teamBFile, setTeamBFile] = useState(null);

  const [day, setDay] = useStickyState("2026-07-09", `${key}_day`);
  const [time, setTime] = useStickyState("14:00", `${key}_time`);
  const [timezone, setTimezone] = useStickyState(
    "20:00 PST",
    `${key}_timezone`,
  );

  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMatches = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/matches?tournament=${globalTournament?.name || "Default"}`,
      );
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((m) => ({
          id: m.match_id,
          teamA: m.team_a?.team_name || "TBD",
          teamALogo: m.team_a?.logo_url || null,
          teamB: m.team_b?.team_name || "TBD",
          teamBLogo: m.team_b?.logo_url || null,
          day: m.match_day || (day ? parseInt(day.split("-")[2], 10) : 1),
          time: m.match_time || "00:00",
          timezone: m.match_timezone || "PST",
          reminded: false,
        }));
        setSchedule(formatted);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [globalTournament?.name]);

  const getOrCreateTeam = async (teamName, teamLogoUrl, teamFile) => {
    const token = localStorage.getItem("token");
    const res = await fetch(
      `http://localhost:5000/api/teams?tournament=${globalTournament?.name || "Default"}`,
    );
    const teams = await res.json();
    const existing = teams.find(
      (t) => t.team_name.toLowerCase() === teamName.toLowerCase(),
    );
    if (existing) return existing.team_id;

    const formData = new FormData();
    formData.append("team_name", teamName);
    formData.append("tournament_name", globalTournament?.name || "Default");

    if (teamFile) {
      formData.append("logo", teamFile);
    } else if (teamLogoUrl && teamLogoUrl.startsWith("data:")) {
      const res = await fetch(teamLogoUrl);
      const blob = await res.blob();
      formData.append("logo", blob, "logo.png");
    }

    const createRes = await fetch("http://localhost:5000/api/teams", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (createRes.ok) {
      const newTeam = await createRes.json();
      return newTeam.team_id;
    }
    return null;
  };

  const addMatch = async () => {
    if (!teamA || !teamB || !day || !time || !timezone) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    const teamAId = await getOrCreateTeam(teamA, teamALogo, teamAFile);
    const teamBId = await getOrCreateTeam(teamB, teamBLogo, teamBFile);

    if (teamAId && teamBId) {
      const parsedDay = day.includes("-")
        ? parseInt(day.split("-")[2], 10)
        : parseInt(day, 10);
      await fetch("http://localhost:5000/api/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tournament_name: globalTournament?.name || "Default",
          team_a_id: teamAId,
          team_b_id: teamBId,
          game_title: activeGame,
          status: "scheduled",
          match_day: parsedDay.toString(),
          match_time: time,
          match_timezone: timezone,
        }),
      });
      await fetchMatches();

      setTeamA("");
      setTeamALogo("");
      setTeamAFile(null);
      setTeamB("");
      setTeamBLogo("");
      setTeamBFile(null);
      setShowErrors(false);
    }
    setIsSubmitting(false);
  };

  const removeMatch = async (id) => {
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/matches/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setSchedule(schedule.filter((m) => m.id !== id));
  };

  const inputClass = (val) =>
    `w-full bg-[#070b10] border border-slate-800/80 rounded-xl px-4 py-3 text-white text-sm transition-all ${showErrors && !val ? "border-2 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "focus:border-cyan-500/50 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] outline-none"}`;

  return (
    <div className="flex justify-center w-full mb-10">
      <div className="flex flex-col w-full px-4 lg:px-8">
      <div 
        className="bg-[#0b1017] light:bg-white rounded-3xl border border-slate-800/60 light:border-slate-200 shadow-2xl w-full"
        style={{ padding: '32px', boxSizing: 'border-box', marginBottom: '24px', marginTop: '24px' }}
      >
        <h2 className="text-2xl font-black uppercase text-white light:text-slate-900 text-center tracking-widest m-0" style={{ marginBottom: '32px' }}>
          Manage Schedule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full" style={{ padding: '0 8px' }}>
          <div>
            <label className="block text-xs font-bold text-slate-500 text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
              TEAM A NAME
            </label>
            <input
              type="text"
              value={teamA}
              onChange={(e) => setTeamA(e.target.value)}
              className={inputClass(teamA)}
              placeholder="e.g. All Gamers"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
              TEAM A LOGO
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                disabled={isSubmitting}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setTeamAFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => setTeamALogo(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full bg-[#070b10] border border-slate-800/80 rounded-xl px-4 py-2.5 text-white text-sm file:mr-4 file:py-1.5 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-900 hover:file:bg-cyan-400 cursor-pointer"
              />
              {teamALogo && (
                <img
                  src={teamALogo}
                  alt="Preview"
                  className="w-10 h-10 object-contain rounded bg-slate-800 shrink-0"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
              TEAM B NAME
            </label>
            <input
              type="text"
              value={teamB}
              onChange={(e) => setTeamB(e.target.value)}
              className={inputClass(teamB)}
              placeholder="e.g. Baisha Gaming"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
              TEAM B LOGO
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                disabled={isSubmitting}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setTeamBFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => setTeamBLogo(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full bg-[#070b10] border border-slate-800/80 rounded-xl px-4 py-2.5 text-white text-sm file:mr-4 file:py-1.5 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-900 hover:file:bg-cyan-400 cursor-pointer"
              />
              {teamBLogo && (
                <img
                  src={teamBLogo}
                  alt="Preview"
                  className="w-10 h-10 object-contain rounded bg-slate-800 shrink-0"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
              DAY (JULY 2026)
            </label>
            <input
              type="date"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={inputClass(day) + " [color-scheme:dark]"}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
              TIME
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={inputClass(time)}
              placeholder="e.g. 17:00"
              disabled={isSubmitting}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 text-left" style={{ marginBottom: "12px", paddingLeft: "16px" }}>
              TIMEZONE LABEL
            </label>
            <input
              type="text"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={inputClass(timezone)}
              placeholder="e.g. 23:00 PST"
              disabled={isSubmitting}
            />
          </div>
        </div>
        {showErrors && (
          <div className="text-red-500 text-xs font-bold mt-6 text-center uppercase animate-pulse">
            Please fill in all required fields.
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <button
            onClick={addMatch}
            disabled={isSubmitting}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 uppercase rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] disabled:opacity-50"
            style={{ padding: '12px 32px', fontWeight: 'bold', letterSpacing: '0.5px', fontSize: '12px' }}
          >
            {isSubmitting ? "Saving..." : "Add Match"}
          </button>
        </div>
      </div>

      <div 
        className="bg-[#0d131c] light:bg-white rounded-3xl border border-slate-800/50 light:border-slate-200 shadow-2xl mt-6"
        style={{ padding: '32px', boxSizing: 'border-box' }}
      >
        <h3 className="text-sm font-black uppercase text-slate-400 mb-4 mt-0">
          Current Schedule
        </h3>
        <div className="flex flex-col gap-2">
          {schedule.length === 0 && (
            <div className="text-slate-500 text-sm">No matches scheduled.</div>
          )}
          {schedule.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between bg-slate-900/30 p-3 rounded border border-slate-800/50"
            >
              <div className="flex items-center gap-3">
                {m.teamALogo ? (
                  <img
                    src={m.teamALogo}
                    alt="Team A"
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-500">
                    ?
                  </div>
                )}
                <div className="text-white font-bold text-sm">
                  {m.teamA} vs {m.teamB}
                </div>
                {m.teamBLogo ? (
                  <img
                    src={m.teamBLogo}
                    alt="Team B"
                    className="w-6 h-6 object-contain"
                  />
                ) : (
                  <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-500">
                    ?
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-slate-400 text-xs">
                  Day {m.day} - {m.time}
                </div>
                <button
                  onClick={() => removeMatch(m.id)}
                  className="text-red-500 hover:text-red-400 text-xs font-bold uppercase"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

const ScheduleTab = ({ game, globalTournament }) => {
  const d = DATA[game];
  const [activeGame, setActiveGame] = useState(game);
  const [filterByGame, setFilterByGame] = useState(true);
  const [reminders, setReminders] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  const safeFolder = globalTournament?.name
    ? globalTournament.name.replace(/[^a-zA-Z0-9]/g, "_")
    : "default";
  const key = `tourney_schedule_${safeFolder}_${activeGame}`;
  const [scheduleData] = useStickyState([], key);

  const highlightDays = useMemo(
    () => scheduleData.map((m) => m.day),
    [scheduleData],
  );

  const filteredSchedule = useMemo(() => {
    if (!selectedDay) return scheduleData;
    return scheduleData.filter((m) => m.day === selectedDay);
  }, [scheduleData, selectedDay]);

  const toggleReminder = (id) =>
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="dashboard-section flex flex-col lg:flex-row gap-8 h-full">
      <div className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6">
        <MiniCalendar
          highlightDays={highlightDays}
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
        <div className="glass-panel">
          <div className="filter-container">
            {/* Header Row */}
            <div className="filter-header-row">
              <h3 className="filter-title">FILTER BY GAME</h3>
              <button
                onClick={() => setFilterByGame(!filterByGame)}
                className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 ${filterByGame ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "bg-slate-700 light:bg-slate-300"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${filterByGame ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>

            {/* Game List */}
            <div className="filter-list">
              {["VALORANT", "CROSSFIRE"].map((g) => {
                const isActive = activeGame === g;
                return (
                  <div
                    key={g}
                    onClick={() => setActiveGame(g)}
                    className={`game-filter-item ${isActive ? "active" : ""}`}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: DATA[g].color, boxShadow: `0 0 8px ${DATA[g].color}` }}
                    />
                    <span className={`font-bold text-sm tracking-wide ${isActive ? "text-white" : "text-slate-400"}`}>
                      {g}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="glass-panel flex-1 min-w-0 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="pb-1 border-b-2 border-slate-700/50 flex-1">
            <span
              className="text-xl font-black uppercase tracking-widest"
              style={{ color: DATA[activeGame].color }}
            >
              {activeGame}
            </span>
          </div>
        </div>
        {}
        <div className="flex flex-col gap-3">
          {filteredSchedule.map((s) => {
            const reminded =
              reminders[s.id] !== undefined ? reminders[s.id] : s.reminded;
            return (
              <div
                key={s.id}
                className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 hover:border-slate-700/70 light:hover:border-slate-300 transition-all duration-300 p-4 flex items-center gap-4 group shadow-sm"
              >
                {}

                {}
                <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-1 md:gap-3 py-1">
                  <div className="flex items-center gap-2">
                    {s.teamALogo ? (
                      <img
                        src={s.teamALogo}
                        alt={s.teamA}
                        className="w-6 h-6 object-contain drop-shadow-md"
                      />
                    ) : null}
                    <span className="font-bold text-sm text-white light:text-slate-900 group-hover:text-slate-100">
                      {s.teamA}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-black px-1 hidden md:block">
                    VS
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white light:text-slate-900 group-hover:text-slate-100">
                      {s.teamB}
                    </span>
                    {s.teamBLogo ? (
                      <img
                        src={s.teamBLogo}
                        alt={s.teamB}
                        className="w-6 h-6 object-contain drop-shadow-md"
                      />
                    ) : null}
                  </div>
                </div>
                {}
                <div className="text-right shrink-0 hidden sm:block">
                  <div className="text-sm font-black text-white light:text-slate-900">
                    {s.time}
                  </div>
                  <div className="text-[9px] text-slate-500 light:text-slate-400 font-mono">
                    {s.timezone}
                  </div>
                </div>
                {}
                <button
                  onClick={() => toggleReminder(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] font-black tracking-wider uppercase transition-all active:scale-95 shrink-0 ${
                    reminded
                      ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-400"
                      : "bg-red-600 text-white hover:bg-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                  }`}
                >
                  <IconBell />
                  {reminded ? "Reminded" : "Set Reminder"}
                </button>
              </div>
            );
          })}
        </div>
        {}
        {scheduleData.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-20 text-slate-600 text-sm font-bold tracking-widest uppercase">
            No scheduled matches
          </div>
        )}
      </div>
    </div>
  );
};
const Tournament = ({ globalGame, globalTournament }) => {
  const activeGame = (globalGame || "VALORANT").toUpperCase();
  const [activeTab, setActiveTab] = useState("LIVE & UPCOMING");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef({});

  useEffect(() => {
    const activeTabElement = tabsRef.current[activeTab];
    if (activeTabElement) {
      setIndicatorStyle({
        left: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
      });
    }
  }, [activeTab]);
  
  const tabs = [
    { 
      key: "LIVE & UPCOMING", 
      icon: (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
        </span>
      ), 
      label: "LIVE & UPCOMING" 
    },
    { 
      key: "RESULT", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>, 
      label: "RESULT" 
    },
    { 
      key: "SCHEDULE", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>, 
      label: "SCHEDULE" 
    },
    { 
      key: "MANAGE SCHEDULE", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>, 
      label: "MANAGE SCHEDULE" 
    },
    { 
      key: "MANAGE BRACKET", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>, 
      label: "MANAGE BRACKET" 
    },
  ];
  
  const renderTab = () => {
    switch (activeTab) {
      case "LIVE & UPCOMING":
        return <LiveUpcomingTab game={activeGame} />;
      case "RESULT":
        return (
          <ResultTab game={activeGame} globalTournament={globalTournament} />
        );
      case "SCHEDULE":
        return (
          <ScheduleTab game={activeGame} globalTournament={globalTournament} />
        );
      case "MANAGE SCHEDULE":
        return (
          <ManageScheduleTab
            globalGame={globalGame}
            globalTournament={globalTournament}
          />
        );
      case "MANAGE BRACKET":
        return (
          <ManageBracketTab
            globalGame={globalGame}
            globalTournament={globalTournament}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex-1 bg-[#090e14] light:bg-[#f8fafc] text-white light:text-slate-900 flex flex-col h-full overflow-hidden">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
      {}
      <div className="shrink-0 px-8 md:px-12 pt-6 pb-0 bg-gradient-to-b from-[#0a1018] to-[#090e14] light:from-white light:to-[#f8fafc] flex flex-col items-center relative overflow-hidden">
        {/* Subtle ambient glow behind header */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[200px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[150px] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-[1400px] relative z-10">
          {}
          <div className="flex justify-center items-center w-full mb-6" style={{ padding: '16px 0' }}>
            <div className="relative flex items-center justify-between max-w-[1200px] w-full gap-4 md:gap-12 overflow-x-auto scrollbar-hide pb-2 border-b border-slate-800/60 light:border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  ref={(el) => (tabsRef.current[tab.key] = el)}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-3 px-8 py-3 text-[0.85rem] md:text-[0.95rem] font-bold tracking-[0.1em] uppercase border-none bg-transparent cursor-pointer transition-all duration-300 shrink-0 z-10 ${
                    activeTab === tab.key
                      ? "text-white"
                      : "text-[#94a3b8] hover:text-white"
                  }`}
                >
                  <span className="opacity-80">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}

              {/* The Sliding Bar */}
              <div 
                className="absolute bottom-[-1px] h-[3px] bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(0,240,255,1)] pointer-events-none" 
                style={{ 
                  left: `${indicatorStyle.left}px`, 
                  width: `${indicatorStyle.width}px`,
                  transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                }} 
              />
            </div>
          </div>
        </div>
      </div>
      {}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-8 md:px-12 py-6 flex flex-col items-center">
        <div className="w-full max-w-[1400px]">{renderTab()}</div>
      </div>
    </div>
  );
};
export default Tournament;

