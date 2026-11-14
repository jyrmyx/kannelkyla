import { expect, test } from '@playwright/test';
import { collectPageErrors, expectHeading, expectNoPageErrors } from './helpers';

test('an unknown URL renders the 404 page', async ({ page }) => {
  const errors = collectPageErrors(page, { ignoreNotFoundDocument: true });
  const response = await page.goto('/tama-sivu-ei-ole-olemassa');
  expect(response, 'no response for the unknown URL').toBeTruthy();
  expect(response!.status()).toBe(404);
  await expectHeading(page, 'Sivua ei löydy');
  await expect(page.getByRole('link', { name: 'Etusivulle' })).toBeVisible();
  await expectNoPageErrors(errors);
});
