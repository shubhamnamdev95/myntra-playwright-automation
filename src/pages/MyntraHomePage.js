class MyntraHomePage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator('input[placeholder="Search for products, brands and more"]');
    this.firstProduct = page.locator('.product-base').first();
    this.addToBagButton = page.locator('text=ADD TO BAG').first();
  }

  async openMyntra() {
    await this.page.goto('https://www.myntra.com/');
  }

  async searchProduct(product) {
    await this.searchBox.fill(product);
    await this.page.keyboard.press('Enter');
  }

  async selectFirstProduct() {
    await this.firstProduct.click();
  }
}

module.exports = { MyntraHomePage };
