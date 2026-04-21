import {Page , Locator} from"@playwright/test";

export class CartPage{

  readonly page:Page;
  readonly cartList:Locator;
  readonly itemName:Locator;


  constructor(page:Page){
    this.page=page;
    this.cartList=page.locator(".cart_list");
    this.itemName=page.locator(".inventory_item_name");
  }
  
  


}