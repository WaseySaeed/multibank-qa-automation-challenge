import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NavigationPage } from '../pages/NavigationPage';
import { NavigationItem } from '../utils/enums/navigationItems';
import { routes } from '../test-data/routes';

test.describe('Navigation & Layout', () => {
  test.beforeEach(async ({ page }) => {
    await new HomePage(page).open();
  });

  test('top navigation renders with all expected items visible', async ({ page }) => {
    const navigation = new NavigationPage(page);
    await navigation.expectTopNavigationVisible();
  });

  test('each navigation item links to the correct destination', async ({ page }) => {
    const navigation = new NavigationPage(page);

    for (const item of Object.values(NavigationItem)) {
      await test.step(item, async () => {
        await page.goto(routes.home);
        await navigation.expectNavigationLinksResolve(item);
      });
    }
  });
});
