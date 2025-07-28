console.log('Starting basic HTTP server...');

const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <html>
            <head><title>Server Working</title></head>
            <body>
                <h1>🎉 Server is Working!</h1>
                <p>Time: ${new Date().toISOString()}</p>
                <p>URL: ${req.url}</p>
                <p>Method: ${req.method}</p>
                <a href="/test">Test Link</a>
            </body>
        </html>
    `);
});

server.listen(3000, () => {
    console.log('HTTP server running on http://localhost:3000');
});

server.on('error', (err) => {
    console.log('Server error:', err.message);
    if (err.code === 'EADDRINUSE') {
        console.log('Port 3000 in use, trying 3001...');
        server.listen(3001, () => {
            console.log('HTTP server running on http://localhost:3001');
        });
    }
});
