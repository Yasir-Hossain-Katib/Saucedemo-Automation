const { BasePage } = require('./BasePage');


class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open() {
    await this.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {
    await this.waitAndFill(this.usernameInput, username);
    await this.waitAndFill(this.passwordInput, password);
    await this.waitAndClick(this.loginButton);
  }

  async getErrorText() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };
