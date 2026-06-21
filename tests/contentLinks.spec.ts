import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CompanyPage } from '../pages/CompanyPage';

const IOS_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)';

test.describe('Content & Links', () => {
  test('marketing banners render in the expected page region', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.expectMarketingContentVisible();
  });

  test('App Store and Google Play download links resolve correctly', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.expectDownloadLink();
  });

  test('download app CTA redirects to Play Store and App Store @api', async ({ page, request }) => {
    const home = new HomePage(page);
    await home.open();

    const href = await page.locator('a[data-button-type="download"]').getAttribute('href');
    expect(href).toContain('mbio.go.link');

    const playStoreResponse = await request.get(href!, { maxRedirects: 0 });
    expect(playStoreResponse.headers()['location']).toContain('play.google.com');

    const appStoreResponse = await request.get(href!, {
      maxRedirects: 0,
      headers: { 'User-Agent': IOS_USER_AGENT },
    });
    expect(appStoreResponse.headers()['location']).toContain('apps.apple.com');
  });

  test('About Us > Why MultiBank page renders all expected components with correct headings and section text', async ({ page }) => {
    const company = new CompanyPage(page);
    await company.openWhyMultiBankViaNav();
    await company.expectWhyMultiBankContent();
  });
});
