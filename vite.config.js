import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs"; // Import fs from Node.js

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')), // Chemin vers votre clé privée
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')), // Chemin vers votre certificat
    }
  }
});
