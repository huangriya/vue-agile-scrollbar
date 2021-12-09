import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2'
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/vueAgileScrollbar.vue"),
      name: "vue-agile-scrollbar"
    }
  }
})