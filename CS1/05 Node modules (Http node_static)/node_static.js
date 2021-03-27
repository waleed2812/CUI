
const n_static = require('node-static'),
    port = 3000;
    http = require('http');

//config
let file = new n_static.Server('./public', { cache: 3600, gzip:true });

//serve
http.createServer((req, res) => {

    req.addListener('end', () => {

        file.serve(req, res);

    }).resume();
    
}).listen(port);

