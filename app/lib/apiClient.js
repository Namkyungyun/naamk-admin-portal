import axios from "axios";
import { getAccessToken, removeAccessToken } from "@/app/lib/auth";

const apiClient = () => {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:38080/api/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 클라이언트 실행 시점에서만 토큰 주입
  instance.interceptors.request.use((config) => {
    // const token = getAccessToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  });

  instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      removeAccessToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

  return instance;
};

export default apiClient;
