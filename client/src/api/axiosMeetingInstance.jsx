import axios from "axios";
import { getToken } from "../utils/tokenService";

const axiosMeetingInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_MEETING_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosMeetingInstance.interceptors.request.use(
  (config) => {
    const token = getToken("node");
    if (token) {
      // config.headers["authorization"] = `Bearer ${token}`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosMeetingInstance;