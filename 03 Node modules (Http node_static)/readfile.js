fs = require('fs');

fs.readFile('README.md', (error, data) => {
    
    if(error) console.log(error);

    else console.log(data.toString());

});