import { test, expect } from '@playwright/test';

test.describe('Basic Auth Page', () => {
  test.use({
    baseURL: 'https://the-internet.herokuapp.com',
    httpCredentials: { username: 'admin', password: 'admin' },
  });

  test('User sees authorized content', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Basic Auth' }).click();
    await expect(page.locator('html')).not.toContainText('Not authorized');
  });

  test('User cannot log in with wrong credentials', async ({ page, context }) => {
    // For a negative test, create a separate context without credentials:
    const browser = context.browser();
    if (!browser) throw new Error('Browser instance is null');
    const badContext = await browser.newContext({
      baseURL: 'https://the-internet.herokuapp.com',
      httpCredentials: { username: 'bad', password: 'bad' },
    });
    const badPage = await badContext.newPage();
    await badPage.goto('/');
    await badPage.getByRole('link', { name: 'Basic Auth' }).click();
    await expect(badPage.locator('html')).toContainText('Not authorized');
    await badContext.close();
  });
});
