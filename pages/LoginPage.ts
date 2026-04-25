import{Page,Locator} from '@playwright/test'

export class LoginPage{

private readonly page : Page;
private readonly header : Locator;
private readonly standardUser : Locator;
private readonly password : Locator;
private readonly loginButton : Locator;

constructor(page:Page){
    this.page=page;
    this.header=page.locator(".login_logo");
    this.standardUser =page.getByRole('textbox',{name:"Username"});
    this.password=page.getByRole('textbox',{name:"Password"});
    this.loginButton=page.getByText("Login")
}

async goTo(){
    await this.page.goto("/")
}

async login(usr:string, pwd:string)
{
    await this.standardUser.fill(usr);
     await this.password.fill(pwd);
     await this.loginButton.click();
}


get inventoryContainer(){
    return this.page.locator(".inventory_container")
}

get invalidUserError(){
    return this.page.locator(".error-message-container");
}

get lockedUserError(){
    return this.page.locator('h3[data-test="error"]');
}
}