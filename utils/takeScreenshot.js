const fs = require('fs');
const path = require('path');

function takeScreenshot(driver, fileName) {
    const dirPath = path.join(__dirname, '../screenshots'); 
    const filePath = path.join(dirPath, fileName);

    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    return driver.takeScreenshot()
        .then((image) => fs.writeFileSync(filePath, image, 'base64'))
        .then(() => console.log(`Screenshot saved: ${filePath}`));
}

module.exports = takeScreenshot;
