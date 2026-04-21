import {test , expect } from "../../fixtures/fixtures";
import { LoginPage } from "../../pages/LoginPage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";

test.only("Validate Happy E2E flow", async({page})=>{

await page.goto("https://www.saucedemo.com/");
 const loginPage= new LoginPage(page);
 await loginPage.goTo();
 await loginPage.Login("standard_user","secret_sauce");
 await expect(loginPage.inventoryContainer).toBeVisible();


 //To add Product to Cart-list
 const productPage = new ProductPage(page);
 await productPage.addProductToCart("Sauce Labs Backpack");
 //Click on Shopping Cart Link
 await productPage.clickOnShoppingCart();
 await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

 //Cart Page
 const cartPage = new CartPage(page);
 await expect(page.locator(".cart_list")).toBeVisible();
 await expect(page.locator(".inventory_item_name")).toHaveText("Sauce Labs Backpack");

 //Click On Checkout
 await page.getByRole("button",{name : "checkout"}).click();
 await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");

//Add user details
await expect(page.locator(".checkout_info_wrapper")).toBeVisible();
await page.getByPlaceholder("First Name").fill("John");
await page.getByPlaceholder("Last Name").fill("Test");
await page.getByPlaceholder("Zip/Postal Code").fill("12345");

await page.getByRole("button",{name : "continue"}).click();

await page.locator(".cart_list").isVisible();
expect (page.locator('[data-test="inventory-item-name"]')).toHaveText("Sauce Labs Backpack");
})