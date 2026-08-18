import { test, expect } from '../fixtures/testfixture.js';

test('Fixture Test', async ({ loginPage }) => {
    console.log("Running test with loginPage fixture");
    await setTimeout(() => { }, 5000);
    await expect(
        loginPage.locator("ul a[href*='/profile']")
    ).toContainText("Nithesh");
});

test('Fixture Test 2', async ({ loginPage, setZeroUserPost }) => {
    console.log("Running test with loginPage and setZeroUserPost fixtures");
    await setTimeout(() => { }, 5000);
    await setZeroUserPost.goto("https://demo.realworld.show/");
    await expect(setZeroUserPost).toHaveTitle("Conduit");

    await expect(
        setZeroUserPost.locator("ul a[href*='/profile']")
    ).toContainText("Nithesh");

    await setZeroUserPost
        .locator("a.nav-link:has-text('Global Feed')")
        .click();

    // Verify mocked UI result
    await expect(
        setZeroUserPost.getByText("No articles are here... yet.")
    ).toBeVisible();
});

test('Fixture Test 3', async ({ loginViaApi }) => {
    console.log("Running test with loginViaApi fixture");
    await setTimeout(() => { }, 5000);
    await expect(
        loginViaApi.locator("ul a[href*='/profile']")
    ).toContainText("Nithesh");
});