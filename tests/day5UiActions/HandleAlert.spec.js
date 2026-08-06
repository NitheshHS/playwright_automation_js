import {test, expect} from '@playwright/test';

test("Handle Alert Test", async ({page})=>{
    await page.goto("https://practice.expandtesting.com/js-dialogs");
    // Alert has only okay button
    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Js Alert' }).click();
    await expect(page.locator('#dialog-response')).toContainText('OK');

    // Alert has okay and cancel button
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Js Confirm' }).click();
    await expect(page.locator('#dialog-response')).toContainText('Cancel');

    // Alert has okay, cancel and input field
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.accept('Playwright').catch(() => {});
    });
    await page.getByRole('button', { name: 'Js Prompt' }).click();
    await expect(page.locator('#dialog-response')).toContainText('Playwright');
});

test("Handle Mouse hover Test", async ({page})=>{
    await page.goto("https://practice.expandtesting.com/hovers");
    // get all user names by hovering over the images
    const images = await page.locator("img[data-testid*='img-user']");
    for (let index=0; index<await images.count(); index++) {
        await images.nth(index).hover();
        const userName = await page.locator(".figcaption h5").nth(index);
        console.log("User", await userName.textContent());
        expect(await userName.textContent()).toContain(`user${index+1}`);
    }
});
