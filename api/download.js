// Vercel Edge Function: Stream EcoScan APK with clean filename
export const config = {
  runtime: 'edge',
};

const RELEASE_APK_URL = 'https://github.com/samd27/EcoScan-Releases/releases/download/v18.7.0/EcoScan_v18.7.0.apk';
const CLEAN_FILENAME = 'EcoScan_v18.7.0.apk';

export default async function handler(request) {
  try {
    // Fetch the asset from GitHub Releases (which redirects to Azure Blob CDN)
    const upstreamResponse = await fetch(RELEASE_APK_URL, {
      headers: {
        'User-Agent': 'EcoScan-Web-Downloader/1.0',
        'Accept': 'application/vnd.android.package-archive, application/octet-stream, */*',
      },
    });

    if (!upstreamResponse.ok) {
      // Fallback to direct redirect if upstream fetch fails
      return Response.redirect(RELEASE_APK_URL, 302);
    }

    // Stream the binary body with an explicit, properly-quoted Content-Disposition header
    return new Response(upstreamResponse.body, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': `attachment; filename="${CLEAN_FILENAME}"`,
        'Content-Length': upstreamResponse.headers.get('content-length') || '',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    // On unexpected error, redirect directly to GitHub Releases
    return Response.redirect(RELEASE_APK_URL, 302);
  }
}
