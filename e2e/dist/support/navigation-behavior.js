"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigateToPage = exports.getCurrentPageId = exports.currentPathMatchesPageId = void 0;
const navigateToPage = async (page, pageId, _ref) => {
  let {
    pagesConfig,
    hostsConfig
  } = _ref;
  const {
    UI_AUTOMATION_HOST: hostName = 'localhost'
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
exports.navigateToPage = navigateToPage;
const pathMatchesPageId = (path, pageId, _ref2) => {
  let {
    pagesConfig
  } = _ref2;
  const pageRegexString = pagesConfig[pageId].regex;
  const pageRegex = new RegExp(pageRegexString);
  return pageRegex.test(path);
};
const currentPathMatchesPageId = (page, pageId, globalConfig) => {
  const {
    pathname: currentPath
  } = new URL(page.url());

  // console.log(`* INFO: ${pageId} => path = `, currentPath)

  return pathMatchesPageId(currentPath, pageId, globalConfig);
};
exports.currentPathMatchesPageId = currentPathMatchesPageId;
const getCurrentPageId = (page, globalConfig) => {
  const {
    pagesConfig
  } = globalConfig;
  // console.log(`* INFO: pagesConfig = `, pagesConfig)

  const pageConfigPageIds = Object.keys(pagesConfig);
  // console.log(`* INFO: pageConfigPageIds = `, pageConfigPageIds)

  const {
    pathname: currentPath
  } = new URL(page.url());
  const currentPageId = pageConfigPageIds.find(pageId => pathMatchesPageId(currentPath, pageId, globalConfig));
  // console.log(`* INFO: currentPageId = `, currentPageId)

  if (!currentPageId) {
    throw Error(`Failed to get page name from current route ${currentPath}, \
             possible pages: ${JSON.stringify(pagesConfig)}`);
  }
  return currentPageId;
};
exports.getCurrentPageId = getCurrentPageId;