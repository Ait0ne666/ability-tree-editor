import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
        },
    },
    base: '',
    define: {
    },
    
    server: {
        proxy: {
            '/socket.io': {
                 target: 'https://dev.darksun.com/services/gate/socket.io',
                 changeOrigin: true,
                 secure: false,      
                 ws: true,
                 
             }
        }
    }
    
});
