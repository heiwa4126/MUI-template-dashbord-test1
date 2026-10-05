import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, lazyPlugins, type ConfigEnv } from "vite-plus";
import { ViteMinifyPlugin } from "vite-plugin-minify";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    staged: {
      "*": "vp check --fix",
    },
    fmt: {},
    lint: {
      jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
      rules: { "vite-plus/prefer-vite-plus-imports": "error" },
      options: { typeAware: true, typeCheck: true },
    },
    plugins: lazyPlugins(() => [react(), ViteMinifyPlugin({})]),
    base: process.env.VITE_BASE_URL || "/",
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              { name: "r", test: /node_modules[\\/](react|react-dom)([\\/]|$)/ },
              { name: "c", test: /node_modules[\\/]recharts([\\/]|$)/ },
              { name: "e", test: /node_modules[\\/]@emotion[\\/](react|styled)([\\/]|$)/ },
              { name: "m", test: /node_modules[\\/]@mui[\\/](material|icons-material)([\\/]|$)/ },
            ],
          },
        },
      },
    },
  });
};
