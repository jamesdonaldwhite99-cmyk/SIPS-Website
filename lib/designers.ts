/**
 * Where the calculators live — ONE definition, used by everything that links to one.
 *
 * Each tool has two addresses: the zone path on this domain, and the tool on its own domain. The
 * zone path only resolves once that zone's URL is set in the environment, because `zoneRewrites` in
 * next.config.mjs builds the rewrite from the same env var — no var, no rewrite, 404.
 *
 * The /design hub got that right and the steel floor product page did not: it hardcoded
 * "/design/steel-floor", which 404s until the zone is switched on, and "Price your floor" was dead
 * on a live page (James, 16 Sep 2026). Hence this file. Link through `designerHref` and the question
 * cannot come up again — flip `zoned` when a zone goes live and every link on the site follows.
 */

export interface Designer {
  id: string;
  name: string;
  /** The path on this domain. Only resolves when the zone is configured AND `zoned` is true. */
  zonePath: string;
  /** The tool on its own domain. Always works. */
  live: string;
  /**
   * true once this zone is rewritten on quickbuiltsystems.com.au — which needs BOTH the env var
   * here and a matching `basePath` in the zone's own next.config. Until then links go to `live`.
   */
  zoned: boolean;
  tag: 'Live' | 'Coming soon';
  blurb: string;
  points: string[];
  cta: string;
}

export const DESIGNERS: Designer[] = [
  {
    id: 'patio',
    name: 'Patio kits',
    zonePath: '/design/patio',
    live: 'https://www.patiokits.com.au/designer',
    zoned: false,
    tag: 'Live',
    blurb:
      'Size it, pick the roof and the colours, and see a delivered price for your postcode. Plan, ' +
      'elevation and a 3D view as you go.',
    points: ['Nine styles', 'Delivered price by postcode', 'Plans and 3D'],
    cta: 'Design a patio',
  },
  {
    id: 'steel-floor',
    name: 'Steel floors',
    zonePath: '/design/steel-floor',
    live: 'https://www.quickbuilthomes.com.au/steel-floor',
    zoned: false,
    tag: 'Live',
    blurb:
      'Five questions and a delivered price for an engineered subfloor — bearers, joists, posts and ' +
      'piers, cut to length and labelled to the plan.',
    points: ['Answer five questions', 'Bill of materials', 'Pier setout drawing'],
    cta: 'Price a floor',
  },
  {
    id: 'fence',
    name: 'Fencing',
    zonePath: '/design/fence',
    live: 'https://www.quickbuiltfencing.com.au',
    zoned: false,
    tag: 'Coming soon',
    blurb:
      'Draw your fence line, drag the corners, and watch the panels, posts and channels price as ' +
      'you go. In final testing.',
    points: ['Draw the run', 'Live pricing', 'Acoustic and retaining'],
    cta: 'See fencing',
  },
  {
    id: 'home',
    name: 'Kit homes',
    zonePath: '/design/home',
    live: 'https://www.quickbuilthomes.com.au',
    zoned: false,
    tag: 'Coming soon',
    blurb:
      'Lay out a home, move the walls and openings, and see what it does to the price. In ' +
      'development with our design team.',
    points: ['Floor plans', 'Elevations', 'Indicative pricing'],
    cta: 'See kit homes',
  },
];

export const designer = (id: string): Designer => {
  const d = DESIGNERS.find((x) => x.id === id);
  if (!d) throw new Error(`No designer "${id}" — see lib/designers.ts`);
  return d;
};

/** The address to link to right now. Same-origin once the zone is live, the tool's own domain until. */
export const designerHref = (id: string): string => {
  const d = designer(id);
  return d.zoned ? d.zonePath : d.live;
};

/** True when the link leaves this site, so the caller can render an <a> rather than a <Link>. */
export const designerIsExternal = (id: string): boolean => !designer(id).zoned;
