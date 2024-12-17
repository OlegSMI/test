import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import IconSpritePlugin from "./src/plugins/vite-plugin-icon-sprite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), IconSpritePlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
