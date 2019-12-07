const titles = {
    URL: 25,
    Score: 8,
    FMP: 8,
    TBT: 8
};

const getBorderRow = () => "-".repeat(Object.values(titles).reduce((a, v) => a + v + 1, 1));

const getHeader = () => (
    Object
        .entries(titles)
        .reduce((row, [title, width], index) => (
            `${row} ${title[index === 0 ? 'padEnd' : 'padStart'](width - 2)} |`
        ), "|")
);

const formatTime = (time) => (time / 1000).toFixed(1).toLocaleString();

const getResultRow = ([url, {
    firstMeaningfulPaint,
    totalBlockingTime,
    lighthouseScore,
}]) => {
    const urlCol = url.split('//')[1].split('/')[0].replace('www.', '').padEnd(titles.URL - 1);

    const scoreString = Math.round(lighthouseScore.average * 100).toString();
    const score = scoreString.padStart(titles.Score - 1);

    const tbt = formatTime(totalBlockingTime.average).padStart(titles.TBT - 1);
    const fmp = formatTime(firstMeaningfulPaint.average).padStart(titles.FMP - 1);

    return `| ${urlCol}|${score} |${fmp} |${tbt} |`;
};

const createReportTable = ({ data, title, passes }) => (
    `${title} (Average of ${passes} Passes)
${getBorderRow()}
${getHeader()}
${getBorderRow()}
${Object.entries(data).map(getResultRow).join('\n')}
${getBorderRow()}
`);

module.exports = createReportTable;
