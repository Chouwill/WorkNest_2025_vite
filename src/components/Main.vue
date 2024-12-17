<script setup>
import { ref, onMounted, computed } from "vue";
import { get } from "../api/request";

const information = ref([]);
const loading = ref(false);
const error = ref(null);

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
  <main class="min-h-screen bg-slate-50 min-w-[375px]">
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
      <div class="stores-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="store in filteredStores"
          :key="store.id"
          class="store-item bg-white shadow-md rounded-lg overflow-hidden">
          <img :src="store.spacePhoto" :alt="store.StoreName" class="store-image w-full h-48 object-cover" />
          <div class="store-content p-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ store.StoreName }}</h3>
            <p class="address text-sm text-gray-600">{{ store.address }}</p>
            <p class="business-hours text-sm text-gray-600">{{ store.businessHours }}</p>
            <p class="outlet text-sm text-gray-800">插座：{{ store.powerOutlet ? "有" : "無" }}</p>
            <p class="min-spend text-sm text-gray-800">最低消費：{{ store.minSpend }} 元</p>
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
