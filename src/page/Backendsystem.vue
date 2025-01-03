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
});

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
      information.value.push({ ...currentForm.value, id: newId });
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
  <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl md:max-w-lg lg:max-w-xl mx-4">
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
        <label class="block text-gray-700 font-semibold mb-2">樓層</label>
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

      <div class="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          @click="isModalOpen = false"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
          取消
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          確定
        </button>
      </div>
    </form>
  </div>
</div>

  </div>
</template>
