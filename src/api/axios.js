// src/api/axios.js
import axios from "axios";

// 創建 axios 實例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_PATH,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": import.meta.env.VITE_API_KEY
  }
});

// 請求攔截器
apiClient.interceptors.request.use(
  (config) => {
    console.log('發送請求:', {
      url: config.baseURL + config.url,
      method: config.method,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error("請求錯誤:", error);
    return Promise.reject(error);
  }
);

// 回應攔截器
apiClient.interceptors.response.use(
  (response) => {
    console.log('收到回應:', response.data);
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("認證失敗 - 請確認 API Key 是否正確");
    }
    console.error("回應錯誤:", error.response || error);
    return Promise.reject(error);
  }
);

export default apiClient;
