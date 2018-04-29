function forStarting(starts) { // starting a match 3 point
  return starts * 3;
}

function forSub(subs) { // sub = 1 point
  return subs * 1;
}

function forGoals(goals, position) { // depends on position
  let multiplier = 0;
  if (position === 'GK') {
    multiplier = 10;
  } else if (position === 'FB' || position === 'CB') {
    multiplier = 8;
  } else if (position === 'MID') {
    multiplier = 6;
  } else if (position === 'AM') {
    multiplier = 5;
  } else if (position === 'STR') {
    multiplier = 4;
  }
  return goals * multiplier;
}

function forAssists(assists) { // assist = 3 points
  return assists * 3;
}

function forYellowCards(yc) { // -2
  return parseInt(yc * -2, 10);
}

function forRedCards(rc) { // -5
  return parseInt(rc * -5, 10);
}

function forCleanSheet(cs, position) { // 5
  let multiplier;
  if ((position === 'FB' || position === 'CB') || position === 'GK') {
    multiplier = 5;
  } else {
    multiplier = 0;
  }
  return cs * multiplier;
}

function forConceded(conceded, position) { // -1
  let multiplier;
  if ((position === 'FB' || position === 'CB') || position === 'GK') {
    multiplier = -1;
  } else {
    multiplier = 0;
  }
  return parseInt(conceded * multiplier, 10);
}

function forTackleBonus(bonusPoints, position) { // 3
  let multiplier;
  if ((position === 'FB' || position === 'CB') || position === 'MID') {
    multiplier = 3;
  } else {
    multiplier = 0;
  }
  return parseInt(bonusPoints * multiplier, 10);
}

function forPenaltiesSaved(ps) {
  return ps * 5;
}

function forSaveBonus(bonusPoints, position) { // 3
  let multiplier;
  if (position === 'GK') {
    multiplier = 3;
  } else {
    multiplier = 0;
  }
  return parseInt(bonusPoints * multiplier, 10);
}

function forMOM() {
  return 0;
}

function calculateTotalPoints(stats, pos) {
  const apps = forStarting(stats.apps, pos);
  const subs = forSub(stats.subs, pos);
  const mom = forMOM(stats.mom, pos);
  const gls = forGoals(stats.gls, pos);
  const asts = forAssists(stats.asts, pos);
  const cs = forCleanSheet(stats.cs, pos);
  const con = forConceded(stats.con, pos);
  const pensv = forPenaltiesSaved(stats.pensv, pos);
  const ycard = forYellowCards(stats.ycard, pos);
  const rcard = forRedCards(stats.rcard, pos);
  const tb = forTackleBonus(stats.tb, pos);
  const sb = forSaveBonus(stats.sb, pos);
  return mom + gls + ycard + rcard + apps + subs + asts + cs + tb + sb + con + pensv;
}

// externalSeasonStats : the new season stats - including any gameWeek stats
// savedSeasonStats : previously saved season stats - including the latest gameWeek stats
// savedGameWeekStats : previously saved gameWeek stats
// pos : the player position
function calculateGameWeek(externalSeasonStats, savedSeasonStats, savedGameWeekStats, pos) {
  const gameWeek = {
    apps: (externalSeasonStats.apps - savedSeasonStats.apps) + savedGameWeekStats.apps,
    subs: (externalSeasonStats.subs - savedSeasonStats.subs) + savedGameWeekStats.subs,
    mom: (externalSeasonStats.mom - savedSeasonStats.mom) + savedGameWeekStats.mom,
    gls: (externalSeasonStats.gls - savedSeasonStats.gls) + savedGameWeekStats.gls,
    asts: (externalSeasonStats.asts - savedSeasonStats.asts) + savedGameWeekStats.asts,
    cs: (externalSeasonStats.cs - savedSeasonStats.cs) + savedGameWeekStats.cs,
    con: (externalSeasonStats.con - savedSeasonStats.con) + savedGameWeekStats.con,
    pensv: (externalSeasonStats.pensv - savedSeasonStats.pensv) + savedGameWeekStats.pensv,
    ycard: (externalSeasonStats.ycard - savedSeasonStats.ycard) + savedGameWeekStats.ycard,
    rcard: (externalSeasonStats.rcard - savedSeasonStats.rcard) + savedGameWeekStats.rcard,
    tb: (externalSeasonStats.tb - savedSeasonStats.tb) + savedGameWeekStats.tb,
    sb: (externalSeasonStats.sb - savedSeasonStats.sb) + savedGameWeekStats.sb,
  };
  gameWeek.points = calculateTotalPoints(gameWeek, pos);
  return gameWeek;
}

const calculatePoints = (externalPlayer, internalPlayer) => ({
  ...externalPlayer,
  ...internalPlayer,
  gameWeek: calculateGameWeek(
    externalPlayer.season,
    internalPlayer.season,
    internalPlayer.gameWeek,
    internalPlayer.pos,
  ),
  season: internalPlayer.season
});

module.exports = {
  forStarting,
  forSub,
  forGoals,
  forAssists,
  forYellowCards,
  forRedCards,
  forCleanSheet,
  forConceded,
  forTackleBonus,
  forPenaltiesSaved,
  forSaveBonus,
  forMOM,
  calculateTotalPoints,
  calculateGameWeek,
  calculatePoints,
};
