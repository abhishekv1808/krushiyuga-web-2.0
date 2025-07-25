// Environment Configuration for Production
const config = {
  development: {
    port: 3000,
    mongodbURI: 'mongodb+srv://abhishekv1808:Grow%40%24%402025@aribnb.xvmlcnz.mongodb.net/krushiyuga?retryWrites=true&w=majority&appName=aribnb',
    nodeEnv: 'development'
  },
  production: {
    port: process.env.PORT || 10000,
    mongodbURI: process.env.MONGODB_URI || 'mongodb+srv://abhishekv1808:Grow%40%24%402025@aribnb.xvmlcnz.mongodb.net/krushiyuga?retryWrites=true&w=majority&appName=aribnb',
    nodeEnv: 'production'
  }
};

const environment = process.env.NODE_ENV || 'development';

module.exports = config[environment];
