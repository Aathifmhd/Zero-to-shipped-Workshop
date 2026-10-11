export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/zero-to-shipped',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  maxFileSizeMb: 5,
};
