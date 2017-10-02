import axios from 'axios';

const server = axios.create({
  baseURL: 'http://192.168.1.67:8000'
});

export const getPlayers = () => {
  return server.get('/api/players').then((response) => {
    return response.data;
  });
};

export const getMatches = () => {
  return server.get('/api/matches').then((response) => {
    return response.data;
  });
};

export const postMatch = (winner, loser) => {
  return server.post('/api/matches', {winner, loser}).then((response) => {
    return response.data;
  });
};