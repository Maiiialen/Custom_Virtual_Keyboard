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
      entry: resolve("src/npmLibrary.tsx"),
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@mui/material",
        "@emotion/react",
        "@emotion/styled",
        "@fontsource/roboto",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@mui/material": "Material",
          "@emotion/react": "EmotionReact",
          "@emotion/styled": "EmotionStyled",
          "@fontsource/roboto": "Roboto",
        },
        sourcemap: true,
      },
    },
  },
});
