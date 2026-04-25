import {test,expect } from "../../fixtures/ItemAdded"


test("Checkot Multiple Items Via Continue ", async({ cartWithItem , productPage , cartPage , checkoutUser , orderSummaryPage})=>{

     await cartWithItem.clickContinueShopping();
     await productPage.waitUntilLoaded();

    //Add Another Product
    await productPage.addProductToCart("Sauce Labs Fleece Jacket");
    await productPage.clickOnShoppingCart();

   await cartPage.getItemList();
   await expect(cartPage.getItemList()).toHaveLength(2);
   await cartPage.checkoutItem()
    await checkoutUser.waitUntilLoaded();
    //Add user details

    await checkoutUser.checkoutUser("John", "Test" , "1234");
    await checkoutUser.checkoutPage2();

    //Order Sumary page
    
await orderSummaryPage.waitUntilLoaded()
await orderSummaryPage.checkThankyouMessage();




})