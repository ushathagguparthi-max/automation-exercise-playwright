  class ContactUsPage {
    constructor(page) {
      // Store the current Playwright page.
      this.page = page;

      // Locate the Contact Us link in the website header.
      this.contactUsLink = page.locator('#header a[href="/contact_us"]');

      // Locate the Contact Us page heading.
      this.contactHeading = page.getByRole('heading', {
        name: 'Get In Touch',
        exact: true
      });

      // Locate the name input field.
      this.nameInput = page.locator('input[name="name"]');

      // Locate the email input field.
      this.emailInput = page.locator('input[name="email"]');

      // Locate the subject input field.
      this.subjectInput = page.locator('input[name="subject"]');

      // Locate the message text area.
      this.messageInput = page.locator('textarea[name="message"]');

      // Locate the file upload input.
      this.uploadFileInput = page.locator('input[name="upload_file"]');

      // Locate the Submit button.
      this.submitButton = page.locator('input[name="submit"]');

      // Locate the success message specifically inside the Contact Us form.
      this.successMessage = page.locator('#contact-page').getByText(
        'Success! Your details have been submitted successfully.',
        { exact: true }
      );
    }

    
  // Navigate to the Contact Us page.
  async openContactUsPage() {
    // Open the home page first.
    await this.page.goto('https://automationexercise.com', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Wait for the Contact Us URL while clicking the link.
    await Promise.all([
      this.page.waitForURL('**/contact_us', {
        waitUntil: 'domcontentloaded',
        timeout: 10000
      }),
      this.contactUsLink.click()
    ]);
  }


    // Fill the contact form with supplied test data.
    async fillContactForm(name, email, subject, message) {
      await this.nameInput.fill(name);
      await this.emailInput.fill(email);
      await this.subjectInput.fill(subject);
      await this.messageInput.fill(message);
    }

    // Submit the form and handle the confirmation browser dialog alert window.
    async submitContactForm() {
      // Register the dialog handler before clicking Submit.
      this.page.once('dialog', async dialog => {
        await dialog.accept();
      });

      // Submit the contact form.
      await this.submitButton.click();
    }
  }
          
  // Export the page object for use in test files.
  module.exports = { ContactUsPage };
