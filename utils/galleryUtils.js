const { cloudinary } = require('../config/cloudinary');

// Helper script to organize and tag images in your gallery folder
async function organizeGalleryImages() {
    try {
        console.log('Testing the fetchGalleryImages function...');
        
        const { cloudinaryConfig } = require('../config/cloudinary');
        const galleryImages = await cloudinaryConfig.fetchGalleryImages();
        
        console.log(`\nFound ${galleryImages.length} images for gallery:`);
        
        galleryImages.forEach((image, index) => {
            console.log(`${index + 1}. ${image.title}`);
            console.log(`   - ID: ${image.cloudinaryId}`);
            console.log(`   - Category: ${image.category}`);
            console.log(`   - Featured: ${image.featured}`);
            console.log(`   - URL: ${image.imageUrl}`);
            console.log('');
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to add tags to specific images
async function addTagsToImage(publicId, tags) {
    try {
        const result = await cloudinary.uploader.add_tag(tags, [publicId]);
        console.log(`Added tags [${tags.join(', ')}] to ${publicId}`);
        return result;
    } catch (error) {
        console.error(`Error adding tags to ${publicId}:`, error);
    }
}

// Function to add context (metadata) to images
async function addContextToImage(publicId, context) {
    try {
        const result = await cloudinary.uploader.update_metadata(context, [publicId]);
        console.log(`Added context to ${publicId}:`, context);
        return result;
    } catch (error) {
        console.error(`Error adding context to ${publicId}:`, error);
    }
}

// Run the organization script
if (require.main === module) {
    organizeGalleryImages();
}

module.exports = {
    organizeGalleryImages,
    addTagsToImage,
    addContextToImage
};
