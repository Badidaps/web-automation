const { By, until } = require('selenium-webdriver');

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = By.id('user-name');
        this.passwordField = By.id('password');
        this.loginButton = By.id('login-button');
        this.inventoryPage = By.id('inventory_container');
    }

    async login(username, password) {
        await this.driver.findElement(this.usernameField).sendKeys(username);
        await this.driver.findElement(this.passwordField).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();

        // Wait for inventory page to appear
        await this.driver.wait(until.elementLocated(this.inventoryPage), 5000);
    }
}

module.exports = LoginPage;
