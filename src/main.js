import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import router from "./router";
import App from "./App.vue";

// 先創建應用實例
const app = createApp(App);
const pinia = createPinia();

// 使用路由
app.use(router);
app.use(pinia);

// 最後掛載應用
app.mount("#app");
