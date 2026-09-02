const getTeamStatsFromRawRecords = async (supabase, teamName) => {
  try {
    const { data: rawRecords, error } = await supabase
      .from('match_records')
      .select('win, kills, deaths')
      .eq('team_name', teamName);
    if (error) {
      console.error("Predictor DB Error:", error);
      return null;
    }
    if (!rawRecords || rawRecords.length === 0) return null;
    let totalKills = 0;
    let totalDeaths = 0;
    let winCount = 0;
    rawRecords.forEach(r => {
      totalKills += Number(r.kills || 0);
      totalDeaths += Number(r.deaths || 0);
      if (r.win) winCount++;
    });
    const winRate = winCount / rawRecords.length;
    const kd = totalDeaths > 0 ? (totalKills / totalDeaths) : (totalKills > 0 ? 99.99 : 0);
    return {
      winRate,
      kd,
      totalKills,
      totalDeaths
    };
  } catch (err) {
    console.error("Predictor Error getting raw team stats:", err);
    return null;
  }
};
const generatePrediction = async (supabase, teamA, teamB) => {
  if (!teamA || !teamB) return null;
  const statsA = await getTeamStatsFromRawRecords(supabase, teamA.team_name);
  const statsB = await getTeamStatsFromRawRecords(supabase, teamB.team_name);
  if (!statsA && !statsB) return null; 
  let probA = 50;
  let probB = 50;
  if (statsA && statsB) {
    const powerA = (statsA.kd * 50) + (statsA.winRate * 50);
    const powerB = (statsB.kd * 50) + (statsB.winRate * 50);
    probA = (1 / (1 + Math.pow(10, (powerB - powerA) / 40))) * 100;
    probB = 100 - probA;
  } else if (statsA && !statsB) {
    probA = 80; probB = 20;
  } else if (!statsA && statsB) {
    probA = 20; probB = 80;
  }
  probA = Math.round(probA);
  probB = Math.round(probB);
  if (probA > 100) probA = 100;
  if (probA < 0) probA = 0;
  if (probB > 100) probB = 100;
  if (probB < 0) probB = 0;
  return {
    predicted_winner_id: probA > probB ? teamA.team_id : (probB > probA ? teamB.team_id : null),
    predicted_winner_name: probA > probB ? teamA.team_name : (probB > probA ? teamB.team_name : 'Tie'),
    probability_a: probA,
    probability_b: probB,
    reasoning: "Based on raw match records."
  };
};
module.exports = {
  generatePrediction
};
