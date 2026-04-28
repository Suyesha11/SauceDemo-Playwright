import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  private readonly cartList: Locator;
  private readonly itemName: Locator;
  private readonly checkoutButton: Locator;
  private readonly cartTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator(".cart_list");
    this.itemName = page.locator(".inventory_item_name");
    this.cartTitle = page.locator(".title");
    this.checkoutButton = page.getByRole("button", { name: "checkout" });
  }

  async waitUntilLoaded() {
    await expect(this.page).toHaveURL(/\/cart\.html/);
    await expect(this.cartTitle).toHaveText("Your Cart");
    await expect(this.checkoutButton).toBeVisible();
  }

  async checkoutItem() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.page.getByRole("button", { name: "Continue Shopping" }).click();
  }

  async getItemName() {
    return this.itemName.allTextContents();
  }

  async getItemList() {
    return this.page.locator(".cart_item").all();
  }
}
