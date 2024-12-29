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
                  src="https://picsum.photos/90/90"
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
        <div class="flex items-center relative">
          <!-- 主按鈕 -->
          <button
    type="button"
    class="main-button px-4 sm:px-6 py-2 text-amber-50 border-2 border-amber-50/30 rounded-lg hover:bg-amber-50/10 hover:border-amber-50/50 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-50/20 text-base sm:text-lg flex items-center space-x-2">
            <span>會員中心</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </button>

          <!-- 滑出按鈕 -->
          <button
            class="main-button slide-button absolute top-full left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 z-10 pointer-events-none">
            登出
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  transition: box-shadow 0.3s;
}

header.scrolled {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

button {
  transition: transform 0.2s;
}

button:active {
  transform: scale(0.95);
}

/* 主按鈕樣式 */

.main-button:hover {
  background-color: #8D3E0F; /* hover效果 */
}

/* 滑出按鈕初始狀態 */
.slide-button {
  position: absolute;
  top: 51px;
  left: 50%;
  transform: translate(-50%, -10px) scale(0.9);
  opacity: 0;
  background-color: #3f1e0a; /* amber-500 */
  color: white;
  border: none;
  padding: 10px 20px; /* 與主按鈕一致 */
  border-radius: 5px;
  transition: all 0.3s ease;
  pointer-events: none; /* 初始狀態下不可點擊 */
}

.slide-button:hover {
  background-color: rgba(255, 193, 7, 0.9); /* hover效果 */
}

/* 當主按鈕獲得焦點時，滑出按鈕顯示 */
.main-button:focus + .slide-button {
  transform: translate(-50%, 0) scale(1);
  opacity: 1;
  pointer-events: auto; /* 顯示狀態下可點擊 */
}
</style>
