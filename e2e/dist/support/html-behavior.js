"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectValue = exports.inputValue = exports.clickElement = void 0;
const clickElement = async (page, elementIdentifier) => {
  await page.click(elementIdentifier);
};
exports.clickElement = clickElement;
const inputValue = async (page, elementIdentifier, input) => {
  await page.focus(elementIdentifier);
  await page.fill(elementIdentifier, input);
};
exports.inputValue = inputValue;
const selectValue = async (page, elementIdentifier, option) => {
  await page.focus(elementIdentifier);
  await page.selectOption(elementIdentifier, option);
};
exports.selectValue = selectValue;