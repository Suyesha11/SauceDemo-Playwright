import { Page, Locator , expect} from "@playwright/test";

export class CheckoutUser {
  private readonly page: Page;
  private readonly checkOutList: Locator;
  private readonly userFirstName: Locator;
  private readonly userLastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton :Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.userFirstName = page.getByPlaceholder("First Name");
    this.userLastName = page.getByPlaceholder("Last Name");
    this.postalCode = page.getByPlaceholder("Zip/Postal Code");
    this.checkOutList= page.locator(".cart-list");
    this.continueButton = page.getByRole("button", { name: "continue" });
    this.finishButton=page.getByRole('button',{name : "Finish"});
  }

  async checkoutUser(firstName: string, lastName: string, postalCode: string) {
    await this.userFirstName.fill(firstName);
    await this.userLastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }

  async waitUntilLoaded(){
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html/)
  }

  async checkoutPage2(){
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html/)
    //await expect(this.checkOutList).toHaveCount(2);
    await (this.finishButton).click();
  }
}


