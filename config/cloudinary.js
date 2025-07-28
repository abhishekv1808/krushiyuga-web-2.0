const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: 'dobvyt9yw',
    api_key: '977591232949275',
    api_secret: 'S9Egv2i4jGUWp8IgI49FcJkjWio'
});

// Cloudinary Configuration
const cloudinaryConfig = {
    cloudName: 'dobvyt9yw',
    apiKey: '977591232949275',
    apiSecret: 'S9Egv2i4jGUWp8IgI49FcJkjWio',
    baseUrl: 'https://res.cloudinary.com/dobvyt9yw/image/upload/',
    
    // Transformation presets for different image sizes
    transformations: {
        thumbnail: 'c_fill,w_300,h_200',
        medium: 'c_fill,w_600,h_400', 
        large: 'c_fill,w_1200,h_800',
        gallery: 'c_fill,w_500,h_350',
        hero: 'c_fill,w_800,h_600'
    },
    
    // Helper function to generate URLs with transformations
    getImageUrl: function(publicId, transformation = '') {
        if (transformation && this.transformations[transformation]) {
            return `${this.baseUrl}${this.transformations[transformation]}/${publicId}`;
        }
        return `${this.baseUrl}${publicId}`;
    },
    
    // Helper function to get optimized image URL
    getOptimizedUrl: function(publicId, options = {}) {
        const { width = 600, height = 400, quality = '90', format = 'auto' } = options;
        return `${this.baseUrl}c_fit,w_${width},h_${height},q_${quality},f_${format}/${publicId}`;
    },

    // New function to fetch images from gallery folder or root with KAP prefix
    async fetchGalleryImages() {
        try {
            // First try gallery folder
            let result = await cloudinary.search
                .expression('folder:gallery')
                .max_results(100)
                .execute();

            // If no images in gallery folder, fetch KAP images from root
            if (result.resources.length === 0) {
                console.log('No images in gallery folder, fetching KAP images from root...');
                result = await cloudinary.search
                    .expression('public_id:KAP*')
                    .max_results(100)
                    .execute();
            }

            return result.resources.map((resource, index) => ({
                id: index + 1,
                cloudinaryId: resource.public_id,
                imageUrl: this.getOptimizedUrl(resource.public_id, { width: 800, height: 600, quality: '95' }),
                title: this.extractTitleFromFilename(resource.public_id),
                description: resource.context?.caption || this.generateDescription(resource.public_id),
                category: this.categorizeImage(resource.public_id, resource.context),
                featured: index < 3, // Mark first 3 as featured
                createdAt: resource.created_at,
                format: resource.format,
                width: resource.width,
                height: resource.height
            }));
        } catch (error) {
            console.error('Error fetching gallery images from Cloudinary:', error);
            return [];
        }
    },

    // Helper function to extract title from filename
    extractTitleFromFilename(publicId) {
        const filename = publicId.split('/').pop(); // Get filename from path
        return filename
            .replace(/gallery\//, '') // Remove gallery/ prefix
            .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
            .replace(/\.[^/.]+$/, '') // Remove file extension
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    },

    // Helper function to categorize images based on filename or context
    categorizeImage(publicId, context) {
        const filename = publicId.toLowerCase();
        const contextTags = context?.custom?.tags || [];
        
        // Check context tags first
        if (contextTags.includes('training')) return 'training';
        if (contextTags.includes('events')) return 'events';
        if (contextTags.includes('farm')) return 'farm';
        if (contextTags.includes('awards')) return 'awards';
        
        // Check filename keywords
        if (filename.includes('training') || filename.includes('workshop') || filename.includes('education')) {
            return 'training';
        }
        if (filename.includes('event') || filename.includes('conference') || filename.includes('fair')) {
            return 'events';
        }
        if (filename.includes('farm') || filename.includes('goat') || filename.includes('animal') || filename.includes('feed')) {
            return 'farm';
        }
        if (filename.includes('award') || filename.includes('certificate') || filename.includes('achievement')) {
            return 'awards';
        }
        
        // Default category
        return 'farm';
    },

    // Helper function to generate description
    generateDescription(publicId) {
        const category = this.categorizeImage(publicId, {});
        const descriptions = {
            training: 'Professional training and educational program',
            events: 'Community event and agricultural gathering',
            farm: 'Farm life and agricultural activities',
            awards: 'Recognition and achievement in agriculture'
        };
        return descriptions[category] || 'Agricultural excellence and innovation';
    }
};

module.exports = { cloudinaryConfig, cloudinary };
