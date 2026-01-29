import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import checker from "vite-plugin-checker"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: false, // Disable TypeScript checking if not using TS
      overlay: {
        position: 'br', // Position of the errors shown in browser overlay ('tl', 'tr', 'bl', 'br')
        initiallyIsOpen: false, // Set to false if you don't want the overlay to open immediately
      },
      eslint: {
        lintCommand: 'eslint --cache --cache-location ./node_modules/.vite-eslintcache "./src/**/*.{js,jsx}"',
        useFlatConfig: true, // Enable flat config support
        dev: {
          logLevel: ['error', 'warn'], // Log errors and warnings to the console during development
        }
      },
    }),
  ],
  base: "/Project-Management-Tool/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})