
const { test, expect } = require('@playwright/test');
const { ContactUsPage } = require('./pages/ContactUsPage');

test.beforeEach(async ({ page }) => {
  const contactPage = new ContactUsPage(page);
  await contactPage.openContactUsPage();

  await expect(contactPage.contactHeading).toBeVisible();
});

test('AE-TC-0008 - Submit Empty Contact Form', async ({ page }) => {
  const contactPage = new ContactUsPage(page);

  await contactPage.submitButton.click();

  await expect(contactPage.successMessage).toHaveCount(0);

  await expect(page).toHaveURL(/\/contact_us/);
});

test('AE-TC-0009 - Submit Completed Contact Form', async ({ page }) => {
  const contactPage = new ContactUsPage(page);

  // Fill all required contact form fields.
  await contactPage.fillContactForm(
    'Automation Test User',
    'contact-test@example.com',
    'Playwright Contact Test',
    'Testing the Contact Us form with Playwright.'
  );

  await contactPage.submitContactForm();

  await expect(contactPage.successMessage).toBeVisible();
});

test('AE-TC-0010 - Submit Contact Form with Synthetic Email', async ({ page }) => {
  const contactPage = new ContactUsPage(page);

  await contactPage.fillContactForm(
    'Synthetic Test User',
    'synthetic-user@example.com',
    'Synthetic Email Validation',
    'This is a test submission using synthetic data.'
  );
  await contactPage.submitContactForm();
  await expect(contactPage.successMessage).toBeVisible();
});
