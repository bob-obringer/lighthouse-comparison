const mapLighthouseReport = (results) => {
    const {
        lhr: {
            audits: {
                "first-meaningful-paint": {
                    numericValue: firstMeaningfulPaint
                },
                "speed-index": {
                    numericValue: speedIndex
                },
                "first-cpu-idle": {
                    numericValue: firstCpuIdle
                },
                interactive: {
                    numericValue: timeToInteractive
                },
            },
            categories: {
                performance: {
                    score: lighthouseScore
                }
            }
        }
    } = results;

    return {
        firstMeaningfulPaint,
        speedIndex,
        firstCpuIdle,
        timeToInteractive,
        lighthouseScore
    }
};

module.exports = mapLighthouseReport;
