
const { test, expect } = require('@playwright/test');

test('AE-TC-0015 - Verify Products API Response', async ({ request }) => {

  const response = await request.get(
    'https://automationexercise.com/api/productsList'
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.responseCode).toBe(200);
  expect(Array.isArray(responseBody.products)).toBe(true);
  expect(responseBody.products.length).toBeGreaterThan(0);

  for (const product of responseBody.products) {
    expect(product.id).toBeDefined();
    expect(typeof product.name).toBe('string');
    expect(product.name.length).toBeGreaterThan(0);
    expect(typeof product.price).toBe('string');
    expect(typeof product.brand).toBe('string');
    expect(product.category).toBeDefined();
  }
});

test('AE-TC-0016 - Verify Unsupported Products API Method', async ({ request }) => {

  const response = await request.post(
    'https://automationexercise.com/api/productsList'
  );

  const responseBody = await response.json();

  expect(response.status()).toBe(200);
  expect(responseBody.responseCode).toBe(405);
  expect(responseBody.message).toBe(
    'This request method is not supported.'
  );
});

test('AE-TC-0017 - Verify Invalid API Endpoint Response', async ({ request }) => {

  const response = await request.get(
    'https://automationexercise.com/api/invalidEndpoint'
  );

  expect(response.status()).not.toBe(200);
});
