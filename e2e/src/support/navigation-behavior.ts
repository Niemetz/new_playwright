
import { Page } from 'playwright';
import {GlobalConfig, PageId} from '../env/global';
// import {GlobalConfig, GlobalVariables, PageId} from '../env/global';

export const navigateToPage = async (
    page: Page,
    pageId: PageId,
    { pagesConfig, hostsConfig }: GlobalConfig
): Promise<void> => {
    const {
        UI_AUTOMATION_HOST: hostName = 'localhost',
    } = process.env;

    const hostPath = hostsConfig[`${hostName}`];
    console.log("hostpath: ", hostPath )

    const url = new URL(hostPath);
    console.log("url: ", url )

    const pageConfigItem = pagesConfig[pageId];

    url.pathname = pageConfigItem.route;
    console.log("page route: ", url.pathname )

    await page.goto(url.href);
};
