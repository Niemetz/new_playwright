// import dotenv from 'dotenv';
// import reporter, { Options } from 'cucumber-html-reporter';
// import { env } from '../env/parseEnv';

// dotenv.config({ path: env('COMMON_CONFIG_FILE') });

// const options: Options = {
//     theme: 'bootstrap',
//     jsonFile: env('JSON_REPORT_FILE'),
//     output: env('HTML_REPORT_FILE'),
//     screenshotsDirectory: env('SCREENSHOT_PATH'),
//     storeScreenshots: true,
//     reportSuiteAsScenarios: true,
//     launchReport: true,
// };

// reporter.generate(options);

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import reporter, { Options } from 'cucumber-html-reporter';
import { env } from '../env/parseEnv';
import stripAnsi from 'strip-ansi';

// Load environment variables from your config file
dotenv.config({ path: env('COMMON_CONFIG_FILE') });

// Get the original JSON report file path from the environment
const originalJsonFilePath = env('JSON_REPORT_FILE');

// Create a new file path for the cleaned JSON report
const cleanedJsonFilePath = originalJsonFilePath.replace('.json', '.clean.json');

// Read the original JSON report file as text
const originalJsonData = fs.readFileSync(originalJsonFilePath, 'utf8');

let parsedData;
try {
  parsedData = JSON.parse(originalJsonData);
} catch (err) {
  console.error('Error parsing JSON file:', err);
  process.exit(1);
}

// A recursive function to strip ANSI codes from all string values in an object
function stripAnsiFromObject(obj: any): any {
  if (typeof obj === 'string') {
    return stripAnsi(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(stripAnsiFromObject);
  } else if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = stripAnsiFromObject(obj[key]);
    }
    return newObj;
  }
  return obj;
}

const cleanedData = stripAnsiFromObject(parsedData);
const cleanedJsonData = JSON.stringify(cleanedData, null, 2);

// Write the cleaned JSON data to the new file
fs.writeFileSync(cleanedJsonFilePath, cleanedJsonData, 'utf8');

// Set up the options for the reporter using the cleaned JSON file
const options: Options = {
  theme: 'bootstrap',
  jsonFile: cleanedJsonFilePath, // Use the cleaned JSON file
  output: env('HTML_REPORT_FILE'),
  screenshotsDirectory: env('SCREENSHOT_PATH'),
  storeScreenshots: true,
  reportSuiteAsScenarios: true,
  launchReport: false,
};

// Generate the HTML report
reporter.generate(options);


// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import reporter, { Options } from 'cucumber-html-reporter';
// import { env } from '../env/parseEnv';
// import stripAnsi from 'strip-ansi';

// // Load environment variables from your config file
// dotenv.config({ path: env('COMMON_CONFIG_FILE') });

// // Get the original JSON report file path from the environment
// const originalJsonFilePath = env('JSON_REPORT_FILE');

// // Create a new file path for the cleaned JSON report
// const cleanedJsonFilePath = originalJsonFilePath.replace('.json', '.clean.json');

// // Read the original JSON report file as text
// const originalJsonData = fs.readFileSync(originalJsonFilePath, 'utf8');

// let parsedData;
// try {
//   parsedData = JSON.parse(originalJsonData);
// } catch (err) {
//   console.error('Error parsing JSON file:', err);
//   process.exit(1);
// }


// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import reporter, { Options } from 'cucumber-html-reporter';
// import { env } from '../env/parseEnv';
// import stripAnsi from 'strip-ansi';

// // Load environment variables from your config file
// dotenv.config({ path: env('COMMON_CONFIG_FILE') });

// // Get the original JSON report file path from the environment
// const originalJsonFilePath = env('JSON_REPORT_FILE');

// // Create a new file path for the cleaned JSON report
// const cleanedJsonFilePath = originalJsonFilePath.replace('.json', '.clean.json');

// // Read the original JSON report file as text
// const originalJsonData = fs.readFileSync(originalJsonFilePath, 'utf8');

// let parsedData;
// try {
//   parsedData = JSON.parse(originalJsonData);
// } catch (err) {
//   console.error('Error parsing JSON file:', err);
//   process.exit(1);
// }

// // A helper function that removes ANSI codes and stack trace lines from a string
// function cleanString(str: string): string {
//   // First, remove ANSI escape codes
//   let cleaned = stripAnsi(str);
//   // Then, remove lines that look like stack trace entries (i.e. starting with "at ")
//   cleaned = cleaned
//     .split('\n')
//     .filter(line => !line.trim().startsWith('at '))
//     .join('\n');
//   return cleaned;
// }

// // A recursive function to clean all string values in an object/array
// function cleanErrorMessages(obj: any): any {
//   if (typeof obj === 'string') {
//     return cleanString(obj);
//   } else if (Array.isArray(obj)) {
//     return obj.map(cleanErrorMessages);
//   } else if (obj !== null && typeof obj === 'object') {
//     const newObj: any = {};
//     for (const key in obj) {
//       newObj[key] = cleanErrorMessages(obj[key]);
//     }
//     return newObj;
//   }
//   return obj;
// }

// // Process the parsed JSON data to remove ANSI codes and stack traces
// const cleanedData = cleanErrorMessages(parsedData);
// const cleanedJsonData = JSON.stringify(cleanedData, null, 2);

// // Write the cleaned JSON data to a new file
// fs.writeFileSync(cleanedJsonFilePath, cleanedJsonData, 'utf8');

// // Set up the options for the reporter using the cleaned JSON file
// const options: Options = {
//   theme: 'bootstrap',
//   jsonFile: cleanedJsonFilePath, // Use the cleaned JSON report
//   output: env('HTML_REPORT_FILE'),
//   screenshotsDirectory: env('SCREENSHOT_PATH'),
//   storeScreenshots: true,
//   reportSuiteAsScenarios: true,
//   launchReport: true,
// };

// // Generate the HTML report
// reporter.generate(options);
