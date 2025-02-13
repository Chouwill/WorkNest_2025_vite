<script setup>
import { ref, onMounted } from "vue";
import apiClient from "../api/axios";
import { get } from "../api/request";

// 取得所有目前資料GET
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
      StoreName: item.StoreName || "未命名咖啡廳",
      powerOutlet: item.powerOutlet === true || item.powerOutlet === "是", // 轉換為布林值
      id: item.id || null, // 確保 id 存在
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

// 控制模態框的開啟與關閉
const isModalOpen = ref(false);

// 判斷是新增模式還是修改模式
const isEditMode = ref(false);

// 表單數據
const currentForm = ref({
  id: null,
  StoreName: "",
  city: "",
  district: "",
  address: "",
  order: "",
  businessHours: "",
  spacePhoto: "",
  hasOutlet: false,
  minSpend: 0,
  placeType: "",
  nearbyMRTStation: "台北車站捷運站",
  floor: "3層樓",
  informationURL: "",
  MapURL: "",
  StoreTage: [], // 將 StoreTage 定義為陣列
});

// 暫存標籤的輸入值
const newTag = ref("");

// 儲存用戶輸入的 HTML 程式碼，使用統一樣式的類名
const iconHTML = ref("<i class='fa fa-coffee icon-default'></i>"); // 預設值為咖啡圖示


// 新增標籤
const addTag = () => {
  if (!Array.isArray(currentForm.value.StoreTage)) {
    currentForm.value.StoreTage = []; // 如果 StoreTage 不是陣列，初始化為空陣列
  }

  const trimmedTag = newTag.value.trim(); // 去掉輸入的空白
  if (trimmedTag && !currentForm.value.StoreTage.includes(trimmedTag)) {
    // 將 Icon 與標籤文字拼接
    const tagWithIcon = `${iconHTML.value} ${trimmedTag}`;
    currentForm.value.StoreTage.push(tagWithIcon); // 新增標籤（包含 Icon）
  }
  newTag.value = ""; // 清空輸入框
};


// 刪除標籤
const removeTag = (tag) => {
  currentForm.value.StoreTage = currentForm.value.StoreTage.filter((t) => t !== tag);
};

// 重置表單
const resetForm = () => {
  currentForm.value = {
    id: null,
    StoreName: "",
    city: "",
    district: "",
    address: "",
    order: "",
    businessHours: "",
    spacePhoto: "",
    hasOutlet: false,
    minSpend: 0,
    placeType: "",
    nearbyMRTStation: "",
    floor: "",
    informationURL: "",
    MapURL: "",
    StoreTage: [], // 重置為空陣列
  };
};

// 點擊「新增咖啡廳」
const handleAdd = () => {
  isEditMode.value = false;
  isModalOpen.value = true;
  resetForm();
  currentForm.value.StoreName = "新咖啡廳";
};

// 點擊「修改」
const handleEdit = (cafe) => {
  if (!cafe || !cafe.id) {
    console.error("編輯模式下，缺少有效的咖啡廳資料");
    return;
  }

  isEditMode.value = true;
  isModalOpen.value = true;
  currentForm.value = { ...cafe };
};

const handleSubmit = async () => {
  try {
    if (!currentForm.value) {
      console.error("表單資料未定義");
      return;
    }

    if (isEditMode.value) {
      if (!currentForm.value.id) {
        console.error("編輯模式下，表單缺少 id");
        return;
      }

      await apiClient.put(`/${currentForm.value.id}`, currentForm.value);
      console.log("更新成功");

      const index = information.value.findIndex((item) => item.id === currentForm.value.id);
      if (index !== -1) {
        information.value[index] = { ...currentForm.value };
      }

      // 回傳當筆修改後的所有屬性資料
      console.log("修改後的當筆資料：", { ...currentForm.value });
    } else {
      // 新增資料
      const response = await apiClient.post("/", currentForm.value);

      // 根據後端回應結構，直接從 response.id 提取
      const newId = response.id; // 從 response.id 提取
      if (!newId) {
        console.error("新增失敗，後端回應中缺少 id");
        return;
      }

      console.log("新增成功");

      // 新增到前端資料
      const newEntry = { ...currentForm.value, id: newId };
      information.value.push(newEntry);

      // 回傳當筆新增後的所有屬性資料
      console.log("新增後的當筆資料：", newEntry);
    }

    isModalOpen.value = false; // 關閉模態框
    resetForm(); // 重置表單
  } catch (error) {
    console.error("提交失敗", error);
  }
};

// 刪除資料API
const handleDelete = async (id) => {
  try {
    await apiClient.delete(`/${id}`);
    console.log("刪除成功");

    information.value = information.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error("刪除失敗", error);
  }
};

// 儲存用戶輸入的 HTML 程式碼
// const iconHTML = ref("<i class='fa fa-coffee'></i>"); // 預設值為咖啡圖示
</script>

