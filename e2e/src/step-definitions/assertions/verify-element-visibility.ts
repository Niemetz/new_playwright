import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { setDefaultTimeout } from '@cucumber/cucumber';



Then('the {string} should be displayed', async (elementKey: string) => {

        console.log(`INFO: the ${elementKey} should be displayed`);

        const locator = global.page.locator("[data-id='playground-button']");
        
        await expect(locator).toBeVisible();
    }
);

Then('the {string} should contain the text {string}', async(elementKey: string, expectedElementText: string) => {

        console.log(`INFO: the ${elementKey} should contain the text ${expectedElementText}`)

        const content = await global.page.textContent("[data-id='contacts']")

        expect(content).toBe(expectedElementText)

    }
)