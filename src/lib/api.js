import axios from "axios";

const DEFAULT_API_BASE_URL = "https://stayx-backend-c0yb.onrender.com/";

const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL: "https://stayx-backend-c0yb.onrender.com/",
  withCredentials: true,
});

export default api;
 