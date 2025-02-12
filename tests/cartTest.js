const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const takeScreenshot = require('../utils/takeScreenshot');
const assert = require('assert');

//Scenario B. User should login, add an item to cart.
describe('Add to cart', function () {
    let driver;
    let loginPage;
    let inventoryPage;

    before(async function () {
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        await driver.get('https://www.saucedemo.com/');
    });

    after(async function () {
        await driver.quit();
    });

    it('User should login and add item to cart', async function () {
        await loginPage.login('standard_user', 'secret_sauce');
        await takeScreenshot(driver, 'inventory_page.png');

        await inventoryPage.addItemToCart();
        await takeScreenshot(driver, 'item_added_to_cart.png');

        const cartCount = await inventoryPage.getCartItemCount();
        assert.strictEqual(cartCount, '1');
    });
});
