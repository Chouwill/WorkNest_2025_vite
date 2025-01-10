<template>
  <div id="app">
    <!-- 頁首 -->
    <Header />

    <!-- 路由內容 -->
    <router-view></router-view>

    <!-- 頁尾 -->
    <Footer />

    <!-- 返回頂部按鈕 -->
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="fixed bottom-4 right-4 w-12 h-12 bg-[#8A3D0E] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#A6541A] transform hover:scale-110 transition duration-300"
    >
      <!-- 向上的箭頭 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

// 控制按鈕顯示的狀態
const showButton = ref(false);

// 滾動至頂部的函數
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滾動效果
  });
};

// 檢查滾動位置，決定是否顯示按鈕
const handleScroll = () => {
  showButton.value = window.scrollY > 200; // 當滾動超過 200px 時顯示按鈕
};

// 註冊滾動事件
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// 移除滾動事件
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<style>
/* 確保按鈕在所有內容之上 */
button {
  z-index: 10;
}


/* 頁面加載
  └── 註冊滾動事件監聽器
用戶滾動頁面
  ├── 檢查滾動距離（window.scrollY）
  ├── 滾動 > 200px → 顯示按鈕
  └── 滾動 <= 200px → 隱藏按鈕
用戶點擊按鈕
  └── 平滑滾動到頂部（window.scrollTo）
頁面卸載
  └── 移除滾動事件監聽器 */

</style>
