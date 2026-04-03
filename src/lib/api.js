import axios from "axios";

const api = axios.create({
  baseURL: "https://stayx-backend-c0yb.onrender.com",
  withCredentials: true, // 🔥 THIS IS REQUIRED
});

export default api;