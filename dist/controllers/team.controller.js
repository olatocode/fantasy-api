"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeamsByLeague = exports.createTeam = void 0;
const db_1 = require("../config/db");
const createTeam = async (req, res) => {
    const { name, userId, leagueId } = req.body;
    try {
        const team = await db_1.prisma.team.create({
            data: {
                name,
                userId,
                leagueId,
            },
        });
        res.status(201).json(team);
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating team', error: err });
    }
};
exports.createTeam = createTeam;
const getTeamsByLeague = async (req, res) => {
    const leagueId = parseInt(req.params.leagueId);
    try {
        const teams = await db_1.prisma.team.findMany({
            where: { leagueId },
            include: { user: true },
        });
        res.status(200).json(teams);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching teams', error: err });
    }
};
exports.getTeamsByLeague = getTeamsByLeague;
