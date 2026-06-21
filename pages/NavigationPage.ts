import { Locator, Page, expect } from '@playwright/test';
import { NavigationItem, NavigationItemURLs } from '../utils/enums/navigationItems';

export class NavigationPage {
  readonly page: Page;
  readonly navigation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigation = page.getByRole('navigation').first();
  }


  async expectTopNavigationVisible(){
    await expect(this.navigation).toBeVisible();
    for (const item of Object.values(NavigationItem)) {
      await expect(this.navigation.getByRole('link', { name: item, exact: true }).first()).toBeVisible();
    }
  }

  async expectNavigationLinksResolve(item: NavigationItem){
    const link = this.navigation.getByRole('link', { name: item, exact: true }).first();
    const keyword = NavigationItemURLs[item];

    if (item === NavigationItem.MBG) {
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        link.click(),
      ]);
      await expect.poll(() => newPage.url(), { timeout: 15_000 }).toContain(keyword);
      await newPage.close();
      return;
    }

    await link.click();
    await expect.poll(() => this.page.url(), { timeout: 15_000 }).toContain(keyword);
  }

  async expectNavigationLinksHaveHref(){
    for (const label of Object.values(NavigationItem)) {
      const link = this.navigation.getByRole('link', { name: label, exact: true }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href');
    }
  }

  async getNavigationUrls() {
    const urls: string[] = [];
    for (const label of Object.values(NavigationItem)) {
      const link = this.navigation.getByRole('link', { name: label, exact: true }).first();
      const href = await link.getAttribute('href');
      const fullUrl = href!.startsWith('http') ? href! : new URL(href!, this.page.url()).toString();
      urls.push(fullUrl);
    }

    return urls;
  }

}
