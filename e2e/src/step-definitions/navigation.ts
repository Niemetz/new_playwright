import { Given } from '@cucumber/cucumber'
// import { ScenarioWorld } from './setup/world';

Given('I am on the {string} page',
    async function(pageId: string) {
        const {
            screen: { page },
        } = this;

        console.log(`I am on the ${pageId} page`);

        await page.goto("http://localhost:3000/");

    }
)