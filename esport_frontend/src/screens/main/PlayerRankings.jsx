import React, { useState, useEffect, useMemo } from "react";
import { apiFetch } from "../../utils/api";
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/w0000/svg"
    className="h-4 w-4 text-theme-text-faint"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const PlayerRankings = ({ globalGame, globalTournament }) => {
  const activeGame = (globalGame || "VALORANT").toUpperCase();
  const [dailySearch, setDailySearch] = useState("");
  const [weeklySearch, setWeeklySearch] = useState("");
  const [dbValorantStats, setDbValorantStats] = useState([]);
  const [dbCrossfireStats, setDbCrossfireStats] = useState([]);
  const [matchRecords, setMatchRecords] = useState([]);
  useEffect(() => {
    apiFetch(`/api/stats/valorant?tournament=${encodeURIComponent(globalTournament || 'Default')}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDbValorantStats(data);
        else console.error("Expected array for Valorant stats, got:", data);
      })
      .catch(console.error);

    apiFetch(`/api/stats/crossfire?tournament=${encodeURIComponent(globalTournament || 'Default')}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setDbCrossfireStats(data);
        else console.error("Expected array for Crossfire stats, got:", data);
      })
      .catch(console.error);

    apiFetch(`/api/match-records?tournament=${encodeURIComponent(globalTournament || 'Default')}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setMatchRecords(data);
        else console.error("Expected array for Match Records, got:", data);
      })
      .catch(console.error);
  }, [globalTournament]);
  const liveValorantPlayers = useMemo(() => {
    if (!Array.isArray(dbValorantStats)) return [];
    return [...dbValorantStats]
      .sort((a, b) => b.total_kills - a.total_kills)
      .map((p, idx) => ({
        rank: idx + 1,
        name: p.ign,
        kills: p.total_kills,
        death: p.total_deaths,
        round: p.total_rounds_played,
        kd: p.total_deaths
          ? (p.total_kills / p.total_deaths).toFixed(2)
          : p.total_kills.toFixed(2),
        kr: p.total_rounds_played
          ? (p.total_kills / p.total_rounds_played).toFixed(2)
          : "0.00",
        sr: p.total_rounds_played
          ? (
              (p.total_rounds_played - p.total_deaths) /
              p.total_rounds_played
            ).toFixed(2)
          : "0.00",
        hk: p.total_kills ? (0).toFixed(2) : "0.00",
        ap: p.performance_score ? Math.round(p.performance_score * 100) : 0,
      }));
  }, [dbValorantStats]);
  const liveCrossfirePlayers = useMemo(() => {
    if (!Array.isArray(dbCrossfireStats)) return [];
    return [...dbCrossfireStats]
      .sort((a, b) => b.total_kills - a.total_kills)
      .map((p, idx) => ({
        rank: idx + 1,
        name: p.ign,
        kills: p.total_kills,
        death: p.total_deaths,
        round: p.total_rounds_played,
        kd: p.total_deaths
          ? (p.total_kills / p.total_deaths).toFixed(2)
          : p.total_kills.toFixed(2),
        kr: p.total_rounds_played
          ? (p.total_kills / p.total_rounds_played).toFixed(2)
          : "0.00",
        sr: p.total_rounds_played
          ? (
              (p.total_rounds_played - p.total_deaths) /
              p.total_rounds_played
            ).toFixed(2)
          : "0.00",
        hk: p.total_kills
          ? (p.total_headshots / p.total_kills).toFixed(2)
          : "0.00",
        ap: p.performance_score ? Math.round(p.performance_score * 100) : 0,
      }));
  }, [dbCrossfireStats]);
  const currentLivePlayers =
    activeGame === "VALORANT" ? liveValorantPlayers : liveCrossfirePlayers;
  const valorantData = {
    dailyPlayers: [
      {
        rank: 1,
        name: "PE_ALDRIN",
        kills: 336,
        death: 39,
        round: 13,
        kd: "1.41",
        kr: "0.93",
        sr: "0.40",
        hk: "0.80",
        ap: 265,
      },
      {
        rank: 2,
        name: "UM_NO",
        kills: 336,
        death: 42,
        round: 13,
        kd: "1.39",
        kr: "0.88",
        sr: "0.39",
        hk: "0.72",
        ap: 255,
      },
      {
        rank: 3,
        name: "PE_MVA",
        kills: 332,
        death: 58,
        round: 18,
        kd: "1.34",
        kr: "0.87",
        sr: "0.38",
        hk: "0.70",
        ap: 252,
      },
      {
        rank: 4,
        name: "TS_AIDEN",
        kills: 331,
        death: 89,
        round: 18,
        kd: "1.33",
        kr: "0.87",
        sr: "0.36",
        hk: "0.67",
        ap: 243,
      },
      {
        rank: 5,
        name: "EVOS_YOB1B",
        kills: 301,
        death: 125,
        round: 15,
        kd: "1.30",
        kr: "0.87",
        sr: "0.36",
        hk: "0.65",
        ap: 234,
      },
    ],
    weeklyPlayers: [
      {
        rank: 1,
        name: "PE_ALDRIN",
        kills: 1467,
        death: 803,
        round: 221,
        kd: "1.30",
        kr: "0.88",
        sr: "0.32",
        hk: "0.50",
        ap: 803,
      },
      {
        rank: 2,
        name: "PE_JAMERO",
        kills: 1396,
        death: 950,
        round: 219,
        kd: "1.11",
        kr: "0.87",
        sr: "0.29",
        hk: "0.47",
        ap: 803,
      },
      {
        rank: 3,
        name: "PE_JSTN",
        kills: 1392,
        death: 955,
        round: 198,
        kd: "1.10",
        kr: "0.85",
        sr: "0.28",
        hk: "0.44",
        ap: 803,
      },
      {
        rank: 4,
        name: "PE_MVA",
        kills: 1388,
        death: 1077,
        round: 192,
        kd: "0.99",
        kr: "0.79",
        sr: "0.27",
        hk: "0.42",
        ap: 803,
      },
      {
        rank: 5,
        name: "PE_REVENGE",
        kills: 1089,
        death: 1115,
        round: 141,
        kd: "0.96",
        kr: "0.77",
        sr: "0.25",
        hk: "0.41",
        ap: 803,
      },
    ],
  };
  const crossfireData = {
    dailyPlayers: [
      {
        rank: 1,
        name: "CF_KING",
        kills: 450,
        death: 45,
        round: 20,
        kd: "2.50",
        kr: "1.85",
        sr: "0.50",
        hk: "0.85",
        ap: 350,
      },
      {
        rank: 2,
        name: "SNIPER_PRO",
        kills: 380,
        death: 60,
        round: 20,
        kd: "1.95",
        kr: "1.40",
        sr: "0.60",
        hk: "0.75",
        ap: 310,
      },
      {
        rank: 3,
        name: "GHOST_ASSASSIN",
        kills: 350,
        death: 70,
        round: 19,
        kd: "1.80",
        kr: "1.30",
        sr: "0.45",
        hk: "0.70",
        ap: 280,
      },
      {
        rank: 4,
        name: "ALPHA_LEADER",
        kills: 320,
        death: 80,
        round: 18,
        kd: "1.60",
        kr: "1.20",
        sr: "0.40",
        hk: "0.65",
        ap: 260,
      },
      {
        rank: 5,
        name: "OMEGA_STRIKE",
        kills: 290,
        death: 90,
        round: 18,
        kd: "1.45",
        kr: "1.10",
        sr: "0.35",
        hk: "0.60",
        ap: 240,
      },
    ],
    weeklyPlayers: [
      {
        rank: 1,
        name: "CF_KING",
        kills: 2500,
        death: 500,
        round: 300,
        kd: "2.50",
        kr: "1.85",
        sr: "0.50",
        hk: "0.85",
        ap: 2000,
      },
      {
        rank: 2,
        name: "SNIPER_PRO",
        kills: 2100,
        death: 600,
        round: 280,
        kd: "1.95",
        kr: "1.40",
        sr: "0.60",
        hk: "0.75",
        ap: 1800,
      },
      {
        rank: 3,
        name: "GHOST_ASSASSIN",
        kills: 1900,
        death: 700,
        round: 260,
        kd: "1.80",
        kr: "1.30",
        sr: "0.45",
        hk: "0.70",
        ap: 1600,
      },
      {
        rank: 4,
        name: "ALPHA_LEADER",
        kills: 1700,
        death: 800,
        round: 250,
        kd: "1.60",
        kr: "1.20",
        sr: "0.40",
        hk: "0.65",
        ap: 1500,
      },
      {
        rank: 5,
        name: "OMEGA_STRIKE",
        kills: 1500,
        death: 900,
        round: 240,
        kd: "1.45",
        kr: "1.10",
        sr: "0.35",
        hk: "0.60",
        ap: 1400,
      },
    ],
  };
  const aggregateMatchRecords = (records) => {
    const playerStats = {};
    records.forEach((r) => {
      const ign = r.ign;
      if (!ign) return;
      if (!playerStats[ign]) {
        playerStats[ign] = {
          ign,
          kills: 0,
          deaths: 0,
          rounds: 0,
          headshots: 0,
          matchCount: 0,
        };
      }
      playerStats[ign].kills += Number(r.kills) || 0;
      playerStats[ign].deaths += Number(r.deaths) || 0;
      playerStats[ign].rounds += Number(r.rounds) || 0;
      playerStats[ign].headshots += Number(r.headshots) || 0;
      playerStats[ign].matchCount += 1;
    });
    return Object.values(playerStats)
      .sort((a, b) => b.kills - a.kills)
      .map((p, idx) => {
        const kd = p.deaths
          ? (p.kills / p.deaths).toFixed(2)
          : p.kills.toFixed(2);
        const kr = p.rounds ? (p.kills / p.rounds).toFixed(2) : "0.00";
        const sr = p.rounds
          ? ((p.rounds - p.deaths) / p.rounds).toFixed(2)
          : "0.00";
        const hk = p.kills ? (p.headshots / p.kills).toFixed(2) : "0.00";
        const ap = Math.round((p.kills / (p.rounds || 1)) * 100);
        return {
          rank: idx + 1,
          name: p.ign,
          kills: p.kills,
          death: p.deaths,
          round: p.rounds,
          kd,
          kr,
          sr,
          hk,
          ap,
        };
      });
  };
  const { displayDailyPlayers, displayWeeklyPlayers } = useMemo(() => {
    if (!matchRecords || matchRecords.length === 0) {
      return { displayDailyPlayers: [], displayWeeklyPlayers: [] };
    }
    const gameRecords = matchRecords.filter(
      (r) => r.game.toUpperCase() === activeGame,
    );
    if (gameRecords.length === 0)
      return { displayDailyPlayers: [], displayWeeklyPlayers: [] };
    const latestMatch = gameRecords[0];
    const latestWeek = latestMatch.week;
    const latestDay = latestMatch.day;
    const dailyRecords = gameRecords.filter(
      (r) => r.week === latestWeek && r.day === latestDay,
    );
    const weeklyRecords = gameRecords.filter((r) => r.week === latestWeek);
    return {
      displayDailyPlayers: aggregateMatchRecords(dailyRecords),
      displayWeeklyPlayers: aggregateMatchRecords(weeklyRecords),
    };
  }, [matchRecords, activeGame]);
  const filteredDaily = displayDailyPlayers.filter((p) =>
    p.name.toLowerCase().includes(dailySearch.toLowerCase()),
  );
  const filteredWeekly = displayWeeklyPlayers.filter((p) =>
    p.name.toLowerCase().includes(weeklySearch.toLowerCase()),
  );
  return (
    <div className="flex-1 bg-bg-100 text-theme-text-base overflow-y-auto flex flex-col h-full custom-scrollbar">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
        table th { padding: 16px 8px !important; }
        table th:first-child { padding-left: 24px !important; }
        table td { padding: 12px 8px !important; }
        table td:first-child { padding-left: 24px !important; }
      `}</style>
      <div
        className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center h-full"
        style={{ padding: "80px 48px 64px 48px" }}
      >
        <div
          className="w-full max-w-[1600px] h-full flex flex-col"
          style={{ gap: "32px" }}
        >
          <div
            className="grid grid-cols-1 xl:grid-cols-2 flex-1 min-h-[600px]"
            style={{ gap: "32px", paddingBottom: "32px" }}
          >
            {}
            <div className="bg-bg-200 rounded-2xl border border-theme-input shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col h-[450px] overflow-hidden relative group">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] to-transparent pointer-events-none z-0"></div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
              <div className="border-b border-theme-input bg-bg-300 relative z-10" style={{ padding: "32px" }}>
                <div className="flex justify-between items-center" style={{ marginBottom: "24px" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <span className="text-cyan-400 font-black text-sm">
                        D
                      </span>
                    </div>
                    <h3 className="text-[13px] font-black text-theme-text-base uppercase tracking-widest drop-shadow-md">
                      Daily Player Ranking
                    </h3>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" style={{ paddingLeft: "16px" }}>
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Player Here"
                    className="w-full bg-theme-input border border-theme-input text-sm text-theme-text-base rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner placeholder-gray-600 font-medium"
                    style={{ padding: "12px 16px 12px 44px" }}
                    value={dailySearch}
                    onChange={(e) => setDailySearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-bg-200 relative z-10" style={{ padding: "0 32px 32px 32px" }}>
                <table className="w-full text-center text-[11px]">
                  <thead className="bg-bg-300/90 backdrop-blur-md sticky top-0 text-theme-text-muted font-black shadow-md z-10 text-[9px] tracking-[0.15em] uppercase border-b border-theme-input">
                    <tr>
                      <th className="py-4 px-2 text-left pl-6">
                        Player Identity
                      </th>
                      <th className="py-4 px-1">Kills</th>
                      <th className="py-4 px-1">Death</th>
                      <th className="py-4 px-1">Round</th>
                      <th className="py-4 px-1 text-cyan-500/70">K/D</th>
                      <th className="py-4 px-1 text-cyan-500/70">K/R</th>
                      <th className="py-4 px-1 text-cyan-500/70">S/R</th>
                      <th className="py-4 px-1 text-cyan-500/70">H/K</th>
                      <th className="py-4 px-1 text-emerald-500/70">A/P</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-theme-input">
                    {filteredDaily.length > 0 ? (
                      filteredDaily.map((p, i) => (
                        <tr
                          key={i}
                          className="hover:bg-bg-300 transition-colors group cursor-pointer"
                        >
                          <td className="py-3 px-2 text-left pl-4 font-bold flex items-center" style={{ gap: "16px" }}>
                            <div
                              className={`w-6 h-6 flex items-center justify-center rounded-md font-black text-[10px] shadow-lg ${i === 0 ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : i === 1 ? "bg-slate-300/20 text-theme-text-base border border-slate-300/40" : i === 2 ? "bg-orange-700/20 text-orange-400 border border-orange-700/40" : "bg-theme-input text-theme-text-muted"}`}
                            >
                              {p.rank}
                            </div>
                            <span
                              className="truncate max-w-[120px] text-theme-text-base group-hover:text-cyan-400 transition-colors"
                              title={p.name}
                            >
                              {p.name}
                            </span>
                          </td>
                          <td className="py-3 px-1 text-theme-text-base font-semibold">
                            {p.kills}
                          </td>
                          <td className="py-3 px-1 text-theme-text-muted">
                            {p.death}
                          </td>
                          <td className="py-3 px-1 text-theme-text-muted">
                            {p.round}
                          </td>
                          <td className="py-3 px-1 text-cyan-400 font-black">
                            {p.kd}
                          </td>
                          <td className="py-3 px-1 text-cyan-400 font-black">
                            {p.kr}
                          </td>
                          <td className="py-3 px-1 text-cyan-400 font-black">
                            {p.sr}
                          </td>
                          <td className="py-3 px-1 text-cyan-400 font-black">
                            {p.hk}
                          </td>
                          <td className="py-3 px-1">
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded font-black text-[10px]">
                              {p.ap}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          className="py-12 text-slate-600 font-medium"
                        >
                          No players found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {}
            <div className="bg-bg-200 rounded-2xl border border-theme-input shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col h-[450px] overflow-hidden relative group">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/[0.03] to-transparent pointer-events-none z-0"></div>
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent"></div>
              <div className="border-b border-theme-input bg-bg-300 relative z-10" style={{ padding: "32px" }}>
                <div className="flex justify-between items-center" style={{ marginBottom: "24px" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
                      <span className="text-fuchsia-400 font-black text-sm">
                        W
                      </span>
                    </div>
                    <h3 className="text-[13px] font-black text-theme-text-base uppercase tracking-widest drop-shadow-md">
                      Weekly Player Ranking
                    </h3>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" style={{ paddingLeft: "16px" }}>
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Player Here"
                    className="w-full bg-theme-input border border-theme-input text-sm text-theme-text-base rounded-xl focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/50 transition-all shadow-inner placeholder-gray-600 font-medium"
                    style={{ padding: "12px 16px 12px 44px" }}
                    value={weeklySearch}
                    onChange={(e) => setWeeklySearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-bg-200 relative z-10" style={{ padding: "0 32px 32px 32px" }}>
                <table className="w-full text-center text-[11px]">
                  <thead className="bg-bg-300/90 backdrop-blur-md sticky top-0 text-theme-text-muted font-black shadow-md z-10 text-[9px] tracking-[0.15em] uppercase border-b border-theme-input">
                    <tr>
                      <th className="py-4 px-2 text-left pl-6">
                        Player Identity
                      </th>
                      <th className="py-4 px-1">Kills</th>
                      <th className="py-4 px-1">Death</th>
                      <th className="py-4 px-1">Round</th>
                      <th className="py-4 px-1 text-fuchsia-500/70">K/D</th>
                      <th className="py-4 px-1 text-fuchsia-500/70">K/R</th>
                      <th className="py-4 px-1 text-fuchsia-500/70">S/R</th>
                      <th className="py-4 px-1 text-fuchsia-500/70">H/K</th>
                      <th className="py-4 px-1 text-emerald-500/70">A/P</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-theme-input">
                    {filteredWeekly.length > 0 ? (
                      filteredWeekly.map((p, i) => (
                        <tr
                          key={i}
                          className="hover:bg-bg-300 transition-colors group cursor-pointer"
                        >
                          <td className="py-3 px-2 text-left pl-4 font-bold flex items-center" style={{ gap: "16px" }}>
                            <div
                              className={`w-6 h-6 flex items-center justify-center rounded-md font-black text-[10px] shadow-lg ${i === 0 ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" : i === 1 ? "bg-slate-300/20 text-theme-text-base border border-slate-300/40" : i === 2 ? "bg-orange-700/20 text-orange-400 border border-orange-700/40" : "bg-theme-input text-theme-text-muted"}`}
                            >
                              {p.rank}
                            </div>
                            <span
                              className="truncate max-w-[120px] text-theme-text-base group-hover:text-fuchsia-400 transition-colors"
                              title={p.name}
                            >
                              {p.name}
                            </span>
                          </td>
                          <td className="py-3 px-1 text-theme-text-base font-semibold">
                            {p.kills}
                          </td>
                          <td className="py-3 px-1 text-theme-text-muted">
                            {p.death}
                          </td>
                          <td className="py-3 px-1 text-theme-text-muted">
                            {p.round}
                          </td>
                          <td className="py-3 px-1 text-fuchsia-400 font-black">
                            {p.kd}
                          </td>
                          <td className="py-3 px-1 text-fuchsia-400 font-black">
                            {p.kr}
                          </td>
                          <td className="py-3 px-1 text-fuchsia-400 font-black">
                            {p.sr}
                          </td>
                          <td className="py-3 px-1 text-fuchsia-400 font-black">
                            {p.hk}
                          </td>
                          <td className="py-3 px-1">
                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded font-black text-[10px]">
                              {p.ap}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          className="py-12 text-slate-600 font-medium"
                        >
                          No players found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerRankings;
