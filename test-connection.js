require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ Connection successful!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection failed:');
    console.error(err.message);
    process.exit(1);
  }
};

testConnection();