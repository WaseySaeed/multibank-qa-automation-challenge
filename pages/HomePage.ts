import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { routes } from '../test-data/routes';
import { homePageContent } from '../test-data/expected-content';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get downloadLink(): Locator {
    return this.page.locator('a[href*="mbio.go.link"]').first();
  }

  async open(): Promise<void> {
    await this.goto(routes.home);
  }

  async expectMarketingContentVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: homePageContent.heroHeadings[0] }).first()).toBeVisible();

    for (const section of homePageContent.marketingSections) {
      await expect(this.page.getByText(section).first()).toBeVisible();
    }
  }

  async expectDownloadLink(): Promise<void> {
    await expect(this.downloadLink).toBeVisible();
    const href = await this.downloadLink.getAttribute('href');
    expect(href).toContain('mbio.go.link');
  }
}
