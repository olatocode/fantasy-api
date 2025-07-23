import { Router } from 'express';
import { getLeaderboard } from '../controllers/leaderboard.controller';

const router = Router();

router.get('/:leagueId', getLeaderboard);

export default router;
