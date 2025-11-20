// // src/api/axios.js
// import axios from "axios";

// // API 路徑定義
// export const API_PATHS = {
//   AUTH: {
//     LOGIN: '/coffee/login',
//     REGISTER: '/coffee/register'
//   },
// };

// // 創建 axios 實例
// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_APP_PATH || "http://localhost:3000",
//   headers: {
//     "Content-Type": "application/json",
//     "X-API-Key": import.meta.env.VITE_API_KEY,
//   },
// });

// // 請求攔截器
// apiClient.interceptors.request.use(
//   (config) => {
//     // 檢查是否是登入或註冊請求，並確保 URL 正確
//     if (config.url === API_PATHS.AUTH.LOGIN || config.url === API_PATHS.AUTH.REGISTER) {
//       // 移除可能已存在的 /api 和 /coffee 前綴，然後重新添加正確的路徑
//       const cleanPath = config.url.replace(/^\/?(api\/)?(coffee\/)?/, '');
//       config.url = '/api/login';  // 直接使用正確的路徑
//     }

//     console.log("發送請求:", {
//       url: config.baseURL + config.url,
//       method: config.method,
//       headers: config.headers,
//     });
//     return config;
//   },
//   (error) => {
//     console.error("請求錯誤:", error);
//     return Promise.reject(error);
//   }
// );

// // 回應攔截器保持不變
// apiClient.interceptors.response.use(
//   (response) => {
//     console.log("收到回應:", response.data);
//     return response.data;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error("認證失敗 - 請確認 API Key 是否正確");
//     }
//     console.error("回應錯誤:", error.response || error);
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

import axios from "axios";

// API 路徑定義
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/auth/login", // 登入 API 路徑
    REGISTER: "/api/auth/register", // 註冊 API 路徑
  },
  COFFEE: {
    BASE: "/api/coffee", // 咖啡店 API 基礎路徑
  },
};

// 創建 axios 實例
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_PATH || "http://localhost:3000", // 確保 baseURL 正確
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": import.meta.env.VITE_API_KEY, // 環境變數中的 API Key
  },
});

// 請求攔截器
apiClient.interceptors.request.use(
  (config) => {
    // 從 localStorage 取得 JWT token 並添加到請求 header
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 回應攔截器
apiClient.interceptors.response.use(
  (response) => {
    // console.log("收到回應:", response.data);
    return response.data; // 直接返回數據
  },
  (error) => {
    // **修改點 3: 增加錯誤處理提示**
    if (error.response?.status === 401) {
      // console.error("認證失敗 - 請確認 API Key 是否正確");
      // console.log("認證失敗 - 請確認 API Key 是否正確");
    }
    // console.error("回應錯誤:", error.response || error);
    // console.log("回應錯誤:", error.response || error);
    return Promise.reject(error);
  }
);

export default apiClient;
