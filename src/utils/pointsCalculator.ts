/** @format */

export type PlayerStats = {
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  cleanSheet: boolean;
};

export function calculatePoints(stats: PlayerStats): number {
  let points = 0;

  points += stats.goals * 5; // 5 pts per goal
  points += stats.assists * 3; // 3 pts per assist
  points -= stats.yellowCards * 1; // -1 pt per yellow card
  points -= stats.redCards * 3; // -3 pts per red card

  if (stats.cleanSheet) points += 4; // 4 pts for clean sheet

  return points;
}

