import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig(({ mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        define: {
            // Fix "process is not defined" for Remotion
            'process.env': {},
            // Explicitly shim the keys we need
            'process.env.DIFY_API_KEY': JSON.stringify(env.DIFY_API_KEY),
            'process.env.DIFY_API_URL': JSON.stringify(env.DIFY_API_URL),
        },
        server: {
            proxy: {
                '/api': {
                    target: env.DIFY_API_URL || 'https://api.dify.ai/v1',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                    timeout: 60000,
                    proxyTimeout: 60000,
                },
            },
            port: 3000, // User requested port 3000
            open: true, // Force open browser
        },
    };
});
