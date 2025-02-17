set tag=$1
@REM remember to comment out these  COMMON_CONFIG_FILE in the package.json file 
@REM when to run this on WINDOWS emv.
@REM "cucumber": "yarn cucumber-compile",
@REM "postcucumber": "ts-node ./src/reporter/cucumber-report.ts"

set COMMON_CONFIG_FILE=env/common.env
npm run cucumber -- --profile %tag% || npm run postcucumber