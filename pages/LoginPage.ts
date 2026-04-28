import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly header: Locator;
  private readonly standardUser: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  readonly inventoryContainer: Locator;
  readonly invalidUserError: Locator;
  readonly lockedUserError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator(".login_logo");
    this.standardUser = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByText("Login");
    this.inventoryContainer=page.locator(".inventory_container");
    this.invalidUserError= page.locator(".error-message-container");
    this.lockedUserError=page.locator('[data-test="error"]');
  }

  async goTo() {
    await this.page.goto("/");
  }

  async login(usr: string, pwd: string) {
    await this.standardUser.fill(usr);
    await this.password.fill(pwd);
    await this.loginButton.click();
  }

  getHeader(): Locator {
    return this.header;
  }
}
