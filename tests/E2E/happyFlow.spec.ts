import { test, expect } from "../../fixtures/fixtures";


test.only("Validate Happy E2E flow", async ({ authenticatedPage , productPage, cartPage, checkoutPage, orderSummaryPage }) => {
    let productAdded = "Sauce Labs Backpack";

    //Login already added in fixture.ts-> authenticated 
    //To add Product to Cart-list
   
    await productPage.addProductToCart(productAdded);
    //Click on Shopping Cart Link
    await productPage.clickOnShoppingCart();
    await expect(authenticatedPage).toHaveURL(productPage.cartURL);

    //Cart Page
    
    await expect(cartPage.cartList).toBeVisible();
    await expect(cartPage.itemName).toHaveText(productAdded);
    //Click On Checkout
    cartPage.checkoutItem()
    await expect(authenticatedPage).toHaveURL(cartPage.checkoutUrl);

    //Add user details
   
    await expect(checkoutPage.checkOutList).toBeVisible();
    checkoutPage.checkoutUser("John", "Test" , "1234");

    //Order Sumary page
    
    await expect(orderSummaryPage.orderSummaryList).toBeVisible();
    await expect(orderSummaryPage.itemName).toHaveText(productAdded);
})