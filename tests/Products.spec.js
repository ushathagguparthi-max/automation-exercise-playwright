
const { test, expect } = require('@playwright/test');
const { HomePage } = require('./pages/HomePage');
const { ProductsPage } = require('./pages/ProductsPage');

// Open the home page before every test.
test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();
});

// AE-TC-0013: Search with a valid product name.
test('AE-TC-0013 - Search Product with Valid Name', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  await homePage.clickProducts();

  await expect(productsPage.searchInput).toBeVisible();

  await productsPage.searchForProduct('top');

  await expect(productsPage.searchedProductsHeading).toBeVisible();
  await expect(productsPage.productCards.first()).toBeVisible();
  await expect(productsPage.productCards).not.toHaveCount(0);
  await expect(productsPage.productNames.first()).toContainText(/top/i);
});

// AE-TC-0014: Search with no matching product.
test('AE-TC-0014 - Search Product with No Matching Results', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  await homePage.clickProducts();

  await productsPage.searchForProduct('zzzz-no-such-product-98765');

  await expect(productsPage.searchedProductsHeading).toBeVisible();
  await expect(productsPage.productCards).toHaveCount(0);
});

// AE-TC-0016: Verify product details.
test('AE-TC-0016 - Verify Product Details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  await homePage.clickProducts();
  await productsPage.openFirstProductDetails();

  await expect(productsPage.productInformation).toBeVisible();
  await expect(productsPage.productDetailName).toBeVisible();
  await expect(productsPage.productPrice).toBeVisible();
  await expect(productsPage.productCategory).toBeVisible();
  await expect(productsPage.productAvailability).toBeVisible();
  await expect(productsPage.productCondition).toBeVisible();
  await expect(productsPage.productBrand).toBeVisible();
});

// AE-TC-0017: Verify quantity before adding a product to the cart.
test('AE-TC-0017 - Verify Product Quantity in Cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productsPage = new ProductsPage(page);

  await homePage.clickProducts();
  await productsPage.openFirstProductDetails();

  await productsPage.setQuantity(3);

  await expect(productsPage.quantityInput).toHaveValue('3');

  await productsPage.addProductToCart();
  await productsPage.openCartFromPopup();

  await expect(productsPage.cartQuantity).toHaveText('3');
});