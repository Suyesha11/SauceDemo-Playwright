import {Page , Locator} from"@playwright/test";

export class CartPage{

  readonly page:Page;
  readonly cartList:Locator;
  readonly itemName:Locator;
  readonly checkoutButton:Locator;


  constructor(page:Page){
    this.page=page;
    this.cartList=page.locator(".cart_list");
    this.itemName=page.locator(".inventory_item_name");
     this.checkoutButton=page.getByRole("button", { name: "checkout" })
  }
  
  async checkoutItem(){
     await this.checkoutButton.click();
}

get checkoutUrl(){
  return "https://www.saucedemo.com/checkout-step-one.html"
}
  


}