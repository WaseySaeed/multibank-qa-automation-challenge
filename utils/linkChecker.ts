import { APIRequestContext, expect } from '@playwright/test';

export async function expectUrlReturns200(request: APIRequestContext, url: string) {
  const response = await request.get(url, { maxRedirects: 5, timeout: 15_000 });
  expect(response.status(), `Expected 200 for ${url}`).toBe(200);
}
