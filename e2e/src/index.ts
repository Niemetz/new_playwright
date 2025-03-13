import dotenv from 'dotenv';
import { env , getJsonFromFile  } from './env/parseEnv';
import {
    GlobalConfig,
    HostsConfig,
    PagesConfig,
    // PageElementMappings,
} from './env/global';

// Read the content of the common.env file under the env var 'COMMON_CONFIG_FILE'\
// Then populate all ofd the key:pair values in that file to the env var object
// called process.env
dotenv.config({ path: env('COMMON_CONFIG_FILE') });

const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH'));
console.log("hostConfig: ", hostsConfig);

const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH'));
console.log("pagesConfig: ", pagesConfig);

const worldParameters: GlobalConfig = {
    hostsConfig,
    pagesConfig,
    // pageElementMappings,
};

const common = `./src/features/**/*.feature \
                --require-module ts-node/register \
                --require ./src/step-definitions/**/**/*.ts \
                -f json:./reports/report.json \
                --world-parameters ${JSON.stringify(worldParameters)}`;

const dev = `${common} --tags '@dev'`;
const smoke = `${common} --tags '@smoke'`;
const regression = `${common} --tags '@regression'`;

console.log('\n🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 \n');

export { dev, smoke, regression };
