import { test as base, expect } from '@playwright/test';
import { ApiUtil } from '../utils/ApiUtil.js';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        console.log("Setting up login page fixture");
        await page.goto("https://demo.realworld.show/");
        await page.locator("a[href='/login']").click();
        await page.getByPlaceholder("Email").fill("nitheshhs123@gmail.com");
        await page.getByPlaceholder("Password").fill("abc1234");
        await page.locator("button:has-text('Sign in')").click();
        expect(await page.title()).toBe("Conduit");
        use(page);
        // Cleanup code can be added here if needed
        console.log("Cleanup after test execution");
    },
    setZeroUserPost: async ({ page }, use) => {
        console.log("Setting up setZeroUserPost fixture");
        await page.route(
            '**/api/articles?limit=10&offset=0',
            async route => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    json: {
                        articles: [],
                        articlesCount: 0
                    }
                });
            }
        );
        use(page);
        console.log("Cleanup after test execution");
    },
    loginViaApi: async ({page, request}, use) => {
        console.log("Setting up loginViaApi fixture");
        const apiUtil = new ApiUtil(request);
        await apiUtil.loginViaApi('nitheshhs123@gmail.com', 'abc1234');
        // Set the token in localStorage for the page
        await page.addInitScript(token => {
            localStorage.setItem('jwtToken', token);
        }, apiUtil.token);
        await page.goto("https://demo.realworld.show/");
        use(page);
        console.log("Cleanup after test execution");
    }
});

module.exports = { test, expect };