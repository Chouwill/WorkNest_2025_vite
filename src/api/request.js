import apiClient from './axios';
import { API_PATHS } from './axios';

// 封裝 GET 方法
export const get = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response;
  } catch (error) {
    console.error(`GET 請求失敗: ${url}`, error.response || error);
    throw error;
  }
};

// 封裝 POST 方法
export const post = async (url, data = {}) => {
  try {
    const response = await apiClient.post(url, data);
    return response;
  } catch (error) {
    console.error(`POST 請求失敗: ${url}`, error.response || error);
    throw error;
  }
};

// 封裝 PUT 方法
export const put = async (url, data = {}) => {
  try {
    const response = await apiClient.put(url, data);
    return response;
  } catch (error) {
    console.error(`PUT 請求失敗: ${url}`, error.response || error);
    throw error;
  }
};

// 封裝 DELETE 方法
export const del = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response;
  } catch (error) {
    console.error(`DELETE 請求失敗: ${url}`, error.response || error);
    throw error;
  }
};

// 導出 API 路徑常量，方便在其他文件中使用
export { API_PATHS };


