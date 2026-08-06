import {test, expect} from '@playwright/test';

test('Handle Alert Test', async ({page})=>{
    await page.goto("https://practice.expandtesting.com/iframe");
    const frame =await page.frameLocator("#email-subscribe");
    await frame.locator("input#email").fill("xyz@gmail.com");
    await frame.locator("#btn-subscribe").click();
    await expect(frame.locator("#success-message:visible")).toContainText("You are now subscribed!");
});
