const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { validUser, product, customerInfo } = require('../fixtures/testData');

test.describe('Checkout flow - Negative Test Case', () => {
  test('Checkout blocks progress when postal code is missing', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.open();
    await loginPage.login(validUser.username, validUser.password);

    await inventoryPage.addProductToCart(product);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    
    await checkoutPage.fillCustomerInfo({
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
    });
    await checkoutPage.continueToOverview();

    const errorText = await checkoutPage.getErrorText();
    expect(errorText).toBe('Error: Postal Code is required');

    
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    
  });
});