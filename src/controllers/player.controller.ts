/** @format */

// controllers/playerController.ts
import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const createPlayer = async (req: Request, res: Response) => {
  const { name, position, teamId } = req.body;

  try {
    if (!teamId) {
      return res
        .status(400)
        .json({ message: 'teamId is required to assign player to a team' });
    }
    const player = await prisma.player.create({
      data: { name, position, teamId },
    });
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create player', error });
  }
};
