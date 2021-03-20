
const fs = require('fs');

fs.readFile('package.json', (error, data) => {

    if (error) return console.log('package.json: Async File Read Failed');

    console.log('package.json: Async File Read Successful');

    console.log(data.toString());
});

fs.readFile('package-lock.json', (error, data) => {

    if (error) return console.log('package-lock.json: Async File Read Failed');

    console.log('package-lock.json: Async File Read Successful');

    console.log(data.toString());
});

let data;

try {
    data = fs.readFileSync('package.json');

    console.log('package.json: Sync File Read Successful');

    console.log(data.toString());
} catch (error)  {
    console.log('package.json: Sync File Read Failed');
}

try {
    data = fs.readFileSync('package-lock.json');

    console.log('package-lock.json: Sync File Read Successful');

    console.log(data.toString());
} catch (error) {
    console.log('package-lock.json: Sync File Read Failed');
}

