import {test, expect} from '@playwright/test';

test.beforeAll(async ({browser})=>{
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
    await context.storageState({path: 'sessionStorage.json'});
    await context.close();
});

test("Get the Page Title and URL", async ({browser})=>{
    // Inject the session storage from the json file into the new context
    const context = await browser.newContext({storageState: 'sessionStorage.json'});
    const page = await context.newPage();
    await page.goto("https://demo.realworld.show/");
    expect(await page.title()).toBe("Conduit");
    await page.waitForSelector("ul a[href*='/profile']");
    expect(await page.locator("ul a[href*='/profile']")).toContainText("Nithesh");
});