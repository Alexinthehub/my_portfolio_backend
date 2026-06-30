// src/controllers/authController.js
const jwt = require('jsonwebtoken');

// Login handler
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password match the .env variables
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: process.env.ADMIN_EMAIL },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    res.status(200).json({
      success: true,
      token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

module.exports = { login };