import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  }
  return null;
};

export const getUserAccessFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.perfil.authority;
  }
  return null;
};

export default api;