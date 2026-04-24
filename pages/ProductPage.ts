import { Page, Locator , expect } from "@playwright/test";

export class ProductPage {
  private readonly page: Page;
  private readonly shoppingCartLink: Locator;
  private readonly pageTitle :Locator;
  private readonly inventory: Locator;



  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator(".shopping_cart_link");
    this.pageTitle=page.locator(".title");
    this.inventory=page.locator(".inventory_item")

  }

  async addProductToCart(productName: string) {
    await this.page
      .locator('[data-test="inventory-item"]')
      .filter({ hasText: productName })
      .getByRole("button", { name: /add to cart/i })
      .click();
  }

  async clickOnShoppingCart() {
    await this.shoppingCartLink.click();
  }


  // async addProduct2ToCart(productName:string){
  //   await this.page
  //   .locator('[data-test="inventory-item"]')
  //   .filter({hasText : productName})
  //   .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
  //   .click()
  // }

  async waitUntilLoaded(){
    await expect(this.page).toHaveURL("/inventory.html");
    await expect(this.pageTitle).toHaveText("Products");
    await expect(this.inventory.first()).toBeVisible()
  }

}