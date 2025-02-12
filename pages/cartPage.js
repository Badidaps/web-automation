const { By, until } = require('selenium-webdriver');

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.cartIcon = By.className('shopping_cart_link');
        this.removeButton = By.xpath("//button[text()='Remove']");
        this.cartList = By.className('cart_list');
    }

    async openCart() {
        await this.driver.findElement(this.cartIcon).click();
        await this.driver.wait(until.elementLocated(this.cartList), 5000);
        
    }

    async removeItemFromCart() {
        // Wait for the "Remove" button to appear
        let removeButton = await this.driver.wait(
            until.elementLocated(By.css('.cart_button')), 
            5000 // Wait up to 5 seconds
        );
    
        await this.driver.wait(until.elementIsVisible(removeButton), 2000);
        await removeButton.click();
    }

    async isCartEmpty() {
        const cartBadge = await this.driver.findElements(By.className('shopping_cart_badge'));
        return cartBadge.length === 0;
    }
}

module.exports = CartPage;
