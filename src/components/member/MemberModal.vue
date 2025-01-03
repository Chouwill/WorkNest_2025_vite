<template>
  <!-- 彈窗 -->
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center z-40">
    <div class="bg-white rounded-lg shadow-xl w-96 p-6 relative">
      <!-- 關閉按鈕 -->
      <button 
        @click="handleClose" 
        class="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        <span class="text-gray-500 hover:text-gray-700">✕</span>
      </button>

      <!-- 動態標題 -->
      <h2 
        class="text-xl font-semibold mb-4"
        :class="type === 'success' ? 'text-green-800' : 'text-red-800'"
      >
        {{ type === 'success' ? '成功訊息' : '錯誤訊息' }}
      </h2>

      <!-- 動態訊息 -->
      <div 
        class="space-y-3 mb-6"
        :class="type === 'success' ? 'text-green-600' : 'text-red-600'"
      >
        <p>{{ message }}</p>
      </div>

      <!-- 確認按鈕 -->
      <button
        @click="handleClose"
        class="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
      >
        確認
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: { // 是否顯示
    type: Boolean,
    default: false
  },
  message: { // 訊息
    type: String,
    default: ''
  },
  type: { // 訊息類型
    type: String,
    default: 'error'
  }
});

// 定義要發出的事件
const emit = defineEmits(['update:visible']);

// 處理關閉事件
const handleClose = () => {
  emit('update:visible', false);
};
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
