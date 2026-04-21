import {Page, Locator } from "@playwright/test"; 

export class ProductPage{
readonly page:Page;
readonly shoppingCartLink:Locator;


constructor(page:Page){
  this.page=page;
  this.shoppingCartLink=page.locator(".shopping_cart_link")

}

async addProductToCart(productName:string){
  await this.page
  .locator('[data-test="inventory-item"]')
  .filter({ hasText: productName })
  .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
  .click();
}

async clickOnShoppingCart(){
  await this.shoppingCartLink.click();
}


}