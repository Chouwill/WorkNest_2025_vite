<script setup>
import { ref, onMounted, computed } from "vue";
import { get } from "../api/request";
import { useFavoriteStore } from "../store/Favorite";

import CitySelect from "./citySelect/index.vue";

const information = ref([]);
const loading = ref(false);
const error = ref(null);

const store = {
  spacePhoto: "", // 後端圖片 URL
  StoreName: "商店名稱",
};

const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/projecttestapi-d84a9.firebasestorage.app/o/shopping_defaultImage.png?alt=media&token=2f522a2c-95e7-43f5-861e-ba6faab8da6c"; // 預設圖片，後端未傳入顯示

// 設置背景圖片樣式
const backgroundStyle = (photo) => ({
  backgroundImage: `url(${photo || defaultImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

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
  // const cts = new TwCitySelector();
  // console.log(cts)
});

// 縣市和行政區的選擇狀態
const selectedCity = ref("");
const selectedDistrict = ref("");
const hasOutlet = ref(false);
const searchQuery = ref("");

// 計算篩選結果
const filteredStores = computed(() => {
  return information.value.filter((store) => {
    // 城市篩選
    const cityMatch = !selectedCity.value || store.city === selectedCity.value;

    // 行政區篩選
    const districtMatch = !selectedDistrict.value || store.district === selectedDistrict.value;

    // 插座篩選
    const outletMatch = !hasOutlet.value || store.powerOutlet === true;

    // 搜尋篩選
    const searchMatch =
      !searchQuery.value ||
      store.StoreName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.value.toLowerCase());

    return cityMatch && districtMatch && outletMatch && searchMatch;
  });
});

// 處理圖片載入錯誤
function handleImageError(event) {
  event.target.src = defaultImage;
}

// 商家的彈窗
const StoreModal = ref(false);

const toggleStoreModal = () => {
  StoreModal.value = !StoreModal.value;
  console.log("商家彈窗狀態", StoreModal.value);

  // if (StoreModal.value === true) {
  //   StoreModal.value = false;
  // }
};

const onCicyChange = (info) => {
  selectedCity.value = info.city;
  selectedDistrict.value = info.district;
};

const getTagClass = (index) => {
  // 固定顏色的樣式
  const tagClasses = [
    "bg-[#FEF3C7] text-yellow-800", // 淡黃色
    "bg-[#FFE4E6] text-pink-800", // 淡粉紅色
    "bg-[#D1FAE5] text-emerald-800", // 淡薄荷綠色
  ];

  // 根據索引返回對應的樣式
  return tagClasses[index % tagClasses.length];
};

// 加入收藏
const FavoriteList = useFavoriteStore();

const addToList = (store) => {
  FavoriteList.addItem(store);
  console.log(FavoriteList.items);
};
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
        <CitySelect @change="onCicyChange" />
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
            <!-- 背景圖片區域 -->
            <div class="md:w-2/5" :style="backgroundStyle(store.spacePhoto)">
              <img
                :src="store.spacePhoto"
                alt="店家空間圖片"
                class="h-48 w-full object-cover md:h-full"
                @error="handleImageError" />
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
                  <p class="text-gray-600 text-sm truncate">樓層數: {{ store.floor }}</p>
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

              <!-- StoreTage 標籤區域 -->
              <div class="mt-3 flex flex-wrap gap-2">
                <span
                  v-for="(tag, index) in store.StoreTage"
                  :key="index"
                  :class="getTagClass(index)"
                  class="px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1">
                  <span v-html="tag" class="icon-large"></span>
                  <!-- Icon 使用 icon-large 類名 -->
                </span>
              </div>

              <div class="mt-3 flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                  插座: {{ store.hasOutlet ? "有" : "無" }}
                </span>
                <span class="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">
                  最低消費: {{ store.minSpend }}元
                </span>
              </div>

              <!-- 連結按鈕區域 -->
              <div class="mt-4 flex gap-3">
                <!-- 更多資訊按鈕 -->
                <a
                  v-if="store.informationURL && store.informationURL.trim() !== ''"
                  :href="store.informationURL"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-4 py-2 text-sm font-medium text-white bg-[#8B3D0E] hover:bg-[#6E300B] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B3D0E] focus:ring-offset-2">
                  更多資訊
                </a>

                <!-- 導航到店按鈕 -->
                <a
                  :href="store.MapURL"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-4 py-2 text-sm font-medium text-[#8B3D0E] bg-[#F9EFE8] hover:bg-[#EAD8C8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B3D0E] focus:ring-offset-2">
                  導航到店
                </a>
                <!-- 加入收藏 -->
                <button
                  class="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-100"
                  @click="addToList(store)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m-7-7h14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
div {
  background-color: transparent; /* 確保沒有背景色 */
  border: none; /* 確保沒有框線 */
}

.select_form {
  padding: 50px 0;
  h1 {
    text-align: center;
    font-size: 35px;
  }
}

.icon-large {
  font-size: 16px; /* Icon 大小 */
  vertical-align: middle; /* 確保 Icon 與文字對齊 */
}
</style>
