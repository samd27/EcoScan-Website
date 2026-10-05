import { defineConfig } from 'vite';

const RELEASE_URL = 'https://github.com/samd27/EcoScan-Releases/releases/download/v18.7.0/EcoScan_v18.7.0.apk';

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    {
      name: 'apk-redirect-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const pathname = req.url ? req.url.split('?')[0] : '';
          if (pathname === '/downloads/EcoScan_v18.7.0.apk' || pathname === '/api/download') {
            res.writeHead(302, {
              Location: RELEASE_URL,
              'Content-Type': 'application/vnd.android.package-archive',
              'Content-Disposition': 'attachment; filename="EcoScan_v18.7.0.apk"',
            });
            return res.end();
          }
          next();
        });
      },
    },
  ],
});
