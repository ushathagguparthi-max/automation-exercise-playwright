
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Tell Playwright where the test files are stored.
  testDir: './tests',

  // Prevent accidental test duplication from running simultaneously.
  fullyParallel: true,

  // Allow one retry when a test fails.
  retries: 1,

  // Use a manageable worker count while learning and debugging.
  workers: 2,

  // Configure test reports.
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  // Common settings for browser tests.
  use: {
    // Record a screenshot automatically when a test fails.
    screenshot: 'only-on-failure',

    // Keep a trace when a test fails and is retried.
    trace: 'on-first-retry',

    // Record a video only when a test fails.
    video: 'retain-on-failure'
  },

  // Run browser tests in Chromium.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
