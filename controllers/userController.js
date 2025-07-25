const Inquiry = require('../models/Inquiry');

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
        const { name, email, phone, investment_model, message, source } = req.body;
        
        // Create new inquiry document
        const newInquiry = new Inquiry({
            name,
            email,
            phone,
            investment_model,
            message,
            source: source || 'website'
        });
        
        // Save to MongoDB
        const savedInquiry = await newInquiry.save();
        
        console.log('New inquiry saved:', {
            id: savedInquiry._id,
            name: savedInquiry.name,
            email: savedInquiry.email,
            source: savedInquiry.source,
            timestamp: savedInquiry.createdAt
        });
        
        // Check if it's an AJAX request (for modal response)
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json') || 
            req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.status(200).json({
                success: true,
                message: 'Thank you for your inquiry! We will contact you soon.',
                inquiryId: savedInquiry._id
            });
        }
        
        // For regular form submission, redirect with success message
        res.redirect('/contact-us?success=true');
        
    } catch (error) {
        console.error('Contact form error:', error);
        
        // Check if it's an AJAX request
        if (req.headers['content-type'] && req.headers['content-type'].includes('application/json') ||
            req.headers.accept && req.headers.accept.includes('application/json')) {
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

exports.getGallery = (req ,res ,next)=>{
    res.render('../views/user/gallery.ejs', { pageTitle: 'Gallery | Krushiyuga' });
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