export const nav = [
  { href: '/', label: 'Etusivu' },
  { href: '/uutiset', label: 'Uutiset' },
  { href: '/asukastiedotteet', label: 'Asukastiedotteet' },
  { href: '/asuminen', label: 'Asuminen' },
  { href: '/historia', label: 'Historia' },
  { href: '/kylakartta', label: 'Kyläkartta' },
  { href: '/tietoa', label: 'Tietoa' },
  { href: '/yhteystiedot', label: 'Yhteystiedot' },
] as const;

export const categories = [
  {
    id: 'elaminen',
    label: 'Eläminen',
    text: 'Pesutupa, kerhohuone, sauna ja muut yhteiset tilat.',
  },
  {
    id: 'asuminen',
    label: 'Asuminen',
    text: 'Asunnot, laajakaista, autopaikat ja jätehuolto.',
  },
  {
    id: 'korjaus',
    label: 'Remontointi',
    text: 'Korjausohjeet, vastuunjako ja talven muistilista.',
  },
  {
    id: 'turvallisuus',
    label: 'Turvallisuus',
    text: 'Järjestyssääntö, palovaroittimet ja alkusammutus.',
  },
] as const;

export function formatDate(iso: string) {
  const [year, month, day] = iso.split('-');
  return `${day}.${month}.${year}`;
}

/** Prefix a site path with a deploy base. `/` stays at the root. `/kannelkyla` becomes `/kannelkyla/...`. */
export function prefixPath(path: string, base: string) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const hashIndex = path.indexOf('#');
  const hash = hashIndex === -1 ? '' : path.slice(hashIndex);
  const bare = hashIndex === -1 ? path : path.slice(0, hashIndex);
  const queryIndex = bare.indexOf('?');
  const query = queryIndex === -1 ? '' : bare.slice(queryIndex);
  const pathname = queryIndex === -1 ? bare : bare.slice(0, queryIndex);
  const prefix = !base || base === '/' ? '/' : base.endsWith('/') ? base : `${base}/`;
  if (pathname === '/') return `${prefix}${query}${hash}`;
  return `${prefix}${pathname.slice(1)}${query}${hash}`;
}

/** Prefix a site path with the deploy base. Locally that base is `/`. GitHub Pages uses `/kannelkyla/`. */
export function url(path: string) {
  return prefixPath(path, import.meta.env.BASE_URL);
}

function withSlash(path: string) {
  if (path === '/' || path === '') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

/** `href` is already prefixed. Home matches only the base, so a section does not highlight Etusivu. */
export function pathIsCurrent(pathname: string, href: string, base: string) {
  const current = withSlash(pathname);
  const target = withSlash(href);
  const home = withSlash(!base || base === '/' ? '/' : base);
  if (target === home) return current === home;
  return current === target || current.startsWith(target);
}

export function isCurrent(pathname: string, href: string) {
  return pathIsCurrent(pathname, href, import.meta.env.BASE_URL);
}
