import { expect, test } from '@playwright/test';
import {
  collectPageErrors,
  expectHeading,
  expectImagesLoaded,
  expectNoPageErrors,
  openPage,
  pages,
} from './helpers';

for (const { path, heading } of pages) {
  test(`${path} loads with the expected heading and images`, async ({ page }) => {
    const errors = await openPage(page, path);
    await expectHeading(page, heading);
    await expectImagesLoaded(page);
    await expectNoPageErrors(errors);
  });
}

test('the latest news item loads with its heading and images', async ({ page }) => {
  const listErrors = await openPage(page, '/uutiset');
  await expectHeading(page, 'Uutiset');
  await expectNoPageErrors(listErrors);

  const latest = page.locator('main a[href^="/uutiset/"]').first();
  await expect(latest).toBeVisible();
  const href = await latest.getAttribute('href');
  expect(href).toBeTruthy();

  const errors = collectPageErrors(page);
  const response = await page.goto(href!);
  expect(response, `no response for ${href}`).toBeTruthy();
  expect(response!.status(), `${href} returned ${response!.status()}`).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).not.toHaveText('Uutiset');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expectImagesLoaded(page);
  await expectNoPageErrors(errors);
});
