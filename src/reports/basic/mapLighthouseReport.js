const mapLighthouseReport = (results) => {
    const {
        lhr: {
            audits: {
                "first-meaningful-paint": {
                    numericValue: firstMeaningfulPaint
                },
                "total-blocking-time": {
                    numericValue: totalBlockingTime
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
        totalBlockingTime,
        lighthouseScore
    }
};

module.exports = mapLighthouseReport;
