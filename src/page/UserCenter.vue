<template>
  <div class="p-8 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen flex flex-col items-center">

    <!-- 收藏清單卡片 -->
    <div class="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">我的收藏清單</h2>

      <!-- 清單內容 -->
      <ul class="space-y-3 divide-y divide-gray-200">
        <li v-for="item in ShowList" :key="item.id" class="flex items-start justify-between py-4">
          <div>
            <h3 class="text-lg font-medium text-gray-700">{{ item.StoreName }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ item.address }}</p>
          </div>
          <button
            @click="removeStore(item.id)"
            class="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300">
            移除
          </button>
        </li>
      </ul>

      <!-- 清空按鈕 -->
      <button
        class="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        @click="clearAllFavorites">
        清空清單
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFavoriteStore } from "../store/Favorite";
import { useUserInfoStore } from "../store/User";

// 從 Pinia Store 中讀取數據
const userInfoStore = useUserInfoStore();
const uid = computed(() => userInfoStore.uid);
const email = computed(() => userInfoStore.email);
const roleName = computed(() => userInfoStore.roleName);
const nickname = computed(() => userInfoStore.nickname);

// 收藏清單 Store
const FavoriteList = useFavoriteStore();
const ShowList = computed(() => FavoriteList.items);

// 定義方法
const saveChanges = () => {
  alert("修改已儲存！");
};

const removeStore = (id) => {
  if (confirm("確定要移除這個項目嗎？")) {
    FavoriteList.removeItem(id);
    console.log("移除項目 ID：", id);
  }
};

const clearAllFavorites = () => {
  if (confirm("確定要清空所有收藏嗎？")) {
    FavoriteList.clearList();
    console.log("清單已清空：", FavoriteList.items);
  }
};
</script>

<style scoped>
/* 自定義樣式 */
body {
  font-family: "Inter", sans-serif;
}

input:disabled {
  opacity: 0.7;
}
</style>
