<template>
  <header class="bg-gradient-to-r from-amber-900 to-amber-800 shadow-lg sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-24">
        <!-- Logo Section -->
        <div class="flex items-center group">
          <router-link to="/">
            <div class="flex items-center space-x-5 transition-transform duration-300 hover:scale-105">
              <div class="relative">
                <div
                  class="absolute inset-0 bg-amber-50/20 rounded-full blur-lg group-hover:bg-amber-50/30 transition-all duration-300"></div>
                <img
                  src="/src/image/simple_book _logo_4394317 .png"
                  alt="Logo"
                  class="w-16 h-16 rounded-full shadow-xl border-2 border-amber-50/40 relative z-10 transition-all duration-300 group-hover:border-amber-50/60" />
              </div>
              <span
                class="text-3xl font-bold text-amber-50 hidden sm:block tracking-wider transition-colors duration-300 group-hover:text-amber-100">
                咖啡地圖
              </span>
            </div>
          </router-link>
        </div>

        <!-- Navigation -->
        <div class="relative">
          <!-- 主按鈕 -->
          <!-- <router-link to="/membercenter"> -->
          <button type="button" class="main-button" @click="toggleButton">
            <span>會員中心</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </button>
          <!-- </router-link> -->
          <!-- 新增按鈕 -->
          <button
            v-if="showNewButton"
            class="loginOut-button absolute left-1/2 transform -translate-x-1/2 mt-2"
            @click="handleLoginOutButtonClick">
            登出
          </button>
          <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" v-if="isLoginOut">
            <div class="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 class="text-lg font-semibold text-gray-800">登出提示</h2>
              <p class="mt-2 text-gray-600">您已成功登出。</p>
              <div class="mt-4 flex justify-end">
                <button
                  @click="closeLogout"
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                  確定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 定義狀態
const showNewButton = ref(false); // 控制登出按鈕顯示/隱藏
const isLoginOut = ref(false); // 控制登出提示框顯示/隱藏

// 方法
const toggleButton = () => {
  const userInfo = localStorage.getItem("LoginStatus"); // 獲取登入狀態
  console.log("檢查登入記錄:", userInfo);

  isLoginOut.value = false; // 確保登出提示框關閉

  // **檢查 localStorage 的值是否為空或不為 "true"**
  if (!userInfo || userInfo !== "true") {
    // 如果 LoginStatus 為 null（未設置）或值不是 "true"，執行 else 區塊
    console.log("未登入或登入狀態為空--->導航到LOGIN");
    router.push("/membercenter"); // 導航到登入頁
  } else {
    // 如果 LoginStatus 為 "true"，顯示或隱藏登出按鈕
    showNewButton.value = !showNewButton.value;
    console.log("目前顯示登出鈕");
  }
};

const handleLoginOutButtonClick = () => {
  // 清除登入狀態
  localStorage.removeItem("LoginStatus");
  console.log("已清除登入記錄");

  // 顯示登出提示框，隱藏登出按鈕
  isLoginOut.value = true;
  showNewButton.value = false;
  router.push("/"); // 導航到登入頁
};

const closeLogout = () => {
  // 關閉登出提示框
  isLoginOut.value = false;
};
</script>

<style lang="scss" scoped>
.main-button {
  background-color: #8d3e0f; /* 背景色 */
  color: #fff; /* 字體顏色 */
  border: 2px solid rgba(255, 255, 255, 0.3); /* 邊框 */
  padding: 8px 24px; /* 按鈕內邊距 */
  border-radius: 8px; /* 圓角 */
  font-size: 16px; /* 字體大小 */
  font-weight: bold; /* 字體加粗 */
  cursor: pointer; /* 指針 */
  display: flex; /* Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center; /* 文字居中 */
  transition: all 0.3s ease; /* 過渡效果 */
  height: auto; /* 自動高度 */
  width: auto; /* 自動寬度 */
  min-width: 120px; /* 最小寬度，確保按鈕不會太小 */

  &:hover {
    background-color: #a8572e; /* hover效果 */
    border-color: rgba(255, 255, 255, 0.5); /* hover邊框顏色 */
  }

  &:active {
    transform: scale(0.95); /* 點擊縮放效果 */
  }
}

.loginOut-button {
  background-color: #8d3e0f; /* 背景色 */
  color: #fff; /* 字體顏色 */
  border: 2px solid rgba(255, 255, 255, 0.3); /* 邊框 */
  padding: 8px 24px; /* 按鈕內邊距 */
  border-radius: 8px; /* 圓角 */
  font-size: 16px; /* 字體大小 */
  font-weight: bold; /* 字體加粗 */
  cursor: pointer; /* 指針 */
  display: flex; /* Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center; /* 文字居中 */
  transition: all 0.3s ease; /* 過渡效果 */
  height: auto; /* 自動高度 */
  width: auto; /* 自動寬度 */
  min-width: 120px; /* 最小寬度，確保按鈕不會太小 */

  &:hover {
    background-color: #a8572e; /* hover效果 */
    border-color: rgba(255, 255, 255, 0.5); /* hover邊框顏色 */
  }

  &:active {
    transform: scale(0.95); /* 點擊縮放效果 */
  }

  &.absolute {
    position: absolute;
    left: 50%; /* 定位到父級的水平中心 */
    transform: translate(-50%, 0); /* 修正水平居中偏移 */
    top: 100%; /* 位於主按鈕的正下方 */
    margin-top: 0.5rem; /* 與主按鈕的距離 */
  }
}
</style>
