import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["pdfjs-dist"],
    esbuildOptions: {
      supported: {
        "top-level-await": true,
      },
    },
  },
});
