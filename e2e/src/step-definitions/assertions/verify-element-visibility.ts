import { Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global';
import { getElementLocator } from '../../support/web-element-helper';
import { waitFor } from '../../support/wait-for-behavior';
import { ScenarioWorld } from '../setup/world';

Then('the {string} should be displayed',
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this;

        console.log(`the ${elementKey} should be displayed`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
     
        await waitFor(async () => {
            const isElementVisible = (await page.$(elementIdentifier)) != null;
            return isElementVisible;
        });
    }
);