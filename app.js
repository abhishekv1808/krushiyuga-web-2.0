require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const rootDir = require('./utils/mainUtils');
const userRouter = require('./routes/userRouter');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Add JSON parsing middleware for AJAX requests

// Health check endpoint for AWS
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.use(userRouter);

const PORT = process.env.PORT || 3000;
const mongodbURL = process.env.MONGODB_URI;

// Debug environment variables
console.log('🔍 Environment Debug Info:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', PORT);
console.log('MONGODB_URI defined:', !!mongodbURL);
console.log('MONGODB_URI length:', mongodbURL ? mongodbURL.length : 0);

// Validate MongoDB URI
if (!mongodbURL) {
    console.error('❌ MONGODB_URI is not defined in environment variables');
    console.error('Please check your .env file and ensure MONGODB_URI is set');
    process.exit(1);
}

mongoose.connect(mongodbURL).then(()=>{
    console.log('✅ Connected to MongoDB successfully');
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server is running on port: http://localhost:${PORT}`);
        console.log('🏥 Health check available at: http://localhost:' + PORT + '/health');
    });
}).catch(err => {
    console.error('❌ Error connecting to MongoDB:', err.message);
    console.error('Full error:', err);
    process.exit(1);
});