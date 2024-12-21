<template>
  <div class="admin-dashboard p-6">
    <!-- 頁面標題 -->
    <h1 class="text-3xl font-bold mb-6 text-center">管理員主控台</h1>

    <!-- 新增按鈕 -->
    <div class="mb-4 text-right">
      <button
        @click="isModalOpen = true"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
        新增咖啡廳
      </button>
    </div>

    <!-- 咖啡廳資料表格 -->
    <div class="cafe-table">
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2">名稱</th>
            <th class="border border-gray-300 p-2">城市</th>
            <th class="border border-gray-300 p-2">地區</th>
            <th class="border border-gray-300 p-2">地址</th>
            <th class="border border-gray-300 p-2">排序</th>
            <th class="border border-gray-300 p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr class="hover:bg-gray-50 transition">
            <td class="border border-gray-300 p-2">咖啡廳 A</td>
            <td class="border border-gray-300 p-2">台北</td>
            <td class="border border-gray-300 p-2">中正區</td>
            <td class="border border-gray-300 p-2">台北市 中正區 1 號</td>
            <td class="border border-gray-300 p-2">01</td>
            <td class="border border-gray-300 p-2 text-center">
              <button
                @click="isModalOpen = true"
                class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                修改
              </button>
              <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 彈窗 (Modal) -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <h2 class="text-2xl font-bold mb-4">新增/修改咖啡廳</h2>
        <div class="mb-4">
          <img
            src="https://via.placeholder.com/600x400"
            alt="咖啡廳圖片"
            class="w-full h-60 object-cover rounded-md shadow-md" />
        </div>
        <form class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">名稱</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">城市</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">地區</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">地址</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">排序</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">有無插座</label>
              <select class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="是">是</option>
                <option value="否">否</option>
              </select>
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">最低消費</label>
              <input
                type="number"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">類型</label>
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label class="block text-gray-700 font-semibold mb-2">空間圖片</label>
            <input
              type="url"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              @click="isModalOpen = false"
              class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
              取消
            </button>
            <button type="button" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              確定
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isModalOpen = ref(false);
</script>
