const express = require('express');
const path = require('path');
const userRouter = express.Router();
const { getHome, getContactUs, postContactUs, getAboutUs, getGallery, getOsmanabadiGoats, getProducts, getMultiLayerHusbandry, getSubsidy, sendOTP, verifyOTP } = require('../controllers/userController');




userRouter.get('/', getHome);
userRouter.get('/multi-layer-husbandry', getMultiLayerHusbandry);
userRouter.get('/contact-us', getContactUs);
userRouter.post('/contact-us', postContactUs);
userRouter.post('/contact', postContactUs); // Alias for contact form submissions

// OTP routes
userRouter.post('/send-otp', sendOTP);
userRouter.post('/verify-otp', verifyOTP);

userRouter.get('/about-us', getAboutUs);
userRouter.get('/gallery', getGallery);
userRouter.get('/osmanabadi-Goats', getOsmanabadiGoats);
userRouter.get('/products', getProducts);
userRouter.get('/subsidy', getSubsidy);

module.exports = userRouter;