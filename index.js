#!/usr/bin/node

const path = require('path');
const getLighthouseResults = require('./src/lighthouse');
const getBasicReport = require('./src/reports/basic');
const writeReportFiles = require('./src/writeReportFiles');

const {
    config,
    output = '.',
    passes: argPasses,
} = require('yargs').argv;

const configPath = path.resolve(__dirname, config);
const outputFolder = path.resolve(__dirname, output, 'lighthouse-reports');

const {
    urls,
    title,
    passes: configPasses,
    lighthouseOpts,
    lighthouseConfig = {
        extends: 'lighthouse:default',
        settings: {
            onlyCategories: ['performance'],
        }
    }
} = require(configPath);

const passes = argPasses || configPasses || 5;

(async () => {
    const results = await getLighthouseResults({
        urls,
        lighthouseOpts,
        passes,
        lighthouseConfig
    });

    const {
        data,
        table
    } = getBasicReport({ results, title, passes });

    writeReportFiles({ title, table, data, folder: outputFolder });

    console.log();
    console.log(table);
})();
