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
  },

  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;


