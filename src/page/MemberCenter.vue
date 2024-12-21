<script setup>
import { ref } from "vue";
import apiClient from "../api/axios";
import { API_PATHS } from "../api/axios";

//  登入API
const isLogin = ref(true);
const LoginForm = ref({
  email: "bash@gmail.com",
  uid: "wqqQhMlueLTxZps1r5EqCHotBP22",
  password: "",
  nickname: "12345678912345E",
});

async function memberLogin() {
  // 整理要發送的請求數據
  const loginData = {
    email: LoginForm.value.email.trim(),
    uid: LoginForm.value.uid.trim(),
    nickname: LoginForm.value.nickname.trim(),
  };
  console.log("發送的登入數據:", loginData);
  try {
    const response = await apiClient.post("/login", loginData);

    console.log("登入成功:", response);
    return response;
  } catch (error) {
    console.error("登入錯誤:", error);
  }
}

//註冊API

const RegisterForm = ref({
  email: "",
  password: "",
  nickname: "",
});
async function memberRegister() {
  
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md">
      <!-- 卡片容器 -->
      <div class="flip-card-container">
        <div class="flip-card" :class="{ flipped: !isLogin }">
          <!-- 切換按鈕 - 需要在兩面都加上 -->
          <!-- 登入表單 - 正面 -->
          <div class="card-front">
            <div class="bg-white rounded-lg shadow-md">
              <div class="switch-buttons">
                <button
                  @click="isLogin = true"
                  :class="[
                    'w-1/2 py-4 text-sm font-medium transition-all duration-200 border-b-2',
                    'bg-white text-blue-600 border-blue-600',
                  ]">
                  登入
                </button>
                <button
                  @click="isLogin = false"
                  :class="[
                    'w-1/2 py-4 text-sm font-medium transition-all duration-200 border-b-2',
                    'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100',
                  ]">
                  註冊
                </button>
              </div>
              <div class="p-6 pt-8">
                <form class="space-y-6" @submit.prevent="memberLogin">
                  <!-- 登入表單內容 -->
                  <!-- 電子郵件 -->
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">電子郵件</label>
                    <input
                      type="email"
                      id="email"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="請輸入電子郵件"
                      v-model="LoginForm.email" />
                  </div>

                  <!-- UID -->
                  <div>
                    <label for="uid" class="block text-sm font-medium text-gray-700">UID</label>
                    <input
                      type="text"
                      id="uid"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="UID"
                      v-model="LoginForm.uid" />
                  </div>

                  <!-- 暱稱 -->
                  <div>
                    <label for="nickname" class="block text-sm font-medium text-gray-700">暱稱</label>
                    <input
                      type="text"
                      id="nickname"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="暱稱"
                      v-model="LoginForm.nickname" />
                  </div>

                  <!-- 密碼 -->
                  <!-- <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">密碼</label>
                    <input
                      type="password"
                      id="password"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="請輸入密碼" />
                  </div> -->

                  <!-- 記住我和忘記密碼 -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="remember-me"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <label for="remember-me" class="ml-2 block text-sm text-gray-900">記住我</label>
                    </div>
                    <div class="text-sm">
                      <a href="#" class="font-medium text-blue-600 hover:text-blue-500">忘記密碼？</a>
                    </div>
                  </div>

                  <!-- 登入按鈕 -->
                  <div>
                    <button
                      type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      登入
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- 註冊表單 - 背面 -->
          <div class="card-back">
            <div class="bg-white rounded-lg shadow-md">
              <div class="switch-buttons">
                <button
                  @click="isLogin = true"
                  :class="[
                    'w-1/2 py-4 text-sm font-medium transition-all duration-200 border-b-2',
                    'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100',
                  ]">
                  登入
                </button>
                <button
                  @click="isLogin = false"
                  :class="[
                    'w-1/2 py-4 text-sm font-medium transition-all duration-200 border-b-2',
                    'bg-white text-blue-600 border-blue-600',
                  ]">
                  註冊
                </button>
              </div>
              <div class="p-6 pt-8">
                <form class="space-y-6" @submit.prevent="memberSign">
                  <!-- 註冊表單內容 -->
                  <!-- 電子郵件 -->
                  <div>
                    <label for="register-email" class="block text-sm font-medium text-gray-700">電子郵件</label>
                    <input
                      type="email"
                      id="register-email"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="請輸入電子郵件" />
                  </div>

                  <!-- 密碼 -->
                  <div>
                    <label for="register-password" class="block text-sm font-medium text-gray-700">密碼</label>
                    <input
                      type="password"
                      id="register-password"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="請輸入密碼" />
                  </div>

                  <!-- 確認密碼 -->
                  <div>
                    <label for="confirm-password" class="block text-sm font-medium text-gray-700">確認密碼</label>
                    <input
                      type="password"
                      id="confirm-password"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="請再次輸入密碼" />
                  </div>

                  <!-- 暱稱 -->
                  <div>
                    <label for="register-nickname" class="block text-sm font-medium text-gray-700">暱稱</label>
                    <input
                      type="text"
                      id="register-nickname"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="請輸入暱稱" />
                  </div>

                  <!-- 同意條款 -->
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label for="terms" class="ml-2 block text-sm text-gray-900">
                      我同意
                      <a href="#" class="font-medium text-blue-600 hover:text-blue-500">服務條款</a>
                      和
                      <a href="#" class="font-medium text-blue-600 hover:text-blue-500">隱私政策</a>
                    </label>
                  </div>

                  <!-- 註冊按鈕 -->
                  <div>
                    <button
                      type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      註冊
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- email 輸入框 -->
  <div>email: {{ LoginForm.email }}</div>
  <div>: {{ LoginForm.serialtext }}</div>
  <div>: {{ LoginForm.nickname }}</div>
</template>

<style scoped>
.flip-card-container {
  perspective: 1000px;
  width: 100%;
  min-height: 600px;
  position: relative;
  margin-bottom: 2rem;
}

.flip-card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  min-height: 100%;
}

/* 切換按鈕樣式 */
.switch-buttons {
  position: relative;
  display: flex;
  width: 100%;
  background-color: #f9fafb;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  overflow: hidden;
}

.card-front {
  z-index: 2;
}

.card-back {
  transform: rotateY(180deg);
}

/* 移除原本的底部間距 */
.card-front > div,
.card-back > div {
  margin-bottom: 0;
  border-radius: 0.5rem;
}
</style>
