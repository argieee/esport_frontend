import React, { useState, useMemo, useEffect } from "react";
import { apiFetch } from "../../utils/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
const IconBroadcast = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M8.111 16.404a5.5 5.5 0 010-8.808m7.778 8.808a5.5 5.5 0 000-8.808M12 12a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M4.929 19.071a10 10 0 010-14.142m14.142 0a10 10 0 010 14.142"
    />
  </svg>
);
const IconGame = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M15 5v2m-6-2v2M5 9h14l1 12H4L5 9zm4 5h2m2 0h2M9 14v2m6-2v2"
    />
  </svg>
);
const IconMap = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    />
  </svg>
);
const IconStats = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 10h4v10H3V10zm7-6h4v16h-4V4zm7 8h4v8h-4v-8z"
    />
  </svg>
);
const IconNotes = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);
const IconSave = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);
const SectionHeader = ({ icon, label, sub, accent = "#06b6d4" }) => (
  <div className="px-5 py-3.5 border-b border-slate-800/60 light:border-slate-200 flex items-center gap-3 bg-slate-900/30 light:bg-slate-50">
    <div
      className="p-1.5 rounded-lg flex-shrink-0"
      style={{
        backgroundColor: accent + "18",
        border: `1px solid ${accent}30`,
      }}
    >
      <span style={{ color: accent }}>{icon}</span>
    </div>
    <div>
      {sub && (
        <div className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600 light:text-slate-500 mb-0.5">
          {sub}
        </div>
      )}
      <h2 className="text-[11px] font-black text-white light:text-slate-900 uppercase tracking-[0.2em]">
        {label}
      </h2>
    </div>
  </div>
);
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
      {label}
    </label>
    {children}
  </div>
);
const inputBase =
  "bg-slate-800/50 light:bg-slate-50 border border-slate-700/70 light:border-slate-300 text-white light:text-slate-900 text-xs font-bold px-3 py-2.5 rounded-lg outline-none focus:border-cyan-500/70 light:focus:border-blue-500/70 focus:ring-2 focus:ring-cyan-500/10 light:focus:ring-blue-500/10 transition-all w-full placeholder-slate-600 light:placeholder-slate-400";
const selectBase =
  "bg-slate-800/50 light:bg-slate-50 border border-slate-700/70 light:border-slate-300 text-white light:text-slate-900 text-xs font-bold px-3 py-2.5 rounded-lg outline-none focus:border-cyan-500/70 light:focus:border-blue-500/70 focus:ring-2 focus:ring-cyan-500/10 light:focus:ring-blue-500/10 transition-all w-full cursor-pointer appearance-none";
const tableInput =
  "bg-transparent w-full text-center outline-none focus:bg-slate-800/70 light:focus:bg-slate-200 focus:ring-1 focus:ring-cyan-500/50 light:focus:ring-blue-500/50 rounded-md py-1.5 transition-all text-xs font-bold text-white light:text-slate-900";
