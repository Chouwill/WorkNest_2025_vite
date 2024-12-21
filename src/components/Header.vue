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

        <!-- Navigation (Visible on all screen sizes) -->
        <div class="flex items-center">
          <router-link to="/membercenter">
            <button
              type="button"
              class="px-4 sm:px-6 py-2 text-amber-50 border-2 border-amber-50/30 rounded-lg hover:bg-amber-50/10 hover:border-amber-50/50 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-50/20 text-base sm:text-lg flex items-center space-x-2">
              <span>會員中心</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </button>
          </router-link>
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
</style>


