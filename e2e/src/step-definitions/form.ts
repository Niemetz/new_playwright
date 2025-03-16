import { Then } from '@cucumber/cucumber';
import {
    selectValue,
    inputValue,
} from '../support/html-behavior';
import { waitFor } from '../support/wait-for-behavior';
import { getElementLocator } from '../support/web-element-helper';
import { ScenarioWorld } from './setup/world';
import { ElementKey } from '../env/global';

Then (
    `I fill in the {string} with {string}`,
    async function (this: ScenarioWorld, elementKey: ElementKey, input: string) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`I fill in the ${elementKey} with ${input}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
        await waitFor(async () => {
            const result = await page.waitForSelector(elementIdentifier, { state: 'visible' });

            if (result) {
                await inputValue(page, elementIdentifier, input);
            }
            return result;
        });
    }
);

Then(
    `I select the {string} option from the {string}`,
    async function (this: ScenarioWorld, option: string, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`I select the ${option} option from the ${elementKey}`);
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
            const result = await page.waitForSelector(elementIdentifier, { state: 'visible' });

            if (result) {
                await selectValue(page, elementIdentifier, option);
            }
            return result;
        });
    }
);
