const Inquiry = require('../models/Inquiry');
const { cloudinaryConfig } = require('../config/cloudinary');
const { sendInquiryNotification } = require('../utils/emailUtils');
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
    console.log('🔥 Contact form submission received');
    console.log('Request body:', req.body);
    
    try {
        
        const { firstName, lastName, email, mobile, inquiryType, location, message, source, name, phone, investment_model } = req.body;
        
        console.log('📋 Extracted fields:');
        console.log('  - firstName:', firstName);
        console.log('  - lastName:', lastName);  
        console.log('  - name:', name);
        console.log('  - email:', email);
        console.log('  - mobile:', mobile);
        console.log('  - phone:', phone);
        console.log('  - investment_model:', investment_model);
        console.log('  - inquiryType:', inquiryType);
        console.log('  - message:', message?.substring(0, 50) + '...');
        
        // Handle both old and new field formats
        const finalName = name || `${firstName || ''} ${lastName || ''}`.trim();
        const finalPhone = phone || mobile;
        const finalInvestmentModel = investment_model || inquiryType || '';
        
        console.log('🔧 Processed data:');
        console.log('  - finalName:', finalName);
        console.log('  - email:', email);
        console.log('  - finalPhone:', finalPhone);
        console.log('  - finalInvestmentModel:', finalInvestmentModel);
        console.log('  - message length:', message?.length || 0);
        
        // Validate required fields
        console.log('🔍 Validating required fields...');
        if (!finalName) {
            console.log('❌ VALIDATION FAILED: Missing name');
            throw new Error('Missing required field: name');
        }
        if (!email) {
            console.log('❌ VALIDATION FAILED: Missing email');
            throw new Error('Missing required field: email');
        }
        if (!finalPhone) {
            console.log('❌ VALIDATION FAILED: Missing phone');
            throw new Error('Missing required field: phone');
        }
        console.log('✅ All required fields validated successfully');
        
        // Create new inquiry document
        console.log('📋 Creating new inquiry document...');
        const inquiryData = {
            name: finalName,
            email,
            phone: finalPhone,
            investment_model: finalInvestmentModel,
            message,
            source: source || 'website'
        };
        console.log('📋 Inquiry data to save:', JSON.stringify(inquiryData, null, 2));
        
        const newInquiry = new Inquiry(inquiryData);
        console.log('📋 Inquiry object created successfully');
        
        // Save to MongoDB
        console.log('� Attempting to save inquiry to MongoDB...');
        console.log('💾 Pre-save inquiry object:', JSON.stringify(newInquiry.toObject(), null, 2));
        
        const savedInquiry = await newInquiry.save();
        
        console.log('✅✅✅ Successfully saved inquiry to MongoDB!');
        console.log('✅ Saved inquiry ID:', savedInquiry._id);
        console.log('✅ Saved inquiry data:', JSON.stringify(savedInquiry.toObject(), null, 2));
        
        console.log('New inquiry saved:', {
            id: savedInquiry._id,
            name: savedInquiry.name,
            email: savedInquiry.email,
            source: savedInquiry.source,
            timestamp: savedInquiry.createdAt
        });
        
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
        console.error('=== CONTACT FORM ERROR ===');
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Request body was:', req.body);
        
        // Check if it's an AJAX request
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
            return res.status(500).json({
                success: false,
                message: 'Sorry, there was an error submitting your inquiry. Please try again.',
                error: error.message // Include error details for debugging
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