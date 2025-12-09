const path = require("path");

async function takeStepScreenshot(page, name) {
    const fileName = name.replace(/[^a-zA-Z0-9_]/g, "_");
    const filePath = path.join("test-results", `${fileName}.png`);

    await page.screenshot({ path: filePath, fullPage: true });
}

module.exports = { takeStepScreenshot };
