import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration
 *
 * Using Playwright's built-in "projects" feature to manage multiple services.
 * Each service gets its own project configuration with isolated test directory and base URL.
 *
 * Run specific service: npx playwright test --project=saucedemo-*
 * Run all services: npx playwright test
 */

// Service configurations
const services = {
  saucedemo: {
    testDir: './tests/saucedemo',
    baseURL: 'https://www.saucedemo.com',
  },
  // Add more services here as needed
  // service2: {
  //   testDir: './tests/service2',
  //   baseURL: 'https://example.com',
  // },
};

// Browser configurations
const browsers = [
  { name: 'chromium', device: devices['Desktop Chrome'] },
  { name: 'firefox', device: devices['Desktop Firefox'] },
  { name: 'webkit', device: devices['Desktop Safari'] },
];

// Generate projects for each service × browser combination
const projects = Object.entries(services).flatMap(([serviceName, serviceConfig]) =>
  browsers.map((browser) => ({
    name: `${serviceName}-${browser.name}`,
    testDir: serviceConfig.testDir,
    use: {
      ...browser.device,
      baseURL: serviceConfig.baseURL,
    },
  }))
);

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video on failure */
    video: 'retain-on-failure',

    /* Timeout for each action */
    actionTimeout: 10000,
  },

  /* Timeout for each test */
  timeout: 30000,

  /* Expect timeout */
  expect: {
    timeout: 5000,
  },

  /* Projects generated from services × browsers */
  projects,
});
