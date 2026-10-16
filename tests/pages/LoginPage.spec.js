
const { test, expect } = require('@playwright/test');

require('dotenv').config();

const { LoginPage } = require('../pages/LoginPage');

test.describe('SC-AUTH-01 - Login, Logout & Session', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await expect(loginPage.loginHeading).toBeVisible();
  });

  test('AE-TC-0021 - Login with Valid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    test.skip(
      !process.env.AE_TEST_EMAIL || !process.env.AE_TEST_PASSWORD,
      'Set AE_TEST_EMAIL and AE_TEST_PASSWORD in .env'
    );

    await loginPage.login( process.env.AE_TEST_EMAIL,process.env.AE_TEST_PASSWORD
    );

    await expect(loginPage.loggedInMessage).toBeVisible();
  });

  test('AE-TC-0022 - Login with Incorrect Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    test.skip(
      !process.env.AE_TEST_EMAIL,
      'Set a registered AE_TEST_EMAIL in .env'
    );

    await loginPage.login(process.env.AE_TEST_EMAIL,'WrongPassword_123!');

    await expect(loginPage.loginError).toBeVisible();

    await expect(loginPage.loggedInMessage).toHaveCount(0);
  });

  test('AE-TC-0023 - Login with Unregistered Email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('unregistered-automation-user@example.com','WrongPassword_123!');

    await expect(loginPage.loginError).toBeVisible();

    await expect(loginPage.loggedInMessage).toHaveCount(0);
  });

  test('AE-TC-0024 - Login with Empty Fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.loginButton.click();

    await expect(loginPage.loginHeading).toBeVisible();

    await expect(loginPage.loggedInMessage).toHaveCount(0);
  });
});
