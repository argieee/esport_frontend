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
        bracket: "NA FINAL: FNATIC vs. LOUD",
        mapScore: "Map 2: 7-9",
        type: "bracket",
        isLive: true,
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
    ],
    rankings: [
      { rank: 1, name: "Fnatic", abbr: "FNC", color: "#f97316" },
      { rank: 2, name: "Team Liquid", abbr: "TL", color: "#3b82f6" },
      { rank: 3, name: "LOUD", abbr: "LDN", color: "#22c55e" },
      { rank: 4, name: "DRX", abbr: "DRX", color: "#60a5fa" },
      { rank: 5, name: "Imperial", abbr: "IMP", color: "#10b981" },
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
        bracket: "SEMI: AG vs. BS",
        mapScore: "Map 3: 10-8",
        type: "bracket",
        isLive: true,
      },
      {
        id: 3,
        title: "CFS Invitational",
        team1: "Q9",
        team2: "BD",
        score: "1–1",
        viewers: "45K",
        isLive: true,
        type: "match",
      },
    ],
    rankings: [
      { rank: 1, name: "All Gamers", abbr: "AG", color: "#ef4444" },
      { rank: 2, name: "Baisha Gaming", abbr: "BS", color: "#eab308" },
      { rank: 3, name: "Q9", abbr: "Q9", color: "#3b82f6" },
      { rank: 4, name: "Imperial", abbr: "IMP", color: "#10b981" },
      { rank: 5, name: "Black Dragons", abbr: "BD", color: "#6b7280" },
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
const MatchCard = ({ match, showCountdown, game }) => {
  const d = DATA[game];
  return (
    <div className="w-[180px] flex-shrink-0 snap-center rounded-2xl border border-slate-700/40 bg-[#0d131c]/80 backdrop-blur-md p-5 flex flex-col hover:border-slate-400/60 transition-all duration-500 cursor-pointer group shadow-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative overflow-hidden transform hover:-translate-y-1">
      {/* Dynamic Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${d?.colorClass || 'from-blue-500/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      
      <div className="h-7 mb-2 relative z-10">
        {showCountdown && (
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 text-slate-200 text-[10px] font-black px-2.5 py-1 rounded-lg w-max shadow-inner group-hover:text-white transition-colors">
            {match.countdown || "2h 13m 27s"}
          </div>
        )}
      </div>
      <div className="text-[11px] font-black tracking-widest uppercase text-slate-500 group-hover:text-slate-400 transition-colors mb-3 relative z-10">
        Day {match.day || 2}
      </div>
      
      <div className="flex flex-col gap-3 relative z-10">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 bg-slate-800/80 backdrop-blur-md rounded-lg flex items-center justify-center border border-slate-700/50 shadow-inner group-hover:border-slate-500/50 transition-colors">
            {match.team1Logo ? (
              <img src={match.team1Logo} className="w-full h-full object-contain p-1" />
            ) : (
              <span className="text-[11px] text-white font-black">{match.team1?.[0]}</span>
            )}
          </div>
          <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">{match.team1}</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 bg-slate-800/80 backdrop-blur-md rounded-lg flex items-center justify-center border border-slate-700/50 shadow-inner group-hover:border-slate-500/50 transition-colors">
            {match.team2Logo ? (
              <img src={match.team2Logo} className="w-full h-full object-contain p-1" />
            ) : (
              <span className="text-[11px] text-white font-black">{match.team2?.[0]}</span>
            )}
          </div>
          <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors truncate">{match.team2}</span>
        </div>
      </div>
    </div>
  );
};
const LiveUpcomingTab = ({ game }) => {
  const d = DATA[game];
  const [showCountdown, setShowCountdown] = useState(true);
  
  return (
    <div className="flex flex-col gap-8">
      {/* Upcoming Matches Section */}
      <div className="relative bg-[#0d131c] p-6 rounded-3xl border border-slate-700/40 shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-5 mb-5">
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-cyan-500 mb-1">Live & Upcoming</div>
              <h2 className="text-2xl font-black text-white tracking-wide flex items-center gap-3">
                <IconCalendar /> Upcoming Matches
              </h2>
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
          
          <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 w-full" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {d.liveMatches.map((match, idx) => (
              <MatchCard 
                key={match.id || idx} 
                match={{...match, countdown: `${idx + 1}d ${idx + 2}h 13m`, day: idx + 2}} 
                showCountdown={showCountdown} 
                game={game}
              />
            ))}
            <div className="min-w-[20px] shrink-0" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-[280px] shrink-0 bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm flex flex-col">
          <div className="px-5 py-4 border-b border-slate-800/50 light:border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 light:text-slate-400 mb-0.5">
                Global
              </div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white light:text-slate-900">
                Team Rankings
              </h2>
            </div>
            <div className="text-slate-600">
              <IconTrend />
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-1">
            {d.rankings.map((team) => (
              <div
                key={team.rank}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-slate-800/50 light:hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-700/50 light:hover:border-slate-200"
              >
                <span className="w-5 text-right font-bold text-slate-500 light:text-slate-400 text-sm shrink-0">
                  {team.rank}.
                </span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black text-white shrink-0 shadow-lg light:shadow-sm"
                  style={{
                    backgroundColor: team.color + "33",
                    border: `1px solid ${team.color}55`,
                  }}
                >
                  <span style={{ color: team.color }}>{team.abbr[0]}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-200 light:text-slate-800 group-hover:text-cyan-400 light:group-hover:text-cyan-600 transition-colors truncate">
                    {team.name}
                  </span>
                  <span className="text-[9px] font-bold text-slate-600 light:text-slate-400 tracking-widest uppercase">
                    {game === "VALORANT" ? "VAL" : "CF"}
                  </span>
                </div>
              </div>
            ))}
            <button className="mt-3 py-2.5 px-3 rounded-xl text-[10px] font-black tracking-widest uppercase text-cyan-500 border border-cyan-900/40 bg-cyan-900/10 hover:bg-cyan-900/30 hover:text-cyan-400 transition-all group">
              View all Rankings{" "}
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {}
        <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm">
          <div className="px-5 py-4 border-b border-slate-800/50 light:border-slate-200">
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 light:text-slate-400 mb-0.5">
              FPS Circuit
            </div>
            <h2 className="text-sm font-black uppercase tracking-widest text-white light:text-slate-900">
              Snapshot: Valorant & Crossfire
            </h2>
          </div>
          <div className="p-5 flex flex-col gap-6">
            {}
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/40 light:border-slate-100">
                <ValorantLogo size={14} color="#ff4655" />
                <span className="text-xs font-black tracking-widest uppercase text-white light:text-slate-800">
                  VALORANT
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {DATA.VALORANT.circuit.map((c, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 px-3 py-2.5 rounded-xl bg-slate-800/30 light:bg-slate-50 hover:bg-slate-800/60 light:hover:bg-slate-100 border-l-[3px] border-l-transparent hover:border-l-[#ff4655] transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${c.hot ? "bg-orange-500" : "bg-red-500"} animate-pulse mt-0.5 shrink-0`}
                      />
                      <span className="text-xs text-slate-400 light:text-slate-600 group-hover:text-slate-200 light:group-hover:text-slate-900 transition-colors leading-snug">
                        <span className="text-slate-500 light:text-slate-500">
                          {c.event}
                        </span>{" "}
                        —{" "}
                        <span className="text-white light:text-slate-800 font-bold">
                          {c.match}
                        </span>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 light:text-slate-400 pl-4.5">
                      {c.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {}
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800/40 light:border-slate-100">
                <CrossfireLogo size={14} color="#4c7fd6" />
                <span className="text-xs font-black tracking-widest uppercase text-white light:text-slate-800">
                  CROSSFIRE
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {DATA.CROSSFIRE.circuit.map((c, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-1 px-3 py-2.5 rounded-xl bg-slate-800/30 light:bg-slate-50 hover:bg-slate-800/60 light:hover:bg-slate-100 border-l-[3px] border-l-transparent hover:border-l-[#4c7fd6] transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`w-2 h-2 rounded-full ${c.hot ? "bg-blue-400" : "bg-slate-500"} animate-pulse mt-0.5 shrink-0`}
                      />
                      <span className="text-xs text-slate-400 light:text-slate-600 group-hover:text-slate-200 light:group-hover:text-slate-900 transition-colors leading-snug">
                        <span className="text-slate-500 light:text-slate-500">
                          {c.event}
                        </span>{" "}
                        —{" "}
                        <span className="text-white light:text-slate-800 font-bold">
                          {c.match}
                        </span>
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 light:text-slate-400 pl-4.5">
                      {c.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm relative group">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${d.colorClass} to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none`}
          />
          <div
            className="absolute right-0 bottom-0 w-64 h-64 opacity-5 blur-3xl rounded-full pointer-events-none"
            style={{ backgroundColor: d.color }}
          />
          <div className="relative z-10 px-5 py-4 border-b border-slate-800/50 light:border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 light:text-slate-400 mb-0.5">
                FPS
              </div>
              <h2 className="text-sm font-black uppercase tracking-widest text-white light:text-slate-900">
                Open Qualifiers
              </h2>
            </div>
            {game === "VALORANT" ? (
              <ValorantLogo size={22} color={d.color} />
            ) : (
              <CrossfireLogo size={22} color={d.color} />
            )}
          </div>
          <div className="relative z-10 p-5">
            <div className="bg-[#080d14]/80 light:bg-white/80 backdrop-blur-sm rounded-xl border border-slate-700/50 light:border-slate-200 p-5 shadow-lg light:shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/50 light:border-slate-200">
                {game === "VALORANT" ? (
                  <ValorantLogo size={20} color={d.color} />
                ) : (
                  <CrossfireLogo size={20} color={d.color} />
                )}
                <span className="font-black tracking-widest text-white light:text-slate-900 text-sm">
                  {game}
                </span>
              </div>
              <h3 className="font-black text-white light:text-slate-900 text-base mb-4 leading-snug">
                {d.qualifier.title}
              </h3>
              <div className="space-y-2.5 mb-5 bg-slate-900/60 light:bg-slate-50 p-3.5 rounded-lg border border-slate-800/50 light:border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 light:text-slate-400 uppercase tracking-wider">
                    Prize Pool
                  </span>
                  <span className="font-black text-emerald-400 text-sm">
                    {d.qualifier.prize}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 light:text-slate-400 uppercase tracking-wider">
                    Deadline
                  </span>
                  <span className="font-black text-white light:text-slate-900 text-sm">
                    {d.qualifier.deadline}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 light:text-slate-400 uppercase tracking-wider">
                    Slots Taken
                  </span>
                  <span className="font-black text-cyan-400 light:text-cyan-600 text-sm">
                    {d.qualifier.slots}
                  </span>
                </div>
              </div>
              <button
                onClick={() =>
                  alert(`Redirecting to ${d.qualifier.title} registration...`)
                }
                className="w-full py-3 rounded-lg font-black tracking-widest text-xs uppercase transition-all duration-300 active:scale-95 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
                style={{
                  background: `linear-gradient(135deg, ${d.color}22, #06b6d422)`,
                  border: `1px solid ${d.color}44`,
                  color: d.color,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = d.color;
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = `linear-gradient(135deg, ${d.color}22, #06b6d422)`;
                  e.target.style.color = d.color;
                }}
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
  return (
    <div className="flex flex-col gap-6">
      {" "}
      {}{" "}
      <div className="flex flex-col xl:flex-row gap-6">
        {" "}
        {}{" "}
        <div className="flex-1 min-w-0 bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm">
          {" "}
          <div className="px-5 py-4 border-b border-slate-800/50 light:border-slate-200 flex items-center gap-3">
            {" "}
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              {" "}
              <IconTrophy />{" "}
            </div>{" "}
            <div>
              {" "}
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 light:text-slate-400 mb-0.5">
                Tournament
              </div>{" "}
              <h2 className="text-sm font-black uppercase tracking-widest text-white light:text-slate-900">
                Final Results & Key Stats
              </h2>{" "}
            </div>{" "}
          </div>{" "}
          <div className="overflow-x-auto">
            {" "}
            <table className="w-full text-left border-collapse min-w-[480px]">
              {" "}
              <thead>
                {" "}
                <tr className="text-[9px] uppercase tracking-widest text-slate-500 light:text-slate-600 border-b border-slate-800/60 light:border-slate-200 bg-slate-900/40 light:bg-slate-50">
                  {" "}
                  <th className="px-4 py-3">Rank</th>{" "}
                  <th className="px-4 py-3">Team</th>{" "}
                  <th className="px-4 py-3 text-center">Prize</th>{" "}
                  <th className="px-4 py-3 text-center">Record</th>{" "}
                  <th className="px-4 py-3 text-center">Pts</th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {d.results.table.map((row) => (
                  <tr
                    key={row.rank}
                    className="border-b border-slate-800/30 light:border-slate-200 hover:bg-slate-800/20 light:hover:bg-slate-50 transition-colors group"
                  >
                    {" "}
                    <td className="px-4 py-3">
                      {" "}
                      {row.rank <= 3 ? (
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shadow-sm"
                          style={{
                            backgroundColor: medalColors[row.rank] + "20",
                            color: medalColors[row.rank],
                            border: `1px solid ${medalColors[row.rank]}40`,
                          }}
                        >
                          {" "}
                          {row.rank}{" "}
                        </div>
                      ) : (
                        <span className="text-slate-500 light:text-slate-400 font-bold text-sm pl-2">
                          {row.rank}
                        </span>
                      )}{" "}
                    </td>{" "}
                    <td className="px-4 py-3">
                      {" "}
                      <div className="flex items-center gap-2.5">
                        {" "}
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black shadow-sm"
                          style={{
                            backgroundColor: row.color + "22",
                            border: `1px solid ${row.color}44`,
                            color: row.color,
                          }}
                        >
                          {" "}
                          {row.abbr}{" "}
                        </div>{" "}
                        <span className="text-sm font-bold text-slate-200 light:text-slate-800 group-hover:text-white light:group-hover:text-slate-900 transition-colors">
                          {row.team}
                        </span>{" "}
                      </div>{" "}
                    </td>{" "}
                    <td className="px-4 py-3 text-center text-sm font-bold text-emerald-400 light:text-emerald-600">
                      {row.prize}
                    </td>{" "}
                    <td className="px-4 py-3 text-center text-sm font-mono text-slate-400 light:text-slate-600">
                      {row.record}
                    </td>{" "}
                    <td className="px-4 py-3 text-center">
                      {" "}
                      <span className="text-sm font-black text-white light:text-slate-800 bg-slate-800/60 light:bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {row.pts}
                      </span>{" "}
                    </td>{" "}
                  </tr>
                ))}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="w-full xl:w-[300px] shrink-0 bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm flex flex-col">
          {" "}
          <div className="px-5 py-4 border-b border-slate-800/50 light:border-slate-200">
            {" "}
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 light:text-slate-400 mb-0.5">
              Playoff
            </div>{" "}
            <h2 className="text-sm font-black uppercase tracking-widest text-white light:text-slate-900">
              Bracket Results
            </h2>{" "}
          </div>{" "}
          <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
            {" "}
            {liveBrackets.map((b, i) => (
              <div
                key={i}
                className="bg-slate-900/60 light:bg-slate-50 rounded-xl border border-slate-800/50 light:border-slate-200 p-3.5 hover:border-slate-700/70 light:hover:border-slate-300 transition-colors shadow-sm"
              >
                {" "}
                <div className="flex justify-between items-center mb-2.5 text-[9px] uppercase tracking-widest font-bold text-slate-500 light:text-slate-400">
                  {" "}
                  <span>{b.round}</span>{" "}
                  <span className="text-cyan-600 light:text-cyan-600">
                    {b.bestOf}
                  </span>{" "}
                </div>{" "}
                <div className="flex items-center justify-between gap-2">
                  {" "}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    {" "}
                    <div className="w-9 h-9 rounded-lg bg-slate-800 light:bg-white border border-slate-700 light:border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 light:text-slate-600 shadow-inner overflow-hidden">
                      {b.team1Logo ? (
                        <img
                          src={b.team1Logo}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        b.team1[0]
                      )}
                    </div>{" "}
                    <span className="text-[9px] font-bold text-slate-400 light:text-slate-600 text-center leading-tight">
                      {b.team1}
                    </span>{" "}
                  </div>{" "}
                  <div className="flex flex-col items-center gap-0.5">
                    {" "}
                    <div className="flex items-center gap-1.5">
                      {" "}
                      <span className="text-xl font-black text-white light:text-slate-900">
                        {b.score1}
                      </span>{" "}
                      <span className="text-slate-600 light:text-slate-400 font-bold">
                        –
                      </span>{" "}
                      <span className="text-xl font-black text-slate-400 light:text-slate-600">
                        {b.score2}
                      </span>{" "}
                    </div>{" "}
                    <span className="text-[8px] text-slate-600 light:text-slate-400 font-mono">
                      {b.map}
                    </span>{" "}
                  </div>{" "}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    {" "}
                    <div className="w-9 h-9 rounded-lg bg-slate-800 light:bg-white border border-slate-700 light:border-slate-200 flex items-center justify-center text-xs font-black text-slate-400 light:text-slate-600 shadow-inner overflow-hidden">
                      {b.team2Logo ? (
                        <img
                          src={b.team2Logo}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        b.team2[0]
                      )}
                    </div>{" "}
                    <span className="text-[9px] font-bold text-slate-400 light:text-slate-600 text-center leading-tight">
                      {b.team2}
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {}{" "}
      <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm">
        {" "}
        <div className="px-5 py-4 border-b border-slate-800/50 light:border-slate-200 flex items-center justify-between">
          {" "}
          <div>
            {" "}
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 light:text-slate-400 mb-0.5">
              Match History
            </div>{" "}
            <h2 className="text-sm font-black uppercase tracking-widest text-white light:text-slate-900">
              Tournament Match Timeline
            </h2>{" "}
          </div>{" "}
          <button
            onClick={() => alert("Opening tournament replay...")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-black tracking-widest uppercase transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
            style={{
              borderColor: "#06b6d480",
              color: "#06b6d4",
              backgroundColor: "#06b6d415",
            }}
          >
            {" "}
            <IconReplay /> Tournament Replay{" "}
          </button>{" "}
        </div>{" "}
        <div className="p-5">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            {}{" "}
            <div>
              {" "}
              <div className="flex items-center gap-2 mb-3">
                {" "}
                <ValorantLogo size={14} color="#ff4655" />{" "}
                <span className="text-xs font-black tracking-widest uppercase text-white light:text-slate-800">
                  VCT
                </span>{" "}
              </div>{" "}
              <div className="flex flex-col gap-2">
                {" "}
                {d.results.timeline
                  .filter((t) => t.league === "VCT")
                  .map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-slate-900/50 light:bg-slate-50 rounded-xl px-4 py-3 border border-slate-800/40 light:border-slate-200 hover:border-slate-700/50 light:hover:border-slate-300 transition-colors group cursor-pointer shadow-sm"
                    >
                      {" "}
                      <div className="flex flex-col gap-0.5">
                        {" "}
                        <span className="text-[9px] uppercase tracking-widest text-slate-500 light:text-slate-400 font-bold">
                          {t.stage}
                        </span>{" "}
                        <div className="flex items-center gap-2">
                          {" "}
                          <div className="w-7 h-7 rounded bg-slate-800 light:bg-white border light:border-slate-200 flex items-center justify-center text-[9px] font-black text-slate-400 light:text-slate-600 shadow-inner">
                            {t.team1[0]}
                          </div>{" "}
                          <span className="text-sm font-black text-white light:text-slate-900">
                            {t.score}
                          </span>{" "}
                          <div className="w-7 h-7 rounded bg-slate-800 light:bg-white border light:border-slate-200 flex items-center justify-center text-[9px] font-black text-slate-400 light:text-slate-600 shadow-inner">
                            {t.team2[0]}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                      <div className="text-right">
                        {" "}
                        <div className="text-xs font-bold text-slate-300 light:text-slate-700">
                          {t.team1}
                        </div>{" "}
                        <div className="text-[9px] text-slate-600 light:text-slate-400">
                          vs {t.team2}
                        </div>{" "}
                      </div>{" "}
                    </div>
                  ))}{" "}
              </div>{" "}
            </div>{" "}
            {}{" "}
            <div>
              {" "}
              <div className="flex items-center gap-2 mb-3">
                {" "}
                <CrossfireLogo size={14} color="#4c7fd6" />{" "}
                <span className="text-xs font-black tracking-widest uppercase text-white light:text-slate-800">
                  CFPL
                </span>{" "}
              </div>{" "}
              <div className="flex flex-col gap-2">
                {" "}
                {d.results.timeline
                  .filter((t) => t.league === "CFPL")
                  .map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-slate-900/50 light:bg-slate-50 rounded-xl px-4 py-3 border border-slate-800/40 light:border-slate-200 hover:border-slate-700/50 light:hover:border-slate-300 transition-colors group cursor-pointer shadow-sm"
                    >
                      {" "}
                      <div className="flex flex-col gap-0.5">
                        {" "}
                        <span className="text-[9px] uppercase tracking-widest text-slate-500 light:text-slate-400 font-bold">
                          {t.stage}
                        </span>{" "}
                        <div className="flex items-center gap-2">
                          {" "}
                          <div className="w-7 h-7 rounded bg-slate-800 light:bg-white border light:border-slate-200 flex items-center justify-center text-[9px] font-black text-slate-400 light:text-slate-600 shadow-inner">
                            {t.team1[0]}
                          </div>{" "}
                          <span className="text-sm font-black text-white light:text-slate-900">
                            {t.score}
                          </span>{" "}
                          <div className="w-7 h-7 rounded bg-slate-800 light:bg-white border light:border-slate-200 flex items-center justify-center text-[9px] font-black text-slate-400 light:text-slate-600 shadow-inner">
                            {t.team2[0]}
                          </div>{" "}
                        </div>{" "}
                      </div>{" "}
                      <div className="text-right">
                        {" "}
                        <div className="text-xs font-bold text-slate-300 light:text-slate-700">
                          {t.team1}
                        </div>{" "}
                        <div className="text-[9px] text-slate-600 light:text-slate-400">
                          vs {t.team2}
                        </div>{" "}
                      </div>{" "}
                    </div>
                  ))}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
const MiniCalendar = ({ highlightDays = [], selectedDay, onSelectDay }) => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const offset = 2;
  const totalDays = 31;
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  const today = 9;
  return (
    <div className="select-none">
      {" "}
      {}{" "}
      <div className="flex items-center justify-between mb-4">
        {" "}
        <button className="text-slate-500 light:text-slate-400 hover:text-white light:hover:text-slate-700 transition-colors p-1 rounded">
          <IconChevronLeft />
        </button>{" "}
        <span className="text-sm font-black uppercase tracking-widest text-white light:text-slate-900">
          July 2026
        </span>{" "}
        <button className="text-slate-500 light:text-slate-400 hover:text-white light:hover:text-slate-700 transition-colors p-1 rounded">
          <IconChevronRight />
        </button>{" "}
      </div>{" "}
      {}{" "}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {" "}
        {days.map((d, i) => (
          <div
            key={i}
            className="text-[9px] font-black text-slate-600 uppercase tracking-wider text-center"
          >
            {d}
          </div>
        ))}{" "}
      </div>{" "}
      {}{" "}
      <div className="grid grid-cols-7 gap-1">
        {" "}
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const isToday = day === today;
          const isHighlighted = highlightDays.includes(day);
          const isSelected = selectedDay === day;
          return (
            <button
              key={i}
              onClick={() => onSelectDay(day === selectedDay ? null : day)}
              className={`h-7 w-full rounded-lg text-[11px] font-bold transition-all flex items-center justify-center                ${isSelected ? "bg-cyan-500 text-white scale-110 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : isToday ? "bg-blue-600 text-white ring-2 ring-blue-400/50" : isHighlighted ? "bg-pink-600/80 light:bg-pink-500 text-white hover:bg-pink-500" : "text-slate-400 light:text-slate-600 hover:bg-slate-800 light:hover:bg-slate-100 hover:text-white light:hover:text-slate-900"}              `}
            >
              {" "}
              {day}{" "}
            </button>
          );
        })}{" "}
      </div>{" "}
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
    `w-full bg-slate-900/50 rounded px-3 py-2 text-white ${showErrors && !val && val !== 0 ? "border-2 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "border border-slate-800"}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 p-6 shadow-xl">
        <h2 className="text-xl font-black uppercase text-white light:text-slate-900 mb-6">
          Manage Brackets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="md:col-span-2 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
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
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
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
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
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

          <div className="flex flex-col gap-4 border border-slate-800 p-4 rounded-xl">
            <h3 className="font-bold text-cyan-500">TEAM A</h3>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
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
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
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
                  className="w-full bg-slate-900/50 border border-slate-800 rounded px-3 py-1 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-900 hover:file:bg-cyan-400"
                />
                {teamALogo && (
                  <img
                    src={teamALogo}
                    alt="Preview"
                    className="w-8 h-8 object-contain rounded bg-slate-800"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
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

          <div className="flex flex-col gap-4 border border-slate-800 p-4 rounded-xl">
            <h3 className="font-bold text-cyan-500">TEAM B</h3>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
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
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
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
                  className="w-full bg-slate-900/50 border border-slate-800 rounded px-3 py-1 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-900 hover:file:bg-cyan-400"
                />
                {teamBLogo && (
                  <img
                    src={teamBLogo}
                    alt="Preview"
                    className="w-8 h-8 object-contain rounded bg-slate-800"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
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
        {showErrors && (
          <div className="text-red-500 text-xs font-bold mb-4 uppercase animate-pulse">
            Please fill in all required fields.
          </div>
        )}
        <button
          onClick={addBracket}
          disabled={isSubmitting}
          className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black uppercase rounded transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
        >
          {isSubmitting ? "Saving to Database..." : "Add Bracket"}
        </button>
      </div>

      <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 p-6 shadow-xl">
        <h3 className="text-sm font-black uppercase text-slate-400 mb-4">
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
    `w-full bg-slate-900/50 rounded px-3 py-2 text-white ${showErrors && !val ? "border-2 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "border border-slate-800"}`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 p-6 shadow-xl">
        <h2 className="text-xl font-black uppercase text-white light:text-slate-900 mb-6">
          Manage Schedule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
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
            <label className="block text-xs font-bold text-slate-500 mb-1">
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
                className="w-full bg-slate-900/50 border border-slate-800 rounded px-3 py-1.5 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-900 hover:file:bg-cyan-400"
              />
              {teamALogo && (
                <img
                  src={teamALogo}
                  alt="Preview"
                  className="w-8 h-8 object-contain rounded bg-slate-800"
                />
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
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
            <label className="block text-xs font-bold text-slate-500 mb-1">
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
                className="w-full bg-slate-900/50 border border-slate-800 rounded px-3 py-1.5 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-900 hover:file:bg-cyan-400"
              />
              {teamBLogo && (
                <img
                  src={teamBLogo}
                  alt="Preview"
                  className="w-8 h-8 object-contain rounded bg-slate-800"
                />
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1">
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
            <label className="block text-xs font-bold text-slate-500 mb-1">
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
            <label className="block text-xs font-bold text-slate-500 mb-1">
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
          <div className="text-red-500 text-xs font-bold mb-4 uppercase animate-pulse">
            Please fill in all required fields.
          </div>
        )}
        <button
          onClick={addMatch}
          disabled={isSubmitting}
          className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black uppercase rounded transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
        >
          {isSubmitting ? "Saving to Database..." : "Add Match"}
        </button>
      </div>

      <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 p-6 shadow-xl">
        <h3 className="text-sm font-black uppercase text-slate-400 mb-4">
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
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
        <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 p-5 shadow-xl light:shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-slate-400">
              <IconCalendar />
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-white light:text-slate-900">
              Schedule
            </span>
          </div>
          <MiniCalendar
            highlightDays={highlightDays}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
          />

          <div className="mt-4 pt-4 border-t border-slate-800/50 light:border-slate-200 flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-blue-600" />
              <span className="text-[9px] text-slate-500 light:text-slate-400">
                Today
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-pink-600" />
              <span className="text-[9px] text-slate-500 light:text-slate-400">
                Match day
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-cyan-500" />
              <span className="text-[9px] text-slate-500 light:text-slate-400">
                Selected
              </span>
            </div>
          </div>
        </div>
        {}
        <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 p-4 shadow-xl light:shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-widest text-white light:text-slate-900">
              Filter by Game
            </span>
            <button
              onClick={() => setFilterByGame(!filterByGame)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 ${filterByGame ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "bg-slate-700 light:bg-slate-300"}`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${filterByGame ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>
          {}
          <div className="flex flex-col gap-2">
            {["VALORANT", "CROSSFIRE"].map((g) => (
              <button
                key={g}
                onClick={() => setActiveGame(g)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all border ${
                  activeGame === g
                    ? "bg-slate-800/80 light:bg-slate-100 border-slate-600 light:border-slate-300 text-white light:text-slate-900"
                    : "border-transparent text-slate-500 light:text-slate-400 hover:text-slate-300 light:hover:text-slate-600 hover:bg-slate-800/40 light:hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${activeGame === g ? "animate-pulse" : ""}`}
                  style={{ backgroundColor: DATA[g].color }}
                />
                {g}
                {activeGame === g && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {}
        <div className="flex items-center gap-4">
          {activeGame === "VALORANT" ? (
            <ValorantLogo size={28} color={DATA[activeGame].color} />
          ) : (
            <CrossfireLogo size={28} color={DATA[activeGame].color} />
          )}
          <div className="pb-1 border-b-2 border-slate-700/50 flex-1">
            <span
              className="text-lg font-black uppercase tracking-widest"
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
  const [activeTab, setActiveTab] = useState("SCHEDULE");
  const tabs = [
    "LIVE & UPCOMING",
    "RESULT",
    "SCHEDULE",
    "MANAGE SCHEDULE",
    "MANAGE BRACKET",
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
      <div className="shrink-0 px-8 md:px-12 pt-6 pb-0 bg-[#090e14] light:bg-white flex flex-col items-center">
        <div className="w-full max-w-[1400px]">
          {}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-1 h-8 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                style={{
                  background: "linear-gradient(180deg, #00ffcc, #3b82f6)",
                }}
              />
              <div>
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 light:text-slate-400 mb-0.5">
                  Esport League
                </div>
                <h1 className="text-xl md:text-2xl font-black tracking-[0.15em] uppercase text-white light:text-slate-900">
                  Tournaments
                </h1>
              </div>
            </div>
          </div>
          {}
          <div className="flex items-center gap-6 border-b border-slate-800/60 light:border-slate-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 text-[11px] font-black tracking-widest uppercase whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab
                    ? "text-white light:text-slate-900"
                    : "text-slate-500 light:text-slate-400 hover:text-slate-300 light:hover:text-slate-600"
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
      </div>
      {}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-8 md:px-12 py-6 flex flex-col items-center">
        <div className="w-full max-w-[1400px]">{renderTab()}</div>
      </div>
    </div>
  );
};
export default Tournament;
