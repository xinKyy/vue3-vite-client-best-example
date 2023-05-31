import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/req': {
        target: 'http://43.154.112.216:9000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/req/, '')
      },
      '/red': {
        target: 'http://43.154.112.216:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/red/, '')
      }
    }
  }
})
