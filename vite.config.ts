import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), ViteMinifyPlugin({})],
    base: process.env.VITE_BASE_URL || "/",
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            r: ["react", "react-dom"],
            c: ["recharts"],
            e: ["@emotion/react", "@emotion/styled"],
            m: ["@mui/material", "@mui/icons-material"],
          },
        },
      },
    },
  });
};
