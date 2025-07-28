# Gallery Management Guide - Cloudinary Folder Integration

## Overview
Your gallery now automatically fetches images from the "gallery" folder in your Cloudinary account (dobvyt9yw). The system intelligently categorizes images and generates titles/descriptions automatically.

## How to add new images to your gallery

### Step 1: Upload to Cloudinary Gallery Folder
1. Login to your Cloudinary account: https://cloudinary.com/console
2. Go to **Media Library**
3. **Create/Select the "gallery" folder**
4. Upload your images to this folder
5. Images will automatically appear on your website!

### Step 2: Automatic Features
✅ **Auto-categorization**: Images are automatically categorized based on filename:
- Files with "training", "workshop", "education" → **Training Programs**
- Files with "event", "conference", "fair" → **Events**  
- Files with "farm", "goat", "animal", "feed" → **Farm Life**
- Files with "award", "certificate", "achievement" → **Awards**

✅ **Auto-titles**: Generated from filename (e.g., "goat-training-2024.jpg" → "Goat Training 2024")

✅ **Auto-descriptions**: Smart descriptions based on category

✅ **Auto-optimization**: Images optimized for web (WebP, auto-quality, responsive)

### Step 3: Manual Categorization (Optional)
For better control, you can add tags in Cloudinary:

1. Select an image in Cloudinary
2. Add tags: `training`, `events`, `farm`, or `awards`
3. These tags override automatic categorization

### Step 4: Custom Titles & Descriptions (Optional)
Add custom metadata in Cloudinary:

1. Select an image in Cloudinary
2. Go to **Details** → **Context**
3. Add custom fields:
   - `caption`: "Your custom description"
   - `title`: "Your custom title"

## File Naming Best Practices

### Good Examples:
- `goat-training-workshop-2024.jpg` → "Goat Training Workshop 2024" (Training)
- `farm-life-feeding-time.jpg` → "Farm Life Feeding Time" (Farm)
- `award-ceremony-excellence.jpg` → "Award Ceremony Excellence" (Awards)
- `agricultural-fair-event.jpg` → "Agricultural Fair Event" (Events)

### Categories by Keywords:
- **Training**: training, workshop, education, learning, skill
- **Events**: event, conference, fair, gathering, meeting
- **Farm**: farm, goat, animal, livestock, feeding, barn, field
- **Awards**: award, certificate, achievement, recognition, prize

## Current Setup:
- **Cloudinary Account**: dobvyt9yw
- **Gallery Folder**: `/gallery/`
- **Auto-fetch**: Enabled ✅
- **Fallback**: JSON file backup ✅
- **Image Limit**: 100 images (configurable)
- **Sort Order**: Newest first

## Testing Your Setup:

### Run the gallery utility to see your images:
```bash
node utils/galleryUtils.js
```

This will show:
- All images in your gallery folder
- Their automatic categorization
- Generated titles and descriptions
- Image details (format, size, date)

## Advanced Features:

### Custom Tagging (via script):
```javascript
// Add tags to an image
addTagsToImage('gallery/my-image', ['training', 'featured']);

// Add custom context
addContextToImage('gallery/my-image', {
    caption: 'Custom description here',
    title: 'Custom title here'
});
```

### Image Organization Tips:
1. **Use descriptive filenames** - they become titles
2. **Group by year/event** - use subfolders like `gallery/2024/training/`
3. **Add tags for better filtering**
4. **Use featured tag** for important images

## Troubleshooting:

### No images showing?
1. Check that images are in the "gallery" folder in Cloudinary
2. Verify folder name is exactly "gallery" (lowercase)
3. Check console logs for API errors
4. Ensure Cloudinary credentials are correct

### Wrong categorization?
1. Add manual tags in Cloudinary console
2. Use better descriptive filenames
3. Add custom context metadata

### Images not optimized?
- All images are automatically optimized for web delivery
- WebP format used when supported
- Responsive sizing for different devices
- Auto-quality adjustment

Your gallery is now fully automated! Just upload images to the "gallery" folder in Cloudinary and they'll appear on your website automatically.
