import {test, expect} from '@playwright/test';

test("Switch Context to New Window", async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://practice.expandtesting.com/windows");
    const parentPageTitle = await page.title();
    console.log("Parent Page Title: ", parentPageTitle);
    // click on the new window button
    const newWindowButton = await page.locator("a[href*='/new']");
    // await page.pause();
    // context.waitForEvent('page').then(async newPage=>{
    //     const newPageTitle = await newPage.title();
    //     console.log("New Page Title: ", newPageTitle);
    //     expect(newPageTitle).toBe('New Window');
    // });

    // recommonded way to handle multiple windows using Promise.all
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        newWindowButton.click()
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    const newPageTitle = await newPage.title();
    expect(newPageTitle).toBe('Example of a new window');
    console.log("New Page Title: ", newPageTitle);

});