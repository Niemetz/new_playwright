"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScenarioWorld = void 0;
var _playwright = _interopRequireDefault(require("playwright"));
var _parseEnv = require("../../env/parseEnv");
var _cucumber = require("@cucumber/cucumber");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// Import Playwright and specific types from it

// Import the custom environment variable helper from your project

// Import Cucumber's World-related classes and interfaces

// Import custom types for global configuration and variables

// Define a composite type that groups together the browser, context, and page

// Custom World class for Cucumber scenarios; each scenario gets its own instance.
class ScenarioWorld extends _cucumber.World {
  // Constructor that receives options from Cucumber, including world parameters.
  constructor(options) {
    super(options); // Call the parent World constructor

    // Assign the global configuration from the options (passed via --world-parameters)
    this.globalConfig = options.parameters;

    // Initialize global variables; for example, currentScreen will later hold the current page ID.
    this.globalVariables = {
      currentScreen: ""
    };
  }

  // Declare properties that will be available on the ScenarioWorld instance.
  // Global configuration loaded from environment parameters
  // Global runtime variables, e.g., currentScreen identifier

  // Will hold the browser, context, and page (initialized later)

  // Asynchronously initializes the browser session for the scenario.
  // It closes any previous browser resources and creates new ones.
  async init(contextOptions) {
    // Close the existing page, if any (using optional chaining to avoid errors if undefined)
    await this.screen?.page?.close();
    // Close the existing browser context, if any
    await this.screen?.context?.close();
    // Close the existing browser, if any
    await this.screen?.browser?.close();

    // Launch a new browser using the helper method newBrowser()
    const browser = await this.newBrowser();

    // Create a new browser context with the given options (if provided)
    const context = await browser.newContext(contextOptions);

    // Create a new page (tab) within the new context
    const page = await context.newPage();

    // Store the new browser, context, and page in the screen property
    this.screen = {
      browser,
      context,
      page
    };

    // Return the new screen object for use in tests
    return this.screen;
  }

  // Private helper function to launch a new browser instance.
  // It determines which browser to launch based on an environment variable.
  newBrowser = async () => {
    // Define an array of supported automation browsers
    const automationBrowsers = ['chromium', 'firefox', 'webkit'];
    // Define a TypeScript type that represents one of the values in automationBrowsers

    // Read the desired browser type from the environment variable and cast it to AutomationBrowser
    const automationBrowser = (0, _parseEnv.env)('UI_AUTOMATION_BROWSER');

    // Access the specific browser type from Playwright, e.g., playwright.chromium, playwright.firefox, or playwright.webkit
    const browserType = _playwright.default[automationBrowser];

    // Launch the browser with specified options:
    // - `headless` is determined by the HEADLESS environment variable (false if explicitly set to "false")
    // - Additional arguments are passed to modify browser behavior (e.g., disabling web security)
    const browser = await browserType.launch({
      headless: process.env.HEADLESS !== 'false',
      args: ['--disable-web-security', '--disable-features=IsolateOrigins, site-per-process']
    });

    // Return the launched browser instance
    return browser;
  };
}

// Register your custom ScenarioWorld as the world constructor for Cucumber.
// This ensures that each scenario gets a new instance of ScenarioWorld.
exports.ScenarioWorld = ScenarioWorld;
(0, _cucumber.setWorldConstructor)(ScenarioWorld);