
import { Page } from 'playwright';
import {GlobalConfig, PageId} from '../env/global';

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

    // console.log(`* INFO: ${pageId} => path = `, currentPath)

    return pathMatchesPageId(currentPath, pageId, globalConfig)
};

export const getCurrentPageId = (
    page: Page,
    globalConfig: GlobalConfig
): PageId => {
    const { pagesConfig } = globalConfig;
    // console.log(`* INFO: pagesConfig = `, pagesConfig)

    const pageConfigPageIds = Object.keys(pagesConfig);
    // console.log(`* INFO: pageConfigPageIds = `, pageConfigPageIds)

    const { pathname: currentPath } = new URL(page.url());

    const currentPageId = pageConfigPageIds.find(pageId =>
        pathMatchesPageId(currentPath, pageId, globalConfig)
    );
    // console.log(`* INFO: currentPageId = `, currentPageId)

    if (!currentPageId) {
        throw Error(
            `Failed to get page name from current route ${currentPath}, \
             possible pages: ${JSON.stringify(pagesConfig)}`
        );
    }

    return currentPageId;
};