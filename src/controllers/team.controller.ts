import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const createTeam = async (req: Request, res: Response) => {
  const { name, userId, leagueId } = req.body;
  try {
    const team = await prisma.team.create({
      data: {
        name,
        userId,
        leagueId,
      },
    });
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: 'Error creating team', error: err });
  }
};

export const getTeamsByLeague = async (req: Request, res: Response) => {
  const leagueId = parseInt(req.params.leagueId);
  try {
    const teams = await prisma.team.findMany({
      where: { leagueId },
      include: { user: true },
    });
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching teams', error: err });
  }
};
