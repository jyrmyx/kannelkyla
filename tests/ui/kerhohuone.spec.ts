import { expect, test } from '@playwright/test';
import { expectHeading, expectNoPageErrors, openPage } from './helpers';

const scheduleUrl = 'https://www.supersaas.com/schedule/Kkyla/Kerhohuone';

test('the club room page shows the SuperSaaS booking calendar', async ({ page }) => {
  const errors = await openPage(page, '/asuminen/kerhohuone');
  await expectHeading(page, 'Kerhohuone');

  const calendar = page.locator('#varauskalenteri iframe');
  await expect(calendar).toBeVisible();
  await expect(calendar).toHaveAttribute('src', scheduleUrl);
  await expect(calendar).toHaveAttribute('title', 'Kannelkylän kerhohuoneen varauskalenteri');

  const frame = page.frameLocator('#varauskalenteri iframe');
  await expect(frame.getByText('Tervetuloa Kannelkylän kerhohuoneen varauskalenteriin')).toBeVisible({
    timeout: 20_000,
  });

  const ownTab = page.getByRole('link', { name: 'Avaa kalenteri omalle välilehdelle' });
  await expect(ownTab).toHaveAttribute('href', scheduleUrl);

  const relevant = errors.filter((message) => !/supersaas/i.test(message));
  await expectNoPageErrors(relevant);
});
