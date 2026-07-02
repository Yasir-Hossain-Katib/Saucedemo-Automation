const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

   async getCartItemNames() {
    return this.cartItems.locator('.inventory_item_name').allTextContents();
  }

  async getCartItemCount() {
    return this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.waitAndClick(this.checkoutButton);
  }
}

module.exports = { CartPage };