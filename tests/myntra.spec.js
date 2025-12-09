const { test } = require('@playwright/test');
const { MyntraHomePage } = require('../src/pages/MyntraHomePage');
const { MyntraFilterPage } = require('../src/pages/MyntraFilterPage');
const { MyntraProductPage } = require('../src/pages/MyntraProductPage');
const { MyntraBagPage } = require('../src/pages/MyntraBagPage');

const Logger = require('../src/utils/logger');
const { takeStepScreenshot } = require('../src/utils/screenshot');

test('FULL Myntra E2E Automation', async ({ page }) => {

    const home = new MyntraHomePage(page);
    const filter = new MyntraFilterPage(page);

    // STEP 1 - Open Myntra
    Logger.log("STEP 1: Launching Myntra");
    await home.openMyntra();
    await takeStepScreenshot(page, "01_open_myntra");

    // STEP 2 - Search Product
    Logger.log("STEP 2: Searching Sports Shoes");
    await home.searchProduct("Sports Shoes");
    await takeStepScreenshot(page, "02_search_product");

    // STEP 3 - Apply Brand filter
    Logger.log("STEP 3: Applying Puma filter");
    await filter.applyBrandFilter("Puma");
    await takeStepScreenshot(page, "03_apply_brand_filter");

    // STEP 4 - Select first product
    Logger.log("STEP 4: Selecting first product");
    await home.selectFirstProduct();
    await takeStepScreenshot(page, "04_select_first_product");

    // STEP 5 - Handle tab (same tab / new tab)
    Logger.log("STEP 5: Checking tab behavior");
    await page.waitForTimeout(3000);

    const pages = page.context().pages();
    let productPage;

    if (pages.length > 1) {
        Logger.log("Product opened in NEW TAB");
        productPage = pages[1];
    } else {
        Logger.log("Product opened in SAME TAB");
        productPage = page;
    }

    await productPage.waitForLoadState();
    await takeStepScreenshot(productPage, "05_product_page_loaded");

    // STEP 6 - Select size
    Logger.log("STEP 6: Selecting size");
    const product = new MyntraProductPage(productPage);
    await product.selectSize();
    await takeStepScreenshot(productPage, "06_select_size");

    // STEP 7 - Add to Bag
    Logger.log("STEP 7: Adding product to Bag");
    await product.addProductToBag();
    await takeStepScreenshot(productPage, "07_add_to_bag");

    // STEP 8 - Go to Bag
    Logger.log("STEP 8: Opening Bag");
    await product.openBag();
    await takeStepScreenshot(productPage, "08_open_bag");

    // STEP 9 - Validate Bag
    Logger.log("STEP 9: Validating product in Bag");
    const bag = new MyntraBagPage(productPage);
    await bag.verifyProductAdded();
    await takeStepScreenshot(productPage, "09_verify_Product_in_bag");

    Logger.log("TEST COMPLETED SUCCESSFULLY 🎉");

});
