const Inquiry = require('../models/Inquiry');
const OTP = require('../models/OTP');
const { cloudinaryConfig } = require('../config/cloudinary');
const { sendInquiryNotification } = require('../utils/emailUtils');
const { createAndSendOTP, verifyOTP } = require('../utils/otpUtils');
const fs = require('fs');
const path = require('path');

exports.getHome = (req ,res ,next)=>{
    res.render('../views/user/home.ejs', { pageTitle: 'Home Page | Krushiyuga' });
}


exports.getContactUs = (req ,res ,next)=>{
    const success = req.query.success;
    const error = req.query.error;
    res.render('../views/user/contact-us.ejs', { 
        pageTitle: 'Contact Us | Krushiyuga',
        success: success === 'true',
        error: error === 'true'
    });
}

exports.postContactUs = async (req, res, next) => {
    try {
        const { firstName, lastName, email, mobile, inquiryType, location, message, source, name, phone, investment_model, otp, isOtpVerified } = req.body;
        console.log('  - otp:', otp);
        console.log('  - isOtpVerified:', isOtpVerified);
        
        // Handle both old and new field formats
        const finalName = name || `${firstName || ''} ${lastName || ''}`.trim();
        const finalPhone = phone || mobile;
        const finalInvestmentModel = investment_model || inquiryType || '';
        
        // Validate required fields
        if (!finalName) {
            throw new Error('Missing required field: name');
        }
        if (!email) {
            throw new Error('Missing required field: email');
        }
        if (!finalPhone) {
            throw new Error('Missing required field: phone');
        }
        
        // Check OTP verification for new submissions
        console.log('🔍 Checking OTP verification...');
        
        // Check OTP verification for new submissions
        if (!isOtpVerified || (isOtpVerified !== 'true' && isOtpVerified !== true)) {
            if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
                return res.status(400).json({
                    success: false,
                    message: 'Please verify your email address with OTP before submitting the form.',
                    requireOtpVerification: true
                });
            } else {
                return res.redirect('/contact-us?error=otp_required');
            }
        }
        
        // Check if OTP is provided
        if (!otp || otp.length !== 6) {
            if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
                return res.status(400).json({
                    success: false,
                    message: 'Valid 6-digit OTP is required for form submission.',
                    requireOtpVerification: true
                });
            } else {
                return res.redirect('/contact-us?error=otp_required');
            }
        }
        
        // Create new inquiry document
        const inquiryData = {
            name: finalName,
            email,
            phone: finalPhone,
            investment_model: finalInvestmentModel,
            message,
            source: source || 'website'
        };
        
        const newInquiry = new Inquiry(inquiryData);
        
        // Save to MongoDB
        const savedInquiry = await newInquiry.save();
        
        // Send email notification (try Gmail first, fallback to HTML file)
        sendInquiryNotification(savedInquiry)
            .then(result => {
                if (result.success) {
                    console.log('✅ Email notification sent successfully via Gmail:', result.messageId);
                } else {
                    console.log('❌ Gmail failed to send email:', result.error);
                }
            })
            .catch(error => {
                console.error('❌ Email sending error:', error.message);
            });
        
        // Check if it's an AJAX request (for modal response)
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
            return res.status(200).json({
                success: true,
                message: 'Thank you for your inquiry! We will contact you soon.',
                inquiryId: savedInquiry._id
            });
        }
        
        // For regular form submission, redirect with success message
        res.redirect('/contact-us?success=true');
        
    } catch (error) {
        console.error('Contact form error:', error.message);
        
        // Check if it's an AJAX request
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
            return res.status(500).json({
                success: false,
                message: 'Sorry, there was an error submitting your inquiry. Please try again.'
            });
        }
        
        res.redirect('/contact-us?error=true');
    }
}

exports.getProducts = (req ,res ,next)=>{
    res.render('../views/user/products.ejs', { 
        pageTitle: 'Products | Krushiyuga',
        products: [] // Initialize with empty array to prevent undefined error
    });
}

exports.getAboutUs = (req ,res ,next)=>{
    res.render('../views/user/aboutUs.ejs', { pageTitle: 'About Us | Krushiyuga' });
}

exports.getSubsidy = (req ,res ,next)=>{
    res.render('../views/user/subsidy.ejs', { pageTitle: 'Subsidy' });
}

