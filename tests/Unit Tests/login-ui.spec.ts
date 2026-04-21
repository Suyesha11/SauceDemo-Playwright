import { test, expect } from "../../fixtures/fixtures";
import { LoginPage } from "../../pages/LoginPage"

test.describe("Login Page scenarios", ()=>{


    test("Validate Login flow with valid credentials", async({loginPage,page})=>{
    
    await expect(loginPage.header).toBeVisible();
    await expect(loginPage.header).toHaveText("Swag Labs")
    await loginPage.Login("standard_user","secret_sauce")
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    await expect(loginPage.inventoryContainer).toBeVisible();
    })

    test("Validate Login flow with invalid credentials - Username", async({loginPage,page})=>{

    await loginPage.Login("standard_use","secret_sauce");
    await expect(loginPage.invalidUserError).toContainText('Username and password')
    await expect(page).toHaveURL("https://www.saucedemo.com")
    
    })

    test("Validate for locked out user",async({loginPage,page})=>{
    await loginPage.Login("locked_out_user","secret_sauce");
    await expect(loginPage.lockedUserError).toContainText("locked out")
    await expect(page).toHaveURL("https://www.saucedemo.com")
    })

})

