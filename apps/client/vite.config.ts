import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

console.log(process.cwd(), 'current working directory');

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    base: mode === 'development'
      ? process.env.VITE_APP_BASE_URL
      : process.env.VITE_APP_PROD_BASE_URL
  });
}
