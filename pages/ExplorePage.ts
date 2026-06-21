import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { routes } from '../test-data/routes';
import { explorePageContent } from '../test-data/expected-content';

export class ExplorePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get spotTradingSection(): Locator {
    return this.page.locator('section').filter({
      has: this.page.getByRole('heading', { name: explorePageContent.spotMarketHeading }),
    });
  }

  async open(){
    await this.goto(routes.explore);
  }

  async expectSpotTradingSectionRendered(){
    await expect(this.page.getByRole('heading', { name: explorePageContent.heading }).first()).toBeVisible();
    await expect(this.spotTradingSection).toBeVisible();
    await expect(this.spotTradingSection.getByRole('heading', { name: explorePageContent.spotMarketHeading })).toBeVisible();
    await expect(this.spotTradingSection.getByText(explorePageContent.spotMarketDescription).first()).toBeVisible();
    await expect(this.spotTradingSection.getByRole('button', { name: 'Hot', exact: true })).toBeVisible();
  }

  async expectTradingPairsVisible(){
    for (const asset of explorePageContent.sampleAssets) {
      await expect(this.spotTradingSection.getByText(asset, { exact: true }).first()).toBeVisible();
    }
  }

  async expectTradingPairsGrouped(){
    for (const tab of explorePageContent.spotTabs) {
      const tabButton = this.spotTradingSection.getByRole('button', { name: tab, exact: true });
      await expect(tabButton).toBeVisible();
      await tabButton.click();
      await expect(this.spotTradingSection.locator('a').first()).toBeVisible();
      await expect(this.spotTradingSection.getByText('$').first()).toBeVisible();
    }
  }

  async clickSpotTab(tab: string){
    await this.spotTradingSection.getByRole('button', { name: tab, exact: true }).click();
  }

  async expectAssetVisibleInSpotSection(asset: string){
    await expect(this.spotTradingSection.getByText(asset, { exact: true }).first()).toBeVisible();
  }

  async expectTradingPairDataFields(){
    await expect(this.spotTradingSection.getByText('BTC', { exact: true }).first()).toBeVisible();
    await expect(this.spotTradingSection.getByText('$').first()).toBeVisible();
    await expect(this.spotTradingSection.getByText('%').first()).toBeVisible();
  }
}
