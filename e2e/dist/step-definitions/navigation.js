"use strict";

var _cucumber = require("@cucumber/cucumber");
var _navigationBehavior = require("../support/navigation-behavior");
// import { ScenarioWorld } from './setup/world';

(0, _cucumber.Given)('I am on the {string}', async function (pageId) {
  const {
    screen: {
      page
    },
    globalConfig
  } = this;
  console.log(`I am on the ${pageId}`);
  await (0, _navigationBehavior.navigateToPage)(page, pageId, globalConfig);
});