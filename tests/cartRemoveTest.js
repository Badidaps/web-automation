const { Builder } = require('selenium-webdriver');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');
const takeScreenshot = require('../utils/takeScreenshot');
const assert = require('assert');

//Scenario C. User should login, add an item to cart, and remove the item from cart.
describe('Remove Items', function () {
    let driver;
    let loginPage;
    let inventoryPage;
    let cartPage;

    before(async function () {
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
        loginPage = new LoginPage(driver);
        inventoryPage = new InventoryPage(driver);
        cartPage = new CartPage(driver);
        await driver.get('https://www.saucedemo.com/');
    });

    after(async function () {
        await driver.quit();
    });

    it('User should login, add items to cart, and remove them', async function () {
        await loginPage.login('standard_user', 'secret_sauce');
        await takeScreenshot(driver, 'inventory_page.png');

        await inventoryPage.addItemToCart();
        await takeScreenshot(driver, 'item_added_to_cart.png');

        const cartCount = await inventoryPage.getCartItemCount();
        assert.strictEqual(cartCount, '1');
        
        await cartPage.openCart();
        await cartPage.removeItemFromCart();
        await takeScreenshot(driver, 'item_removed_from_cart.png');

        const cartBadgeExists = await cartPage.isCartEmpty();
        assert.strictEqual(cartBadgeExists, true);
    });
});
