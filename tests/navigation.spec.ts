import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to the about page', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Works On My Machine/);
    await expect(page.locator('h1')).toContainText('Works On My Machine');

    await page.click('text=About');

    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About This Project');
  });

  test('should navigate back to home from about page', async ({ page }) => {
    await page.goto('/about');

    await page.click('text=Home');

    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Works On My Machine');
  });
});
