import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on("error", (err) => {
              console.log("proxy error:", err);
            });
            proxy.on("proxyReq", (proxyReq, req) => {
              console.log("Sending Request:", req.method, req.url);
            });
            proxy.on("proxyRes", (proxyRes, req) => {
              console.log("Received Response:", proxyRes.statusCode, req.url);
            });
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "src/"),
      },
    },
  };
});
