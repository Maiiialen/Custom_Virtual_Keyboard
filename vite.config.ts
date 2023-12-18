import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true }), libInjectCss()],
  build: {
    lib: {
      name: "@maiiialen/custom-virtual-keyboard",
      fileName: "custom-virtual-keyboard",
      entry: resolve("src/App.tsx")
    }
  }
});
