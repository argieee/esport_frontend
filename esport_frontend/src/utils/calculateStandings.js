export const calculateStandings = (activeFormat, singleElimData, doubleElimData, teamPool, allTeamsData) => {
  let standings = [];
  let currentRank = 1;
  let placedTeams = new Set();

  const pushTeams = (teams) => {
    // Sort alphabetically so ties are consistent
    [...teams].sort().forEach(t => {
      if (!placedTeams.has(t) && t !== "" && t !== "TBD") {
        standings.push({ team_name: t, placement_rank: currentRank });
        placedTeams.add(t);
      }
    });
    if (teams.length > 0) currentRank += teams.length;
  };

  const getMatchResults = (match) => {
    const s1 = parseInt(match.score1) || 0;
    const s2 = parseInt(match.score2) || 0;
    const isTeam1Winner = s1 > s2 && match.played !== false;
    const isTeam2Winner = s2 > s1 && match.played !== false;
    let winner = null, loser = null;
    if (isTeam1Winner) { winner = match.team1; loser = match.team2; }
    else if (isTeam2Winner) { winner = match.team2; loser = match.team1; }
    return { winner, loser };
  };

  if (activeFormat === "Single Elimination" && singleElimData && singleElimData.length > 0) {
    for (let r = singleElimData.length - 1; r >= 0; r--) {
      const losers = [];
      const winners = [];
      singleElimData[r].forEach(match => {
        const { winner, loser } = getMatchResults(match);
        if (winner) winners.push(winner);
        if (loser) losers.push(loser);
      });
      if (r === singleElimData.length - 1) pushTeams(winners);
      pushTeams(losers);
    }
  } else if (activeFormat === "Double Elimination" && doubleElimData && doubleElimData.finals) {
    // 1st and 2nd come from finals
    const finalWinners = [];
    const finalLosers = [];
    doubleElimData.finals.forEach(round => {
      round.forEach(match => {
        const { winner, loser } = getMatchResults(match);
        if (winner) finalWinners.push(winner);
        if (loser) finalLosers.push(loser);
      });
    });
    pushTeams(finalWinners);
    pushTeams(finalLosers);
    
    // The rest come from lower bracket, iterating backward
    if (doubleElimData.lower && doubleElimData.lower.length > 0) {
      for (let r = doubleElimData.lower.length - 1; r >= 0; r--) {
        const lowerLosers = [];
        doubleElimData.lower[r].forEach(match => {
          const { winner, loser } = getMatchResults(match);
          if (loser) lowerLosers.push(loser);
        });
        pushTeams(lowerLosers);
      }
    }
  }

  // Append any teams from teamPool that haven't been placed yet
  if (teamPool && teamPool.length > 0) {
    const remaining = teamPool.filter(t => !placedTeams.has(t) && t !== "" && t !== "TBD");
    pushTeams(remaining);
  }

  return standings.map(s => {
    const dbTeam = allTeamsData ? allTeamsData.find(t => t.team_name === s.team_name) : null;
    return { ...s, logo_url: dbTeam ? dbTeam.logo_url : '' };
  });
};
