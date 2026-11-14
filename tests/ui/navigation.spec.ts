import { expect, test } from '@playwright/test';
import {
  collectPageErrors,
  expectHeading,
  expectNoPageErrors,
  openPage,
  useMobileViewport,
  visibleHeaderNav,
} from './helpers';
import { nav } from '../../src/lib/site';

test('desktop header links reach their pages', async ({ page }) => {
  const errors = await openPage(page, '/');
  const menu = visibleHeaderNav(page);

  for (const item of nav) {
    await menu.getByRole('link', { name: item.label, exact: true }).click();
    if (item.href === '/') {
      await expectHeading(page, 'Tervetuloa Kannelkylään');
    } else {
      await expect(page).toHaveURL(new RegExp(`${item.href}/?$`));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  }

  await expectNoPageErrors(errors);
});

test('the mobile Valikko opens and its links reach their pages', async ({ page }) => {
  await useMobileViewport(page);
  const errors = await openPage(page, '/');

  for (const item of nav) {
    const toggle = page.locator('header details summary');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(visibleHeaderNav(page).getByRole('link', { name: item.label, exact: true })).toBeVisible();
    await visibleHeaderNav(page).getByRole('link', { name: item.label, exact: true }).click();
    if (item.href === '/') {
      await expectHeading(page, 'Tervetuloa Kannelkylään');
    } else {
      await expect(page).toHaveURL(new RegExp(`${item.href}/?$`));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
  }

  await expectNoPageErrors(errors);
});
