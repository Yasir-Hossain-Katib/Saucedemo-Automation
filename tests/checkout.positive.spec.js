const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { validUser, product, customerInfo } = require('../fixtures/testData');

test.describe('Checkout flow - Positive Test Case', () => {
  test('user can log in, add a product, and complete checkout with order confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    //  Login
    await loginPage.open();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    //  Add product to cart
    await inventoryPage.addProductToCart(product);
    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe(1);
    await expect(page.locator('#remove-sauce-labs-backpack')).toBeVisible(); 

    //  Go to cart and verify the correct item is there
    await inventoryPage.goToCart();
    const itemNames = await cartPage.getCartItemNames();
    expect(itemNames).toContain(product);
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    //  Proceed through checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo(customerInfo);
    await checkoutPage.continueToOverview();

    // Sanity check we actually reached the overview screen with a total
    await expect(checkoutPage.summaryTotalLabel).toBeVisible();
    const totalText = await checkoutPage.summaryTotalLabel.textContent();
    expect(totalText).toMatch(/Total: \$\d+\.\d{2}/);

    await checkoutPage.finishOrder();

    //  Verify order confirmation
    const confirmationText = await checkoutPage.getConfirmationText();
    expect(confirmationText).toBe('Thank you for your order!');
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    
    //Cart should be empty after order completion
    const finalCartCount = await inventoryPage.getCartCount();
    expect(finalCartCount).toBe(0);
  });
});