<template>
  <div class="admin-dashboard p-6">
    <!-- 頁面標題 -->
    <h1 class="text-3xl font-bold mb-6 text-center">管理員主控台</h1>

    <!-- 新增按鈕 -->
    <div class="mb-4 text-right">
      <button @click="handleAdd" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
        新增咖啡廳
      </button>
    </div>

    <!-- 咖啡廳資料表格 -->
    <div class="cafe-table overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300 min-w-[800px]">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2">ID</th>
            <th class="border border-gray-300 p-2">名稱</th>
            <th class="border border-gray-300 p-2">城市</th>
            <th class="border border-gray-300 p-2">地區</th>
            <th class="border border-gray-300 p-2">地址</th>
            <th class="border border-gray-300 p-2">排序</th>
            <th class="border border-gray-300 p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cafe in information" :key="cafe.id" class="hover:bg-gray-50 transition">
            <td class="border border-gray-300 p-2">{{ cafe.id }}</td>
            <td class="border border-gray-300 p-2">{{ cafe.StoreName }}</td>
            <td class="border border-gray-300 p-2">{{ cafe.city }}</td>
            <td class="border border-gray-300 p-2">{{ cafe.district }}</td>
            <td class="border border-gray-300 p-2">{{ cafe.address }}</td>
            <td class="border border-gray-300 p-2">{{ cafe.order }}</td>
            <td class="border border-gray-300 p-2 text-center">
              <div class="flex justify-center gap-4">
                <button
                  @click="handleEdit(cafe)"
                  class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                  修改
                </button>
                <button
                  @click="handleDelete(cafe.id)"
                  class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 彈窗 (Modal) -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl md:max-w-lg lg:max-w-xl mx-4 max-h-[80vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4">{{ isEditMode ? "修改咖啡廳" : "新增咖啡廳" }}</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">ID</label>
            <input
              type="text"
              class="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none"
              v-model="currentForm.id"
              readonly />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">名稱</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="currentForm.StoreName" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">城市</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="currentForm.city" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">地區</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="currentForm.district" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">地址</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="currentForm.address" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">排序</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="currentForm.order" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">有無插座</label>
              <select
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="currentForm.hasOutlet">
                <option :value="true">是</option>
                <option :value="false">否</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">最低消費</label>
              <input
                type="number"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="currentForm.minSpend" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">類型</label>
              <select
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                v-model="currentForm.placeType">
                <option value="coffee_shop">咖啡廳</option>
                <option value="restaurant">餐飲場所(一般)</option>
                <option value="library">圖書館</option>
                <option value="other">其他</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">附近捷運站</label>
            <input
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="currentForm.nearbyMRTStation" />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">樓層數</label>
            <input
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="currentForm.floor" />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">空間圖片</label>
            <input
              type="url"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="currentForm.spacePhoto" />
          </div>

          <!-- 營業時間欄位 -->
          <div>
            <label class="block text-gray-700 font-semibold mb-2">營業時間</label>
            <input
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="currentForm.businessHours"
              placeholder="例如：08:00 - 22:00" />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">更多資訊</label>
            <input
              type="url"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="currentForm.informationURL"
              placeholder="輸入更多資訊的連結" />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">導航連結</label>
            <input
              type="url"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="currentForm.MapURL"
              placeholder="輸入導航連結" />
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">商店標籤</label>
            <div class="flex items-center gap-2">
              <!-- 輸入框：用於輸入標籤 -->
              <input
                type="text"
                v-model="newTag"
                @keyup.enter="addTag"
                placeholder="輸入標籤後按 Enter"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <!-- 新增按鈕 -->
              <button
                type="button"
                @click="addTag"
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                新增
              </button>
            </div>
            <!-- 標籤顯示區域 -->
            <div class="flex flex-wrap gap-2 mt-2">
              <span
                v-for="tag in currentForm.StoreTage"
                :key="tag"
                class="px-3 py-1 bg-blue-500 text-white rounded-full flex items-center gap-2">
                {{ tag }}
                <button type="button" @click="removeTag(tag)" class="text-white hover:text-gray-300 focus:outline-none">
                  &times;
                </button>
              </span>
            </div>
            <div class="icon-render-demo p-6">
              <!-- 輸入框 -->
              <div class="mb-4">
                <label for="iconInput" class="block text-gray-700 font-semibold mb-2">
                  輸入 FontAwesome HTML 程式碼：
                </label>
                <input
                  id="iconInput"
                  type="text"
                  v-model="iconHTML"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例如：<i class='fa fa-coffee'></i>" />
              </div>

              <!-- 即時渲染區域 -->
              <div class="mt-4">
                <p class="text-gray-700 font-semibold mb-2">即時渲染結果：</p>
                <div v-html="iconHTML" class="text-3xl"></div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              @click="isModalOpen = false"
              class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
              取消
            </button>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              確定
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style>
/* 自定義滾動條樣式 */
::-webkit-scrollbar {
  width: 8px; /* 滾動條寬度 */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3); /* 滾動條的顏色 */
  border-radius: 4px; /* 圓角 */
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.5); /* 滾動條懸停時的顏色 */
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1); /* 滾動條背景 */
  border-radius: 4px;
}

/* 表單預覽ICON大小 */
.icon-default {
  font-size: 16px;
  color: #555;
  /* color: #555; */
}

</style>
