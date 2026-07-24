import {test, expect} from '@playwright/test';

test('Login Test', async ({page})=>{
    await page.goto('https://practice.expandtesting.com/login');
    const usernameInput = await page.locator("#username");
    const passwordInput = await page.locator("#password");
    const loginButton = await page.locator("#submit-login");
    
    await usernameInput.fill('practice');
    await passwordInput.fill('SuperSecretPassword!');
    await loginButton.click();

    const successLogin = await page.locator("#flash b")
    console.log("Success login Text ", await successLogin.innerText());
    expect(successLogin).toHaveText('You logged into a secure area!');
});

test('Get All Book Titles', async ({page})=>{
    await page.goto("https://practice.expandtesting.com/bookstore");
    // wait for the book titles to be visible
    await page.waitForSelector("h5.card-title", {state: 'visible'});
    // await page.waitForLoadState('networkidle');
    const bookTitles = await page.locator("h5.card-title ");
    const bookCount = await bookTitles.count();
    console.log("Book Count: ", bookCount);
    console.log("Book Titles: ", await bookTitles.allTextContents());
    // get the first book title
    const firstBookTitle = await bookTitles.first();
    console.log("First Book Title: ", await firstBookTitle.innerText());
    // get the last book title
    const lastBookTitle = await bookTitles.last();
    console.log("Last Book Title: ", await lastBookTitle.innerText());
    // get nth book title
    const nthBookTitle = await bookTitles.nth(2);
    console.log("Nth Book Title: ", await nthBookTitle.innerText());
});