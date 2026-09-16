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

/* THE DESIGN ZONES.
 *
 * Every calculator we own lives in a different repo on a different domain: the patio designer on
 * patiokits.com.au, the steel floor and home designers on quickbuilthomes.com.au, the fence planner
 * on quickbuiltfencing.com.au. A customer who wants to price two products changes brand halfway
 * through, and quickbuiltsystems.com.au — the parent site — had no calculator at all.
 *
 * These are REWRITES, not redirects: the URL stays on quickbuiltsystems.com.au and this site serves
 * the other app's response. That is Next's multi-zone pattern, and it is why each tool can stay in
 * its own repo with its own engine, its own prices and its own deploy. Nothing moves.
 *
 * TWO THINGS HAVE TO BE TRUE for a zone to work, and both live in the ZONE's config, not here:
 *   1. The zone sets `basePath: '/design/<path>'`, so the browser asks for
 *      /design/<path>/_next/... rather than /_next/..., which would collide with this site's own
 *      assets and 404. This is the step that is easy to forget and impossible to miss once it is
 *      wrong — the page arrives unstyled.
 *   2. The zone keeps its own domain working, and sets a canonical pointing at the
 *      quickbuiltsystems URL, so the two do not compete as duplicates.
 *
 * A zone only appears here once its URL is set. Until then /design links out to the live domain
 * instead, so the hub is useful before the plumbing is finished — turn one on by setting its env.
 */
const ZONES = [
  { path: 'patio', url: process.env.ZONE_PATIO_URL, route: '/designer' },
  { path: 'steel-floor', url: process.env.ZONE_HOMES_URL, route: '/steel-floor' },
  { path: 'fence', url: process.env.ZONE_FENCING_URL, route: '/planner' },
  { path: 'home', url: process.env.ZONE_HOMES_URL, route: '/designer' },
];

const zoneRewrites = ZONES.filter((z) => z.url).flatMap((z) => [
  { source: `/design/${z.path}`, destination: `${z.url}${z.route}` },
  { source: `/design/${z.path}/:path*`, destination: `${z.url}${z.route}/:path*` },
  /* The zone's own assets, under its prefix, so they never collide with this site's /_next. */
  { source: `/design/${z.path}/_next/:path*`, destination: `${z.url}/design/${z.path}/_next/:path*` },
]);

const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return zoneRewrites;
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
      /* SINGULAR AND PLURAL BOTH, because people type what they say.
         Only /pods and /dockets were mapped, so /pod — the first thing anyone actually types —
         returned the site's 404. A shortcut that has to be spelled exactly right is not a
         shortcut. */
      ...['/pods', '/pod', '/dockets', '/docket', '/delivery-dockets'].map((source) => ({
        source,
        destination: `${process.env.ACCOUNTS_SERVICE_URL || 'https://accounts-payable-ya88.onrender.com'}/accounts/pods`,
        statusCode: 302,
      })),

      /* THE STAFF DASHBOARD — quickbuiltsystems.com.au/staff-dashboard.
       *
       * One address staff can remember, on the domain they already know, landing on the hub that
       * lists every tool in the accounts service with a live count beside each one.
       *
       * A REDIRECT, NOT A REWRITE, and the reason is measured rather than stylistic. The hub builds
       * its tiles from root-absolute links — 15 of them, across /orders, /bills, /accounts,
       * /bunnings, /intake, /pod, /delivery, /completed, /health, /selfcheck and /orders.json.
       * Served through a Next rewrite the page itself would render fine, and every single link on it
       * would then resolve against quickbuiltsystems.com.au and 404. A 302 hands the browser to the
       * service, so the address bar and the links on the page agree about which host they are on.
       *
       * It is also why the hub is not COPIED onto this site — the same reason the docket shortcut
       * above gives. These screens read the live order ledger and show customer names and delivery
       * addresses. They need the accounts token to be worth anything, and a public marketing domain
       * is the wrong place to keep that.
       *
       * No token is needed in the link: the hub answers an unauthenticated visitor with a password
       * box rather than a locked door, and remembers the device afterwards. Next forwards the query
       * string anyway, so an older ?token= link still works.
       *
       * Singular, plural and the words people actually say, for the same reason /pod was added
       * beside /pods: a shortcut you have to spell exactly right is not a shortcut. */
      /* TEAM, not staff — the word the business actually uses for itself. /staff-dashboard is kept
         working rather than retired: it has been handed out, and a shortcut that 404s after somebody
         has written it down is worse than an extra line here. */
      ...['/team-dashboard', '/team-dashboards', '/teamdashboard', '/team',
        '/staff-dashboard', '/staff-dashboards', '/staffdashboard', '/staff', '/dashboard', '/hub'].map((source) => ({
        source,
        destination: `${process.env.ACCOUNTS_SERVICE_URL || 'https://accounts-payable-ya88.onrender.com'}/hub`,
        statusCode: 302,
      })),
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
