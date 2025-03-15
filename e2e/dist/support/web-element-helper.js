"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementLocator = void 0;
const getElementLocator = (page, elementKey, globalVariables, globalConfig) => {
  const {
    pageElementMappings
  } = globalConfig;
  const currentPage = globalVariables.currentScreen;

  // return pageElementMapp   ings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey];
  return pageElementMappings[currentPage]?.[elementKey];
};
exports.getElementLocator = getElementLocator;