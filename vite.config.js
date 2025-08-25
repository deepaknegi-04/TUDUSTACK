// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),

//   ],
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";

// Load variables from .env (only for Node/build-time use)
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    // Example: make a backend-only secret available at build time
    __SECRET__: JSON.stringify(process.env.SECRET_KEY),
  },
});
