require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../dist/models/User').default;

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/photography-portfolio');
    console.log('Connected to MongoDB');

    // Delete existing admin user if exists
    await User.deleteOne({ username: 'admin' });
    console.log('Deleted existing admin user if any');

    // Create admin user
    const admin = new User({
      username: 'admin',
      password: 'Manang123@', // Let the schema's pre-save hook handle the hashing
    });

    await admin.save();
    console.log('Admin user created successfully');

    // Verify the password
    const savedUser = await User.findOne({ username: 'admin' });
    const isMatch = await savedUser.comparePassword('Manang123@');
    console.log('Password verification:', isMatch ? 'Success' : 'Failed');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin(); 