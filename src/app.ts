/** @format */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route';
import leagueRoutes from './routes/league.route';
import teamRoutes from './routes/team.route';
import leaderboardRoutes from './routes/leaderboard.route';
import playerRoutes from './routes/player.route';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.get('/', (req, res) => {
  res.send('Welcome to the Fantasy API');
});



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leagues', leagueRoutes);
app.use('/api/v1/teams', teamRoutes);
app.use('/api/v1/leaderboard', leaderboardRoutes);
app.use('/api/v1/players', playerRoutes);


export default app;
