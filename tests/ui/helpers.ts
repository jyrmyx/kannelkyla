import { expect, type Page } from '@playwright/test';

export const pages = [
  { path: '/', heading: 'Tervetuloa Kannelkylään' },
  { path: '/uutiset', heading: 'Ajankohtaista' },
  { path: '/asukastiedotteet', heading: 'Tiedotteet' },
  { path: '/asuminen', heading: 'Asuminen ja eläminen' },
  { path: '/asuminen/pesutupa', heading: 'Pesutupa' },
  { path: '/historia', heading: 'Kannelkylän historia' },
  { path: '/kylakartta', heading: 'Kyläkartta' },
  { path: '/tietoa', heading: 'Tietoa Kannelkylästä' },
  { path: '/tietoa/kotiliesi-1979', heading: 'Kannelkylä Kotiliesi-lehdessä 1979' },
  { path: '/yhteystiedot', heading: 'Yhteystiedot' },
] as const;

const mobileViewport = { width: 390, height: 844 } as const;

export function useMobileViewport(page: Page) {
  return page.setViewportSize(mobileViewport);
}

export function isOsmNoise(message: string, locationUrl = '') {
  return /openstreetmap\.org/i.test(`${message} ${locationUrl}`);
}

/** The 404 document itself logs this in Chromium; it is not a page bug. */
export function isNotFoundDocumentError(message: string) {
  return /Failed to load resource: the server responded with a status of 404/.test(message);
}

/** Collect console and page errors, ignoring only OSM embed/tile noise. */
export function collectPageErrors(page: Page, options: { ignoreNotFoundDocument?: boolean } = {}) {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const locationUrl = msg.location().url ?? '';
    if (isOsmNoise(msg.text(), locationUrl)) return;
    if (options.ignoreNotFoundDocument && isNotFoundDocumentError(msg.text())) return;
    errors.push(msg.text());
  });

  page.on('pageerror', (error) => {
    if (isOsmNoise(error.message)) return;
    errors.push(error.message);
  });

  return errors;
}

export async function expectNoPageErrors(errors: string[]) {
  expect(errors, errors.join('\n')).toEqual([]);
}

export async function openPage(page: Page, path: string) {
  const errors = collectPageErrors(page);
  const response = await page.goto(path);
  expect(response, `no response for ${path}`).toBeTruthy();
  expect(response!.status(), `${path} returned ${response!.status()}`).toBe(200);
  return errors;
}

export async function expectHeading(page: Page, heading: string) {
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
}

export async function expectImagesLoaded(page: Page) {
  const images = page.locator('img');
  const count = await images.count();

  for (let index = 0; index < count; index += 1) {
    const image = images.nth(index);
    const src = (await image.getAttribute('src')) ?? '';
    if (!src) continue;

    await image.scrollIntoViewIfNeeded();
    const naturalWidth = await image.evaluate(async (element) => {
      const img = element as HTMLImageElement;
      if (!img.complete) {
        await new Promise<void>((resolve, reject) => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener(
            'error',
            () => reject(new Error(`image failed to load: ${img.currentSrc || img.src}`)),
            { once: true },
          );
        });
      }
      return img.naturalWidth;
    });

    expect(naturalWidth, `image did not render: ${src}`).toBeGreaterThan(0);
  }
}

export function visibleHeaderNav(page: Page) {
  return page.locator('header nav[aria-label="Sivut"]').locator('visible=true');
}
