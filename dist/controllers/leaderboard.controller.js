"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = void 0;
const db_1 = require("../config/db");
const pointsCalculator_1 = require("../utils/pointsCalculator");
const getLeaderboard = async (req, res) => {
    const leagueId = parseInt(req.params.leagueId);
    // Validate leagueId
    if (isNaN(leagueId)) {
        return res.status(400).json({ message: 'Invalid league ID' });
    }
    try {
        const teams = await db_1.prisma.team.findMany({
            where: { leagueId },
            include: {
                user: true,
                players: true,
            },
        });
        const leaderboard = [];
        for (const team of teams) {
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
                const mockStats = {
                    goals: Math.floor(Math.random() * 3) + 1, // Always at least 1 goal
                    assists: Math.floor(Math.random() * 2),
                    yellowCards: Math.floor(Math.random() * 2),
                    redCards: 0,
                    cleanSheet: true,
                };
                const playerPoints = (0, pointsCalculator_1.calculatePoints)(mockStats);
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
    }
    catch (err) {
        console.error('Error fetching leaderboard:', err);
        res.status(500).json({
            message: 'Error fetching leaderboard',
            error: process.env.NODE_ENV === 'development' ? err : 'Internal server error',
        });
    }
};
exports.getLeaderboard = getLeaderboard;
