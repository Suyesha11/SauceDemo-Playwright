import {Page, Locator , expect} from "@playwright/test";

export class OrderSummaryPage{

    private readonly page:Page;
    private readonly orderSummaryList:Locator;
    private readonly itemName:Locator;
    private readonly thankyouMessage :Locator;

    constructor(page:Page){
        this.page=page;
        this.orderSummaryList=page.locator(".cart_list");
        this.itemName=page.locator('[data-test="inventory-item-name"]')
        this.thankyouMessage = page.locator('[data-test="complete-header"]')
    }

    async waitUntilLoaded(){
        await expect(this.page).toHaveURL(/\/checkout-complete\.html/);
        //await expect(this.orderSummaryList).toBeVisible();
    }
    async getItemName(){
        return this.itemName.allTextContents();
    }

   async checkThankyouMessage(){
    await expect(this.thankyouMessage).toHaveText('Thank you for your order!');
   }



}