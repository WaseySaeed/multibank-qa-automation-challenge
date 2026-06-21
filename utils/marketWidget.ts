import { APIRequestContext, expect } from '@playwright/test';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const MARKET_WIDGET_URL = 'https://core-api.mb.io/api/io/v1/market/widget';
export const MARKET_PRICES_URL = 'https://mbg-market-data-service.mb.io/api/io/v1/marketdata/prices?quote=USDT';

type MarketWidget = {
  id: string;
  name: string;
  highlighted: string[];
  items: string[];
};

export async function expectMarketDataApisOk(request: APIRequestContext){
  const widgetResponse = await request.get(MARKET_WIDGET_URL, { headers: JSON_HEADERS });
  expect(widgetResponse.status()).toBe(200);

  const pricesResponse = await request.get(MARKET_PRICES_URL, { headers: JSON_HEADERS });
  expect(pricesResponse.status()).toBe(200);
}

export async function getHighlightedAsset(
  request: APIRequestContext,
  category: 'gainers' | 'losers',
): Promise<string> {
  const response = await request.get(MARKET_WIDGET_URL, { headers: JSON_HEADERS });
  if (!response.ok()) {
    throw new Error(`Market widget API failed: ${response.status()}`);
  }

  const widgets: MarketWidget[] = await response.json();
  const widget = widgets.find((w) => w.id === category);
  if (!widget?.highlighted?.length) {
    throw new Error(`No highlighted assets for ${category}`);
  }

  return widget.highlighted[0];
}
