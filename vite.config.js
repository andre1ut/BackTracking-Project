import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/BackTracking-Project/',
  optimizeDeps: {
    exclude: ['fsevents'],
  },
  base: '/BackTracking-Project/',
})
