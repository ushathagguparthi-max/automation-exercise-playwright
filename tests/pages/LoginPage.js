
class LoginPage {
  constructor(page) {
    this.page = page;

    // Navigation link
    this.signupLoginLink = page.locator('a[href="/login"]');

    // Login page heading
    this.loginHeading = page.getByRole('heading', {
      name: 'Login to your account',
      exact: true
    });

    // Login form fields
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');

    // Login messages
    this.loginError = page.getByText(
      'Your email or password is incorrect!',
      { exact: true }
    );

    this.loggedInMessage = page.getByText(/Logged in as/i);
  }

  // Open the login page
  async openLoginPage() {
    await this.page.goto('https://automationexercise.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    await this.signupLoginLink.click();
  }

  // Enter credentials and submit the login form
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
