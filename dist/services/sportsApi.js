"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPlayersStats = exports.fetchFixtures = void 0;
const axios_1 = __importDefault(require("axios"));
const API_BASE_URL = 'https://api.sportsdata.io/v3/soccer/scores/json';
const API_KEY = process.env.SPORTS_API_KEY;
const fetchFixtures = async () => {
    const response = await axios_1.default.get(`${API_BASE_URL}/GamesByDate/2025-JUL-23`, {
        headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
    });
    return response.data;
};
exports.fetchFixtures = fetchFixtures;
const fetchPlayersStats = async (matchId) => {
    const response = await axios_1.default.get(`${API_BASE_URL}/PlayerGameStatsByGame/${matchId}`, {
        headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
    });
    return response.data;
};
exports.fetchPlayersStats = fetchPlayersStats;
