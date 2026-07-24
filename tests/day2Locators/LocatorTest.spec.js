import {test, expect} from '@playwright/test';

// test.beforeEach(async ()=>{
//     console.log("Before Test: ", test.name);
// });

// test.afterEach(async ()=>{
//     console.log("After Test ", test.name);
// });

test('Locator Test', async ({page})=>{
    await page.goto('https://sauce-demo.myshopify.com/')
    await expect(page).toHaveTitle('Sauce Demo');
    // search for element using locator
    const searchInput = await page.locator("#search-field");
    await searchInput.fill('shirt');
    await page.keyboard.press('Enter');
    // verify the search input value
    const searchInputValue = await page.locator("#keyword");
    console.log("Search Input Value: ", searchInputValue.innerText());
    await expect(searchInputValue).toContainText('shirt');

})