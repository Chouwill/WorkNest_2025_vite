import axios from "axios";


export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/coffee-shop/auth/login",
    REGISTER: "/api/coffee-shop/auth/register",
  },
  COFFEE: {
    BASE: "/api/coffee-shop/coffee",
  },
};

// defaultHeaders: always include Content-Type; API Key only when env is set
const defaultHeaders = {
  "Content-Type": "application/json",
};

if (import.meta.env.VITE_API_KEY) {
  // portfolio 後端僅在設定 COFFEE_SHOP_API_KEY / API_KEY 時才驗證
  defaultHeaders["X-API-Key"] = import.meta.env.VITE_API_KEY;
}

/**
 * baseURL:
 * - 本機開發：空字串，
 * - 正式環境：設 VITE_API_PATH = render上線後ＵＲＬ
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_PATH || "",
  headers: defaultHeaders,
});

// 請求攔截器：附上 Coffee Shop 的 JWT
apiClient.interceptors.request.use(
  (config) => {
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

// 回應攔截器：直接回傳 data（與舊行為相同）
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 可能是 JWT 或 API Key 問題
    }
    return Promise.reject(error);
  }
);

export default apiClient;
