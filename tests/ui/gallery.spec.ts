import { expect, test } from '@playwright/test';
import { expectHeading, expectNoPageErrors, openPage } from './helpers';

test('the history gallery lightbox opens a picture', async ({ page }) => {
  const errors = await openPage(page, '/historia');
  await expectHeading(page, 'Kannelkylän historia');

  const trigger = page.locator('[data-lightbox]').first();
  await expect(trigger).toBeVisible();
  await trigger.scrollIntoViewIfNeeded();
  const expectedSrc = await trigger.getAttribute('data-lightbox');
  expect(expectedSrc).toBeTruthy();
  await trigger.click();

  const lightbox = page.locator('#lightbox');
  await expect(lightbox).toBeVisible();
  const image = lightbox.locator('img');
  await expect(image).toHaveAttribute('src', expectedSrc!);
  await expect(image).toHaveJSProperty('complete', true);
  const naturalWidth = await image.evaluate((element) => (element as HTMLImageElement).naturalWidth);
  expect(naturalWidth, `lightbox image did not render: ${expectedSrc}`).toBeGreaterThan(0);

  await lightbox.getByRole('button', { name: 'Sulje' }).click();
  await expect(lightbox).toBeHidden();
  await expectNoPageErrors(errors);
});
