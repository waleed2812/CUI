//
// process.stdin.once('data', (data) => {
//     process.stdout.write('Hello ' + data.toString());
//     process.stdin.pause();
// });
//
// process.stdout.write('What is Your Name ? w');
//
// process.stdin.resume();

const fs = require('fs');

const stream = fs.createReadStream('package.json');

stream.on('data', function(data) {

    console.log('my_new_file.txt: Async File Stream Read Successful');

    process.stdout.write(data.toString());
});

stream.on('end', function() {
    console.log();
});

stream.on('error', function(error) {

    console.error('my_new_file.txt: Async File Stream Read Failed');

    console.error(error.message);
});
