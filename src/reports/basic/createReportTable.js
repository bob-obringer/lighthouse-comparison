const titles = {
    URL: 25,
    Score: 8,
    FMP: 8,
    TTI: 8,
    Speed: 8,
    Idle: 8
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
    speedIndex,
    firstCpuIdle,
    timeToInteractive,
    lighthouseScore,
}]) => {
    const urlCol = url.split('//')[1].split('/')[0].replace('www.', '').padEnd(titles.URL - 1);

    const scoreString = Math.round(lighthouseScore.average * 100).toString();
    const score = scoreString.padStart(titles.Score - 1);

    const idle = formatTime(firstCpuIdle.average).padStart(titles.Idle - 1);
    const si = formatTime(speedIndex.average).padStart(titles.Speed - 1);
    const tti = formatTime(timeToInteractive.average).padStart(titles.TTI - 1);
    const fmp = formatTime(firstMeaningfulPaint.average).padStart(titles.FMP - 1);

    return `| ${urlCol}|${score} |${fmp} |${tti} |${si} |${idle} |`;
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
