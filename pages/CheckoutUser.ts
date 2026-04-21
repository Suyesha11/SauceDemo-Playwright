import {Page, Locator} from '@playwright/test'

export class CheckoutUser{
   readonly page:Page;
   readonly checkOutList:Locator;
   readonly userFirstName:Locator;
   readonly userLastName:Locator;
   readonly postalCode:Locator;
   readonly continueButton:Locator;

   constructor(page:Page){
    this.page=page;
    this.checkOutList=page.locator(".checkout_info_wrapper");
    this.userFirstName=page.getByPlaceholder("First Name");
    this.userLastName=page.getByPlaceholder("Last Name");
    this.postalCode=page.getByPlaceholder("Zip/Postal Code");
    this.continueButton=page.getByRole("button", { name: "continue" });
   }

   async checkoutUser(firstName:string , lastName:string , postalCode:string){
   await this.userFirstName.fill(firstName);
    await this.userLastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
   }




}