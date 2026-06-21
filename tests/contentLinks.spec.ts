import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CompanyPage } from '../pages/CompanyPage';

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

  test('About Us > Why MultiBank page renders all expected components with correct headings and section text', async ({ page }) => {
    const company = new CompanyPage(page);
    await company.openWhyMultiBankViaNav();
    await company.expectWhyMultiBankContent();
  });
});
