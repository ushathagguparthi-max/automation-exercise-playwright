
const { test, expect } = require('@playwright/test');
const { HomePage } = require('./HomePage');


test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.open();  
});

test('AE-TC-0001 - Verify Home Page Opens', async ({ page }) => {
  const homePage = new HomePage(page);

  await expect(page).toHaveURL(/automationexercise\.com/);
  await expect(homePage.header).toBeVisible();
  await expect(homePage.productsLink).toBeVisible();
  await expect(homePage.homeHeading).toBeVisible();
});

test('AE-TC-0002 - Verify Browser Tab Title', async ({ page }) => {
  await expect(page).toHaveTitle(/Automation Exercise/i);
});

test('AE-TC-0003 - Verify Primary Navigation Links Are Visible', async ({ page }) => {
  const homePage = new HomePage(page);

  await expect(homePage.header).toBeVisible();
  await expect(homePage.homeLink).toBeVisible();
  await expect(homePage.productsLink).toBeVisible();
  await expect(homePage.cartLink).toBeVisible();
  await expect(homePage.signupLoginLink).toBeVisible();
  await expect(homePage.testCasesLink).toBeVisible();
  await expect(homePage.apiTestingLink).toBeVisible();
  await expect(homePage.contactUsLink).toBeVisible();
});

test('AE-TC-0004 - Verify Products Navigation Opens Product Listing', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.clickProducts();

  await expect(page).toHaveURL(/\/products$/);
  await expect(homePage.productListing).toBeVisible();
  await expect(homePage.productCards.first()).toBeVisible();
  await expect(homePage.productCards).not.toHaveCount(0);
});

test('AE-TC-0005 - Verify Cart Navigation Opens Cart Page', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.clickCart();

  await expect(page).toHaveURL(/\/view_cart$/);
  await expect(page.locator('#cart_items')).toBeVisible();
});

test('AE-TC-0006 - Add Product and Verify Item in Cart', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.addFirstProductToCart();
  await homePage.openCartFromPopup();

  await expect(page).toHaveURL(/\/view_cart/);
  await expect(homePage.cartRows).toHaveCount(1);
  await expect(homePage.firstCartRow.locator('.cart_description')).toBeVisible();
  await expect(homePage.firstCartRow.locator('.cart_price')).toBeVisible();
  await expect(homePage.firstCartRow.locator('.cart_quantity')).toBeVisible();
  await expect(homePage.firstCartRow.locator('.cart_total')).toBeVisible();
});

test('AE-TC-0007 - Remove Product from Cart', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.addFirstProductToCart();
  await homePage.openCartFromPopup();

  await expect(homePage.cartRows).toHaveCount(1);

  await homePage.removeFirstProductFromCart();

  await expect(homePage.cartRows).toHaveCount(0);
});

test('AE-TC-0011 - Verify Desktop and Mobile Viewports', async ({ page }) => {
  const homePage = new HomePage(page);

  await page.setViewportSize({ width: 1366, height: 768 });

  await expect(homePage.header).toBeVisible();
  await expect(homePage.productsLink).toBeVisible();
  await expect(homePage.contactUsLink).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });

  await expect(homePage.header).toBeVisible();

  await expect(homePage.productsLink).toBeVisible();
  await expect(homePage.contactUsLink).toBeVisible();
});
