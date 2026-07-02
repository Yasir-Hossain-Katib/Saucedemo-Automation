const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  async proceedToCheckout() {
    await this.waitAndClick(this.checkoutButton);
  }
}

module.exports = { CartPage };