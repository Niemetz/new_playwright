
import { Page } from 'playwright';
import {GlobalConfig, GlobalVariables, PageId} from '../env/global';

export const navigateToPage = async (
    page: Page,
    pageId: PageId,
    { pagesConfig, hostsConfig }: GlobalConfig
): Promise<void> => {
    const {
        UI_AUTOMATION_HOST: hostName = 'localhost',
    } = process.env;

    const hostPath = hostsConfig[`${hostName}`];
    // console.log("hostpath: ", hostPath )

    const url = new URL(hostPath);
    // console.log("url: ", url )

    const pageConfigItem = pagesConfig[pageId];

    url.pathname = pageConfigItem.route;
    // console.log("page route: ", url.pathname )

    await page.goto(url.href);
};

const pathMatchesPageId = (
    path: string,
    pageId: PageId,
    { pagesConfig }: GlobalConfig
): boolean => {
    const pageRegexString = pagesConfig[pageId].regex
    const pageRegex = new RegExp(pageRegexString)
    return pageRegex.test(path)
};

export const currentPathMatchesPageId = (
    page: Page,
    pageId: PageId,
    globalConfig: GlobalConfig
): boolean => {
    const { pathname: currentPath } = new URL(page.url())
    return pathMatchesPageId(currentPath, pageId, globalConfig)
};