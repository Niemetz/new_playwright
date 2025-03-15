"use strict";

var _cucumber = require("@cucumber/cucumber");
var _navigationBehavior = require("../support/navigation-behavior");
var _waitForBehavior = require("../support/wait-for-behavior");
(0, _cucumber.Given)('I am on the {string}', async function (pageId) {
  const {
    screen: {
      page
    },
    globalVariables,
    globalConfig
  } = this;
  console.log(`I am on the ${pageId}`);
  globalVariables.currentScreen = pageId;

  // go to the page based on an entry in the pages.json file
  await (0, _navigationBehavior.navigateToPage)(page, pageId, globalConfig);

  // if the regrex path matched the path that is specifed in the pages.json file then wait until that tab is fully loaded
  await (0, _waitForBehavior.waitFor)(() => (0, _navigationBehavior.currentPathMatchesPageId)(page, pageId, globalConfig));
});