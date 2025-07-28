// Simple server without MongoDB for testing
const express = require('express');
const path = require('path');

console.log('🚀 Starting simple test server...');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Simple test routes
app.get('/', (req, res) => {
    res.send('<h1>🎉 Server is working!</h1><p>The server is running successfully.</p>');
});

app.get('/test', (req, res) => {
    res.json({ status: 'working', timestamp: new Date().toISOString() });
});

const PORT = 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Simple server is running on: http://localhost:${PORT}`);
    console.log('🔗 Test it by visiting: http://localhost:3000');
});

server.on('error', (err) => {
    console.error('❌ Server error:', err);
});

console.log('📝 Server startup script completed');

// Keep alive
setInterval(() => {
    console.log('💓 Server heartbeat:', new Date().toISOString());
}, 30000);
