/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/files/contact_us.php',
        destination: '/contact',
        statusCode: 301,
      },
      {
        source: '/panelspan',
        destination: '/products/panelspan',
        statusCode: 301,
      },
      {
        source: '/panelspan/',
        destination: '/products/panelspan',
        statusCode: 301,
      },
      {
        source: '/files/terms-and-conditions.php',
        destination: '/terms',
        statusCode: 301,
      },
      {
        source: '/panelspan/files/terms-and-conditions.php',
        destination: '/products/panelspan',
        statusCode: 301,
      },
      {
        source: '/panelspan/files/enquiry-structural-insulated-panel-system.php',
        destination: '/products/panelspan',
        statusCode: 301,
      },
    ];
  },
  // Long-lived caching for static media so browsers and the CDN stop
  // re-downloading images/PDFs on every visit. Filenames under these folders
  // are stable, so "immutable" is safe — but see ASSET_OPTIMISATION.md: if you
  // change an image, give it a NEW filename or cached visitors keep the old one.
  async headers() {
    return [
      {
        source: '/photos/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/pdfs/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
