// routes/playerRoutes.ts
import express from 'express';
import { createPlayer } from '../controllers/player.controller';

const router = express.Router();
router.post('/', createPlayer);
export default router;
