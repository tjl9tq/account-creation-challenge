import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';

export default defineConfig({
  plugins: [react(), RubyPlugin()],
  resolve: {
    alias: {
      app: resolve(__dirname, './app'),
    },
  },
});
