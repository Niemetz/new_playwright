import { Given, When, Then } from '@cucumber/cucumber'

Given('I am on the {string} page', async(pageId: string) => {
    console.log(`INFO: I am on the ${pageId} page`);
    await global.page.goto("http://localhost:3000/")
    }
)