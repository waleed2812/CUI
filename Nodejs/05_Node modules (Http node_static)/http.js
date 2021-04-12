
const http = require('http');

http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {

        res.writeHead(200, {'Content-Type' : 'text/plain'});

        res.end('Hello World !!');
    }

    else if (req.url === '/account' && req.method === 'GET') {
        
        res.writeHead(200, {'Content-Type' : 'text/plain'});

        res.end('<strong>Account</strong>!!');

    }
    
    else {
        res.writeHead(400, {'Content-Type' : 'text/plain'});

        res.end('Error 404 ! Not Found !!');
    }
    
}).listen(3000, '127.0.0.1');

