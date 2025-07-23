/** @format */
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { calculatePoints, PlayerStats } from '../utils/pointsCalculator';

export const getLeaderboard = async (req: Request, res: Response) => {
  const leagueId = parseInt(req.params.leagueId);

  // Validate leagueId
  if (isNaN(leagueId)) {
    return res.status(400).json({ message: 'Invalid league ID' });
  }

  try {
    const teams = await prisma.team.findMany({
      where: { leagueId },
      include: {
        user: true,
        players: true,
      },
    });

    type TeamWithUser = (typeof teams)[number] & {
      user: { username: string };
      players: Array<{
        id: number;
        name: string;
        position: string;
        // Add more fields if needed
      }>;
    };

    type LeaderboardEntry = {
      teamName: string;
      owner: string;
      points: number;
      playerCount: number; // Added for debugging/info
    };

    const leaderboard: LeaderboardEntry[] = [];

    for (const team of teams as TeamWithUser[]) {
      let teamPoints = 0;

      // Check if team has players
      if (!team.players || team.players.length === 0) {
        leaderboard.push({
          teamName: team.name,
          owner: team.user.username,
          points: 0,
          playerCount: 0,
        });
        continue;
      }

      for (const player of team.players) {
        // 🔁 Replace this with actual API call for each player's match stats
        const mockStats: PlayerStats = {
          goals: Math.floor(Math.random() * 3) + 1, // Always at least 1 goal
          assists: Math.floor(Math.random() * 2),
          yellowCards: Math.floor(Math.random() * 2),
          redCards: 0,
          cleanSheet: true,
        };

        const playerPoints = calculatePoints(mockStats);
        teamPoints += playerPoints;
      }

      leaderboard.push({
        teamName: team.name,
        owner: team.user.username,
        points: teamPoints,
        playerCount: team.players.length,
      });
    }

    // Sort by points in descending order
    leaderboard.sort((a, b) => b.points - a.points);

    res.status(200).json({
      data: leaderboard,
      totalTeams: leaderboard.length,
    });
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({
      message: 'Error fetching leaderboard',
      error:
        process.env.NODE_ENV === 'development' ? err : 'Internal server error',
    });
  }
};
