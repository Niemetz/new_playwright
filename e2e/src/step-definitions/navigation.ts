import { Given } from '@cucumber/cucumber'
import {
    navigateToPage,
} from '../support/navigation-behavior';

import { ScenarioWorld } from './setup/world';
import { PageId } from '../env/global'

Given('I am on the {string}',
    async function(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalVariables,
            globalConfig,

        } = this;

        console.log(`I am on the ${pageId}`);

        globalVariables.currentScreen = pageId;

        await navigateToPage(page, pageId, globalConfig);

    }
)