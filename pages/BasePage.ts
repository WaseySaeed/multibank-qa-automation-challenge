import { Page } from '@playwright/test';
import { routes } from '../test-data/routes';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = routes.home): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }
}
