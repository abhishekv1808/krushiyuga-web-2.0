require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const rootDir = require('./utils/mainUtils');
const userRouter = require('./routes/userRouter');

console.log('🔄 Starting application...');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log('🌟🌟🌟 REQUEST INTERCEPTED 🌟🌟🌟');
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('🌟🌟🌟 END REQUEST LOG 🌟🌟🌟');
    next();
});

app.use(userRouter);

const PORT = process.env.PORT || 3000;

// Start server first, then connect to MongoDB
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running on port: http://localhost:${PORT}`);
    console.log('🔗 You can now access the website!');
    
    // Try MongoDB connection after server starts
    const mongodbURL = process.env.MONGODB_URI || 'mongodb+srv://abhishekv1808:'+encodeURIComponent('Grow@$@2025') + '@aribnb.xvmlcnz.mongodb.net/krushiyuga?retryWrites=true&w=majority&appName=aribnb';
    
    console.log('🔄 Attempting MongoDB connection...');
    mongoose.connect(mongodbURL)
        .then(() => {
            console.log('✅ Connected to MongoDB successfully!');
        })
        .catch(err => {
            console.error('❌ MongoDB connection failed:', err.message);
            console.log('⚠️ Server will continue running without database functionality');
        });
});

server.on('error', (err) => {
    console.error('❌ Server failed to start:', err);
    if (err.code === 'EADDRINUSE') {
        console.log('💡 Port 3000 is already in use. Trying port 3001...');
        app.listen(3001, '0.0.0.0', () => {
            console.log(`✅ Server is running on: http://localhost:3001`);
        });
    }
});

console.log('📝 Application startup script completed');
