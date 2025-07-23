/** @format */

import axios from 'axios';

const API_BASE_URL = 'https://api.sportsdata.io/v3/soccer/scores/json';
const API_KEY = process.env.SPORTS_API_KEY;

export const fetchFixtures = async () => {
  const response = await axios.get(`${API_BASE_URL}/GamesByDate/2025-JUL-23`, {
    headers: { 'Ocp-Apim-Subscription-Key': API_KEY as string },
  });
  return response.data;
};

export const fetchPlayersStats = async (matchId: number) => {
  const response = await axios.get(
    `${API_BASE_URL}/PlayerGameStatsByGame/${matchId}`,
    {
      headers: { 'Ocp-Apim-Subscription-Key': API_KEY as string },
    }
  );
  return response.data;
};
