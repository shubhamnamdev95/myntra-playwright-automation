class MyntraProductPage {
  constructor(page) {
    this.page = page;

    this.sizeButton = page.locator('.size-buttons-size-button').first();
    this.addToBag = page.locator('text=ADD TO BAG');
    this.goToBag = page.locator('text=GO TO BAG');
  }

  async selectSize() {
    await this.sizeButton.waitFor({ timeout: 10000 });
    await this.sizeButton.click();
  }

  async addProductToBag() {
    await this.addToBag.click();
  }

  async openBag() {
    await this.goToBag.click();
  }
}

module.exports = { MyntraProductPage };
