import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7070, // Replace 3000 with your desired port
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)), // Alias '@' to the 'src' directory
    },
  },
});
