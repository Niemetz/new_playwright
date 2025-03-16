"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementLocator = void 0;
var _navigationBehavior = require("./navigation-behavior");
// import {ElementKey, ElementLocator, GlobalConfig, GlobalVariables} from '../env/global';

const getElementLocator = (page, elementKey, globalConfig) => {
  const {
    pageElementMappings
  } = globalConfig;

  // const currentPage = globalVariables.currentScreen;
  const currentPage = (0, _navigationBehavior.getCurrentPageId)(page, globalConfig);

  // return pageElementMapp   pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];
  return pageElementMappings[currentPage]?.[elementKey];
};
exports.getElementLocator = getElementLocator;