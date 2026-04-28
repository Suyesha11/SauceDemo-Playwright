import{test , expect} from '@playwright/test'

test.describe('Auth API', ()=> {
 
    test('Login with valid credentials returns token', async ({request})=>
    {
        const response= await request.post('/auth/login', {
            data:{
                username:'emilys',
                password:'emilyspass'
            },
        });
        //Status assertion
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        //Body Assertions
        const body = await response.json();
        expect(body).toHaveProperty("accessToken");
        expect(body).toHaveProperty("refreshToken");
        expect(body.username).toBe('emilys');
        expect(body.email).toContain('@')
    

    });

    test("Login with invalid credentials retuens 400", async ({request})=>{

        const response = await request.post('/auth/login', {
            data:{
                username :'emilys',
                password : "spass"
            },
        });
        //Assertions
        expect(response.status()).toBe(400)
        const responseBody = await response.json();
        expect(responseBody.message).toBeTruthy();
        expect(responseBody.message).toContain("Invalid");
    });

    test("Login with misisng password returns error",async ({request})=>{

        const response = await request.post('/auth/login',{
            data:{
                username : 'emilys'
            },
        });

        expect(response.status()).not.toBe(200);

    })



    })




