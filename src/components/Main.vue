<script setup>
import { ref, onMounted, computed } from "vue";
import { get } from "../api/request";

const information = ref([]);
const loading = ref(false);
const error = ref(null);



const store = {
  spacePhoto: '', // 後端圖片 URL
  StoreName: '商店名稱'
};

const defaultImage = 'https://cdntwrunning.biji.co/800_eb53c296eb6fc1ac757c290a1f6444b8.jpg'; // 預設圖片，後端未傳入顯示

// 設置背景圖片樣式
const backgroundStyle = {
  backgroundImage: `url(${store.spacePhoto || defaultImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
};

async function getInformation() {
  try {
    loading.value = true;
    console.log("開始請求 API...");

    const response = await get("/");
    console.log("API 返回的原始資料:", response);

    // 清洗資料
    information.value = Object.values(response).map((item) => ({
      ...item,
      powerOutlet: item.powerOutlet === true || item.powerOutlet === "是", // 轉換為布林值
    }));

    console.log("清洗後的資料:", information.value);
  } catch (err) {
    error.value = err.message;
    console.error("請求失敗:", err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getInformation();
});

// 縣市和行政區的選擇狀態
const selectedCity = ref("");
const hasOutlet = ref(false);
const searchQuery = ref("");

// 計算篩選結果
const filteredStores = computed(() => {
  return information.value.filter((store) => {
    // 城市篩選
    const cityMatch = !selectedCity.value || store.city === selectedCity.value;

    // 插座篩選
    const outletMatch = !hasOutlet.value || store.powerOutlet === true;

    // 搜尋篩選
    const searchMatch =
      !searchQuery.value ||
      store.StoreName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.value.toLowerCase());

    return cityMatch && outletMatch && searchMatch;
  });
});
</script>

<template>
  <main class="min-h-screen bg-slate-50 min-w-[375px] pb-20">
    <!-- 背景區域 -->
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/20 z-10"></div>
      <img
        src="/src/image/BG_Pngtreeclean.jpg"
        alt="背景圖片"
        class="h-[300px] md:h-[400px] lg:h-[500px] w-full object-cover" />
      <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-20"></div>
    </div>

    <!-- 表單區域 -->
    <div class="container mx-auto px-4">
      <!-- 篩選控制面板 -->
      <div class="filter-panel flex flex-col sm:flex-row items-center justify-between gap-4 my-4">
        <!-- 城市篩選 -->
        <select
          v-model="selectedCity"
          class="filter-select border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">全部城市</option>
          <option value="台北">台北</option>
          <option value="新北">新北</option>
        </select>

        <!-- 插座篩選 -->
        <label class="filter-checkbox flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            v-model="hasOutlet"
            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          有插座
        </label>

        <!-- 搜尋框 -->
        <input
          type="text"
          v-model="searchQuery"
          placeholder="搜尋店名或地址"
          class="filter-input border border-gray-300 rounded-md p-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <!-- 顯示篩選結果 -->
      <div class="stores-list grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div
          v-for="store in filteredStores"
          :key="store.id"
          class="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl mx-auto w-full">
          <div class="md:flex">
            <div class="md:w-2/5" :style="backgroundStyle">
              <img :src="store.spacePhoto" :alt="store.StoreName" class="h-48 w-full object-cover md:h-full" />
            </div>
            <div class="p-4 md:p-5 md:w-3/5">
              <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate">{{ store.StoreName }}</h3>
              <div class="space-y-2">
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <p class="text-gray-600 text-sm truncate">{{ store.address }}</p>
                </div>
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p class="text-gray-600 text-sm truncate">{{ store.businessHours }}</p>
                </div>
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h11M9 21V3" />
                  </svg>
                  <p class="text-gray-600 text-sm truncate">樓層: {{ store.floor }}</p>
                </div>
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h18M3 8h18M3 13h18M3 18h18" />
                  </svg>
                  <p class="text-gray-600 text-sm truncate">鄰近捷運站: {{ store.nearbyMRTStation }}</p>
                </div>
              </div>
              <div class="mt-3 flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                  插座: {{ store.powerOutlet ? "有" : "無" }}
                </span>
                <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                  最低消費: {{ store.minSpend }}元
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.select_form {
  padding: 50px 0;
  h1 {
    text-align: center;
    font-size: 35px;
  }
}
</style>
