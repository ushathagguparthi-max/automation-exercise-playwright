// POM class for the login page.
class LoginPage {
  constructor(page) {
    this.page = page;

    this.signupLoginLink = page.locator('a[href="/login"]');

    this.loginHeading = page.getByRole('heading', {name: 'Login to your account',exact: true});

    this.emailInput = page.locator('input[data-qa="login-email"]');

    this.passwordInput = page.locator('input[data-qa="login-password"]');

    this.loginButton = page.locator('button[data-qa="login-button"]');

    this.loginError = page.getByText('Your email or password is incorrect!',{ exact: true });

    this.loggedInMessage = page.getByText(/Logged in as/i);
  }

  async openLoginPage() {
    await this.page.goto('https://automationexercise.com/', {
      waitUntil: 'load'
    });
    await this.signupLoginLink.click();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };