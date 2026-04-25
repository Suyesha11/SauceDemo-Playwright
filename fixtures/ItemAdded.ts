import {test as base , Page , expect} from "@playwright/test";
import {LoginPage} from "../pages/LoginPage";
import {ProductPage} from "../pages/ProductPage";
import {CartPage} from "../pages/CartPage";
import {OrderSummaryPage} from "../pages/OrderSummaryPage";
import {CheckoutUser} from "../pages/CheckoutUser";

type MyFixtures={
  loginPage:LoginPage;
  productPage:ProductPage
  orderSummaryPage:OrderSummaryPage;
  checkoutUser:CheckoutUser;
  cartPage:CartPage;
  cartWithItem :CartPage;
}

export const test = base.extend<MyFixtures>({

  loginPage: async({page},use)=>{
    await use(new LoginPage(page));
  },
  productPage:async({page},use)=>{
    await use(new ProductPage(page));
  },
  cartPage:async({page},use)=>{
    await use(new CartPage(page));
  },
    
  orderSummaryPage:async({page},use)=>{
    await use(new OrderSummaryPage(page));
  },
  checkoutUser:async({page},use)=>{
    await use(new CheckoutUser(page));
  },
  
 cartWithItem:async({page , loginPage , productPage ,cartPage},use)=>{
  await loginPage.goTo();
  await loginPage.login("standard_user","secret_sauce");
  await productPage.addProductToCart("Sauce Labs Backpack");
  await productPage.clickOnShoppingCart();
  await page.waitForURL(/cart\.html/);
  await cartPage.waitUntilLoaded();
  await use(cartPage);
 },


});

export {expect};