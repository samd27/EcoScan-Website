// Vercel Edge Function: Returns the latest EcoScan release metadata with Edge caching
export const config = {
  runtime: 'edge',
};

const GITHUB_REPO = 'samd27/EcoScan-Releases';
const FALLBACK_RELEASE = {
  version: 'v18.8.0',
  versionNumber: '18.8.0',
  filename: 'EcoScan_v18.8.0.apk',
  size: '91.3 MB',
  downloadUrl: 'https://github.com/samd27/EcoScan-Releases/releases/download/v18.8.0/EcoScan_v18.8.0.apk',
};

export default async function handler(request) {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      headers: {
        'User-Agent': 'EcoScan-Web/1.0',
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      return new Response(JSON.stringify(FALLBACK_RELEASE), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60, s-maxage=120',
        },
      });
    }

    const data = await res.json();
    const tag = data.tag_name || 'v18.8.0';
    const cleanTag = tag.replace(/^v/, '');

    // Locate the .apk asset
    const apkAsset = Array.isArray(data.assets)
      ? data.assets.find(a => a.name && a.name.endsWith('.apk')) || data.assets[0]
      : null;

    const filename = apkAsset ? apkAsset.name : `EcoScan_${tag}.apk`;
    const downloadUrl = apkAsset ? apkAsset.browser_download_url : `https://github.com/${GITHUB_REPO}/releases/download/${tag}/${filename}`;
    const sizeMb = apkAsset && apkAsset.size
      ? (apkAsset.size / (1024 * 1024)).toFixed(1) + ' MB'
      : '91.3 MB';

    const payload = {
      version: tag.startsWith('v') ? tag : `v${tag}`,
      versionNumber: cleanTag,
      filename,
      size: sizeMb,
      downloadUrl,
      publishedAt: data.published_at || new Date().toISOString(),
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=1800',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify(FALLBACK_RELEASE), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30',
      },
    });
  }
}
