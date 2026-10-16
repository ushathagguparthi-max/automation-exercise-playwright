  class ContactUsPage {
    constructor(page) {
      this.page = page;

      this.contactUsLink = page.locator('#header a[href="/contact_us"]');

      this.contactHeading = page.getByRole('heading', {
        name: 'Get In Touch',
        exact: true
      });

      this.nameInput = page.locator('input[name="name"]');

      this.emailInput = page.locator('input[name="email"]');

      this.subjectInput = page.locator('input[name="subject"]');

      this.messageInput = page.locator('textarea[name="message"]');

      this.uploadFileInput = page.locator('input[name="upload_file"]');

      this.submitButton = page.locator('input[name="submit"]');

      this.successMessage = page.locator('#contact-page').getByText(
        'Success! Your details have been submitted successfully.',
        { exact: true }
      );
    }

    
  async openContactUsPage() {
    await this.page.goto('https://automationexercise.com', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    await Promise.all([
      this.page.waitForURL('**/contact_us', {
        waitUntil: 'domcontentloaded',
        timeout: 10000
      }),
      this.contactUsLink.click()
    ]);
  }


    async fillContactForm(name, email, subject, message) {
      await this.nameInput.fill(name);
      await this.emailInput.fill(email);
      await this.subjectInput.fill(subject);
      await this.messageInput.fill(message);
    }

    async submitContactForm() {
      this.page.once('dialog', async dialog => {
        await dialog.accept();
      });

      await this.submitButton.click();
    }
  }
          
  module.exports = { ContactUsPage };
