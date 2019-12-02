const fs = require('fs');

const getDateTime = () => {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const time = date.toTimeString().split(' ')[0];

    return `${year}-${month}-${day} ${time}`
};

const writeReportFiles = ({ title, table, data }) => {
    const folder = `output/${title}`;
    const fileName = `${folder}/${getDateTime()}`;

    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(`${fileName}.txt`, table, "utf-8");
    fs.writeFileSync(`${fileName}.json`, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = writeReportFiles;
