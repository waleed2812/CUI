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

const readable_stream = fs.createReadStream('package.json');

readable_stream.on('data', function(data) {

    console.log('my_new_file.txt: Async File Stream Read Successful');

    process.stdout.write(data.toString());
});

readable_stream.on('end', function() {
    console.log();
});

readable_stream.on('error', function(error) {

    console.error('my_new_file.txt: Async File Stream Read Failed');

    console.error(error.message);
});
