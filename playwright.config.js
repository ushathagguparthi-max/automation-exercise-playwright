
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  fullyParallel: true,

  retries: 1,

  workers: 2,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    screenshot: 'only-on-failure',

    trace: 'on-first-retry',

    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
