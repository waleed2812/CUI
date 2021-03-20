
const fs = require('fs');

fs.open('my_new_file.txt', 'w', (error, data) => {

    if (error) return console.log('my_new_file.txt: Async File Open (Write) Failed');

    console.log('my_new_file.txt: Async File Open (Write) Successful');

    console.log(data.toString());
});

fs.appendFile('my_new_file.txt',
    'my_new_file.txt: Async File Append Successful',
    (error) => {

    if (error) return console.log('my_new_file.txt: Async File Append Failed');

    console.log('my_new_file.txt: Async File Append Successful');
});

fs.writeFile('my_new_file_2.txt',
    'my_new_file_2.txt: Async File Write Successful',
    (error) => {

        if (error) return console.log('my_new_file_2.txt: Async File Write Failed');

        console.log('my_new_file_2.txt: Async File Write Successful');
});

fs.unlink('my_new_file_2.txt',
    (error) => {

        if (error) return console.log('my_new_file_2.txt: Async File Delete Failed');

        console.log('my_new_file_2.txt: Async File Delete Successful');
});

fs.rename('my_new_file.txt','my_new_file_rename.txt',
    (error) => {

        if (error) return console.log('my_new_file  .txt: Async File Rename Failed');

        console.log('my_new_file.txt: Async File Rename Successful');
});

