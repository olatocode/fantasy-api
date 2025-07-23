/** @format */

import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export const createLeague = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { name } = req.body;
  const creatorId = req.user?.id;
  try {
    const league = await prisma.league.create({
      data: {
        name,
        creatorId,
      },
    });
    res.status(201).json(league);
  } catch (err) {
    res.status(500).json({ message: 'Error creating league', error: err });
  }
};

export const getLeagues = async (req: Request, res: Response) => {
  try {
    const leagues = await prisma.league.findMany({
      include: { teams: true },
    });
    res.status(200).json(leagues);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leagues', error: err });
  }
};
