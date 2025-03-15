// Import Playwright and specific types from it
import playwright, {
    BrowserContextOptions, // Options for creating a new browser context
    Page,                  // Represents a single browser tab or page
    Browser,               // Represents the browser instance
    BrowserContext,        // Represents an isolated browser session
    BrowserType            // Type for a specific browser (chromium, firefox, webkit)
} from "playwright";

// Import the custom environment variable helper from your project
import { env } from '../../env/parseEnv';

// Import Cucumber's World-related classes and interfaces
import { World, IWorldOptions, setWorldConstructor } from "@cucumber/cucumber";

// Import custom types for global configuration and variables
import { GlobalConfig, GlobalVariables } from '../../env/global';

// Define a composite type that groups together the browser, context, and page
export type Screen = {
    browser: Browser;         // The actual Playwright browser instance
    context: BrowserContext;  // An isolated browser session within the browser
    page: Page;               // A page or tab within that browser context
}

// Custom World class for Cucumber scenarios; each scenario gets its own instance.
export class ScenarioWorld extends World {
    // Constructor that receives options from Cucumber, including world parameters.
    constructor(options: IWorldOptions) {
        super(options); // Call the parent World constructor

        // Assign the global configuration from the options (passed via --world-parameters)
        this.globalConfig = options.parameters as GlobalConfig;

        // Initialize global variables; for example, currentScreen will later hold the current page ID.
        this.globalVariables = { currentScreen: "" };
    }

    // Declare properties that will be available on the ScenarioWorld instance.
    globalConfig: GlobalConfig;         // Global configuration loaded from environment parameters
    globalVariables: GlobalVariables;   // Global runtime variables, e.g., currentScreen identifier
    screen!: Screen;                    // Will hold the browser, context, and page (initialized later)

    // Asynchronously initializes the browser session for the scenario.
    // It closes any previous browser resources and creates new ones.
    async init(contextOptions?: BrowserContextOptions): Promise<Screen> {
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
        this.screen = { browser, context, page };

        // Return the new screen object for use in tests
        return this.screen;
    }

    // Private helper function to launch a new browser instance.
    // It determines which browser to launch based on an environment variable.
    private newBrowser = async (): Promise<Browser> => {
        // Define an array of supported automation browsers
        const automationBrowsers = ['chromium', 'firefox', 'webkit'];
        // Define a TypeScript type that represents one of the values in automationBrowsers
        type AutomationBrowser = typeof automationBrowsers[number];

        // Read the desired browser type from the environment variable and cast it to AutomationBrowser
        const automationBrowser = env('UI_AUTOMATION_BROWSER') as AutomationBrowser;

        // Access the specific browser type from Playwright, e.g., playwright.chromium, playwright.firefox, or playwright.webkit
        const browserType: BrowserType = playwright[automationBrowser];

        // Launch the browser with specified options:
        // - `headless` is determined by the HEADLESS environment variable (false if explicitly set to "false")
        // - Additional arguments are passed to modify browser behavior (e.g., disabling web security)
        const browser = await browserType.launch({
            headless: process.env.HEADLESS !== 'false',
            args: ['--disable-web-security', '--disable-features=IsolateOrigins, site-per-process'],
        });

        // Return the launched browser instance
        return browser;
    }
}

// Register your custom ScenarioWorld as the world constructor for Cucumber.
// This ensures that each scenario gets a new instance of ScenarioWorld.
setWorldConstructor(ScenarioWorld);
