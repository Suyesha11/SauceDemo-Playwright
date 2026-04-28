import { defineConfig, devices } from "@playwright/test";

// Environment flags — set by CI or local commands
const CI = !!process.env.CI;                      // true in any CI environment
const RUN_UI = process.env.RUN_UI !== 'false';    // UI tests run by default unless explicitly disabled
const RUN_API = process.env.RUN_API !== 'false';  // API tests run by default unless explicitly disabled

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: CI, // Fail build if test.only is committed
  retries: CI ? 2 : 0, // Retry flaky tests in CI only
  workers: CI ? 2 : undefined, // Limit parallelism in CI to avoid resource issues
  reporter: CI ? [['html'], ['github']] : 'list',
  
  timeout: 30_000, // ⏱ total test timeout (optional)

  use: {
    trace: "on-first-retry",
    screenshot:"only-on-failure",
    video:CI ? 'retain-on-failure' : "off",
  },

  /* Configure projects for major browsers */
  projects: [

    // UI tests — only run when UI project is enabled
    ...(RUN_UI ? [{
      name: 'ui-tests',
      testDir: './tests/UI',
      use: {
        baseURL: 'https://www.saucedemo.com',
        ...devices['Desktop Chrome'],
      },
    }] : []),

    // API tests — always run when API project is enabled
    ...(RUN_API ? [{
      name: 'api-tests',
      testDir: './tests/API',
      use: {
        baseURL: 'https://dummyjson.com',
        extraHTTPHeaders: { 'Content-Type': 'application/json' },
      },
    }] : []),
    

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
