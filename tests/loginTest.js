const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/loginPage');
const takeScreenshot = require('../utils/takeScreenshot');
const assert = require('assert');

//Scenario A. User should login with valid credentials
describe('Login', function () {
    let driver;
    let loginPage;

    before(async function () {
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
        loginPage = new LoginPage(driver);
        await driver.get('https://www.saucedemo.com/');
    });

    after(async function () {
        await driver.quit();
    });

    it('User should login with valid credentials', async function () {
        await loginPage.login('standard_user', 'secret_sauce');
        await takeScreenshot(driver, 'login_success.png');

        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'https://www.saucedemo.com/inventory.html');
    });
});
