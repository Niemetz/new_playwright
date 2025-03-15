"use strict";

var _cucumber = require("@cucumber/cucumber");
var _webElementHelper = require("../../support/web-element-helper");
var _waitForBehavior = require("../../support/wait-for-behavior");
// import { expect } from '@playwright/test'

// import { GlobalConfig, PageId } from '../../env/global';

// import {GlobalConfig, PageId, ElementKey} from '../../env/global';

(0, _cucumber.Then)('the {string} should be displayed', async function (elementKey) {
  const {
    screen: {
      page
    },
    globalVariables,
    globalConfig
  } = this;
  console.log(`the ${elementKey} should be displayed`);
  const elementIdentifier = (0, _webElementHelper.getElementLocator)(page, elementKey, globalVariables, globalConfig);

  // const locator = page.locator("[data-id='playground-button']");
  //  await expect(elementIdentifier).toBeVisible();
  await (0, _waitForBehavior.waitFor)(async () => {
    const isElementVisible = (await page.$(elementIdentifier)) != null;
    return isElementVisible;
  });
});