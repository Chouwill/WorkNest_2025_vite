<script setup>
import { ref } from "vue";
import MemberModal from "../components/member/MemberModal.vue";
import apiClient from "../api/axios";
import { useRouter } from "vue-router";

const router = useRouter();

// 登入相關數據
const isLogin = ref(true); // 控制是否顯示登入表單
const LoginForm = ref({
  email: "bash@gmail.com",
  uid: "wqqQhMlueLTxZps1r5EqCHotBP22",
  password: "",
  nickname: "12345678912345E",
});

// 註冊相關數據
const RegisterForm = ref({
  email: "text@gmail.com",
  passwd: "asdqwer6945",
  nickname: "T2345678901234r",
});

// 彈窗相關狀態
const isModalVisible = ref(false); // 控制彈窗顯示
const ModalMessage = ref(""); // 彈窗訊息
const ModalType = ref("error"); // 彈窗類型（success 或 error）

// 登入函式
async function memberLogin() {
  const loginData = {
    email: LoginForm.value.email.trim(),
    uid: LoginForm.value.uid.trim(),
    nickname: LoginForm.value.nickname.trim(),
  };
  console.log("發送的登入數據:", loginData);
  try {
    const response = await apiClient.post("/login", loginData);
    localStorage.setItem("token", loginData.uid);

    // 成功訊息
    ModalMessage.value = "登入成功！即將跳轉到後台系統...";
    ModalType.value = "success"; // 設置為成功類型
    isModalVisible.value = true;

    console.log("登入成功:", response);

    // 3 秒後跳轉
    setTimeout(() => {
      router.push("/Backendsystem");
    }, 3000);

    return response;
  } catch (error) {
    console.error("登入錯誤:", error);

    // 錯誤訊息
    ModalMessage.value = error.response?.data?.message || "登入失敗";
    ModalType.value = "error"; // 設置為錯誤類型
    isModalVisible.value = true;
  }
}

// 註冊函式
async function memberRegister() {
  const RegisterData = {
    email: RegisterForm.value.email.trim(),
    passwd: RegisterForm.value.passwd.trim(),
    nickname: RegisterForm.value.nickname.trim(),
  };
  console.log("發送的註冊數據:", RegisterData);
  try {
    const response = await apiClient.post("/register", RegisterData);

    // 成功訊息
    ModalMessage.value = "註冊成功！請切換到登入頁面進行登入。";
    ModalType.value = "success"; // 設置為成功類型
    isModalVisible.value = true;

    console.log("註冊成功:", response);

    // 切換到登入表單
    isLogin.value = true;

    return response;
  } catch (error) {
    console.error("註冊錯誤:", error);

    // 錯誤訊息
    ModalMessage.value = error.response?.data?.message || "註冊失敗";
    ModalType.value = "error"; // 設置為錯誤類型
    isModalVisible.value = true;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <!-- 彈窗 -->
    <MemberModal
      :visible="isModalVisible"
      :type="ModalType"
      :message="ModalMessage"
      @update:visible="
        (visible) => {
          isModalVisible = visible;
          ModalMessage = '';
        }
      " />

    <div class="w-full max-w-md">
      <!-- 卡片容器 -->
      <div class="flip-card-container">
        <div class="flip-card" :class="{ flipped: !isLogin }">
          <!-- 登入表單 -->
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
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">電子郵件</label>
                    <input
                      type="email"
                      id="email"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="請輸入電子郵件"
                      v-model="LoginForm.email" />
                  </div>
                  <div>
                    <label for="uid" class="block text-sm font-medium text-gray-700">UID</label>
                    <input
                      type="text"
                      id="uid"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="UID"
                      v-model="LoginForm.uid" />
                  </div>
                  <div>
                    <label for="nickname" class="block text-sm font-medium text-gray-700">暱稱</label>
                    <input
                      type="text"
                      id="nickname"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="暱稱"
                      v-model="LoginForm.nickname" />
                  </div>
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

          <!-- 註冊表單 -->
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
                <form class="space-y-6" @submit.prevent="memberRegister">
                  <div>
                    <label for="register-email" class="block text-sm font-medium text-gray-700">電子郵件</label>
                    <input
                      type="email"
                      id="register-email"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="請輸入電子郵件"
                      v-model="RegisterForm.email" />
                  </div>
                  <div>
                    <label for="register-password" class="block text-sm font-medium text-gray-700">密碼</label>
                    <input
                      type="password"
                      id="register-password"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="請輸入密碼"
                      v-model="RegisterForm.passwd" />
                  </div>
                  <div>
                    <label for="register-nickname" class="block text-sm font-medium text-gray-700">暱稱</label>
                    <input
                      type="text"
                      id="register-nickname"
                      class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="請輸入暱稱"
                      v-model="RegisterForm.nickname" />
                  </div>
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
</template>

<style scoped>
.container {
}
.flip-card-container {
  perspective: 1000px;
  width: 100%;
  min-height: 600px;
  position: relative;
  margin-bottom: 2rem;
  /* background-color: #813030; */
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
