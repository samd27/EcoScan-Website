import { defineConfig } from 'vite';

const GITHUB_APK_URL = 'https://github.com/samd27/EcoScan-Releases/releases/download/v18.7.0/EcoScan_v18.7.0.apk';

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/downloads/EcoScan_v18.7.0.apk': {
        target: GITHUB_APK_URL,
        changeOrigin: true,
        followRedirects: true,
        rewrite: () => '',
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['content-disposition'] = 'attachment; filename="EcoScan_v18.7.0.apk"';
          });
        },
      },
      '/api/download': {
        target: GITHUB_APK_URL,
        changeOrigin: true,
        followRedirects: true,
        rewrite: () => '',
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['content-disposition'] = 'attachment; filename="EcoScan_v18.7.0.apk"';
          });
        },
      },
    },
  },
});
