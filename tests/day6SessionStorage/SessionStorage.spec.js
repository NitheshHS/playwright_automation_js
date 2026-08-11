import {test, expect, request} from '@playwright/test';
import {ApiUtil} from '../utils/ApiUtil';

let apiUtil=null;

test.beforeAll(async () => {
    //start a new request context
    const requestContext = await request.newContext();
    // create an instance of ApiUtil and login via API to get the token
    apiUtil = new ApiUtil(requestContext);
    await apiUtil.loginViaApi("nitheshhs123@gmail.com", "abc1234");
    
});


test("Session Storage Test", async ({page})=>{
    // set the token in session storage before navigating to the page
    await page.addInitScript(tokenValue=>{
        window.localStorage.setItem('jwtToken', tokenValue);
    }, apiUtil.token);
    // Navigate to home page directly
    await page.goto("https://demo.realworld.show/");
    const userName = await page.locator("li a[href*='/profile']").textContent();
    console.log("User Name is: ", userName);
    expect(userName).toContain("Nithesh");
});

/**
 * Note: Use page.addInitScript() to set the token in session storage before navigating to the page. This way, the token will be available in session storage when the page loads, and you can access it in your test.
 */