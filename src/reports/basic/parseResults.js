const math = require('mathjs');
const readResults = require('./readResults');

const getDefaultsForAllProperties = (selectedMetrics) => (
    Object.keys(selectedMetrics).reduce((accum, key) => ({
        ...accum,
        [key]: {
            values: [],
            total: 0,
            count: 0,
            high: null,
            low: null,
            average: null,
            standardDeviation: null
        }
    }), {})
);

const addNewValueToTotals = (totals, newValue) => {
    if (!newValue) {
        console.log('DIDNT GET NEW VALUE');
        return totals;
    }

    const count = totals.count + 1;
    const values = [...totals.values, newValue];
    const high = Math.max(totals.high, newValue);
    const low = (!totals.low && totals.low !== 0) ? newValue : Math.min(totals.low, newValue);
    const total = totals.total + newValue;
    const average = total / count;
    const standardDeviation = math.std(values);

    return { values, total, count, high, low, average, standardDeviation };
};

const reduceResultsForSingleUrl = (totals, urlResult) => (
    Object.keys(urlResult).reduce((totalsAccum, property) => ({
        ...totalsAccum,
        [property]: addNewValueToTotals(totals[property], urlResult[property])
    }), totals)
);

const reduceResultsForUrlEntries = (resultsByUrl, [url, urlResults]) => {
    const mappedResults = urlResults.map((results) => readResults(results));
    return ({
        ...resultsByUrl,
        [url]: mappedResults
            .reduce(reduceResultsForSingleUrl, getDefaultsForAllProperties(mappedResults[0]))
    });
};

const parseResults = (results) => (
    Object
        .entries(results)
        .reduce(reduceResultsForUrlEntries, {})
);

module.exports = parseResults;
