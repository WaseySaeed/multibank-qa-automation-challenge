import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { routes } from '../test-data/routes';
import { whyMultiBankContent } from '../test-data/expected-content';
import { NavigationItem } from '../utils/enums/navigationItems';

export class CompanyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(){
    await this.goto(routes.company);
  }

  async openWhyMultiBankViaNav(){
    await this.goto(routes.home);
    await this.page
      .getByRole('navigation')
      .getByRole('link', { name: NavigationItem.COMPANY, exact: true })
      .first()
      .click();
    await expect(this.page.getByRole('heading', { name: whyMultiBankContent.pageHeading }).first()).toBeVisible({
      timeout: 15_000,
    });
  }

  async expectWhyMultiBankContent(){
    await expect(this.page.getByRole('heading', { name: whyMultiBankContent.pageHeading }).first()).toBeVisible();

    for (const phrase of whyMultiBankContent.subText) {
      await expect(this.page.getByText(phrase).first()).toBeVisible();
    }

    for (const section of whyMultiBankContent.sections) {
      await expect(this.page.getByRole('heading', { name: section.heading }).first()).toBeVisible();
      await expect(this.page.getByText(section.text).first()).toBeVisible();
    }

    for (const card of whyMultiBankContent.strengthCards) {
      await expect(this.page.getByText(card).first()).toBeVisible();
    }

    for (const stat of whyMultiBankContent.stats) {
      await expect(this.page.getByText(stat).first()).toBeVisible();
    }
  }
}
