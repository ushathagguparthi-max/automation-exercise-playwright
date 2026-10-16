
const { test, expect } = require('@playwright/test');
const { ContactUsPage } = require('./pages/ContactUsPage');

test.beforeEach(async ({ page }) => {
  const contactPage = new ContactUsPage(page);
  await contactPage.openContactUsPage();

  // Confirm that the form is ready for testing.
  await expect(contactPage.contactHeading).toBeVisible();
});

// AE-TC-0008: Submit an empty contact form.
test('AE-TC-0008 - Submit Empty Contact Form', async ({ page }) => {
  const contactPage = new ContactUsPage(page);

  // Attempt to submit without entering any information.
  await contactPage.submitButton.click();

  // Verify that the form has not shown a success message.
  await expect(contactPage.successMessage).toHaveCount(0);

  // Verify that the Contact Us page remains open.
  await expect(page).toHaveURL(/\/contact_us/);
});

// AE-TC-0009: Fill the form and handle the confirmation dialog.
test('AE-TC-0009 - Submit Completed Contact Form', async ({ page }) => {
  const contactPage = new ContactUsPage(page);

  // Fill all required contact form fields.
  await contactPage.fillContactForm(
    'Automation Test User',
    'contact-test@example.com',
    'Playwright Contact Test',
    'Testing the Contact Us form with Playwright.'
  );

  // Register the dialog handler and submit the form.
  await contactPage.submitContactForm();

  // Verify that the success message appears.
  await expect(contactPage.successMessage).toBeVisible();
});

// AE-TC-0010: Submit the form with a synthetic email address.
test('AE-TC-0010 - Submit Contact Form with Synthetic Email', async ({ page }) => {
  const contactPage = new ContactUsPage(page);

  // Use a reserved example-domain email address for testing.
  await contactPage.fillContactForm(
    'Synthetic Test User',
    'synthetic-user@example.com',
    'Synthetic Email Validation',
    'This is a test submission using synthetic data.'
  );

  // Submit the form and handle the confirmation dialog.
  await contactPage.submitContactForm();

  // Verify that the website accepts the completed form.
  await expect(contactPage.successMessage).toBeVisible();
});
