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
    ];
  },
};

export default nextConfig;
