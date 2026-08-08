import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  base: "/",
  plugins: [
    vueDevTools(),
    vue(),
    createHtmlPlugin({
      inject: {
        data: {
          title: "My Vite App",
        },
      },
    }),
  ],
  server: {
    proxy: {
      // 瀏覽器打 /api/... → portfolio backend（保留完整路徑，不可 strip /api）
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq) => {
            console.log("Sending Request to:", proxyReq.path);
          });
        },
      },
    },
  },
});
