// POM class for the login page.
class LoginPage {
  constructor(page) {
    // Store the Playwright page for use in this class.
    this.page = page;

    // Locate the Signup / Login link on the home page.
    this.signupLoginLink = page.locator('a[href="/login"]');

    // Locate the heading shown on the login page.
    this.loginHeading = page.getByRole('heading', {name: 'Login to your account',exact: true});

    // Locate the login email input using its data-qa attribute.
    this.emailInput = page.locator('input[data-qa="login-email"]');

    // Locate the login password input.
    this.passwordInput = page.locator('input[data-qa="login-password"]');

    // Locate the Login button.
    this.loginButton = page.locator('button[data-qa="login-button"]');

    // Locate the error shown for incorrect login credentials.
    this.loginError = page.getByText('Your email or password is incorrect!',{ exact: true });

    // Locate the logged-in user indicator.
    this.loggedInMessage = page.getByText(/Logged in as/i);
  }

  // Open the home page and navigate to Signup / Login.
  async openLoginPage() {
    await this.page.goto('https://automationexercise.com/', {
      waitUntil: 'load'
    });
    await this.signupLoginLink.click();
  }

  // Enter credentials and submit the login form.
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

// Export the class so the spec file can import it.
module.exports = { LoginPage };