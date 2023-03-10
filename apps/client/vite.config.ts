import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    base: process.env.NODE_ENV === 'production'
      ? 'http://134.122.73.111:8080'
      : "http://localhost:8080",
  });
}
