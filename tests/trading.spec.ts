import { test } from '@playwright/test';
import { ExplorePage } from '../pages/ExplorePage';
import { expectMarketDataApisOk, getHighlightedAsset } from '../utils/marketWidget';

test.describe('Trading Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await new ExplorePage(page).open();
  });

  test('spot trading section renders and displays trading pairs', async ({ page }) => {
    const explore = new ExplorePage(page);
    await explore.expectSpotTradingSectionRendered();
    await explore.expectTradingPairsVisible();
  });

  test('trading pairs are correctly grouped into categories', async ({ page }) => {
    const explore = new ExplorePage(page);
    await explore.expectSpotTradingSectionRendered();
    await explore.expectTradingPairsGrouped();
  });

  test('trading pairs match market widget categories @api', async ({ page, request }) => {
    const gainerAsset = await getHighlightedAsset(request, 'gainers');
    const loserAsset = await getHighlightedAsset(request, 'losers');

    const explore = new ExplorePage(page);
    await explore.expectSpotTradingSectionRendered();

    await explore.clickSpotTab('Gainers');
    await explore.expectAssetVisibleInSpotSection(gainerAsset);

    await explore.clickSpotTab('Losers');
    await explore.expectAssetVisibleInSpotSection(loserAsset);
  });

  test('trading pair entries contain the expected data fields', async ({ page }) => {
    const explore = new ExplorePage(page);
    await explore.expectSpotTradingSectionRendered();
    await explore.expectTradingPairDataFields();
  });

  test('market data API responds successfully @api', async ({ request }) => {
    await expectMarketDataApisOk(request);
  });
});
