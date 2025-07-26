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

app.use(userRouter);

const PORT = process.env.PORT || 3000;
const mongodbURL = process.env.MONGODB_URI || 'mongodb+srv://abhishekv1808:'+encodeURIComponent('Grow@$@2025') + '@aribnb.xvmlcnz.mongodb.net/krushiyuga?retryWrites=true&w=majority&appName=aribnb';


mongoose.connect(mongodbURL).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port : http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});