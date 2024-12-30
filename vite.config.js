import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.PORT) || 3000, // Use Render's PORT or default to 3000
    host: '0.0.0.0', // Ensure the server is accessible externally
  },
});