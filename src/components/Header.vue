<template>
  <header class="bg-gradient-to-r from-amber-900 to-amber-800 shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-28"> <!-- 調整 header 高度 -->
        <!-- Logo Section -->
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-5"> <!-- 適度的間距 -->
            <div class="relative">
              <div class="absolute inset-0 bg-amber-50/10 rounded-full blur-md"></div>
              <img 
                src="https://picsum.photos/90/90" 
                alt="Logo" 
                class="w-20 h-20 rounded-full shadow-lg border-2 border-amber-50/30 relative z-10" 
              />
            </div>
            <span class="text-3xl font-bold text-amber-50 hidden sm:block tracking-wide">
              咖啡地圖
            </span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-5">
          <button
            type="button"
            class="px-6 py-2.5 text-amber-50 border-2 border-amber-50/30 rounded-lg hover:bg-amber-50/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-50/20 text-lg">
            登入
          </button>
          <button
            type="button"
            class="px-6 py-2.5 bg-amber-500 text-amber-950 rounded-lg hover:bg-amber-400 transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg font-medium">
            註冊
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button 
            class="mobile-menu-button p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-50/20"
          >
            <div class="w-9 h-9 relative">
              <span 
                class="absolute h-0.5 w-full bg-amber-50 transform transition duration-300 ease-in-out"
              ></span>
              <span 
                class="absolute h-0.5 w-full bg-amber-50 transform transition duration-300 ease-in-out translate-y-3.5"
              ></span>
              <span 
                class="absolute h-0.5 w-full bg-amber-50 transform transition duration-300 ease-in-out translate-y-7"
              ></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="hidden md:hidden">
        <div class="px-3 pt-2 pb-3 space-y-3 bg-amber-800/50 rounded-lg mb-4">
          <button
            class="w-full px-6 py-3 text-amber-50 border-2 border-amber-50/30 rounded-lg hover:bg-amber-50/10 transition-colors duration-200 text-lg">
            登入
          </button>
          <button
            class="w-full px-6 py-3 bg-amber-500 text-amber-950 rounded-lg hover:bg-amber-400 transition-colors duration-200 shadow-lg text-lg font-medium">
            註冊
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.mobile-menu-button:focus {
  outline: 2px solid rgba(255, 237, 213, 0.2);
  outline-offset: 2px;
}
</style>