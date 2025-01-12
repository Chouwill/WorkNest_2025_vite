<template>
  <div id="app">
    <!-- 頁首 -->
    <Header />

    <!-- 路由內容 -->
    <router-view></router-view>

    <!-- 頁尾 -->
    <Footer />

    <!-- 收藏按鈕 -->
    <button
      @click="toggleFavoritePopup"
      class="fixed bottom-20 right-4 w-[100px] h-[100px] bg-white rounded-full shadow-lg flex items-center justify-center">
      <img src="/src/image/FavoriteBox.png" alt="" class="w-full h-full" />
    </button>

    <!-- 收藏清單彈窗 -->
    <div
      v-if="showFavoritePopup"
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white w-[90%] max-w-[400px] rounded-lg shadow-lg p-4">
        <h2 class="text-lg font-bold mb-4">我的收藏清單</h2>

        <!-- 清單內容 -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">收藏清單</h2>
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
        </div>

        <!-- 清空按鈕 -->
        <button
          class="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          @click="clearAllFavorites">
          清空清單
        </button>

        <!-- 關閉按鈕 -->
        <button
          class="mt-2 w-full bg-[#8A3D0E] text-white py-2 rounded-lg hover:bg-[#A6541A] transition"
          @click="toggleFavoritePopup">
          關閉
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useFavoriteStore } from "./store/Favorite";

// 控制彈窗顯示狀態
const showFavoritePopup = ref(false);

// Pinia 的收藏清單 store
const FavoriteList = useFavoriteStore();

// 本地的顯示清單，設置為 computed
const ShowList = computed(() => FavoriteList.items);

// 切換彈窗顯示狀態
const toggleFavoritePopup = () => {
  showFavoritePopup.value = !showFavoritePopup.value;
};

// 刪除項目
const removeStore = (id) => {
  console.log("移除項目 ID：", id); // 確認是否接收到正確的 id
  FavoriteList.removeItem(id);
};

// 清空清單
const clearAllFavorites = () => {
  FavoriteList.clearList();
  console.log("清單已清空：", FavoriteList.items); // 用於檢查清單是否已清空
};
</script>
