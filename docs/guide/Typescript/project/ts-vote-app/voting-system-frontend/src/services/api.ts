import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const register = (username: string, password: string, role: 'admin' | 'user') =>
  api.post('/register', { username, password, role });

export const login = (username: string, password: string) =>
  api.post('/login', { username, password });

export const createVote = (voteData: any) =>
  api.post('/votes', voteData, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

export const getVotes = () =>
  api.get('/votes', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
