# 🌱 Krushiyuga Web 2.0

> **Revolutionary Multi-Layer Animal Husbandry Platform**  
> Transforming Rural Livelihoods Through Sustainable Farming & Investment Models

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-blue.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

---

## 🌟 Project Overview

Krushiyuga Web 2.0 is a comprehensive digital platform revolutionizing agricultural practices in India through multi-layer integrated farming systems. Our platform connects investors with sustainable farming opportunities while promoting animal husbandry excellence.

### 🎯 Mission
To empower farmers with knowledge, quality livestock, and sustainable farming practices that enhance rural livelihoods while preserving indigenous breeds and promoting agricultural excellence.

## 🚀 Features

### 🎯 **Core Functionality**
- **Multi-Layer Animal Husbandry Models** - Comprehensive investment plans for integrated farming
- **Interactive Contact Forms** - AJAX-powered forms with success modals and database storage
- **Responsive Design** - Optimized for all devices using Tailwind CSS
- **MongoDB Integration** - Secure data storage for inquiries and user information

### 🐾 **Animal Categories**
- **Goat Farming** - Osmanabadi variety with dual-purpose benefits
- **Poultry Farming** - Kaveri variety with automated systems
- **Piggery** - Hampshire, Landrace, and Duroc breeds
- **Fish Farming** - Commercial aquaculture systems
- **Pearl Farming** - Innovative pearl cultivation techniques

### 💰 **Investment Models**
- **Model 1** - ₹1.25 Crore starter investment plan
- **Model 2** - ₹2.50 Crore premium investment plan
- **ROI Analysis** - Detailed financial projections and break-even calculations
- **Subsidy Information** - NLM (National Livestock Mission) integration

## 🛠️ **Technology Stack**

### **Backend**
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **EJS** - Embedded JavaScript templating

### **Frontend**
- **HTML5** - Modern semantic markup
- **Tailwind CSS v4.1.11** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern client-side scripting
- **Font Awesome** - Icon library

### **Features**
- **AJAX Form Submission** - Seamless user experience
- **Responsive Design** - Mobile-first approach
- **Progressive Enhancement** - Works without JavaScript
- **Database Integration** - Secure data persistence

## 📦 **Installation**

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### **Setup**
```bash
# Clone the repository
git clone https://github.com/yourusername/krushiyuga-web-2.0.git

# Navigate to project directory
cd krushiyuga-web-2.0

# Install dependencies
npm install

# Start the development server
npm start
```

### **Environment Configuration**
The application connects to MongoDB using the connection string in `app.js`. Update the MongoDB URI as needed for your environment.

## 🚀 **Usage**

1. **Start the server**
   ```bash
   npm start
   ```

2. **Access the application**
   - Open browser to `http://localhost:3000`
   - Navigate through different sections using the menu

3. **Key Pages**
   - **Home** - Landing page with overview
   - **Multi-Layer Husbandry** - Detailed investment models
   - **Gallery** - Visual showcase of farming operations
   - **About Us** - Company information
   - **Contact Us** - Inquiry forms and contact details

## 📊 **Project Structure**

```
krushiyuga-web-2.0/
├── controllers/           # Route controllers
│   ├── adminController.js
│   └── userController.js
├── models/               # Database models
│   └── Inquiry.js
├── routes/               # Express routes
│   ├── adminRouter.js
│   └── userRouter.js
├── views/                # EJS templates
│   ├── partials/         # Reusable components
│   ├── admin/            # Admin panel views
│   └── user/             # User-facing views
├── public/               # Static assets
│   ├── js/               # Client-side JavaScript
│   └── output.css        # Compiled Tailwind CSS
├── utils/                # Utility functions
│   └── mainUtils.js
├── app.js                # Express application setup
├── package.json          # Project dependencies
└── README.md             # This file
```

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Emerald Green (#059669)
- **Secondary**: Emerald variants (#10b981, #34d399)
- **Neutral**: Gray scale (#1f2937, #6b7280, #f3f4f6)

### **Typography**
- **Headings**: Bold, large scale typography
- **Body**: Clean, readable font stack
- **Accents**: Gradient text effects for highlights

## 📱 **Responsive Design**

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Enhanced layouts for medium screens
- **Desktop Experience** - Full-featured desktop interface
- **Cross-browser** - Compatible with modern browsers

## 🔐 **Security Features**

- **Input Validation** - Server-side form validation
- **XSS Protection** - Sanitized user inputs
- **CORS Configuration** - Secure cross-origin requests
- **Environment Variables** - Sensitive data protection

## 🚀 **Performance Optimizations**

- **Optimized Images** - Compressed and responsive images
- **Minified Assets** - Compressed CSS and JavaScript
- **Lazy Loading** - Deferred loading for better performance
- **CDN Ready** - Prepared for content delivery networks

## 📈 **Future Enhancements**

- **Cloudinary Integration** - Advanced image optimization
- **User Authentication** - Account management system
- **Admin Dashboard** - Content management interface
- **Payment Integration** - Online investment processing
- **Multi-language Support** - Internationalization
- **Progressive Web App** - Offline functionality

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 **License**

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 **Contact**

- **Phone**: +91 9900077948
- **Email**: nammakrushiyuga@gmail.com
- **Location**: Bangalore, Karnataka, India

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- MongoDB database (Atlas recommended)
- Gmail account for email notifications

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhishekv1808/krushiyuga-web-2.0.git
   cd krushiyuga-web-2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_PASSWORD=your_gmail_app_password
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Build CSS & Start**
   ```bash
   npm run build
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

---

## 💰 Investment Models

### Model 1 - ₹1.25 Crore Investment
- **ROI**: 19.20% annual returns after 48 months
- **Break-even**: 8 years
- **Composition**: Goats (250+12), Hens (2,500+250), Fish (1,000), Oysters (5,000)

### Model 2 - ₹2.50 Crore Investment ⭐ **Recommended**
- **ROI**: 28.8% annual returns after 48 months
- **Break-even**: 7 years  
- **Composition**: Goats (500+25), Hens (5,000+500), Pigs (100+10), Fish (2,000), Oysters (10,000)

---

## 🚀 Deployment

Complete deployment guide available in [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md)

### Quick Deploy Commands
```bash
# Production build
npm run build

# Start with PM2
pm2 start app.js --name "krushiyuga"
pm2 save
pm2 startup
```

---

<div align="center">

**🌱 Transforming Agriculture, One Farm at a Time 🌱**

[![Follow on GitHub](https://img.shields.io/github/followers/abhishekv1808?label=Follow&style=social)](https://github.com/abhishekv1808)
[![Star this repo](https://img.shields.io/github/stars/abhishekv1808/krushiyuga-web-2.0?style=social)](https://github.com/abhishekv1808/krushiyuga-web-2.0/stargazers)

</div>
- **Phone**: +91 98765 43210
- **Location**: Bangalore, Karnataka, India

## 🏆 **Acknowledgments**

- **Suvarnamuki FPO** - Partnership with 800+ farmers
- **Department of Animal Husbandry** - Chitradurga District collaboration
- **Animal Viral Disease Research Institute** - Healthcare support
- **ISO Certified Partners** - Quality infrastructure design

---

**Built with ❤️ for sustainable farming and agricultural innovation**
