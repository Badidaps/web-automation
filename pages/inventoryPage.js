const { By, until } = require('selenium-webdriver');

class InventoryPage {
    constructor(driver) {
        this.driver = driver;
        this.addToCartButton = By.css('.btn_inventory');
        this.cartBadge = By.className('shopping_cart_badge');
    }

    async addItemToCart() {
        await this.driver.findElement(this.addToCartButton).click();
        await this.driver.wait(until.elementLocated(this.cartBadge), 5000);
    }

    async getCartItemCount() {
        return await this.driver.findElement(this.cartBadge).getText();
    }
}

module.exports = InventoryPage;
