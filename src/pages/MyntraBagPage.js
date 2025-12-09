const { expect } = require('@playwright/test');

class MyntraBagPage {

  constructor(page) {
    this.page = page;
    this.productInBag = page.locator('.itemContainer-base-itemLink');
  }

  async verifyProductAdded() {
    await expect(this.productInBag).toBeVisible();
  }
}

module.exports = { MyntraBagPage };
