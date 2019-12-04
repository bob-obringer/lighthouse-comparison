const math = require('mathjs');
const mapLighthouseReport = require('./mapLighthouseReport');

const addNewValueToTotals = (totals = {}, newValue) => {
    if (!newValue) {
        console.log('DIDNT GET NEW VALUE');
        return totals;
    }

    const count = (totals.count || 0) + 1;
    const values = [...(totals.values || []), newValue];
    const high = totals.high ? Math.max(totals.high, newValue) : newValue;
    const low = totals.low ? Math.min(totals.low, newValue) : newValue;
    const total = (totals.total || 0) + newValue;
    const average = total / count;
    const standardDeviation = math.std(values);

    return { values, total, count, high, low, average, standardDeviation };
};

/*
    TODO: This is hard to understand, fix it
 */
const reduceResultsForSingleUrl = (totals, urlResult) => (
    Object.keys(urlResult).reduce((totalsAccum, property) => ({
        ...totalsAccum,
        [property]: addNewValueToTotals(totals[property], urlResult[property])
    }), totals)
);

const reduceResultsForUrlEntries = (resultsByUrl, [url, urlResults]) => ({
    ...resultsByUrl,
    [url]: urlResults
        .map(mapLighthouseReport)
        .reduce(reduceResultsForSingleUrl, {})
});

const parseResults = (results) => (
    Object
        .entries(results)
        .reduce(reduceResultsForUrlEntries, {})
);

module.exports = parseResults;
