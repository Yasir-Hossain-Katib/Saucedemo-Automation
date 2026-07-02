class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async getTitle() {
    return this.page.title();
  }

  async waitForVisible(locator) {
    await this.locator(locator).waitFor({ state: 'visible' });
  }

  async waitAndClick(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async waitAndFill(locator, text) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }
}

module.exports = { BasePage };
