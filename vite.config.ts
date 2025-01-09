import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compress from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    compress({
      algorithm: 'gzip'
    }),
    react()
  ],
  base: './',
})
