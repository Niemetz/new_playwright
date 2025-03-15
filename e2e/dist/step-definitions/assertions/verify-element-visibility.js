"use strict";

var _cucumber = require("@cucumber/cucumber");
var _webElementHelper = require("../../support/web-element-helper");
var _waitForBehavior = require("../../support/wait-for-behavior");
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
(0, _cucumber.Then)('the {string} should contain the text {string}', async function (elementKey, expectedElementText) {
  const {
    screen: {
      page
    },
    globalVariables,
    globalConfig
  } = this;
  console.log(`the ${elementKey} should contain the text ${expectedElementText}`);
  const elementIdentifier = (0, _webElementHelper.getElementLocator)(page, elementKey, globalVariables, globalConfig);
  await (0, _waitForBehavior.waitFor)(async () => {
    const elementText = await page.textContent(elementIdentifier);
    return elementText?.includes(expectedElementText);
  });

  // const content = await page.textContent("[data-id='contacts']")

  // // expect(content).toBe(expectedElementText)
  // expect(expectedElementText).toBe(expectedElementText)
});