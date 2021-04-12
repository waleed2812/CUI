const fs = require('fs');

const readableStream = fs.createReadStream('package.json');

const writableStream = fs.createWriteStream('file2.txt');

readableStream.pipe(writableStream);
