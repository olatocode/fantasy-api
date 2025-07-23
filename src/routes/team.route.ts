/** @format */

import { Router } from 'express';
import { createTeam, getTeamsByLeague } from '../controllers/team.controller';

const router = Router();

router.post('/', createTeam);
router.get('/:leagueId', getTeamsByLeague);

export default router;
