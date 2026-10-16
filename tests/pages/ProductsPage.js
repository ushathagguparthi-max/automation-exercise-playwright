
class ProductsPage {
  constructor(page) {
    // Store the Playwright page.
    this.page = page;

    // Product search locators.
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');

this.searchedProductsHeading = page.getByRole('heading', {
  name: /searched products/i
});
    // Product listing locators.
    this.productCards = page.locator(
      '.features_items .product-image-wrapper'
    );

    this.productNames = page.locator(
      '.features_items .productinfo p'
    );

    // Link to open product details.
    this.firstViewProductLink = page.locator('.features_items a[href*="/product_details/"]').first();//view product of first product 

    // Product details locators.
    this.productInformation = page.locator('.product-information');
    this.productDetailName = this.productInformation.locator('h2');

    this.productPrice = this.productInformation.locator('span span');

    this.productCategory = this.productInformation.locator('p').filter({ hasText: 'Category:' });

    this.productAvailability = this.productInformation.locator('p').filter({ hasText: 'Availability:' });

    this.productCondition = this.productInformation.locator('p').filter({ hasText: 'Condition:' });

    this.productBrand = this.productInformation.locator('p').filter({ hasText: 'Brand:' });

    // Quantity and Add to Cart locators.
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button.cart');

    // Add-to-cart popup locators.
    this.viewCartPopupLink = page.locator('#cartModal').getByRole('link', {name: 'View Cart',exact: true});

    // Quantity displayed in the cart.
    this.cartQuantity = page.locator('#cart_info_table .cart_quantity button');
  }

  // Search for a product.
  async searchForProduct(productName) {await this.searchInput.fill(productName);
  await this.searchButton.click();
  }

  // Open the first product's details.
  async openFirstProductDetails() {
    await Promise.all([
      this.page.waitForURL(/\/product_details\/\d+/),
      this.firstViewProductLink.click()
    ]);
  }

  // Set the requested product quantity.
  async setQuantity(quantity) {
    await this.quantityInput.fill(String(quantity));
  }

  // Add the product to the cart.
  async addProductToCart() {
    await this.addToCartButton.click();

    await this.viewCartPopupLink.waitFor({
      state: 'visible'
    });
  }

  
async openCartFromPopup() {
  await Promise.all([
    this.page.waitForURL('**/view_cart', {
      waitUntil: 'domcontentloaded',
      timeout: 10000
    }),
    this.viewCartPopupLink.click()
  ]);
}

}

// Export the class.
module.exports = { ProductsPage };