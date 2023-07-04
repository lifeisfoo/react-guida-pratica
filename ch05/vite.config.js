import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

export default function defineConfig() {
  return {
    plugins: [react(), svgr()],
    build: { outDir: "build" },
    server: {
      port: 3000,
    },
  };
}
