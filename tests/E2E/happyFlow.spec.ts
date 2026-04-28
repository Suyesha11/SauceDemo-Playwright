import { test, expect } from "../../fixtures/fixtures";


test("Validate Happy E2E flow", async ({ authenticatedPage , productPage, cartPage, checkoutPage, orderSummaryPage }) => {
   

    //Login already added in fixture.ts-> authenticated 
    //To add Product to Cart-list
    await productPage.waitUntilLoaded();
    await productPage.addProductToCart("Sauce Labs Backpack");
    //Click on Shopping Cart Link
    await productPage.clickOnShoppingCart();
    await cartPage.waitUntilLoaded();

    //Cart Page
    const itemName = await cartPage.getItemName();
    expect(itemName).toContain("Sauce Labs Backpack")

    //Click On Checkout
    await cartPage.checkoutItem()
    await checkoutPage.waitUntilLoaded();
    //Add user details

    await checkoutPage.checkoutUser("John", "Test" , "1234");
    await checkoutPage.checkoutPage2();

    //Order Sumary page
    
await orderSummaryPage.waitUntilLoaded()
const itemNameSummary = await orderSummaryPage.getItemName();
//expect(itemNameSummary).toContain("Sauce Labs Backpack")
})