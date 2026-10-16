
class HomePage {
  constructor(page) {
    this.page = page;

    this.header = page.locator('#header');

this.homeLink = page.locator('#header').getByRole('link', { name: 'Home' });
    this.productsLink = this.header.locator('a[href="/products"]');

    this.cartLink = this.header.locator('a[href="/view_cart"]');

    this.signupLoginLink = this.header.locator('a[href="/login"]');

    this.testCasesLink = this.header.locator('a[href="/test_cases"]');

    this.apiTestingLink = this.header.locator('a[href="/api_list"]');

    this.contactUsLink = this.header.locator('a[href="/contact_us"]');
    this.homeHeading = page.getByText('Full-Fledged practice website for Automation Engineers',{ exact: true }).first();

    this.productListing = page.locator('.features_items');
    this.productCards = this.productListing.locator('.product-image-wrapper' );
    
    this.firstProductAddToCart = this.productCards.first().locator('.productinfo a.add-to-cart');

    this.emptyCartMessage = page.getByText(/Cart is empty! Click here to buy products/i);


    this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping',exact: true});

    this.viewCartPopupLink = page.locator('#cartModal').getByRole('link', {name: 'View Cart',xact: true });

    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = page.locator('#cart_info_table tbody tr');

    this.firstCartRow = this.cartRows.first();

    this.removeFirstProductButton = this.firstCartRow.locator(
      'a.cart_quantity_delete'
    );
  }

  async open() {
  await this.page.goto('https://automationexercise.com/', {waitUntil: 'domcontentloaded',timeout: 30000
  });
}

  async clickProducts() {
  await this.productsLink.click();

  await this.page.waitForURL('**/products', {
    waitUntil: 'domcontentloaded',
    timeout: 10000
  });

}

  async clickCart() {
    await Promise.all([
      this.page.waitForURL(/\/view_cart/,{ waitUntil: 'domcontentloaded' }),
      this.cartLink.click()
    ]);
  }

  async addFirstProductToCart() {
    await this.firstProductAddToCart.click();

    await this.viewCartPopupLink.waitFor({
      state: 'visible'
    });
  }

  async openCartFromPopup() { 
  await Promise.all([
    this.page.waitForURL(/\/view_cart/, {
      waitUntil: 'domcontentloaded'
    }),
    this.viewCartPopupLink.click()
  ]);
}

  async removeFirstProductFromCart() {
    await this.removeFirstProductButton.click();
  }
  async clickContinueShopping() {
    await this.continueShoppingButton.click();
}
}

module.exports = { HomePage };
