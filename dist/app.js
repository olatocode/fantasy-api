"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const league_route_1 = __importDefault(require("./routes/league.route"));
const team_route_1 = __importDefault(require("./routes/team.route"));
const leaderboard_route_1 = __importDefault(require("./routes/leaderboard.route"));
const player_route_1 = __importDefault(require("./routes/player.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
app.get('/', (req, res) => {
    res.send('Welcome to the Fantasy API');
});
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/leagues', league_route_1.default);
app.use('/api/v1/teams', team_route_1.default);
app.use('/api/v1/leaderboard', leaderboard_route_1.default);
app.use('/api/v1/players', player_route_1.default);
exports.default = app;