exports.getGallery = async (req, res, next) => {
    try {
        // First try to fetch images from Cloudinary gallery folder
        const cloudinaryImages = await cloudinaryConfig.fetchGalleryImages();
        
        let galleryImages = [];
        
        if (cloudinaryImages && cloudinaryImages.length > 0) {
            // Use images from Cloudinary gallery folder
            galleryImages = cloudinaryImages;
            console.log(`Loaded ${galleryImages.length} images from Cloudinary gallery folder`);
        } else {
            // Fallback to JSON file if no images in Cloudinary gallery folder
            console.log('No images found in Cloudinary gallery folder, using JSON fallback');
            const galleryDataPath = path.join(__dirname, '..', 'data', 'gallery.json');
            const galleryData = JSON.parse(fs.readFileSync(galleryDataPath, 'utf8'));
            
            galleryImages = galleryData.galleryImages.map(image => ({
                ...image,
                imageUrl: cloudinaryConfig.getOptimizedUrl(image.cloudinaryId)
            }));
        }

        res.render('../views/user/gallery.ejs', { 
            pageTitle: 'Gallery | Krushiyuga',
            galleryImages: galleryImages,
            cloudinaryConfig: cloudinaryConfig
        });
    } catch (error) {
        console.error('Error loading gallery:', error);
        
        // Final fallback to JSON file
        try {
            const galleryDataPath = path.join(__dirname, '..', 'data', 'gallery.json');
            const galleryData = JSON.parse(fs.readFileSync(galleryDataPath, 'utf8'));
            
            const galleryImages = galleryData.galleryImages.map(image => ({
                ...image,
                imageUrl: cloudinaryConfig.getOptimizedUrl(image.cloudinaryId)
            }));

            res.render('../views/user/gallery.ejs', { 
                pageTitle: 'Gallery | Krushiyuga',
                galleryImages: galleryImages,
                cloudinaryConfig: cloudinaryConfig
            });
        } catch (fallbackError) {
            console.error('Error with fallback gallery data:', fallbackError);
            res.render('../views/user/gallery.ejs', { 
                pageTitle: 'Gallery | Krushiyuga',
                galleryImages: [],
                cloudinaryConfig: cloudinaryConfig
            });
        }
    }
}

exports.getOsmanabadiGoats = (req ,res ,next)=>{
    res.render('../views/user/osmanabadi-Goats.ejs', { pageTitle: 'Osmanabadi Goats | Krushiyuga' });
}

exports.getMultiLayerHusbandry = (req ,res ,next)=>{
    res.render('../views/user/multi-layer-husbandry.ejs', { pageTitle: 'Multi Layer Animal Husbandry | Krushiyuga' });
}

exports.getSubsidy = (req ,res ,next)=>{
    res.render('../views/user/subsidy.ejs', { pageTitle: 'Subsidy | Krushiyuga' });
}

// OTP-related endpoints
exports.sendOTP = async (req, res, next) => {
    console.log('🔥 OTP request received');
    console.log('Request body:', req.body);
    
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email address is required.'
            });
        }
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address.'
            });
        }
        
        console.log('📧 Sending OTP to email:', email);
        
        const result = await createAndSendOTP(email);
        
        if (result.success) {
            console.log('✅ OTP sent successfully to:', email);
            return res.status(200).json({
                success: true,
                message: 'OTP sent successfully to your email address.',
                otpId: result.otpId
            });
        } else {
            console.log('❌ Failed to send OTP to:', email);
            return res.status(500).json({
                success: false,
                message: result.message || 'Failed to send OTP. Please try again.'
            });
        }
        
    } catch (error) {
        console.error('❌ Error in sendOTP:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
};

exports.verifyOTP = async (req, res, next) => {
    console.log('🔥 OTP verification request received');
    console.log('Request body:', req.body);
    
    try {
        const { email, otp } = req.body;
        
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required.'
            });
        }
        
        console.log('🔍 Verifying OTP for email:', email);
        
        const result = await verifyOTP(email, otp);
        
        if (result.success) {
            console.log('✅ OTP verified successfully for:', email);
            return res.status(200).json({
                success: true,
                message: 'Email verified successfully!',
                otpId: result.otpId
            });
        } else {
            console.log('❌ OTP verification failed for:', email);
            return res.status(400).json({
                success: false,
                message: result.message,
                shouldRequestNew: result.shouldRequestNew || false,
                remainingAttempts: result.remainingAttempts
            });
        }
        
    } catch (error) {
        console.error('❌ Error in verifyOTP:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
};