"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigateToPage = exports.currentPathMatchesPageId = void 0;
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
  return pathMatchesPageId(currentPath, pageId, globalConfig);
};
exports.currentPathMatchesPageId = currentPathMatchesPageId;