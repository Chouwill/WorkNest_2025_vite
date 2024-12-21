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

  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;


