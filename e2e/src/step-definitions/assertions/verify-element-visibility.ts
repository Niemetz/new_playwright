import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
// import {ScenarioWorld} from "../setup/world";

Then('the {string} should be displayed',
    async function (elementKey: string) {
        const {
            screen: { page },
        } = this;

        console.log(`the ${elementKey} should be displayed`);

        const locator = page.locator("[data-id='playground-button']");
        await expect(locator).toBeVisible();
    }
);

Then('the {string} should contain the text {string}',
    async function(elementKey: string, expectedElementText: string) {
        const {
            screen: { page },
        } = this;

        console.log(`the ${elementKey} should contain the text ${expectedElementText}`)

        const content = await page.textContent("[data-id='contacts']")

        expect(content).toBe(expectedElementText)

    }
)
