import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../page/Home.vue"),
  },
  {
    path: "/membercenter",
    name: "MemberCenter",
    component: () => import("../page/MemberCenter.vue"),
  },
  {
    path: "/Backendsystem",
    name: "Backendsystem",
    component: () => import("../page/Backendsystem.vue"),
    meta: { requiresAuth: true }, // 需要登入才能訪問
  },
  {
    path: "/UserCenter",
    name: "UserCenter",
    component: () => import("../page/UserCenter.vue"),
    meta: { requiresAuth: false }, // 需要登入才能訪問
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 全域導航守衛

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("LoginStatus"); // 假設登入狀態儲存在 localStorage 中

  // 1. 阻擋未登入的使用者進入需要驗證的頁面
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "MemberCenter" }); // 重定向到登入/註冊頁
    // 2. 阻止已登入的使用者再次訪問登入/註冊頁
  } else if (to.name === "MemberCenter" && isAuthenticated) {
    next({ name: "Backendsystem" }); // 重定向到後台系統
  } else {
    next();
  }
});
export default router;
