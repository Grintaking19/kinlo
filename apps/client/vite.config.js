import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(),],
  test: {
    globals: true,
    // Simulate a browser environment for testing
    environment: "jsdom",
    // Setup files to run before each test suite
    setupFiles: "./src/test/setup.js",
  }
});
