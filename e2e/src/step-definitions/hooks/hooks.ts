import {BeforeAll, Before, AfterAll, After} from "@cucumber/cucumber";
const {chromium} = require("playwright");


BeforeAll({ timeout: 70000 }, async() => {
    global.browser = await chromium.launch({
        headless:false,
    })
});

AfterAll(async() => {
    await global.browser.close();
});

Before(async() => {
    global.context = await global.browser.newContext();
    global.page = await global.context.newPage();
});

After(async() => {
    // Added the contect.close below
    await global.context.close();
    await global.page.close();
});

