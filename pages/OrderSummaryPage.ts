import {Page, Locator} from "@playwright/test";

export class OrderSummaryPage{

    readonly page:Page;
    readonly orderSummaryList:Locator;
    readonly itemName:Locator;

    constructor(page:Page){
        this.page=page;
        this.orderSummaryList=page.locator(".cart_list");
        this.itemName=page.locator('[data-test="inventory-item-name"]')
    }

   



}