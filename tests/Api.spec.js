
const { test, expect } = require('@playwright/test');

// AE-TC-0015: Verify Products API Response
test('AE-TC-0015 - Verify Products API Response', async ({ request }) => {

  const response = await request.get(
    'https://automationexercise.com/api/productsList'
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.responseCode).toBe(200);
  expect(Array.isArray(responseBody.products)).toBe(true);
  expect(responseBody.products.length).toBeGreaterThan(0);

  // 1. Validate every returned product
  for (const product of responseBody.products) {
    expect(product.id).toBeDefined();
    expect(typeof product.name).toBe('string');
    expect(product.name.length).toBeGreaterThan(0);
    expect(typeof product.price).toBe('string');
    expect(typeof product.brand).toBe('string');
    expect(product.category).toBeDefined();
  }
});


// AE-TC-0016: Negative testing - unsupported HTTP method
test('AE-TC-0016 - Verify Unsupported Products API Method', async ({ request }) => {

  const response = await request.post(
    'https://automationexercise.com/api/productsList'
  );

  const responseBody = await response.json();

  // The API may return HTTP 200 with an application-level error code
  expect(response.status()).toBe(200);
  expect(responseBody.responseCode).toBe(405);
  expect(responseBody.message).toBe(
    'This request method is not supported.'
  );
});


// AE-TC-0017: Error handling - invalid API endpoint
test('AE-TC-0017 - Verify Invalid API Endpoint Response', async ({ request }) => {

  const response = await request.get(
    'https://automationexercise.com/api/invalidEndpoint'
  );

  // Verify that the invalid endpoint does not return success
  expect(response.status()).not.toBe(200);
});
