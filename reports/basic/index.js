const createReportTable = require('./createReportTable');
const parseResults = require('./parseResults');

const getBasicReport = ({ results, title, passes }) => {
    const data = parseResults(results);
    const table = createReportTable({ data, title, passes });

    return {
        data,
        table
    }
};

module.exports = getBasicReport;
