const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    // Step one: customer info form
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.errorMessage = page.locator('[data-test="error"]');

    // Step two: order overview
    this.finishButton = page.locator('#finish');
    this.summaryTotalLabel = page.locator('.summary_total_label');

    // Step three: confirmation
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async fillCustomerInfo({ firstName, lastName, postalCode }) {

    if (firstName !== undefined) await this.waitAndFill(this.firstNameInput, firstName);
    if (lastName !== undefined) await this.waitAndFill(this.lastNameInput, lastName);
    if (postalCode !== undefined) await this.waitAndFill(this.postalCodeInput, postalCode);
  }

  async continueToOverview() {
    await this.waitAndClick(this.continueButton);
  }

  async getErrorText() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.textContent();
  }

  async finishOrder() {
    await this.waitAndClick(this.finishButton);
  }

  async getConfirmationText() {
    await this.completeHeader.waitFor({ state: 'visible' });
    return this.completeHeader.textContent();
  }
}

module.exports = { CheckoutPage };
