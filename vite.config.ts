import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/strapi': {
          target: env.VITE_REACT_APP_BACKEND_URL,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/strapi/, '')
        },
      },
      cors: false
    }
  }
})
