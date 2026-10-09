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

export function isCurrent(path: string, href: string) {
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}
