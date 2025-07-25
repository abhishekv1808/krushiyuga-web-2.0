const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    investment_model: {
        type: String,
        enum: ['model1', 'model2', 'both', ''],
        default: ''
    },
    message: {
        type: String,
        trim: true
    },
    source: {
        type: String,
        default: 'website'
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'in-progress', 'completed'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
inquirySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Inquiry', inquirySchema);
