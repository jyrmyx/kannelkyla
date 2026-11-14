import { expect, test, type Page } from '@playwright/test';
import { expectHeading, expectNoPageErrors, openPage, useMobileViewport } from './helpers';

test('the village map page embeds an OpenStreetMap iframe', async ({ page }) => {
  const errors = await openPage(page, '/kylakartta');
  await expectHeading(page, 'Kyläkartta');
  const map = page.locator('#sijainti iframe');
  await expect(map).toBeVisible();
  await expect(map).toHaveAttribute('src', /openstreetmap\.org/);
  await expectNoPageErrors(errors);
});

async function expectLocationLinkLandsOnSection(page: Page) {
  await page.getByRole('link', { name: 'Katso sijainti kartalta' }).click();
  await expect(page).toHaveURL(/\/kylakartta\/?#sijainti/);
  await expectHeading(page, 'Kyläkartta');

  const section = page.locator('#sijainti');
  await expect(section).toBeVisible();

  const drawnMap = page.locator('.prose img[src*="kylankartta2"]');
  await expect(drawnMap).toHaveJSProperty('complete', true);
  const width = await drawnMap.evaluate((element) => (element as HTMLImageElement).naturalWidth);
  expect(width).toBeGreaterThan(0);

  // The site uses smooth scrolling, so wait until the section has settled near the sticky header.
  await expect(async () => {
    const top = await section.evaluate((element) => element.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(0);
    expect(top).toBeLessThanOrEqual(200);
  }).toPass({ timeout: 5_000 });
}

test('the front-page location link lands on the map section', async ({ page }) => {
  const errors = await openPage(page, '/');
  await expectLocationLinkLandsOnSection(page);
  await expectNoPageErrors(errors);
});

test('the front-page location link lands on the map section on a mobile viewport', async ({ page }) => {
  await useMobileViewport(page);
  const errors = await openPage(page, '/');
  await expectLocationLinkLandsOnSection(page);
  await expectNoPageErrors(errors);
});
