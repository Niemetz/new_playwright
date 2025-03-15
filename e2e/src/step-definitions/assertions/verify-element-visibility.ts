import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ElementKey } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { GlobalConfig, PageId } from '../../env/global';
import { waitFor } from '../../support/wait-for-behavior';
// import {GlobalConfig, PageId, ElementKey} from '../../env/global';
import { ScenarioWorld } from '../setup/world';

Then('the {string} should be displayed',
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page },
            globalVariables,
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should be displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig);

        // const locator = page.locator("[data-id='playground-button']");
        //  await expect(elementIdentifier).toBeVisible();
        await waitFor(async () => {
            const isElementVisible = (await page.$(elementIdentifier)) != null;
            return isElementVisible;
        });
    }
);

Then('the {string} should contain the text {string}',
    async function(this: ScenarioWorld, elementKey: string, expectedElementText: string) {
        const {
            screen: { page },
            globalVariables,
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should contain the text ${expectedElementText}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig)

        await waitFor(async () => {
            const elementText = await page.textContent(elementIdentifier)
            return elementText?.includes(expectedElementText);
        });

        // const content = await page.textContent("[data-id='contacts']")

        // // expect(content).toBe(expectedElementText)
        // expect(expectedElementText).toBe(expectedElementText)

    }
)
