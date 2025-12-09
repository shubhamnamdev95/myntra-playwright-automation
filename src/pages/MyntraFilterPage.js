class MyntraFilterPage {

    constructor(page) {
        this.page = page;

        // BRAND section elements
        this.brandSearchIcon = page.locator('div.filter-search-icon'); // search icon
        this.brandSearchInput = page.locator('input[placeholder="Search"]'); // brand search text box
        this.brandCheckBox = page.locator('input[type="checkbox"] + label'); // first checkbox that appears

        // PRICE filter checkbox (example: Rs. 2590-6190)
        this.priceCheckBox = page.locator('label:has-text("Rs. 2590 to Rs. 6190")');
    }

    async applyBrandFilter(preferredBrand = "Puma") {

        // Scroll to Brand section (correct locator)
        await this.page.locator('div:has-text("Brand")').first().scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);

        // Find brand checkbox
        const brandLocator = this.page.locator(`label:has-text("${preferredBrand}")`).first();

        if (await brandLocator.count() > 0) {
            console.log(`Applying brand filter: ${preferredBrand}`);
            await brandLocator.click();
        } else {
            console.log(`${preferredBrand} not found, selecting first available brand.`);
            const firstBrand = this.page.locator('(//label[contains(@class, "common-checkboxIndicator")])[1]');
            await firstBrand.click();
        }

        await this.page.waitForTimeout(2000);
    }

}

module.exports = { MyntraFilterPage };