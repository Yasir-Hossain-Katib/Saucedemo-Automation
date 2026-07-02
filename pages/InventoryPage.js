const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartQuantity = page.locator('.shopping_cart_badge');
    this.inventoryItem = page.locator('.inventory_item');
  }

  productAddToCartButton(productName) {
    const slug = productName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    return this.page.locator(`#add-to-cart-${slug}`);
  }

  async addProductToCart(productName) {
    const button = this.productAddToCartButton(productName);
    await this.waitAndClick(button);
  }

  async getCartCount() {
    
    if (await this.cartQuantity.count() === 0) return 0;
    const text = await this.cartQuantity.textContent();
    return Number(text);
  }

  async goToCart() {
    await this.waitAndClick(this.cartIcon);
  }
}

module.exports = { InventoryPage };
