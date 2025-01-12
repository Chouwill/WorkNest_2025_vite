import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: "",
    nickname: "",
    isAuthenticated: false, // 是否已登入
  }),

  actions: {
    // 設定使用者資料
    setUserData({ email, nickname }) {
      this.email = email || "";
      this.nickname = nickname || "";
      this.isAuthenticated = true; // 標記為已登入
    },

    // 清除使用者資料
    clearUserData() {
      this.email = "";
      this.nickname = "";
      this.isAuthenticated = false;
    },

    // 登入邏輯
    async loginAndNavigate(userData) {
      const router = useRouter();

      try {
        // 調用後端 API 進行登入
        const response = await this.$api.login(userData);

        if (response.message === "登入成功") {
          const user = response.user;

          // 更新 Pinia 狀態
          this.setUserData({
            email: user.email,
            nickname: user.nickname,
          });

          console.log("登入成功:", this.email, this.nickname);

          // 檢查 email 和 nickname 是否符合條件
          if (
            this.email === "admin0904@gmail.com" &&
            this.nickname === "admin678912345W"
          ) {
            console.log("導航到 Backendsystem");
            router.push({ name: "Backendsystem" });
          } else {
            console.log("導航到 UserCenter");
            router.push({ name: "UserCenter" });
          }
        } else {
          console.error("登入失敗：", response.message);
        }
      } catch (error) {
        console.error("登入過程中發生錯誤：", error);
      }
    },
  },
});
