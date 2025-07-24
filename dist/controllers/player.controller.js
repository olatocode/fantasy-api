"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlayer = void 0;
const db_1 = require("../config/db");
const createPlayer = async (req, res) => {
    const { name, position, teamId } = req.body;
    try {
        if (!teamId) {
            return res
                .status(400)
                .json({ message: 'teamId is required to assign player to a team' });
        }
        const player = await db_1.prisma.player.create({
            data: { name, position, teamId },
        });
        res.status(201).json(player);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create player', error });
    }
};
exports.createPlayer = createPlayer;
