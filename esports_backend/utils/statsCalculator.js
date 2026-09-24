const math = require('mathjs');

const ROLE_WEIGHTS = {
  Rifler: {
    killWeight: 1.056920,
    deathWeight: 1.007390
  },
  Sniper: {
    killWeight: 0.835743,
    deathWeight: 0.973941
  }
};
const calculateSum = (valuesArray) => {
  return valuesArray.reduce((acc, val) => acc + val, 0);
};
const calculateKD = (kills, deaths) => {
  if (deaths === 0) return kills; 
  return kills / deaths;
};
const calculatePerRoundMetric = (totalCount, totalRounds) => {
  if (totalRounds === 0) return 0;
  return totalCount / totalRounds;
};
const calculateHK = (headshots, kills) => {
  if (kills === 0) return 0;
  return headshots / kills;
};
const calculateSurvivalRate = (totalRounds, deaths) => {
  if (totalRounds === 0) return 0;
  return (totalRounds - deaths) / totalRounds;
};
const calculateKillDifferential = (kills, deaths) => {
  return kills - deaths;
};
const calculatePerformanceScore = (kills, deaths, assists, totalRounds, role, formulas) => {
  let weights = { killWeight: 1.0, deathWeight: 1.0, assistWeight: 0.5 };
  let customFormula = "";
  if (formulas && formulas.length > 0) {
    const f = formulas.find(x => x.role === role) || formulas.find(x => x.role === 'Global');
    if (f) {
       weights = { killWeight: f.kill_weight, deathWeight: f.death_weight, assistWeight: f.assist_weight };
       customFormula = f.excel_formula;
    }
  } else {
    weights = ROLE_WEIGHTS[role] || ROLE_WEIGHTS['Rifler']; 
    weights.assistWeight = 0.5;
  }
  
  if (customFormula && customFormula.trim() !== "") {
    try {
      const scope = {
        kills: kills || 0,
        deaths: deaths || 0,
        assists: assists || 0,
        rounds: totalRounds || 1,
        acs: 0,
        econ: 0,
        first_kills: 0,
        plants: 0,
        defuse: 0,
        ace: 0
      };
      return math.evaluate(customFormula, scope);
    } catch (e) {
      console.error("Formula evaluation error:", e);
    }
  }

  const weightedKills = kills * weights.killWeight;
  const weightedDeaths = deaths * weights.deathWeight;
  const weightedAssists = (assists || 0) * weights.assistWeight;
  
  if (totalRounds === 0) return 0;
  return (weightedKills + weightedAssists - weightedDeaths) / totalRounds;
};
const calculateTC = (performanceScore) => {
  return (7.8 * performanceScore) + 6.0;
};
const calculateFinalRating = (performanceScore, formulas, role) => {
  let multiplier = 78.0;
  let base = 60.0;
  if (formulas && formulas.length > 0) {
    const f = formulas.find(x => x.role === role) || formulas.find(x => x.role === 'Global');
    if (f) {
      multiplier = f.base_multiplier;
      base = f.base_rating;
    }
  }
  const rating = (multiplier * performanceScore) + base;
  return Math.round(rating * 10) / 10;
};
const calculatePRS = (playerScore, highestScore) => {
  if (highestScore === 0) return 0;
  return (playerScore / highestScore) * 100;
};
const calculateAveragePRS = (prsArray) => {
  if (!prsArray || prsArray.length === 0) return 0;
  const sum = calculateSum(prsArray);
  return sum / prsArray.length;
};
const calculatePercentageRate = (numerator, denominator) => {
  if (denominator === 0) return 0;
  return (numerator / denominator) * 100;
};
const calculateWeightedMean = (matchStats) => {
  let sumCounts = 0;
  let sumRounds = 0;
  matchStats.forEach(stat => {
    sumCounts += stat.count;
    sumRounds += stat.rounds;
  });
  if (sumRounds === 0) return 0;
  return sumCounts / sumRounds;
};
module.exports = {
  ROLE_WEIGHTS,
  calculateSum,
  calculateKD,
  calculatePerRoundMetric,
  calculateHK,
  calculateSurvivalRate,
  calculateKillDifferential,
  calculatePerformanceScore,
  calculateTC,
  calculateFinalRating,
  calculatePRS,
  calculateAveragePRS,
  calculatePercentageRate,
  calculateWeightedMean
};
