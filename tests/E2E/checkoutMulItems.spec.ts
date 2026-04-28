import { test, expect } from "../../fixtures/fixtures";

test("Checkout Multiple Items Via Continue ", async ({
  cartWithItem,
  productPage,
  cartPage,
  checkoutPage,
  orderSummaryPage,
}) => {
  await cartWithItem.clickContinueShopping();
  await productPage.waitUntilLoaded();

  //Add Another Product
  await productPage.addProductToCart("Sauce Labs Fleece Jacket");
  await productPage.clickOnShoppingCart();

  const cartItem = await cartPage.getItemList();
  expect(cartItem).toHaveLength(2);
  await cartPage.checkoutItem();
  await checkoutPage.waitUntilLoaded();
  //Add user details

  await checkoutPage.checkoutUser("John", "Test", "1234");
  await checkoutPage.checkoutPage2();

  //Order Sumary page

  await orderSummaryPage.waitUntilLoaded();
  await orderSummaryPage.checkThankyouMessage();
});
