"use strict";

var _cucumber = require("@cucumber/cucumber");
// import { ScenarioWorld } from './setup/world';

(0, _cucumber.Given)('I am on the {string} page', async function (pageId) {
  const {
    screen: {
      page
    }
  } = this;
  console.log(`I am on the ${pageId} page`);
  await page.goto("http://localhost:3000/");
});