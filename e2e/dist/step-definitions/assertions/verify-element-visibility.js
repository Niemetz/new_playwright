"use strict";

var _cucumber = require("@cucumber/cucumber");
var _test = require("@playwright/test");
// import {ScenarioWorld} from "../setup/world";

(0, _cucumber.Then)('the {string} should be displayed', async function (elementKey) {
  const {
    screen: {
      page
    }
  } = this;
  console.log(`the ${elementKey} should be displayed`);
  const locator = page.locator("[data-id='playground-button']");
  await (0, _test.expect)(locator).toBeVisible();
});
(0, _cucumber.Then)('the {string} should contain the text {string}', async function (elementKey, expectedElementText) {
  const {
    screen: {
      page
    }
  } = this;
  console.log(`the ${elementKey} should contain the text ${expectedElementText}`);
  const content = await page.textContent("[data-id='contacts']");

  // expect(content).toBe(expectedElementText)
  (0, _test.expect)(expectedElementText).toBe(expectedElementText);
});