
class ProductsPage {
  constructor(page) {
    this.page = page;

    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');

    this.searchedProductsHeading = page.getByRole('heading', {
      name: /searched products/i
    });
    this.productCards = page.locator(
      '.features_items .product-image-wrapper'
    );

    this.productNames = page.locator(
      '.features_items .productinfo p'
    );

    this.firstViewProductLink = page.locator('.features_items a[href*="/product_details/"]').first();//view product of first product 

    this.productInformation = page.locator('.product-information');
    this.productDetailName = this.productInformation.locator('h2');

    this.productPrice = this.productInformation.locator('span span');

    this.productCategory = this.productInformation.locator('p').filter({ hasText: 'Category:' });

    this.productAvailability = this.productInformation.locator('p').filter({ hasText: 'Availability:' });

    this.productCondition = this.productInformation.locator('p').filter({ hasText: 'Condition:' });

    this.productBrand = this.productInformation.locator('p').filter({ hasText: 'Brand:' });

    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button.cart');

    this.viewCartPopupLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart', exact: true });

    this.cartQuantity = page.locator('#cart_info_table .cart_quantity button');
  }

  async searchForProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async openFirstProductDetails() {
    await Promise.all([
      this.page.waitForURL(/\/product_details\/\d+/),
      this.firstViewProductLink.click()
    ]);
  }

  async setQuantity(quantity) {
    await this.quantityInput.fill(String(quantity));
  }

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

module.exports = { ProductsPage };