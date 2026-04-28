import { test, expect } from "../../fixtures/fixtures";
import { LoginPage } from "../../pages/LoginPage"

test.describe("Login Page scenarios", ()=>{
  

    test("Validate Login flow with valid credentials", async({page , LoggedInPage})=>{
   
    await expect(LoggedInPage.getHeader()).toBeVisible();
    await expect(LoggedInPage.getHeader()).toHaveText("Swag Labs")
    await LoggedInPage.login("standard_user","secret_sauce")
    await expect(page).toHaveURL("/inventory.html")
    await expect(LoggedInPage.inventoryContainer).toBeVisible();
    })

    test("Validate Login flow with invalid credentials - Username", async({page , LoggedInPage})=>{

    await LoggedInPage.login("standard_use","secret_sauce");
    await expect(LoggedInPage.invalidUserError).toContainText('Username and password')
    await expect(page).not.toHaveURL("/.*inventory\.html/")
    
    })

    test("Validate for locked out user",async({page , LoggedInPage})=>{
    await LoggedInPage.login("locked_out_user","secret_sauce");
    await expect(LoggedInPage.lockedUserError).toContainText("locked out")
    await expect(page).not.toHaveURL("/.*inventory\.html/")
    })

})

