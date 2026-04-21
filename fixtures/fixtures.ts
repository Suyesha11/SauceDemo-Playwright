import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';
import { CheckoutUser } from '../pages/CheckoutUser';
import { OrderSummaryPage } from '../pages/OrderSummaryPage';
import { testUsers, checkoutInfo, products } from './testData';


type MyFixtures = {
   loginpage: LoginPage;
   productPage: ProductPage;
   cartPage: CartPage;
   checkoutPage: CheckoutUser;
   orderSummaryPage: OrderSummaryPage;
   authenticatedPage: Page;
   testUser: typeof testUsers.standard;
   checkoutData: typeof checkoutInfo.validUser;
}

export const test = base.extend<MyFixtures>({
   //Fixture 1:Login Page
   loginpage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await use(loginPage);
   },

   //Fixture 2:Product Page
   productPage: async ({ page }, use) => {
      await use(new ProductPage(page));
   },

   //Fixture 3: Cart Page
   cartPage: async ({ page }, use) => {
      await use(new CartPage(page));
   },

   //Fixture 4:CheckoutPage
   checkoutPage: async ({ page }, use) => {
      await use(new CheckoutUser(page));
   },

   //Fixture 5: Order Summary page
   orderSummaryPage: async ({ page }, use) => {
      await use(new OrderSummaryPage(page));
   },

   //Data fixtures
   testUser: async ({ }, use) => {
      await use(testUsers.standard);
   },

   checkoutData: async ({ }, use) => {
      await use(checkoutInfo.validUser)
   },

   //Fixture 6: Authenticated Page
   authenticatedPage: async ({ page }, use) => {
      const loginPage = new LoginPage(page);
      await loginPage.goTo();
      await loginPage.Login("standard_user", "secret_sauce");
      await page.waitForURL('**/inventory.html');
      await use(page); //Return logged-in page
   },

});

export { expect }