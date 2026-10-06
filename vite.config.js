import { defineConfig } from 'vite';

let cachedRelease = null;
let lastFetchTime = 0;

async function getLatestRelease() {
  const now = Date.now();
  if (cachedRelease && (now - lastFetchTime < 60000)) {
    return cachedRelease;
  }

  try {
    const res = await fetch('https://api.github.com/repos/samd27/EcoScan-Releases/releases/latest', {
      headers: {
        'User-Agent': 'EcoScan-Vite-Dev/1.0',
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      const tag = data.tag_name || 'v18.8.0';
      const cleanTag = tag.replace(/^v/, '');
      const apkAsset = Array.isArray(data.assets)
        ? data.assets.find(a => a.name && a.name.endsWith('.apk')) || data.assets[0]
        : null;

      const filename = apkAsset ? apkAsset.name : `EcoScan_${tag}.apk`;
      const downloadUrl = apkAsset
        ? apkAsset.browser_download_url
        : `https://github.com/samd27/EcoScan-Releases/releases/download/${tag}/${filename}`;
      const sizeMb = apkAsset && apkAsset.size
        ? (apkAsset.size / (1024 * 1024)).toFixed(1) + ' MB'
        : '91.3 MB';

      cachedRelease = {
        version: tag.startsWith('v') ? tag : `v${tag}`,
        versionNumber: cleanTag,
        filename,
        size: sizeMb,
        downloadUrl,
      };
      lastFetchTime = now;
      return cachedRelease;
    }
  } catch (err) {
    // fallback below
  }

  return {
    version: 'v18.8.0',
    versionNumber: '18.8.0',
    filename: 'EcoScan_v18.8.0.apk',
    size: '91.3 MB',
    downloadUrl: 'https://github.com/samd27/EcoScan-Releases/releases/download/v18.8.0/EcoScan_v18.8.0.apk',
  };
}

export default defineConfig({
  server: {
    port: 5173,
  },
  plugins: [
    {
      name: 'apk-and-release-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const pathname = req.url ? req.url.split('?')[0] : '';

          if (pathname === '/api/release') {
            const release = await getLatestRelease();
            res.writeHead(200, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            });
            return res.end(JSON.stringify(release));
          }

          if (pathname.startsWith('/downloads/') || pathname === '/api/download' || pathname === '/download-apk') {
            const release = await getLatestRelease();
            res.writeHead(302, {
              Location: release.downloadUrl,
              'Content-Type': 'application/vnd.android.package-archive',
              'Content-Disposition': `attachment; filename="${release.filename}"`,
            });
            return res.end();
          }

          next();
        });
      },
    },
  ],
});
