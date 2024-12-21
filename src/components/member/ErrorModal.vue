<template>
  <!-- 錯誤訊息彈窗 -->
  <div class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg w-96 p-6">
    <!-- 關閉按鈕 -->
    <button @click="closeModal" class="absolute top-3 right-3 text-blue-500 hover:text-blue-700 transition">✕</button>
    <h2 class="text-xl font-semibold text-blue-800 mb-4">提示訊息</h2>
    <div class="text-blue-600 space-y-3 mb-6">
      <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
    </div>
    <button
      @click="closeModal"
      class="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition">
      確認
    </button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 錯誤訊息列表
const errors = ref(["電子郵件不能為空！", "密碼必須至少包含 6 個字元！", "確認密碼不一致！"]);

// 關閉彈窗
const closeModal = () => {
  console.log("彈窗已關閉");
};

const props = defineProps({
  visible: Boolean, // 控制彈窗是否顯示
  message: String, // 錯誤訊息
});
</script>

<style>
/* 彈窗背景 */
.fixed {
  z-index: 50;
}

/* 動畫效果 */
button:hover {
  transition: all 0.3s ease-in-out;
}

/* 彈窗陰影 */
.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
</style>
