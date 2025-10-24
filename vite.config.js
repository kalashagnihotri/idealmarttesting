import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  
  // Base path for GitHub Pages deployment
  // When deploying to https://kalashagnihotri.github.io/idealmarttesting/
  // The base path must match the repository name to ensure all assets
  // (JS, CSS, images) are loaded from the correct URL path
  // For custom domains or username.github.io, use base: '/'
  base: '/idealmarttesting/',
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
