<script setup></script>

<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <!-- 搜尋結果區域 -->
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">搜尋結果</h2>

      <!-- 卡片網格布局 -->
      <div class="space-y-6">
        <!-- 咖啡廳卡片 1 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="md:flex">
            <div class="md:w-1/3">
              <img
                src="https://picsum.photos/id/681/600/101"
                alt="咖啡廳照片"
                class="h-48 w-full object-cover md:h-full" />
            </div>
            <div class="p-6 md:w-2/3">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">湛盧咖啡．台大館</h3>
              <div class="space-y-2">
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <p class="text-gray-600 text-sm">台北市 1 區 1 7777號</p>
                </div>
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-gray-600 text-sm">週一至週日：10:00 ~ 20:00</p>
                </div>
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span class="text-gray-600 text-sm">台北市</span>
                </div>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">插座: 有</span>
                <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">場地類型: 未定義</span>
                <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">最低消費: 100元</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 咖啡廳卡片 2 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="md:flex">
            <div class="md:w-1/3">
              <img
                src="https://picsum.photos/id/682/600/101"
                alt="咖啡廳照片"
                class="h-48 w-full object-cover md:h-full" />
            </div>
            <div class="p-6 md:w-2/3">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">FAKEFAKE000777AAAAADD新咖啡777777店</h3>
              <div class="space-y-2">
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <p class="text-gray-600 text-sm">台北市 1 區 1 7777號</p>
                </div>
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-gray-600 text-sm">週一至週日：10:00 ~ 20:00</p>
                </div>
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span class="text-gray-600 text-sm">台北市</span>
                </div>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">插座: 有</span>
                <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">場地類型: 未定義</span>
                <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">最低消費: 100元</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 咖啡廳卡片 3 -->
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="md:flex">
            <div class="md:w-1/3">
              <img
                src="https://picsum.photos/id/683/600/101"
                alt="咖啡廳照片"
                class="h-48 w-full object-cover md:h-full" />
            </div>
            <div class="p-6 md:w-2/3">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">firebase1208已被修改的004</h3>
              <div class="space-y-2">
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <p class="text-gray-600 text-sm">台北市 1 區 1 7777號</p>
                </div>
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-gray-600 text-sm">週一至週日：10:00 ~ 20:00</p>
                </div>
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span class="text-gray-600 text-sm">新北市</span>
                </div>
              </div>
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">插座: 未定義</span>
                <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">場地類型: 未定義</span>
                <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">最低消費: 100元</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
