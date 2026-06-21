import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NavigationPage } from '../pages/NavigationPage';
import { routes } from '../test-data/routes';
import { homePageContent } from '../test-data/expected-content';
import { expectUrlReturns200 } from '../utils/linkChecker';

test.describe('Negative & Edge Cases', () => {
  test('invalid route handling shows not-found or safe fallback', async ({ page }) => {
    const response = await page.goto(routes.invalid, { waitUntil: 'domcontentloaded' });
    const status = response?.status() ?? 0;
    expect(status === 200 || status === 404).toBeTruthy();
    await expect(page.locator('body')).toBeVisible();
  });

  test('broken link detection across navigation links', async ({ page }) => {
    await new HomePage(page).open();
    await new NavigationPage(page).expectNavigationLinksHaveHref();
  });

  test('navigation links return 200', async ({ page, request }) => {
    await new HomePage(page).open();
    const urls = await new NavigationPage(page).getNavigationUrls();
    for (const url of urls) {
      await expectUrlReturns200(request, url);
    }
  });

  test.describe('mobile breakpoint', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('viewport regression at a mobile breakpoint', async ({ page }) => {
      await new HomePage(page).open();

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);

      await expect(page.getByRole('heading', { name: homePageContent.heroHeadings[0] }).first()).toBeVisible();
    });
  });
});
