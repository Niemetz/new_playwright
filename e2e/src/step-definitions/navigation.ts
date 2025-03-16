import { Given } from '@cucumber/cucumber'
import {
    currentPathMatchesPageId,
    navigateToPage,
} from '../support/navigation-behavior';
import { ScenarioWorld } from './setup/world';
import { PageId } from '../env/global'
import { waitFor } from '../support/wait-for-behavior';

Given('I am on the {string}',
    async function(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalConfig,

        } = this;

        console.log(`I am on the ${pageId}`);
         
        // go to the page based on an entry in the pages.json file
        await navigateToPage(page, pageId, globalConfig);

        // if the regrex path matched the path that is specifed in the pages.json file then wait until that tab is fully loaded
        await waitFor(() => currentPathMatchesPageId(page, pageId, globalConfig));

    }
)