import { createApp } from 'vue'
import './style.css'
import router from "./router"
import App from './App.vue'

// 先創建應用實例
const app = createApp(App)

// 使用路由
app.use(router)

// 最後掛載應用
app.mount('#app')
