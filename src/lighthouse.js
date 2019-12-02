const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const getSingleLighthouseResult = async ({
    url,
    opts,
    reader,
    chromeFlags,
    lighthouseConfig
}) => {
    console.log(`Processing ${url}`);
    const chrome = await chromeLauncher.launch({ chromeFlags });
    const { port } = chrome;
    const results = await lighthouse(url, {
        ...opts,
        chromeFlags,
        port
    }, lighthouseConfig);
    await chrome.kill();
    return reader ? reader(results) : results;
};

const getMultipleLighthouseResults = async ({
    urls,
    opts,
    config,
    passes,
    reader,
    chromeFlags,
    lighthouseConfig,
}) => {
    const results = {};

    for (let i = 0; i < passes; i++) {
        console.log('-------------');
        console.log(`Pass ${i + 1}`);
        for (const url of urls) {
            const urlResults = await getSingleLighthouseResult({
                url,
                opts,
                config,
                reader,
                chromeFlags,
                lighthouseConfig,
            });

            if (results[url]) {
                results[url].push(urlResults);
            } else {
                results[url] = [urlResults]
            }
        }
    }

    return results;
};

const getLighthouseResults = async ({
    url,
    urls,
    opts = {},
    config = null,
    passes = 1,
    chromeFlags = ['--headless'],
    reader,
    lighthouseConfig,
}) => {
    if (urls) {
        return getMultipleLighthouseResults({
            urls,
            opts,
            config,
            passes,
            reader,
            chromeFlags,
            lighthouseConfig
        })
    }

    return getSingleLighthouseResult({
        url,
        opts,
        config,
        reader,
        chromeFlags,
        lighthouseConfig
    });
};

module.exports = getLighthouseResults;
