import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log(env.VITE_API_URL);

  return {
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:4000",
          changeOrigin: true,
        },
      },
    },
  };
});
