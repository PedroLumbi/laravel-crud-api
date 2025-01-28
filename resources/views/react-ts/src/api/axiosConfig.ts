import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL base del backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Para sesiones o cookies
});

export default api;
