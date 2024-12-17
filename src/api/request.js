// src/api/request.js
import apiClient from './axios';

export const get = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const post = async (url, data = {}) => {
  try {
    const response = await apiClient.post(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const put = async (url, data = {}) => {
  try {
    const response = await apiClient.put(url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const del = async (url) => {
  try {
    const response = await apiClient.delete(url);
    return response;
  } catch (error) {
    throw error;
  }
};
