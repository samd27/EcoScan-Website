// Vercel Edge Function: Dynamically fetch & download the latest EcoScan release APK
export const config = {
  runtime: 'edge',
};

const GITHUB_REPO = 'samd27/EcoScan-Releases';
const FALLBACK_APK_URL = 'https://github.com/samd27/EcoScan-Releases/releases/download/v18.8.0/EcoScan_v18.8.0.apk';
const FALLBACK_FILENAME = 'EcoScan_v18.8.0.apk';

export default async function handler(request) {
  let downloadUrl = FALLBACK_APK_URL;
  let filename = FALLBACK_FILENAME;

  try {
    // 1. Query GitHub API for the true latest release
    const releaseRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
      headers: {
        'User-Agent': 'EcoScan-Web-Downloader/1.0',
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (releaseRes.ok) {
      const releaseData = await releaseRes.json();
      const apkAsset = Array.isArray(releaseData.assets)
        ? releaseData.assets.find(a => a.name && a.name.endsWith('.apk')) || releaseData.assets[0]
        : null;

      if (apkAsset && apkAsset.browser_download_url) {
        downloadUrl = apkAsset.browser_download_url;
        filename = apkAsset.name || filename;
      }
    }
  } catch (err) {
    // Keep fallback if API call errors
  }

  try {
    // 2. Fetch the APK asset from GitHub Releases (which redirects to Azure Blob Storage CDN)
    const upstreamResponse = await fetch(downloadUrl, {
      headers: {
        'User-Agent': 'EcoScan-Web-Downloader/1.0',
        'Accept': 'application/vnd.android.package-archive, application/octet-stream, */*',
      },
    });

    if (!upstreamResponse.ok) {
      // Fallback: direct 302 redirect to the download URL
      return Response.redirect(downloadUrl, 302);
    }

    // 3. Stream binary with explicit, pristine Content-Disposition header
    return new Response(upstreamResponse.body, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': upstreamResponse.headers.get('content-length') || '',
        'Cache-Control': 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return Response.redirect(downloadUrl, 302);
  }
}
