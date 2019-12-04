const getLighthouseResults = require('./src/lighthouse');
const getBasicReport = require('./src/reports/basic');
const writeReportFiles = require('./src/writeReportFiles');

const {
    config = 'homepage',
} = require('yargs').argv;

const {
    urls,
    title,
    passes = 5,
    lighthouseOpts,
    lighthouseConfig = {
        extends: 'lighthouse:default',
        settings: {
            onlyCategories: ['performance'],
        }
    }
} = require(`./config/${config}.json`);

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

    writeReportFiles({ title, table, data });

    console.log();
    console.log(table);
})();
