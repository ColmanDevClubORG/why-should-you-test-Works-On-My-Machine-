import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test('should navigate to about, back to home, and complete registration', async ({
    page,
  }) => {
    await page.goto('/');
    await page.click('text=About');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About This Project');

    await page.click('text=Home');
    await expect(page).toHaveURL('/');

    await page.fill('label:has-text("Username")', 'tamir_test');
    await page.fill('label:has-text("Email")', 'test@example.com');
    await page.fill('label:has-text("Password")', 'password123');

    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Success! User tamir_test registered');
      await dialog.accept();
    });

    await page.click('button:has-text("Create Account")');
  });
});
