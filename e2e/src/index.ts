import dotenv from 'dotenv';
import { env , getJsonFromFile  } from './env/parseEnv';
import {
    GlobalConfig,
    HostsConfig,
    PagesConfig,
    PageElementMappings,
} from './env/global';

import fs from "fs";

// Read the content of the common.env file under the env var 'COMMON_CONFIG_FILE'\
// Then populate all ofd the key:pair values in that file to the env var object
// called process.env
dotenv.config({ path: env('COMMON_CONFIG_FILE') });

// read the content of the file by its env var, then map the json content of the to the custom data type
const hostsConfig: HostsConfig = getJsonFromFile(env('HOSTS_URLS_PATH'));
// console.log("hostConfig: ", hostsConfig);

const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH'));
// console.log("pagesConfig: ", pagesConfig);

const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`);

const pageElementMappings: PageElementMappings = mappingFiles.reduce(
    (pageElementConfigAcc, file) => {
        const key = file.replace('.json', '');
        const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`);
        return { ...pageElementConfigAcc, [key]: elementMappings };
    },
    {}
);


const worldParameters: GlobalConfig = {
    hostsConfig,
    pagesConfig,
    pageElementMappings,
};

const common = `./src/features/**/*.feature \
                --require-module ts-node/register \
                --require ./src/step-definitions/**/**/*.ts \
                --world-parameters ${JSON.stringify(worldParameters)}\
                -f json:./reports/report.json`;
                // --format progress-bar
               

const dev = `${common} --tags '@dev'`;
const smoke = `${common} --tags '@smoke'`;
const regression = `${common} --tags '@regression'`;

console.log('\n🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 ✨ 🥒 \n');

export { dev, smoke, regression };
