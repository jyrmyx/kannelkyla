import { expect, test } from '@playwright/test';
import { expectHeading, expectNoPageErrors, openPage } from './helpers';

test('the notices page links to the Avaa.io portal', async ({ page }) => {
  const errors = await openPage(page, '/asukastiedotteet');
  await expectHeading(page, 'Tiedotteet');
  const portal = page.getByRole('link', { name: 'Siirry Avaa.io-portaaliin' });
  await expect(portal).toBeVisible();
  await expect(portal).toHaveAttribute('href', 'https://app.avaa.io');
  await expectNoPageErrors(errors);
});
