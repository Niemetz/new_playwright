import { Before, After, ITestCaseHookParameter } from '@cucumber/cucumber';
import { env } from '../../env/parseEnv';
import { ScenarioWorld } from './world';

Before(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
    console.log(`🥒 Running scenario: "${scenario.pickle.name}"`);
    const contextOptions = {
        // recordVideo: {
        //     dir: `${env('VIDEO_PATH')}${scenario.pickle.name}`,
        // },
    };

    const ready = await this.init(contextOptions);
    return ready;
});

After(async function (this: ScenarioWorld, scenario: ITestCaseHookParameter) {
    const {
        screen: { page, browser },
    } = this;
    const scenarioStatus = scenario.result?.status;

    if (scenarioStatus === 'FAILED') {
        const screenshot = await page.screenshot({
            path: `${env('SCREENSHOT_PATH')}${scenario.pickle.name}.png`,
        });
        await this.attach( screenshot,'image/jnp')
    }

    await browser.close();
    return browser;
});


