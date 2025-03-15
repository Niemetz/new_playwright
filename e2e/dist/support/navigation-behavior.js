"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigateToPage = void 0;
// import {GlobalConfig, GlobalVariables, PageId} from '../env/global';

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