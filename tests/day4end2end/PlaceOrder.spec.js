import {test, expect} from '@playwright/test';

test('Place Order Test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://ecommerce.artoftesting.com/');
    // login
    const loginContainer = await page.locator("div[class*='Login_left']");
    await loginContainer.waitFor();
    const loginButton = await page.locator("button[class*='Login_btn']");
    await loginButton.click();
    // add product to cart
    const productContainer = await page.locator("div[class*='Products_item']");
    console.log("Total Products: " + await productContainer.count());

    const productToAddCart = "To Kill a Mockingbird";
    for (let index=0; index<await productContainer.count();index++) {
        //get product name
        const productName = await productContainer.nth(index).locator("div[class*='Products_title']").textContent();
        if (productName.trim() === productToAddCart) {
            const addToCartButton = await productContainer.nth(index).locator("button[class*='Products_btn']");
            await addToCartButton.click();
            break;
        }
    }
    // go to cart
    const cartButton = await page.locator("div[class*='Header_detailCart']");
    await cartButton.click();

    // verify the product is added to cart
    const cartProduct = await page.locator("//tbody/tr/td[2]");
    expect(await cartProduct.textContent()).toContain(productToAddCart);
    const checkoutButton = await page.locator("text=Checkout");
    await checkoutButton.click();
    // verify the success message
    const successMessage = await page.locator("div[class*='Checkout_container']>span");
    expect(await successMessage.textContent()).toContain("Thank you For Shopping With Us");
});