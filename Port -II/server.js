const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    // 1. Default to index.html if the root url is requested
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // 2. Determine the correct Content-Type (MIME type) based on file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.jpeg': 'image/jpeg',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
        '.ico': 'image/x-icon',
        '.json': 'application/json'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // 3. Read the requested file and serve it back to the browser
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>The requested file does not exist.</p>', 'utf-8');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Sorry, there was a server error: ${error.code} \n`);
            }
        } else {
            // Success! Send the file with the correct content type
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Portfolio server is running! Open http://localhost:${port} in your browser.`);
});