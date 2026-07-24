import {test, expect} from '@playwright/test';

test('Launch browser with browser context', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
});

test('Launch browser with incognito mode', async ({browser})=>{
    const context = await browser.newContext({
        viewport: {width: 1280, height: 720},
        userAgent: 'My Custom User Agent',
        javaScriptEnabled: true,
        ignoreHTTPSErrors: true,
        bypassCSP: true,
        colorScheme: 'dark',
        locale: 'en-US',
        timezoneId: 'America/New_York',
        permissions: ['geolocation'],
    });
    const page = await context.newPage();
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
});

test('Launch Browser with page context', async ({page})=>{
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
});