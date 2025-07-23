/** @format */

import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { createLeague, getLeagues } from '../controllers/league.controller';

const router = Router();
router.get('/', authenticateToken, getLeagues);
router.post('/', authenticateToken, createLeague);



export default router;
