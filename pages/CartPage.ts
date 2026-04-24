import {Page , Locator , expect}  from"@playwright/test";

export class CartPage{

  readonly page:Page;
  readonly cartList:Locator;
  readonly itemName:Locator;
  readonly checkoutButton:Locator;
  readonly cartTitle:Locator;


  constructor(page:Page){
    this.page=page;
    this.cartList=page.locator(".cart_list");
    this.itemName=page.locator(".inventory_item_name");
    this.cartTitle=page.locator(".cart_title");
     this.checkoutButton=page.getByRole("button", { name: "checkout" })
  }

  async waitUntilLoaded(){
    await expect(this.cartTitle).toHaveText("Your Cart");
    await expect(this.checkoutButton).toBeVisible();
  }
  
  async checkoutItem(){
     await this.checkoutButton.click();
}

get checkoutUrl(){
  return "https://www.saucedemo.com/checkout-step-one.html"
}
  


}