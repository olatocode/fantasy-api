"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeagues = exports.createLeague = void 0;
const db_1 = require("../config/db");
const createLeague = async (req, res) => {
    const { name } = req.body;
    const creatorId = req.user?.id;
    try {
        const league = await db_1.prisma.league.create({
            data: {
                name,
                creatorId,
            },
        });
        res.status(201).json(league);
    }
    catch (err) {
        res.status(500).json({ message: 'Error creating league', error: err });
    }
};
exports.createLeague = createLeague;
const getLeagues = async (req, res) => {
    try {
        const leagues = await db_1.prisma.league.findMany({
            include: { teams: true },
        });
        res.status(200).json(leagues);
    }
    catch (err) {
        res.status(500).json({ message: 'Error fetching leagues', error: err });
    }
};
exports.getLeagues = getLeagues;
