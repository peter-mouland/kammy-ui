export function forStarting(starts) { // starting a match 3 point
  return starts * 3;
}

export function forSub(subs) { // sub = 1 point
  return subs * 1;
}

export function forGoals(goals, position) { // depends on position
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

export function forAssists(assists) { // assist = 3 points
  return assists * 3;
}

export function forYellowCards(yc) { // -2
  return parseInt(yc * -2, 10);
}

export function forRedCards(rc) { // -5
  return parseInt(rc * -5, 10);
}

export function forCleanSheet(cs, position) { // 5
  let multiplier;
  if ((position === 'FB' || position === 'CB') || position === 'GK') {
    multiplier = 5;
  } else {
    multiplier = 0;
  }
  return cs * multiplier;
}

export function forConceded(conceded, position) { // -1
  let multiplier;
  if ((position === 'FB' || position === 'CB') || position === 'GK') {
    multiplier = -1;
  } else {
    multiplier = 0;
  }
  return parseInt(conceded * multiplier, 10);
}

export function forTackleBonus(bonusPoints, position) { // 3
  let multiplier;
  if (position === 'MID') {
    multiplier = 4;
  } else if (position === 'FB' || position === 'CB') {
    multiplier = 3;
  } else {
    multiplier = 0;
  }
  return parseInt(bonusPoints * multiplier, 10);
}

export function forPenaltiesSaved(ps) {
  return ps * 5;
}

export function forSaveBonus(bonusPoints, position) { // 3
  let multiplier;
  if (position === 'GK') {
    multiplier = 4;
  } else {
    multiplier = 0;
  }
  return parseInt(bonusPoints * multiplier, 10);
}

export function calculateTotalPoints({ stats, pos }) {
  const apps = forStarting(stats.apps, pos);
  const subs = forSub(stats.subs, pos);
  const gls = forGoals(stats.gls, pos);
  const asts = forAssists(stats.asts, pos);
  const cs = forCleanSheet(stats.cs, pos);
  const con = forConceded(stats.con, pos);
  const pensv = forPenaltiesSaved(stats.pensv, pos);
  const ycard = forYellowCards(stats.ycard, pos);
  const rcard = forRedCards(stats.rcard, pos);
  const tb = forTackleBonus(stats.tb, pos);
  const sb = forSaveBonus(stats.sb, pos);
  const points = {
    apps, subs, gls, asts, cs, con, pensv, ycard, rcard, tb, sb,
  };
  const total = (Object.keys(points)).reduce((prev, curr) => prev + points[curr], 0);
  return { ...points, total };
}
