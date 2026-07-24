import {test, expect} from '@playwright/test';

test('Dropdown list Test', async ({page})=>{
    await page.goto("https://practice.expandtesting.com/dropdown");
    await page.selectOption("#country", {value: "IN"});
    const selectedCountry = await page.locator("#country");
    console.log("Selected Country: ", await selectedCountry.inputValue());
    expect(selectedCountry).toHaveValue('IN');
});

test('CheckBox Test', async({page})=>{
    await page.goto("https://practice.expandtesting.com/checkboxes");
    const checkboxes = await page.locator(".form-check");
    const checkboxCount = await checkboxes.count();
    console.log("Checkbox Count: ", checkboxCount);
    // get the intial state of the checkboxes
    for(let i=0; i<checkboxCount; i++){
        const checkbox = await checkboxes.nth(i);
        const checkboxInput = await checkbox.locator("input");
        const isChecked = await checkboxInput.isChecked();
        console.log(`Checkbox ${i} is checked: ${isChecked}`);
    }
    // check the first checkbox
    const firstCheckbox = await checkboxes.first();
    const firstCheckboxInput = await firstCheckbox.locator("input");
    await firstCheckboxInput.check();
    const isFirstCheckboxChecked = await firstCheckboxInput.isChecked();
    console.log("First Checkbox is checked: ", isFirstCheckboxChecked);
    expect(isFirstCheckboxChecked).toBe(true);
    // uncheck the second checkbox
    const secondCheckbox = await checkboxes.last();
    const secondCheckboxInput = await secondCheckbox.locator("input");
    await secondCheckboxInput.uncheck();
    const isSecondCheckboxChecked = await secondCheckboxInput.isChecked();
    console.log("Second Checkbox is checked: ", isSecondCheckboxChecked);
    expect(isSecondCheckboxChecked).toBe(false);
})

test('Radio Button Test', async({page})=>{
    await page.goto("https://practice.expandtesting.com/radio-buttons");
    const radioButtons = await page.locator(".form-check");
    // get all radio buttons
    const radioButtonCount = await radioButtons.count();
    console.log("Radio Button Count: ", radioButtonCount);
    // select the Red radio button
    const redRadioButton = await radioButtons.locator("input[value='red']");
    await redRadioButton.check();
    const isRedRadioButtonChecked = await redRadioButton.isChecked();
    console.log("Red Radio Button is checked: ", isRedRadioButtonChecked);
    expect(isRedRadioButtonChecked).toBe(true);
});