function useStickyState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    try {
      const stickyValue = window.sessionStorage.getItem(key);
      if (stickyValue !== null) return JSON.parse(stickyValue);
    } catch (e) {
      console.warn("Error reading sessionStorage", e);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const isRemote = React.useRef(false);
  
  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    const room = window.currentDataEntryRoom || "Default";
    if (!isRemote.current) {
      socket.emit('cellEdit', { room, field: key, new_value: value });
    }
    isRemote.current = false;
  }, [key, value]);

  useEffect(() => {
    const room = window.currentDataEntryRoom || "Default";
    const handleEdit = (data) => {
      if (data.field === key && data.room === room) {
        if (JSON.stringify(data.new_value) !== JSON.stringify(value)) {
          isRemote.current = true;
          setValue(data.new_value);
        }
      }
    };
    socket.on('cellEdit', handleEdit);
    return () => socket.off('cellEdit', handleEdit);
  }, [key, value]);

  return [value, setValue];
}
const DataEntry = ({ globalGame, globalTournament }) => {
  window.currentDataEntryRoom = `DataEntry_${globalTournament || "Default"}`;
  
  useEffect(() => {
    socket.emit('joinRoom', window.currentDataEntryRoom);
  }, [globalTournament]);

  const [broadcast, setBroadcast] = useStickyState(false, "de_broadcast");
  const game = globalGame === "CROSSFIRE" ? "Crossfire" : "Valorant";
  const [league, setLeague] = useStickyState("VCT Pacific", "de_league");
  const [week, setWeek] = useStickyState("1", "de_week");
  const [day, setDay] = useStickyState("1", "de_day");
  const [match, setMatch] = useStickyState("1", "de_match");
  const [setNum, setSetNum] = useStickyState("1", "de_setNum");
  const safeFolder = (globalTournament || "").replace(/\W+/g, "");
  const matchScope = `de_f${safeFolder}_w${week}_d${day}_m${match}`;
  const setScope = `${matchScope}_s${setNum}`;
  const [teamA, setTeamA] = useStickyState(
    { name: "WOLF ESPORT", logo: "" },
    `${matchScope}_teamA`,
  );
  const [teamB, setTeamB] = useStickyState(
    { name: "GOAT GAMING", logo: "" },
    `${matchScope}_teamB`,
  );
  const [winner, setWinner] = useStickyState("A", `${matchScope}_winner`);
  const [mapName, setMapName] = useStickyState("Bind", `${setScope}_mapName`);
  const [scoreA, setScoreA] = useStickyState(13, `${setScope}_scoreA`);
  const [scoreB, setScoreB] = useStickyState(11, `${setScope}_scoreB`);
  const [roundLogsA, setRoundLogsA] = useStickyState(
    Array(25).fill(""),
    `${setScope}_roundLogsA`,
  );
  const [roundLogsB, setRoundLogsB] = useStickyState(
    Array(25).fill(""),
    `${setScope}_roundLogsB`,
  );
  const [sideA, setSideA] = useStickyState("GR", `${setScope}_sideA`);
  const [sideB, setSideB] = useStickyState("BL", `${setScope}_sideB`);
  const [timeoutA, setTimeoutA] = useStickyState(
    "AVAILABLE",
    `${setScope}_timeoutA`,
  );
  const [timeoutB, setTimeoutB] = useStickyState(
    "AVAILABLE",
    `${setScope}_timeoutB`,
  );
  const [timeoutRowLogs, setTimeoutRowLogs] = useStickyState(
    Array(25).fill(""),
    `${setScope}_timeoutRowLogs`,
  );
  const [deadRoundRowLogs, setDeadRoundRowLogs] = useStickyState(
    Array(25).fill(""),
    `${setScope}_deadRoundRowLogs`,
  );
  const [matchWin, setMatchWin] = useStickyState("B", `${setScope}_matchWin`);
  const [playersA, setPlayersA] = useStickyState(() => {
    const defaultAgents = ["Jett", "Fade", "Neon", "Clove", "Chamber"];
    const defaultIGNs = [
      "XIP Hotsauze",
      "XIP Emman",
      "XIP JA",
      "XIP Fixyy",
      "XIP Rizza",
    ];
    const defaultK = [20, 13, 11, 9, 5];
    const defaultD = [15, 12, 12, 7, 6];
    const defaultA = [5, 5, 6, 2, 3];
    const defaultACS = [2019, 1571, 1901, 1673, 1666];
    const defaultEcon = [561, 532, 521, 492, 438];
    return defaultIGNs.map((ign, i) => ({
      ign: ign,
      agent: defaultAgents[i],
      k: defaultK[i],
      d: defaultD[i],
      a: defaultA[i],
      acs: defaultACS[i],
      econ: defaultEcon[i],
    }));
  }, `${setScope}_playersA`);
  const [playersB, setPlayersB] = useStickyState(() => {
    const defaultAgents = ["Viper", "Omen", "Gekko"];
    const defaultIGNs = ["XIP Hotsauze", "XIP Hotsauze", "XIP Hotsauze"];
    const defaultK = [2, 2, 4];
    const defaultD = [5, 6, 7];
    const defaultA = [12, 0, 12];
    const defaultACS = [1037, 941, 810];
    const defaultEcon = [255, 234, 214];
    return Array(5)
      .fill(null)
      .map((_, i) => ({
        ign: i < 3 ? defaultIGNs[i] : "GOAT",
        agent: i < 3 ? defaultAgents[i] : "Sage",
        k: i < 3 ? defaultK[i] : 0,
        d: i < 3 ? defaultD[i] : 0,
        a: i < 3 ? defaultA[i] : 0,
        acs: i < 3 ? defaultACS[i] : 0,
        econ: i < 3 ? defaultEcon[i] : 0,
      }));
  }, `${setScope}_playersB`);
  const [notes, setNotes] = useStickyState(
    "Pause at 12:00 due to the technical issue",
    `${setScope}_notes`,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useStickyState("stats", "de_activeTab");
  const [heatmapData, setHeatmapData] = useStickyState(
    [],
    `${setScope}_heatmapData`,
  );
  const [selectedRound, setSelectedRound] = useState(1);
  const [selectedAction, setSelectedAction] = useState("Plant");
  const [manualX, setManualX] = useState("");
  const [manualY, setManualY] = useState("");
  const handleManualAdd = () => {
    if (manualX !== "" && manualY !== "") {
      setHeatmapData((prev) => [
        ...prev,
        {
          id: Date.now(),
          round: selectedRound,
          type: selectedAction,
          x: parseFloat(manualX).toFixed(2),
          y: parseFloat(manualY).toFixed(2),
        },
      ]);
      setManualX("");
      setManualY("");
    }
  };
  const handleMapClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHeatmapData((prev) => [
      ...prev,
      {
        id: Date.now(),
        round: selectedRound,
        type: selectedAction,
        x: x.toFixed(2),
        y: y.toFixed(2),
      },
    ]);
  };
  const removeHeatmapEvent = (id) => {
    setHeatmapData((prev) => prev.filter((h) => h.id !== id));
  };
  // Crossfire Adaptive Columns State (Groups of K, D, A, H)
  const [cfStatsMode, setCfStatsMode] = useStickyState("adaptive", `${setScope}_cfStatsMode`); // "adaptive" | "perRound"

  const [cfGroups, setCfGroups] = useStickyState(
    [{ id: "g1", label: "TOTAL PLAYER STATS", isTotal: true }],
    `${setScope}_cfGroups`,
  );
  const handleAddCfGroup = () => {
    const newId = `g_${Date.now()}`;
    setCfGroups([...cfGroups, { id: newId, label: "NEW STATS" }]);
  };
  const handleRemoveCfGroup = (id) => {
    setCfGroups(cfGroups.filter((g) => g.id !== id));
  };
  const handleUpdateCfGroupLabel = (id, label) => {
    setCfGroups(cfGroups.map((g) => (g.id === id ? { ...g, label } : g)));
  };
  const updateRoundEvent = (team, idx, val) => {
    let value = val.toUpperCase().slice(-1);
    if (!["K", "D", "P", "T", ""].includes(value)) {
      value = "";
    }
    if (team === "A") {
      const logs = [...roundLogsA];
      logs[idx] = value;
      setRoundLogsA(logs);
      if (value !== "") {
        const logsB = [...roundLogsB];
        logsB[idx] = "";
        setRoundLogsB(logsB);
      }
    } else {
      const logs = [...roundLogsB];
      logs[idx] = value;
      setRoundLogsB(logs);
      if (value !== "") {
        const logsA = [...roundLogsA];
        logsA[idx] = "";
        setRoundLogsA(logsA);
      }
    }
  };
  const updatePlayer = (team, idx, field, value) => {
    if (team === "A") {
      const p = [...playersA];
      p[idx] = { ...p[idx], [field]: value };
      setPlayersA(p);
    } else {
      const p = [...playersB];
      p[idx] = { ...p[idx], [field]: value };
      setPlayersB(p);
    }
  };
  const [lifetimeStats, setLifetimeStats] = useState({});
  const [dbTeams, setDbTeams] = useState([]);
  const [dbPlayers, setDbPlayers] = useState([]);
  const calculateWinProbability = () => {
    const totalRounds = scoreA + scoreB;
    if (totalRounds === 0) return { a: 50, b: 50 };
    const probA = Math.round((scoreA / totalRounds) * 100);
    return { a: probA, b: 100 - probA };
  };
  const winProb = calculateWinProbability();
  useEffect(() => {
    setPlayersA((prev) =>
      prev.map((p) => {
        if (p.ign && p.ign.startsWith("Player")) {
          return { ...p, ign: p.ign.split(": ")[1] || p.ign };
        }
        return p;
      }),
    );
    setPlayersB((prev) =>
      prev.map((p) => {
        if (p.ign && p.ign.startsWith("Player")) {
          return { ...p, ign: p.ign.split(": ")[1] || p.ign };
        }
        return p;
      }),
    );
  }, []);
  useEffect(() => {
    apiFetch(`/api/teams?tournament=${encodeURIComponent(globalTournament)}`)
      .then((r) => r.json())
      .then(setDbTeams)
      .catch(console.error);
    apiFetch(`/api/players?tournament=${encodeURIComponent(globalTournament)}`)
      .then((r) => r.json())
      .then(setDbPlayers)
      .catch(console.error);
  }, [globalTournament]);
  const handleTeamSelect = (side, teamName) => {
    if (side === "A") {
      setTeamA({ ...teamA, name: teamName });
    } else {
      setTeamB({ ...teamB, name: teamName });
    }
    setRoundLogsA(Array(25).fill(""));
    setRoundLogsB(Array(25).fill(""));
    setTimeoutRowLogs(Array(25).fill(""));
    setDeadRoundRowLogs(Array(25).fill(""));
    setTimeoutA("AVAILABLE");
    setTimeoutB("AVAILABLE");
    const team = dbTeams.find((t) => t.team_name === teamName);
    if (team) {
      const teamPlayers = dbPlayers.filter((p) => p.team_id === team.team_id);
      const updatedPlayers = Array(5)
        .fill(null)
        .map((_, i) => {
          const p = teamPlayers[i];
          return {
            ign: p ? p.player_name : "",
            agent: "Jett",
            k: 0,
            d: 0,
            a: 0,
            acs: 0,
            econ: 0,
          };
        });
      if (side === "A") {
        setPlayersA(updatedPlayers);
      } else {
        setPlayersB(updatedPlayers);
      }
    }
  };
  useEffect(() => {
    if (game === "Crossfire") {
      apiFetch("/api/stats/crossfire")
        .then((res) => res.json())
        .then((data) => {
          const statsMap = {};
          if (Array.isArray(data)) {
            data.forEach((row) => {
              statsMap[row.ign] = row;
            });
          }
          setLifetimeStats(statsMap);
        })
        .catch((err) => console.error("Error fetching Crossfire stats:", err));
    }
  }, [game, submitSuccess]);
  const getCfTotal = (player, field) => {
    const history = lifetimeStats[player.ign] || {};
    let dbValue = 0;
    if (field === "k") dbValue = history.total_kills || 0;
    if (field === "d") dbValue = history.total_deaths || 0;
    if (field === "a") dbValue = history.total_assists || 0;
    if (field === "h") dbValue = history.total_headshots || 0;
    const newSum = cfGroups.reduce((sum, g) => {
      if (g.isTotal) return sum;
      const val = player[`${g.id}_${field}`];
      return sum + (Number(val) || 0);
    }, 0);
    return dbValue + newSum;
  };
  const calcRoundScore = (logs) => logs.filter((v) => v !== "").length;
  const autoScoreA = calcRoundScore(roundLogsA);
  const autoScoreB = calcRoundScore(roundLogsB);
  const currentRoundNo = Math.min(
    25,
    roundLogsA.filter((v) => v !== "").length +
      roundLogsB.filter((v) => v !== "").length +
      1,
  );
  const handleTimeoutChange = (team, val) => {
    if (team === "A") {
      setTimeoutA(val);
    } else {
      setTimeoutB(val);
    }
  };
  useEffect(() => {
    setScoreA(autoScoreA);
    setScoreB(autoScoreB);
    if (autoScoreA > autoScoreB) {
      setMatchWin("A");
    } else if (autoScoreB > autoScoreA) {
      setMatchWin("B");
    }
  }, [autoScoreA, autoScoreB, setMatchWin, setScoreA, setScoreB]);
  const agents = [
    "Jett",
    "Fade",
    "Neon",
    "Clove",
    "Chamber",
    "Viper",
    "Omen",
    "Gekko",
    "Reyna",
    "Sage",
    "Breach",
    "Phoenix",
    "Sova",
    "Killjoy",
    "Cypher",
    "Raze",
    "Skye",
    "Kay/O",
    "Astra",
    "Brimstone",
    "Harbor",
    "Deadlock",
    "Iso",
    "Vyse",
  ];
  const valorantMaps = [
    "Abyss",
    "Ascent",
    "Bind",
    "Breeze",
    "Corrode",
    "Fracture",
    "Haven",
    "Icebox",
    "Lotus",
    "Pearl",
    "Split",
    "Summit",
    "Sunset",
  ];
  const handleSubmit = async () => {
    const matchHeader = { league, week, day, match, setNum, mapName };
    if (game === "Crossfire") {
      setIsSubmitting(true);
      try {
        const payloadMap = {};
        const rawEntries = [];
        const extractNewStats = (p, teamName, isWin) => {
          let kills = 0,
            deaths = 0,
            assists = 0,
            headshots = 0;
          if (cfStatsMode === "perRound") {
            Array.from({ length: 25 }).forEach((_, i) => {
              const rK = Number(p[`r${i+1}_k`]) || 0;
              const rD = Number(p[`r${i+1}_d`]) || 0;
              const rA = Number(p[`r${i+1}_a`]) || 0;
              const rH = Number(p[`r${i+1}_h`]) || 0;
              if (p.ign && (rK > 0 || rD > 0 || rA > 0 || rH > 0)) {
                rawEntries.push({
                  ign: p.ign, kills: rK, deaths: rD, assists: rA, headshots: rH, team_name: teamName, win: isWin
                });
                kills += rK; deaths += rD; assists += rA; headshots += rH;
              }
            });
          } else {
            cfGroups.forEach((g) => {
              if (!g.isTotal) {
                const k = Number(p[`${g.id}_k`]) || 0;
                const d = Number(p[`${g.id}_d`]) || 0;
                const a = Number(p[`${g.id}_a`]) || 0;
                const h = Number(p[`${g.id}_h`]) || 0;
                if (p.ign && (k > 0 || d > 0 || a > 0 || h > 0)) {
                  rawEntries.push({
                    ign: p.ign,
                    kills: k,
                    deaths: d,
                    assists: a,
                    headshots: h,
                    team_name: teamName,
                    win: isWin,
                  });
                }
                kills += k;
                deaths += d;
                assists += a;
                headshots += h;
              }
            });
          }
          if (
            p.ign &&
            (kills > 0 || deaths > 0 || assists > 0 || headshots > 0)
          ) {
            if (payloadMap[p.ign]) {
              payloadMap[p.ign].kills += kills;
              payloadMap[p.ign].deaths += deaths;
              payloadMap[p.ign].assists += assists;
              payloadMap[p.ign].headshots += headshots;
            } else {
              payloadMap[p.ign] = {
                ign: p.ign,
                kills,
                deaths,
                assists,
                headshots,
                rounds: scoreA + scoreB,
                team_name: teamName,
                win: isWin,
              };
            }
          }
        };
        playersA.forEach((p) =>
          extractNewStats(p, teamA.name, matchWin === "A"),
        );
        playersB.forEach((p) =>
          extractNewStats(p, teamB.name, matchWin === "B"),
        );
        const payloadPlayers = Object.values(payloadMap);
        if (payloadPlayers.length > 0) {
          const res = await apiFetch("/api/stats/crossfire/match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              players: payloadPlayers,
              rawEntries,
              matchHeader,
              tournamentName: globalTournament,
            }),
          });
          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || "Failed to submit stats");
          }
        }
        if (heatmapData.length > 0) {
          const match_id = `${teamA.name}_vs_${teamB.name}_${mapName}_${Date.now()}`;
          const formattedHeatmap = heatmapData.map((h) => ({
            game: "Crossfire",
            match_id,
            round_number: h.round,
            event_type: h.type,
            coord_x: h.x,
            coord_y: h.y,
          }));
          const heatmapRes = await apiFetch("/api/stats/heatmap", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ events: formattedHeatmap }),
          });
          if (!heatmapRes.ok) {
            const errData = await heatmapRes.json();
            throw new Error(errData.error || "Failed to submit heatmap data");
          }
        }
        setIsSubmitting(false);
        setSubmitSuccess(true);
        alert(
          `Match Submitted! ${matchWin === "A" ? teamA.name : teamB.name} has won the match!`,
        );
        setTimeout(() => setSubmitSuccess(false), 3000);
        setHeatmapData([]);
        setCfGroups([{ id: "g1", label: "TOTAL PLAYER STATS", isTotal: true }]);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
        alert("Error submitting Crossfire stats: " + err.message);
      }
    } else {
      setIsSubmitting(true);
      try {
        const payloadMap = {};
        const extractNewStats = (p, teamName, isWin) => {
          if (
            p.ign &&
            (Number(p.k) > 0 ||
              Number(p.d) > 0 ||
              Number(p.a) > 0 ||
              Number(p.acs) > 0 ||
              Number(p.econ) > 0)
          ) {
            if (payloadMap[p.ign]) {
              payloadMap[p.ign].kills += Number(p.k) || 0;
              payloadMap[p.ign].deaths += Number(p.d) || 0;
              payloadMap[p.ign].assists += Number(p.a) || 0;
              payloadMap[p.ign].acs += Number(p.acs) || 0;
              payloadMap[p.ign].econ += Number(p.econ) || 0;
            } else {
              payloadMap[p.ign] = {
                ign: p.ign,
                kills: Number(p.k) || 0,
                deaths: Number(p.d) || 0,
                assists: Number(p.a) || 0,
                acs: Number(p.acs) || 0,
                econ: Number(p.econ) || 0,
                rounds: scoreA + scoreB,
                agentRole: "Rifler",
                team_name: teamName,
                win: isWin,
              };
            }
          }
        };
        playersA.forEach((p) =>
          extractNewStats(p, teamA.name, matchWin === "A"),
        );
        playersB.forEach((p) =>
          extractNewStats(p, teamB.name, matchWin === "B"),
        );
        const payloadPlayers = Object.values(payloadMap);
        if (payloadPlayers.length > 0) {
          const res = await apiFetch("/api/stats/valorant/match", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              players: payloadPlayers,
              matchHeader,
              tournamentName: globalTournament,
            }),
          });
          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || "Failed to submit stats");
          }
        }
        if (heatmapData.length > 0) {
          const match_id = `${teamA.name}_vs_${teamB.name}_${mapName}_${Date.now()}`;
          const formattedHeatmap = heatmapData.map((h) => ({
            game: "Valorant",
            match_id,
            round_number: h.round,
            event_type: h.type,
            coord_x: h.x,
            coord_y: h.y,
          }));
          const heatmapRes = await apiFetch("/api/stats/heatmap", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ events: formattedHeatmap }),
          });
          if (!heatmapRes.ok) {
            const errData = await heatmapRes.json();
            throw new Error(errData.error || "Failed to submit heatmap data");
          }
        }
        setIsSubmitting(false);
        setSubmitSuccess(true);
        alert(
          `Match Submitted! ${matchWin === "A" ? teamA.name : teamB.name} has won the match!`,
        );
        setTimeout(() => setSubmitSuccess(false), 3000);
        setHeatmapData([]);
      } catch (err) {
        console.error(err);
        setIsSubmitting(false);
        alert("Error submitting Valorant stats: " + err.message);
      }
    }
  };
  const handleCancel = () => {
    if (window.confirm("Clear all data? This cannot be undone.")) {
      setLeague("");
      setWeek("1");
      setDay("1");
      setMatch("1");
      setSetNum("1");
      setTeamA({ name: "", logo: "" });
      setTeamB({ name: "", logo: "" });
      setWinner("A");
      setMapName("Bind");
      setScoreA(0);
      setScoreB(0);
      setRoundLogsA(Array(25).fill(""));
      setRoundLogsB(Array(25).fill(""));
      setPlayersA(
        Array(5)
          .fill(null)
          .map((_, i) => ({
            ign: "",
            agent: "Jett",
            k: 0,
            d: 0,
            a: 0,
            acs: 0,
            econ: 0,
          })),
      );
      setPlayersB(
        Array(5)
          .fill(null)
          .map((_, i) => ({
            ign: "",
            agent: "Jett",
            k: 0,
            d: 0,
            a: 0,
            acs: 0,
            econ: 0,
          })),
      );
      setNotes("");
      setBroadcast(false);
      setHeatmapData([]);
      setCfGroups([{ id: "g1", label: "TOTAL PLAYER STATS", isTotal: true }]);
      setTimeoutARound(null);
      setTimeoutBRound(null);
      setTimeoutRowLogs(Array(25).fill(""));
      setDeadRoundRowLogs(Array(25).fill(""));
    }
  };
  return (
    <div className="h-full flex flex-col bg-[#090e14] light:bg-[#f8fafc] text-slate-200 light:text-slate-800">
      <style>{`
        /* Hide number input spinners */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
        .de-scroll::-webkit-scrollbar { width: 5px; }
        .de-scroll::-webkit-scrollbar-track { background: transparent; }
        .de-scroll::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 9999px; }
        .de-scroll::-webkit-scrollbar-thumb:hover { background: #334155; }
        @keyframes submitPulse {
          0%, 100% { box-shadow: 0 0 15px rgba(6,182,212,0.2); }
          50% { box-shadow: 0 0 30px rgba(6,182,212,0.5); }
        }
        @keyframes successFlash {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .submit-pulse { animation: submitPulse 2s ease-in-out infinite; }
        .success-flash { animation: successFlash 0.3s ease; }
        .round-btn { transition: all 0.15s ease; }
        .round-btn:active { transform: scale(0.88); }
      `}</style>
      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto de-scroll flex flex-col items-center">
        <div className="w-full max-w-[1400px] px-8 lg:px-12 py-6 lg:py-8 flex flex-col gap-5">
          {/* ── Top Bar: Broadcast Toggle ── */}
          <div className="flex items-center justify-end gap-3">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg shadow-sm" title="Your edits are instantly saved and synced with other admins">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Live Auto-Saving
              </span>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/40 light:bg-white border border-slate-700/50 light:border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Broadcast
              </span>
              <button
                onClick={() => setBroadcast(!broadcast)}
                className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 ${broadcast ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" : "bg-slate-700"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${broadcast ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
              <span
                className={`text-[9px] font-black uppercase tracking-widest transition-colors ${broadcast ? "text-emerald-400" : "text-slate-600"}`}
              >
                {broadcast ? "ON AIR" : "OFF"}
              </span>
            </div>
          </div>
          {/* ── Row 1: Match Header + Teams ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Match Header */}
            <div className="lg:col-span-2 bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm">
              <SectionHeader
                icon={<IconGame />}
                label="Main Match Header"
                sub="Configuration"
              />
              <div className="p-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Field label="League/Tournament:">
                  <input
                    type="text"
                    className={inputBase}
                    value={league}
                    onChange={(e) => setLeague(e.target.value)}
                    placeholder="e.g. VCT Pacific"
                  />
                </Field>
                <Field label="Week:">
                  <input
                    type="number"
                    className={inputBase}
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                  />
                </Field>
                <Field label="Day:">
                  <input
                    type="number"
                    className={inputBase}
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                  />
                </Field>
                <Field label="Match:">
                  <input
                    type="number"
                    className={inputBase}
                    value={match}
                    onChange={(e) => setMatch(e.target.value)}
                  />
                </Field>
                <Field label="Set:">
                  <input
                    type="number"
                    className={inputBase}
                    value={setNum}
                    onChange={(e) => setSetNum(e.target.value)}
                  />
                </Field>
                <Field label="Map:">
                  <div className="relative">
                    <select
                      className={selectBase}
                      value={mapName}
                      onChange={(e) => setMapName(e.target.value)}
                    >
                      {game === "Valorant" ? (
                        valorantMaps.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))
                      ) : (
                        <>
                          <option>Ankara</option>
                          <option>Black Widow</option>
                          <option>Compound</option>
                          <option>Eagle Eye</option>
                          <option>Mexico</option>
                          <option>Port</option>
                          <option>Sub Base</option>
                        </>
                      )}
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      ▾
                    </div>
                  </div>
                </Field>
              </div>
            </div>
            {/* Teams */}
            <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm">
              <SectionHeader
                icon={<IconGame />}
                label="Teams"
                sub="Matchup"
                accent="#6366f1"
              />
              <div className="p-5 flex flex-col gap-3">
                {/* Team A & B side by side */}
                <div className="flex gap-3">
                  <div className="flex-1 bg-blue-900/10 border border-blue-900/30 rounded-xl p-3 flex flex-col items-center gap-2 hover:border-blue-700/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-blue-900/30 border border-blue-800/40 flex items-center justify-center text-lg font-black text-blue-400 shrink-0 overflow-hidden">
                      {dbTeams.find((t) => t.team_name === teamA.name)
                        ?.logo_url ? (
                        <img
                          src={
                            dbTeams.find((t) => t.team_name === teamA.name)
                              .logo_url
                          }
                          alt="Logo"
                          className="w-8 h-8 object-contain drop-shadow-md"
                        />
                      ) : teamA.name ? (
                        teamA.name[0]
                      ) : (
                        "A"
                      )}
                    </div>
                    <div className="text-center w-full">
                      <div className="text-[9px] font-black uppercase tracking-widest text-blue-500 mb-0.5">
                        Team A:
                      </div>
                      <select
                        className="bg-transparent text-[10px] font-black text-white w-full text-center outline-none border-b border-transparent focus:border-blue-500 transition-colors pb-0.5 appearance-none cursor-pointer"
                        value={teamA.name}
                        onChange={(e) => handleTeamSelect("A", e.target.value)}
                      >
                        <option value="" className="text-black">
                          Select Team A
                        </option>
                        {dbTeams.map((t) => (
                          <option
                            key={t.team_id}
                            value={t.team_name}
                            className="text-black"
                          >
                            {t.team_name}
                          </option>
                        ))}
                        <option value={teamA.name} className="hidden">
                          {teamA.name}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-1 bg-red-900/10 border border-red-900/30 rounded-xl p-3 flex flex-col items-center gap-2 hover:border-red-700/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-red-900/30 border border-red-800/40 flex items-center justify-center text-lg font-black text-red-400 shrink-0 overflow-hidden">
                      {dbTeams.find((t) => t.team_name === teamB.name)
                        ?.logo_url ? (
                        <img
                          src={
                            dbTeams.find((t) => t.team_name === teamB.name)
                              .logo_url
                          }
                          alt="Logo"
                          className="w-8 h-8 object-contain drop-shadow-md"
                        />
                      ) : teamB.name ? (
                        teamB.name[0]
                      ) : (
                        "B"
                      )}
                    </div>
                    <div className="text-center w-full">
                      <div className="text-[9px] font-black uppercase tracking-widest text-red-500 mb-0.5">
                        Team B:
                      </div>
                      <select
                        className="bg-transparent text-[10px] font-black text-white w-full text-center outline-none border-b border-transparent focus:border-red-500 transition-colors pb-0.5 appearance-none cursor-pointer"
                        value={teamB.name}
                        onChange={(e) => handleTeamSelect("B", e.target.value)}
                      >
                        <option value="" className="text-black">
                          Select Team B
                        </option>
                        {dbTeams.map((t) => (
                          <option
                            key={t.team_id}
                            value={t.team_name}
                            className="text-black"
                          >
                            {t.team_name}
                          </option>
                        ))}
                        <option value={teamB.name} className="hidden">
                          {teamB.name}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* Winner */}
                <div className="flex items-center justify-between bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 rounded-xl px-3.5 py-2.5">
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-0.5">
                      Winner:
                    </div>
                    <div
                      className={`text-xs font-black ${winner === "A" ? "text-blue-400 light:text-blue-600" : "text-red-400 light:text-red-600"}`}
                    >
                      {winner === "A" ? teamA.name : teamB.name}
                    </div>
                  </div>
                  <button
                    onClick={() => setWinner(winner === "A" ? "B" : "A")}
                    className={`w-11 h-6 rounded-full p-0.5 transition-all duration-300 ${winner === "A" ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"}`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${winner === "B" ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* ── Map Module (Visible when Valorant is selected) ── */}
          {game === "Valorant" && (
            <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm">
              <SectionHeader
                icon={<IconMap />}
                label="A. Valorant Map Module"
                sub="Visible because valorant is selected"
                accent="#f59e0b"
              />
              <div className="p-5">
                {/* Score */}
                <div className="flex flex-wrap items-end gap-4 mb-6">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">
                      Score
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800/50 light:bg-slate-50 border border-slate-700/70 light:border-slate-300 rounded-lg px-3 py-2">
                      <input
                        type="number"
                        className="bg-transparent text-white light:text-slate-900 text-sm font-black w-10 text-center outline-none"
                        value={scoreA}
                        onChange={(e) => setScoreA(Number(e.target.value) || 0)}
                        min="0"
                        max="99"
                      />
                      <span className="text-slate-500 font-black">—</span>
                      <input
                        type="number"
                        className="bg-transparent text-white light:text-slate-900 text-sm font-black w-10 text-center outline-none"
                        value={scoreB}
                        onChange={(e) => setScoreB(Number(e.target.value) || 0)}
                        min="0"
                        max="99"
                      />
                    </div>
                  </div>
                </div>
                {/* Old Round Tracker Removed */}
              </div>
            </div>
          )}
          {/* ── Crossfire Map Module (Visible when Crossfire is selected) ── */}
          {game === "Crossfire" && (
            <div className="bg-[#0d131c] rounded-2xl border border-slate-800/50 overflow-hidden shadow-xl">
              <SectionHeader
                icon={<IconMap />}
                label="A. Crossfire Map Module"
                sub="Visible because crossfire is selected"
                accent="#f59e0b"
              />
              <div className="p-5">
                <div className="flex flex-wrap items-end gap-8">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-1.5">
                      Score
                    </div>
                    <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/70 rounded-lg px-3 py-2">
                      <input
                        type="number"
                        className="bg-transparent text-white text-sm font-black w-10 text-center outline-none"
                        value={scoreA}
                        onChange={(e) => setScoreA(Number(e.target.value) || 0)}
                        min="0"
                        max="99"
                      />
                      <span className="text-slate-500 font-black">—</span>
                      <input
                        type="number"
                        className="bg-transparent text-white text-sm font-black w-10 text-center outline-none"
                        value={scoreB}
                        onChange={(e) => setScoreB(Number(e.target.value) || 0)}
                        min="0"
                        max="99"
                      />
                    </div>
                  </div>
                  {/* Live Win Probability Assessment */}
                  <div className="flex-1 max-w-md">
                    <div className="flex justify-between items-center mb-1.5">
                      <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                        Live Win Probability
                      </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/70 rounded-lg p-3">
                      <div className="flex justify-between text-[10px] font-black tracking-widest mb-2">
                        <span className="text-blue-400">
                          {teamA.name || "Team A"} ({winProb.a}%)
                        </span>
                        <span className="text-red-400">
                          ({winProb.b}%) {teamB.name || "Team B"}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${winProb.a}%` }}
                        ></div>
                        <div
                          className="h-full bg-red-500 transition-all duration-500"
                          style={{ width: `${winProb.b}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* ── Detailed Round Log & Timeouts ── */}
          <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm mb-5">
            <SectionHeader
              icon={<IconBroadcast />}
              label="Detailed Round Log"
              sub="Tracker"
              accent="#ec4899"
            />
            <div className="p-5 overflow-x-auto de-scroll">
              <table className="w-full text-center border-collapse min-w-[1200px] text-[10px] font-black uppercase tracking-wider text-slate-300 light:text-slate-600">
                <thead>
                  <tr className="bg-slate-800/80 light:bg-slate-100 border-b border-slate-700/50 light:border-slate-300">
                    <th className="py-2 px-3 border-r border-slate-700/50 light:border-slate-300 text-left w-48">
                      Team
                    </th>
                    <th className="py-2 px-2 border-r border-slate-700/50 light:border-slate-300 w-16">
                      Win
                    </th>
                    <th className="py-2 px-2 border-r border-slate-700/50 light:border-slate-300 w-20">
                      Side
                    </th>
                    {Array(25)
                      .fill(null)
                      .map((_, i) => (
                        <th
                          key={i}
                          className={`py-2 px-1 w-7 relative ${(game === "Crossfire" ? i === 8 || i === 17 || i === 23 : i === 11 || i === 23) ? "border-r-2 border-slate-500 light:border-slate-400" : "border-r border-slate-700/50 light:border-slate-300"}`}
                        >
                          R{i + 1}
                        </th>
                      ))}
                    <th className="py-2 px-2 border-r border-slate-700/50 light:border-slate-300 w-20 text-emerald-400 light:text-emerald-600">
                      R. Score
                    </th>
                    <th className="py-2 px-2 text-emerald-400 light:text-emerald-600">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Team A Row */}
                  <tr className="border-b border-slate-700/50 bg-blue-900/10">
                    <td className="py-2 px-3 border-r border-slate-700/50 text-left text-blue-400">
                      {teamA.name || "Team A"}
                    </td>
                    <td className="py-2 px-2 border-r border-slate-700/50">
                      <select
                        className="bg-transparent text-center outline-none cursor-pointer w-full"
                        value={matchWin === "A" ? "Yes" : "No"}
                        onChange={(e) =>
                          setMatchWin(e.target.value === "Yes" ? "A" : "B")
                        }
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </td>
                    <td className="py-2 px-2 border-r border-slate-700/50">
                      <select
                        className="bg-transparent text-center outline-none cursor-pointer w-full"
                        value={sideA}
                        onChange={(e) => setSideA(e.target.value)}
                      >
                        {game === "Valorant" ? (
                          <>
                            <option>ATK</option>
                            <option>DEF</option>
                          </>
                        ) : (
                          <>
                            <option>GR</option>
                            <option>BL</option>
                          </>
                        )}
                      </select>
                    </td>
                    {roundLogsA.map((val, i) => (
                      <td
                        key={i}
                        className={`py-1 px-0.5 ${(game === "Crossfire" ? i === 8 || i === 17 || i === 23 : i === 11 || i === 23) ? "border-r-2 border-slate-500" : "border-r border-slate-700/50"}`}
                      >
                        <div
                          className={`w-full h-6 rounded flex items-center justify-center border transition-colors ${val !== "" ? "bg-emerald-500/20 border-emerald-500/50" : "bg-transparent border-transparent hover:bg-slate-800 focus-within:bg-slate-800/80 focus-within:border-slate-600"}`}
                        >
                          <input
                            type="text"
                            maxLength="1"
                            value={val}
                            onChange={(e) =>
                              updateRoundEvent("A", i, e.target.value)
                            }
                            onFocus={(e) => e.target.select()}
                            style={{
                              width: "100%",
                              height: "100%",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              color: val ? "#34d399" : "transparent",
                              fontSize: "14px",
                              fontWeight: "900",
                              textTransform: "uppercase",
                              padding: 0,
                              margin: 0,
                              border: "none",
                              outline: "none",
                              cursor: "text",
                            }}
                          />
                        </div>
                      </td>
                    ))}
                    <td className="py-2 px-2 border-r border-slate-700/50 text-emerald-400 text-sm">
                      {autoScoreA}
                    </td>
                    <td
                      className="py-2 px-2 text-emerald-400 text-sm"
                      rowSpan={2}
                    >
                      <input
                        type="number"
                        className="bg-transparent text-center w-12 font-black text-lg outline-none"
                        value={scoreA + scoreB}
                        readOnly
                      />
                    </td>
                  </tr>
                  {/* Team B Row */}
                  <tr className="bg-red-900/10">
                    <td className="py-2 px-3 border-r border-slate-700/50 text-left text-red-400">
                      {teamB.name || "Team B"}
                    </td>
                    <td className="py-2 px-2 border-r border-slate-700/50">
                      <select
                        className="bg-transparent text-center outline-none cursor-pointer w-full"
                        value={matchWin === "B" ? "Yes" : "No"}
                        onChange={(e) =>
                          setMatchWin(e.target.value === "Yes" ? "B" : "A")
                        }
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </td>
                    <td className="py-2 px-2 border-r border-slate-700/50">
                      <select
                        className="bg-transparent text-center outline-none cursor-pointer w-full"
                        value={sideB}
                        onChange={(e) => setSideB(e.target.value)}
                      >
                        {game === "Valorant" ? (
                          <>
                            <option>ATK</option>
                            <option>DEF</option>
                          </>
                        ) : (
                          <>
                            <option>GR</option>
                            <option>BL</option>
                          </>
                        )}
                      </select>
                    </td>
                    {roundLogsB.map((val, i) => (
                      <td
                        key={i}
                        className={`py-1 px-0.5 ${(game === "Crossfire" ? i === 8 || i === 17 || i === 23 : i === 11 || i === 23) ? "border-r-2 border-slate-500" : "border-r border-slate-700/50"}`}
                      >
                        <div
                          className={`w-full h-6 rounded flex items-center justify-center border transition-colors ${val !== "" ? "bg-pink-500/20 border-pink-500/50" : "bg-transparent border-transparent hover:bg-slate-800 focus-within:bg-slate-800/80 focus-within:border-slate-600"}`}
                        >
                          <input
                            type="text"
                            maxLength="1"
                            value={val}
                            onChange={(e) =>
                              updateRoundEvent("B", i, e.target.value)
                            }
                            onFocus={(e) => e.target.select()}
                            style={{
                              width: "100%",
                              height: "100%",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              color: val ? "#f472b6" : "transparent",
                              fontSize: "14px",
                              fontWeight: "900",
                              textTransform: "uppercase",
                              padding: 0,
                              margin: 0,
                              border: "none",
                              outline: "none",
                              cursor: "text",
                            }}
                          />
                        </div>
                      </td>
                    ))}
                    <td className="py-2 px-2 border-r border-slate-700/50 text-emerald-400 text-sm">
                      {autoScoreB}
                    </td>
                  </tr>
                  {/* Timeouts Row */}
                  <tr className="border-t-2 border-slate-700/80 bg-amber-900/10">
                    <td
                      colSpan={3}
                      className="py-2 px-3 border-r border-slate-700/50 text-right text-amber-500 font-black tracking-widest text-[10px]"
                    >
                      TIMEOUTS
                    </td>
                    {timeoutRowLogs.map((val, i) => (
                      <td
                        key={i}
                        className={`py-1 px-0.5 ${(game === "Crossfire" ? i === 8 || i === 17 || i === 23 : i === 11 || i === 23) ? "border-r-2 border-slate-500" : "border-r border-slate-700/50"}`}
                      >
                        <div
                          className={`w-full h-6 rounded flex items-center justify-center border transition-colors ${val !== "" ? "bg-amber-500/20 border-amber-500/50" : "bg-transparent border-transparent hover:bg-slate-800 focus-within:bg-slate-800/80 focus-within:border-slate-600"}`}
                        >
                          <input
                            type="text"
                            maxLength="1"
                            value={val}
                            onChange={(e) => {
                              const logs = [...timeoutRowLogs];
                              logs[i] = e.target.value.toUpperCase().slice(-1);
                              setTimeoutRowLogs(logs);
                            }}
                            onFocus={(e) => e.target.select()}
                            style={{
                              width: "100%",
                              height: "100%",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              color: val ? "#f59e0b" : "transparent",
                              fontSize: "14px",
                              fontWeight: "900",
                              textTransform: "uppercase",
                              padding: 0,
                              margin: 0,
                              border: "none",
                              outline: "none",
                              cursor: "text",
                            }}
                          />
                        </div>
                      </td>
                    ))}
                    <td
                      colSpan={2}
                      className="py-2 px-2 border-slate-700/50"
                    ></td>
                  </tr>
                  {/* Dead Rounds Row */}
                  <tr className="border-b border-slate-700/50 bg-purple-900/10">
                    <td
                      colSpan={3}
                      className="py-2 px-3 border-r border-slate-700/50 text-right text-purple-500 font-black tracking-widest text-[10px]"
                    >
                      DEAD ROUNDS
                    </td>
                    {deadRoundRowLogs.map((val, i) => (
                      <td
                        key={i}
                        className={`py-1 px-0.5 ${(game === "Crossfire" ? i === 8 || i === 17 || i === 23 : i === 11 || i === 23) ? "border-r-2 border-slate-500" : "border-r border-slate-700/50"}`}
                      >
                        <div
                          className={`w-full h-6 rounded flex items-center justify-center border transition-colors ${val !== "" ? "bg-purple-500/20 border-purple-500/50" : "bg-transparent border-transparent hover:bg-slate-800 focus-within:bg-slate-800/80 focus-within:border-slate-600"}`}
                        >
                          <input
                            type="text"
                            maxLength="1"
                            value={val}
                            onChange={(e) => {
                              const logs = [...deadRoundRowLogs];
                              logs[i] = e.target.value.toUpperCase().slice(-1);
                              setDeadRoundRowLogs(logs);
                            }}
                            onFocus={(e) => e.target.select()}
                            style={{
                              width: "100%",
                              height: "100%",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              color: val ? "#a855f7" : "transparent",
                              fontSize: "14px",
                              fontWeight: "900",
                              textTransform: "uppercase",
                              padding: 0,
                              margin: 0,
                              border: "none",
                              outline: "none",
                              cursor: "text",
                            }}
                          />
                        </div>
                      </td>
                    ))}
                    <td
                      colSpan={2}
                      className="py-2 px-2 border-slate-700/50"
                    ></td>
                  </tr>
                </tbody>
              </table>
              {/* Timeouts and Current Round Display */}
              <div className="flex items-start gap-8 mt-5">
                <div className="flex flex-col border border-amber-500/30 rounded-lg overflow-hidden w-48">
                  <div className="bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase text-center py-1 border-b border-amber-500/30">
                    Timeout Indicator
                  </div>
                  <div className="flex flex-col">
                    <select
                      className={`text-xs font-bold py-1.5 text-center outline-none cursor-pointer border-b border-amber-500/10 appearance-none ${timeoutA === "USED" ? "bg-red-900/30 text-red-400" : "bg-emerald-900/30 text-emerald-400"}`}
                      value={timeoutA}
                      onChange={(e) => handleTimeoutChange("A", e.target.value)}
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="USED">USED</option>
                    </select>
                    <select
                      className={`text-xs font-bold py-1.5 text-center outline-none cursor-pointer appearance-none ${timeoutB === "USED" ? "bg-red-900/30 text-red-400" : "bg-emerald-900/30 text-emerald-400"}`}
                      value={timeoutB}
                      onChange={(e) => handleTimeoutChange("B", e.target.value)}
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="USED">USED</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col border border-amber-500/30 rounded-lg overflow-hidden w-40">
                  <div className="bg-amber-500/20 text-amber-400 text-[9px] font-black uppercase text-center py-1 border-b border-amber-500/30">
                    Current Round No.
                  </div>
                  <div className="bg-amber-500/10 text-amber-400 text-2xl font-black py-2 text-center">
                    {currentRoundNo}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ── Player Stats ── */}
          <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm mb-5">
            <SectionHeader
              icon={<IconStats />}
              label="Player Stats"
              sub="Adaptive Columns (Scroll Horizontally)"
              accent="#8b5cf6"
            />
            <div className="overflow-x-auto de-scroll relative">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  {game === "Crossfire" ? (
                    <>
                      <tr className="text-[9px] uppercase tracking-[0.15em] text-slate-500 border-b border-slate-800/60 light:border-slate-200 bg-slate-900/90 light:bg-slate-100 relative z-20">
                        <th
                          rowSpan={2}
                          className="px-5 py-3 border-r border-slate-800/40 light:border-slate-200 font-bold sticky left-0 bg-slate-900/90 light:bg-slate-100 z-30 min-w-[200px]"
                        >
                          Player IGN
                        </th>
                        {cfGroups.map((g) => (
                          <th
                            key={g.id}
                            colSpan={4}
                            className="px-2 py-3 border-r-[4px] border-[#0d131c] light:border-slate-200 text-center font-bold relative min-w-[200px]"
                          >
                            <div className="flex items-center justify-center gap-2">
                              <input
                                type="text"
                                className="bg-transparent border-b border-slate-700 light:border-slate-300 hover:border-slate-500 light:hover:border-slate-400 focus:border-[#00ffcc] light:focus:border-blue-500 text-slate-300 light:text-slate-700 w-full max-w-[120px] text-center text-[10px] uppercase tracking-widest outline-none transition-colors font-black"
                                value={g.label}
                                onChange={(e) =>
                                  handleUpdateCfGroupLabel(g.id, e.target.value)
                                }
                              />
                              {!g.isTotal && (
                                <button
                                  onClick={() => handleRemoveCfGroup(g.id)}
                                  className="text-red-500/70 hover:text-red-400 p-1 rounded-md hover:bg-red-500/10 transition-colors flex items-center justify-center"
                                  title="Delete Stats Group"
                                >
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
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </th>
                        ))}
                        <th rowSpan={2} className="px-3 py-3 text-center w-24">
                          <button
                            onClick={handleAddCfGroup}
                            className="text-[9px] bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-3 py-1.5 rounded border border-slate-700 transition-colors whitespace-nowrap font-bold"
                          >
                            + ADD STATS
                          </button>
                        </th>
                      </tr>
                      <tr className="text-[9px] uppercase tracking-[0.15em] text-slate-500 border-b border-slate-800/60 light:border-slate-200 bg-slate-900/40 light:bg-slate-50 relative z-10">
                        {cfGroups.map((g) => (
                          <React.Fragment key={`${g.id}-sub`}>
                            <th className="px-3 py-2 border-r border-slate-800/40 light:border-slate-200 text-center font-bold w-12">
                              K
                            </th>
                            <th className="px-3 py-2 border-r border-slate-800/40 light:border-slate-200 text-center font-bold w-12">
                              D
                            </th>
                            <th className="px-3 py-2 border-r border-slate-800/40 light:border-slate-200 text-center font-bold w-12">
                              A
                            </th>
                            <th className="px-3 py-2 border-r-[4px] border-[#0d131c] light:border-slate-200 text-center font-bold w-12 text-[#00ffcc] light:text-blue-600">
                              H
                            </th>
                          </React.Fragment>
                        ))}
                      </tr>
                    </>
                  ) : (
                    <tr className="text-[9px] uppercase tracking-[0.15em] text-slate-500 border-b border-slate-800/60 light:border-slate-200 bg-slate-900/90 light:bg-slate-100 relative z-20">
                      <th className="px-5 py-3 border-r border-slate-800/40 light:border-slate-200 font-bold sticky left-0 bg-slate-900/90 light:bg-slate-100 z-30 min-w-[200px]">
                        Player IGN
                      </th>
                      <th className="px-4 py-3 border-r border-slate-800/40 light:border-slate-200 font-bold min-w-[150px]">
                        Hero/Agent/Class
                      </th>
                      <th className="px-3 py-3 border-r border-slate-800/40 light:border-slate-200 text-center font-bold w-14">
                        K
                      </th>
                      <th className="px-3 py-3 border-r border-slate-800/40 light:border-slate-200 text-center font-bold w-14">
                        D
                      </th>
                      <th className="px-3 py-3 border-r border-slate-800/40 light:border-slate-200 text-center font-bold w-14">
                        A
                      </th>
                      <th className="px-4 py-3 border-r border-slate-800/40 light:border-slate-200 text-center font-bold">
                        ACS
                      </th>
                      <th className="px-4 py-3 text-center font-bold">
                        Econ Rating
                      </th>
                    </tr>
                  )}
                </thead>
                <tbody className="divide-y divide-slate-800/30 light:divide-slate-200">
                  {}
                  {playersA.map((p, idx) => (
                    <tr
                      key={`a-${idx}`}
                      className="hover:bg-white/[0.02] light:hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-5 py-2 border-r border-slate-800/30 light:border-slate-200 sticky left-0 bg-[#0d131c] light:bg-white group-hover:bg-[#111824] light:group-hover:bg-slate-50 z-10 transition-colors">
                        <select
                          className={`bg-transparent text-[#38bdf8] light:text-blue-600 ${tableInput} text-left font-black appearance-none cursor-pointer`}
                          value={p.ign}
                          onChange={(e) =>
                            updatePlayer("A", idx, "ign", e.target.value)
                          }
                        >
                          <option value="" className="text-black">
                            Select Player
                          </option>
                          {dbPlayers
                            .filter((dbP) => {
                              const team = dbTeams.find(
                                (t) => t.team_name === teamA.name,
                              );
                              return team ? dbP.team_id === team.team_id : true;
                            })
                            .map((dbP) => (
                              <option
                                key={dbP.player_id}
                                value={dbP.player_name}
                                className="text-black"
                              >
                                {dbP.player_name}
                              </option>
                            ))}
                          <option value={p.ign} className="hidden">
                            {p.ign}
                          </option>
                        </select>
                      </td>
                      {game === "Valorant" && (
                        <td className="px-4 py-2 border-r border-slate-800/30">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-slate-700/50 border border-slate-600/40 flex items-center justify-center text-[8px] font-bold text-slate-400 shrink-0">
                              {p.agent ? p.agent[0] : ""}
                            </div>
                            <select
                              className={`text-white ${tableInput} text-left appearance-none cursor-pointer`}
                              value={p.agent}
                              onChange={(e) =>
                                updatePlayer("A", idx, "agent", e.target.value)
                              }
                            >
                              {agents.map((a) => (
                                <option key={a} value={a}>
                                  {a}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                      )}
                      {game === "Valorant" ? (
                        <>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                            <input
                              type="number"
                              className={tableInput}
                              value={p.k}
                              onChange={(e) =>
                                updatePlayer(
                                  "A",
                                  idx,
                                  "k",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                            <input
                              type="number"
                              className={tableInput}
                              value={p.d}
                              onChange={(e) =>
                                updatePlayer(
                                  "A",
                                  idx,
                                  "d",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                            <input
                              type="number"
                              className={tableInput}
                              value={p.a}
                              onChange={(e) =>
                                updatePlayer(
                                  "A",
                                  idx,
                                  "a",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border-r border-slate-800/30 text-emerald-400">
                            <input
                              type="number"
                              className={`${tableInput} text-emerald-400`}
                              value={p.acs}
                              onChange={(e) =>
                                updatePlayer(
                                  "A",
                                  idx,
                                  "acs",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-2 text-emerald-400">
                            <input
                              type="number"
                              className={`${tableInput} text-emerald-400`}
                              value={p.econ}
                              onChange={(e) =>
                                updatePlayer(
                                  "A",
                                  idx,
                                  "econ",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          {cfGroups.map((g) => {
                            if (g.isTotal) {
                              return (
                                <React.Fragment key={g.id}>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">
                                    {getCfTotal(p, "k")}
                                  </td>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">
                                    {getCfTotal(p, "d")}
                                  </td>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">
                                    {getCfTotal(p, "a")}
                                  </td>
                                  <td className="px-2 py-2 border-r-[4px] border-[#0d131c] text-[#00ffcc] text-center font-black bg-emerald-500/10">
                                    {getCfTotal(p, "h")}
                                  </td>
                                </React.Fragment>
                              );
                            }
                            return (
                              <React.Fragment key={g.id}>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                                  <input
                                    type="number"
                                    className={tableInput}
                                    value={
                                      p[`${g.id}_k`] !== undefined
                                        ? p[`${g.id}_k`]
                                        : 0
                                    }
                                    onChange={(e) =>
                                      updatePlayer(
                                        "A",
                                        idx,
                                        `${g.id}_k`,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                                  <input
                                    type="number"
                                    className={tableInput}
                                    value={
                                      p[`${g.id}_d`] !== undefined
                                        ? p[`${g.id}_d`]
                                        : 0
                                    }
                                    onChange={(e) =>
                                      updatePlayer(
                                        "A",
                                        idx,
                                        `${g.id}_d`,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                                  <input
                                    type="number"
                                    className={tableInput}
                                    value={
                                      p[`${g.id}_a`] !== undefined
                                        ? p[`${g.id}_a`]
                                        : 0
                                    }
                                    onChange={(e) =>
                                      updatePlayer(
                                        "A",
                                        idx,
                                        `${g.id}_a`,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>
                                <td className="px-2 py-2 border-r-[4px] border-[#0d131c] text-[#00ffcc]">
                                  <input
                                    type="number"
                                    className={`${tableInput} text-[#00ffcc]`}
                                    value={
                                      p[`${g.id}_h`] !== undefined
                                        ? p[`${g.id}_h`]
                                        : 0
                                    }
                                    onChange={(e) =>
                                      updatePlayer(
                                        "A",
                                        idx,
                                        `${g.id}_h`,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>
                              </React.Fragment>
                            );
                          })}
                          <td className="px-2 py-2"></td>
                        </>
                      )}
                    </tr>
                  ))}
                  {}
                  <tr>
                    <td
                      colSpan="7"
                      className="h-0.5 bg-slate-700/30 light:bg-slate-300"
                    ></td>
                  </tr>
                  {}
                  {playersB.map((p, idx) => (
                    <tr
                      key={`b-${idx}`}
                      className="hover:bg-white/[0.02] light:hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-5 py-2 border-r border-slate-800/30 light:border-slate-200 sticky left-0 bg-[#0d131c] light:bg-white group-hover:bg-[#111824] light:group-hover:bg-slate-50 z-10 transition-colors">
                        <select
                          className={`bg-transparent text-[#f87171] light:text-red-600 ${tableInput} text-left font-black appearance-none cursor-pointer`}
                          value={p.ign}
                          onChange={(e) =>
                            updatePlayer("B", idx, "ign", e.target.value)
                          }
                        >
                          <option value="" className="text-black">
                            Select Player
                          </option>
                          {dbPlayers
                            .filter((dbP) => {
                              const team = dbTeams.find(
                                (t) => t.team_name === teamB.name,
                              );
                              return team ? dbP.team_id === team.team_id : true;
                            })
                            .map((dbP) => (
                              <option
                                key={dbP.player_id}
                                value={dbP.player_name}
                                className="text-black"
                              >
                                {dbP.player_name}
                              </option>
                            ))}
                          <option value={p.ign} className="hidden">
                            {p.ign}
                          </option>
                        </select>
                      </td>
                      {game === "Valorant" && (
                        <td className="px-4 py-2 border-r border-slate-800/30">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-md bg-slate-700/50 border border-slate-600/40 flex items-center justify-center text-[8px] font-bold text-slate-400 shrink-0">
                              {p.agent ? p.agent[0] : ""}
                            </div>
                            <select
                              className={`text-white ${tableInput} text-left appearance-none cursor-pointer`}
                              value={p.agent}
                              onChange={(e) =>
                                updatePlayer("B", idx, "agent", e.target.value)
                              }
                            >
                              {agents.map((a) => (
                                <option key={a} value={a}>
                                  {a}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                      )}
                      {game === "Valorant" ? (
                        <>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                            <input
                              type="number"
                              className={tableInput}
                              value={p.k}
                              onChange={(e) =>
                                updatePlayer(
                                  "B",
                                  idx,
                                  "k",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                            <input
                              type="number"
                              className={tableInput}
                              value={p.d}
                              onChange={(e) =>
                                updatePlayer(
                                  "B",
                                  idx,
                                  "d",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                            <input
                              type="number"
                              className={tableInput}
                              value={p.a}
                              onChange={(e) =>
                                updatePlayer(
                                  "B",
                                  idx,
                                  "a",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border-r border-slate-800/30 text-[#f87171]">
                            <input
                              type="number"
                              className={`${tableInput} text-[#f87171]`}
                              value={p.acs}
                              onChange={(e) =>
                                updatePlayer(
                                  "B",
                                  idx,
                                  "acs",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-2 text-[#f87171]">
                            <input
                              type="number"
                              className={`${tableInput} text-[#f87171]`}
                              value={p.econ}
                              onChange={(e) =>
                                updatePlayer(
                                  "B",
                                  idx,
                                  "econ",
                                  Number(e.target.value) || 0,
                                )
                              }
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          {cfGroups.map((g) => {
                            if (g.isTotal) {
                              return (
                                <React.Fragment key={g.id}>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">
                                    {getCfTotal(p, "k")}
                                  </td>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">
                                    {getCfTotal(p, "d")}
                                  </td>
                                  <td className="px-2 py-2 border-r border-slate-800/30 text-white text-center font-black bg-emerald-500/10">
                                    {getCfTotal(p, "a")}
                                  </td>
                                  <td className="px-2 py-2 border-r-[4px] border-[#0d131c] text-[#00ffcc] text-center font-black bg-emerald-500/10">
                                    {getCfTotal(p, "h")}
                                  </td>
                                </React.Fragment>
                              );
                            }
                            return (
                              <React.Fragment key={g.id}>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                                  <input
                                    type="number"
                                    className={tableInput}
                                    value={
                                      p[`${g.id}_k`] !== undefined
                                        ? p[`${g.id}_k`]
                                        : 0
                                    }
                                    onChange={(e) =>
                                      updatePlayer(
                                        "B",
                                        idx,
                                        `${g.id}_k`,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                                  <input
                                    type="number"
                                    className={tableInput}
                                    value={
                                      p[`${g.id}_d`] !== undefined
                                        ? p[`${g.id}_d`]
                                        : 0
                                    }
                                    onChange={(e) =>
                                      updatePlayer(
                                        "B",
                                        idx,
                                        `${g.id}_d`,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>
                                <td className="px-2 py-2 border-r border-slate-800/30 text-white">
                                  <input
                                    type="number"
                                    className={tableInput}
                                    value={
                                      p[`${g.id}_a`] !== undefined
                                        ? p[`${g.id}_a`]
                                        : 0
                                    }
                                    onChange={(e) =>
                                      updatePlayer(
                                        "B",
                                        idx,
                                        `${g.id}_a`,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>
                                <td className="px-2 py-2 border-r-[4px] border-[#0d131c] text-[#00ffcc]">
                                  <input
                                    type="number"
                                    className={`${tableInput} text-[#00ffcc]`}
                                    value={
                                      p[`${g.id}_h`] !== undefined
                                        ? p[`${g.id}_h`]
                                        : 0
                                    }
                                    onChange={(e) =>
                                      updatePlayer(
                                        "B",
                                        idx,
                                        `${g.id}_h`,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </td>
                              </React.Fragment>
                            );
                          })}
                          <td className="px-2 py-2"></td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {}
          <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm mb-5">
            <SectionHeader
              icon={<IconMap />}
              label="Heatmap Entry"
              sub="Event Coordinate Plotting"
              accent="#06b6d4"
            />
            <div className="p-8 flex flex-col lg:flex-row gap-8 items-start">
              {}
              <div className="w-full lg:w-64 shrink-0 bg-slate-900/50 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 rounded-xl p-5 flex flex-col gap-6">
                <Field label="Target Round">
                  <div className="relative">
                    <select
                      className={selectBase}
                      value={selectedRound}
                      onChange={(e) => setSelectedRound(Number(e.target.value))}
                    >
                      {Array.from(
                        { length: scoreA + scoreB || 1 },
                        (_, i) => i + 1,
                      ).map((r) => (
                        <option key={r} value={r}>
                          Round {r}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      ▾
                    </div>
                  </div>
                </Field>
                <Field label="Action Marker">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedAction("Plant")}
                      className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all ${selectedAction === "Plant" ? "bg-red-500/20 border-red-500 text-red-400 light:text-red-600" : "bg-slate-800/50 light:bg-white border-slate-700 light:border-slate-300 text-slate-400"}`}
                    >
                      Plant
                    </button>
                    <button
                      onClick={() => setSelectedAction("Defuse")}
                      className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all ${selectedAction === "Defuse" ? "bg-blue-500/20 border-blue-500 text-blue-400 light:text-blue-600" : "bg-slate-800/50 light:bg-white border-slate-700 light:border-slate-300 text-slate-400"}`}
                    >
                      Defuse
                    </button>
                  </div>
                </Field>
                <Field label="Manual Input (X/Y %)">
                  <div className="flex gap-2 items-center">
                    <input
                      type="number"
                      className={inputBase}
                      placeholder="X %"
                      value={manualX}
                      onChange={(e) => setManualX(e.target.value)}
                    />
                    <input
                      type="number"
                      className={inputBase}
                      placeholder="Y %"
                      value={manualY}
                      onChange={(e) => setManualY(e.target.value)}
                    />
                    <button
                      onClick={handleManualAdd}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 px-4 rounded-lg text-[10px] uppercase tracking-widest transition-colors shadow-lg"
                    >
                      Add
                    </button>
                  </div>
                </Field>
                <div className="flex-1">
                  <div className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-3">
                    Round {selectedRound} Events
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto de-scroll pr-1">
                    {heatmapData
                      .filter((h) => h.round === selectedRound)
                      .map((h) => (
                        <div
                          key={h.id}
                          className="flex items-center justify-between bg-slate-800/40 light:bg-slate-100 border border-slate-700/50 light:border-slate-300 rounded p-2"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${h.type === "Plant" ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-blue-500 shadow-[0_0_8px_#3b82f6]"}`}
                            ></div>
                            <span className="text-[10px] font-bold text-slate-300 light:text-slate-700">
                              {h.type}
                            </span>
                          </div>
                          <button
                            onClick={() => removeHeatmapEvent(h.id)}
                            className="text-slate-500 hover:text-red-400"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    {heatmapData.filter((h) => h.round === selectedRound)
                      .length === 0 && (
                      <div className="text-[10px] text-slate-500 italic text-center py-4">
                        No events logged for this round. Click on the map to add
                        one.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {}
              <div className="flex-1 flex justify-center bg-[#0a0f16] light:bg-slate-100 border border-slate-800/80 light:border-slate-300 rounded-xl p-4 overflow-hidden relative shadow-inner w-full min-h-[400px] lg:min-h-[600px]">
                <div
                  className="relative cursor-crosshair w-full max-w-[800px] aspect-[4/3] rounded-lg overflow-hidden border border-slate-700/30 light:border-slate-300"
                  onClick={handleMapClick}
                >
                  <img
                    key={mapName}
                    src={`/assets/${mapName.replace(/\s+/g, "_")}.png`}
                    alt={`${mapName} Map`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/assets/map_placeholder.png";
                    }}
                    className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                  />
                  {}
                  {heatmapData
                    .filter((h) => h.round === selectedRound)
                    .map((h) => (
                      <div
                        key={h.id}
                        className={`absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-white animate-in zoom-in ${h.type === "Plant" ? "bg-red-500 shadow-[0_0_12px_#ef4444]" : "bg-blue-500 shadow-[0_0_12px_#3b82f6]"}`}
                        style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      ></div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {}
          <div className="bg-[#0d131c] light:bg-white rounded-2xl border border-slate-800/50 light:border-slate-200 overflow-hidden shadow-xl light:shadow-sm">
            <SectionHeader
              icon={<IconNotes />}
              label="Notes & Submit"
              sub="Match Commentary"
              accent="#10b981"
            />
            <div className="p-5 flex flex-col xl:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                    Notes:
                  </span>
                </div>
                <textarea
                  rows={2}
                  className="w-full bg-slate-800/50 light:bg-slate-50 border border-slate-700/70 light:border-slate-300 text-white light:text-slate-900 text-sm px-4 py-3 rounded-xl outline-none focus:border-cyan-500/60 light:focus:border-blue-500/60 focus:ring-2 focus:ring-cyan-500/10 light:focus:ring-blue-500/10 transition-all resize-none placeholder-slate-600 light:placeholder-slate-400"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add match notes, pause events, technical issues..."
                />
              </div>
              <div className="flex gap-3 w-full xl:w-auto shrink-0">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 xl:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white transition-all active:scale-95 hover:-translate-y-0.5 ${
                    submitSuccess
                      ? "bg-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] success-flash"
                      : isSubmitting
                        ? "opacity-70 cursor-wait"
                        : "submit-pulse hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                  }`}
                  style={
                    !submitSuccess
                      ? {
                          background:
                            "linear-gradient(135deg, #0d9488, #2563eb)",
                        }
                      : {}
                  }
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <IconSave />
                  )}
                  {submitSuccess
                    ? "Submitted!"
                    : isSubmitting
                      ? "Submitting..."
                      : "Submit Data"}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 xl:flex-none px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-white transition-all active:scale-95 hover:-translate-y-0.5 border border-red-500/40 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  style={{
                    background: "linear-gradient(135deg, #991b1b, #dc2626)",
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
          {}
          <div className="h-4" />
        </div>
      </div>
      {}
      {submitSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500/90 backdrop-blur-xl text-white px-6 py-3 rounded-xl shadow-[0_8px_30px_rgba(16,185,129,0.4)] flex items-center gap-3 animate-[fadeIn_0.3s_ease]">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm font-bold tracking-wide">
            Data submitted successfully!
          </span>
        </div>
      )}
    </div>
  );
};
export default DataEntry;
