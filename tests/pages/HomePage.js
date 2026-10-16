
class HomePage {
  constructor(page) {
    // Store the current Playwright page.
    this.page = page;

    // Locate the website header.
    this.header = page.locator('#header');

    // Locate the Home navigation link.
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
    
    // Locate the Add to Cart button inside the first product card.
    this.firstProductAddToCart = this.productCards.first().locator('.productinfo a.add-to-cart');

    this.emptyCartMessage = page.getByText(/Cart is empty! Click here to buy products/i);


    // Locate the Continue Shopping button in the popup.  
    this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping',exact: true});

    // Locate the View Cart link inside the add-to-cart popup.
    this.viewCartPopupLink = page.locator('#cartModal').getByRole('link', {name: 'View Cart',xact: true });

    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = page.locator('#cart_info_table tbody tr');

    // Locate the first product row in the cart.
    this.firstCartRow = this.cartRows.first();

    // Locate the Remove button for the first product.
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

  // Click Cart and wait for the cart page URL.
  async clickCart() {
    await Promise.all([
      this.page.waitForURL(/\/view_cart/,{ waitUntil: 'domcontentloaded' }),
      this.cartLink.click()
    ]);
  }

  // Add the first product to the cart.
  async addFirstProductToCart() {
    await this.firstProductAddToCart.click();

    // Wait for the View Cart link in the popup.
    await this.viewCartPopupLink.waitFor({
      state: 'visible'
    });
  }

  async openCartFromPopup() { ///Open the cart from the popup
  await Promise.all([
    this.page.waitForURL(/\/view_cart/, {
      waitUntil: 'domcontentloaded'
    }),
    this.viewCartPopupLink.click()
  ]);
}

  // Remove the first product from the cart.
  async removeFirstProductFromCart() {
    await this.removeFirstProductButton.click();
  }
  async clickContinueShopping() {
    await this.continueShoppingButton.click();
}
}

// Export the HomePage class for use in test files.
module.exports = { HomePage };
