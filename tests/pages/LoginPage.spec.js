
const { test, expect } = require('@playwright/test');

// Load values from the project's .env file.
require('dotenv').config();

// Import the LoginPage POM class.
const { LoginPage } = require('../pages/LoginPage');

// Group tests under the authentication scenario.
test.describe('SC-AUTH-01 - Login, Logout & Session', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await expect(loginPage.loginHeading).toBeVisible();
  });

  // AE-TC-0021: Login with valid credentials.
  test('AE-TC-0021 - Login with Valid Credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Skip if the required credentials are not configured. 
    test.skip(
      !process.env.AE_TEST_EMAIL || !process.env.AE_TEST_PASSWORD,
      'Set AE_TEST_EMAIL and AE_TEST_PASSWORD in .env'
    );

    // Log in using the registered test account.
    await loginPage.login( process.env.AE_TEST_EMAIL,process.env.AE_TEST_PASSWORD
    );

    // Verify that the logged-in user indicator is visible.
    await expect(loginPage.loggedInMessage).toBeVisible();
  });

  // AE-TC-0022: Registered email with an incorrect password.
  test('AE-TC-0022 - Login with Incorrect Password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Skip if no registered test email is configured.
    test.skip(
      !process.env.AE_TEST_EMAIL,
      'Set a registered AE_TEST_EMAIL in .env'
    );

    // Submit the registered email with an incorrect password.
    await loginPage.login(process.env.AE_TEST_EMAIL,'WrongPassword_123!');

    // Verify that the invalid-credentials message appears.
    await expect(loginPage.loginError).toBeVisible();

    // Verify that the user is not logged in.
    await expect(loginPage.loggedInMessage).toHaveCount(0);
  });

  // AE-TC-0023: Email address that is not registered.
  test('AE-TC-0023 - Login with Unregistered Email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Submit an email that should not belong to a registered account.
    await loginPage.login('unregistered-automation-user@example.com','WrongPassword_123!');

    // Verify that the invalid-credentials message appears.
    await expect(loginPage.loginError).toBeVisible();

    // Verify that the user is not logged in.
    await expect(loginPage.loggedInMessage).toHaveCount(0);
  });

  // AE-TC-0024: Submit the login form with both fields empty.
  test('AE-TC-0024 - Login with Empty Fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Click Login without entering email or password.
    await loginPage.loginButton.click();

    // Verify that the login form remains visible.
    await expect(loginPage.loginHeading).toBeVisible();

    // Verify that the user is not logged in.
    await expect(loginPage.loggedInMessage).toHaveCount(0);
  });
});
