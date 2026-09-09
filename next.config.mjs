/** @type {import('next').NextConfig} */

// alyspan.com.au is being retired into this site. Its DNS points here, so every
// request arriving on that host is sent to the matching page below and the old
// domain keeps no content of its own. Contact and Terms have real equivalents
// here, so they go page-for-page rather than all landing on the product page —
// a redirect to an unrelated page gets treated as a soft 404 and passes nothing.
//
// Keep alyspan.com.au renewed. When the registration lapses these redirects die
// and the rankings they carry go with them.
const ALYSPAN_HOST = '(www\\.)?alyspan\\.com\\.au';
const NEW_SITE = 'https://www.quickbuiltsystems.com.au';

const ALYSPAN_PAGES = {
  '/': '/products/alyspan',
  '/files/products.php': '/products/alyspan',
  '/files/specifications.php': '/products/alyspan',
  '/files/contact.php': '/contact',
  '/files/terms-and-conditions.php': '/terms',
};

const alyspanRedirects = [
  // The four known pages plus the home page, mapped one to one.
  ...Object.entries(ALYSPAN_PAGES).map(([source, destination]) => ({
    source,
    has: [{ type: 'host', value: ALYSPAN_HOST }],
    destination: `${NEW_SITE}${destination}`,
    statusCode: 301,
  })),
  // Anything else on the old domain — stray assets, old query URLs, links we
  // never saw — lands on the Alyspan page instead of a 404.
  {
    source: '/:path*',
    has: [{ type: 'host', value: ALYSPAN_HOST }],
    destination: `${NEW_SITE}/products/alyspan`,
    statusCode: 301,
  },
];

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      ...alyspanRedirects,

      /* STAFF SHORTCUTS — an address people can remember, pointing at the tool.
       *
       * The delivery-docket page lives on the accounts service, because that is where the invoice
       * ledger and the docket store are. It is NOT copied onto this site: the page reads held
       * invoices, suppliers and amounts, and a marketing site is the wrong place for a page that
       * needs the accounts secret to be useful — the secret would sit in public HTML on an indexed
       * domain. A redirect gives staff the short address without moving any of that here.
       *
       * The service hands over its token once and remembers the device for 90 days, so this plain
       * link is all anyone needs after the first visit. */
      {
        source: '/pods',
        destination: `${process.env.ACCOUNTS_SERVICE_URL || 'https://accounts-payable-ya88.onrender.com'}/accounts/pods`,
        statusCode: 302,
      },
      {
        source: '/dockets',
        destination: `${process.env.ACCOUNTS_SERVICE_URL || 'https://accounts-payable-ya88.onrender.com'}/accounts/pods`,
        statusCode: 302,
      },
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
