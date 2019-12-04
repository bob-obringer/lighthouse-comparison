const createReportTable = require('./createReportTable');
const parseResults = require('./calculateResults');

const getBasicReport = ({ results, title, passes }) => {
    const data = parseResults(results);
    const table = createReportTable({ data, title, passes });

    return {
        data,
        table
    }
};

module.exports = getBasicReport;
