// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_MEETING_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// If you have authentication, you can add an interceptor here
// to automatically attach the auth token to every request.

export default apiClient;