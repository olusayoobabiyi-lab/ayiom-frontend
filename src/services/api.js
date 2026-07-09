import axios from "axios";
import { ENV } from "@/config/env";
import { STORAGE_KEYS } from "@/constants/storage";

const api = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
    }
    return Promise.reject(err);
  }
);

export default api;
