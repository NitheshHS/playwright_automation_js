import { test, expect } from '@playwright/test';

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://demo.realworld.show/");
    await page.locator("a[href='/login']").click();
    await page.getByPlaceholder("Email").fill("nitheshhs123@gmail.com");
    await page.getByPlaceholder("Password").fill("abc1234");
    await page.locator("button:has-text('Sign in')").click();
    expect(await page.title()).toBe("Conduit");
    // IMPORTANT:
    // Wait until login is actually complete.
    await expect(
        page.locator("ul a[href*='/profile']")
    ).toBeVisible();

    // Debug: check localStorage BEFORE saving storageState
    const localStorageData = await page.evaluate(() => {
        return { ...localStorage };
    });

    console.log("LocalStorage:", localStorageData);

    //store the session in json file
    await context.storageState({ path: 'sessionStorage.json' });
    await context.close();
});

test("Display zero global article test", async ({ browser }) => {

    const context = await browser.newContext({
        storageState: 'sessionStorage.json',
        ignoreHTTPSErrors: true
    });

    const page = await context.newPage();

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

    await page.goto("https://demo.realworld.show/");
    await page.pause();
    await expect(page).toHaveTitle("Conduit");

    await expect(
        page.locator("ul a[href*='/profile']")
    ).toContainText("Nithesh");

    await page
        .locator("a.nav-link:has-text('Global Feed')")
        .click();

    // Verify mocked UI result
    await expect(
        page.getByText("No articles are here... yet.")
    ).toBeVisible();

    await context.close();
});