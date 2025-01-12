import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFavoriteStore = defineStore("favoriteitem", () => {
  // 定義響應式數據
  const items = ref([]); // 收藏清單

  // 定義行為
  const addItem = (storeItem) => {
    // 檢查是否已經存在
    const existingItem = items.value.find((item) => item.id === storeItem.id);
    if (!existingItem) {
      items.value.push({ ...storeItem, quantity: 1 }); // 如果不存在，加入清單
    }
  };

  const removeItem = (storeItemId) => {
    items.value = items.value.filter((item) => item.id !== storeItemId); // 根據 ID 移除項目
  };

  const clearList = () => {
    items.value = []; // 清空清單
  };

  // 返回響應式數據和行為
  return {
    items,
    addItem,
    removeItem,
    clearList,
  };
});
