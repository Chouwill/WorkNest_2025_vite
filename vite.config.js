import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  base: "/",
  plugins: [
    // 確保 vueDevTools 在 createHtmlPlugin 之前註冊
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
      "/api": {
        target: "http://localhost:3000", // 後端服務器地址
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, res) => {
            console.log("Sending Request to:", proxyReq.path);
          });
        },
      },
    },
  },
});

