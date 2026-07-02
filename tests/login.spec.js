const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { validUser } = require('../fixtures/testData');


test('valid credentials log the user in', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(validUser.username, validUser.password);

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

 