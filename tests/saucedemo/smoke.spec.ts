import { test, expect } from '@playwright/test';

/**
 * Smoke Tests for SauceDemo
 *
 * Basic tests to verify the application is accessible.
 */

test.describe('SauceDemo Smoke Tests', () => {
  test('should load login page', async ({ page, baseURL }) => {
    await page.goto('/');

    // Verify we're on the correct site
    await expect(page).toHaveURL(baseURL + '/');

    // Verify login form is present
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
