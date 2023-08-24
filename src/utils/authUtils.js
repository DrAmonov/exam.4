// utils/authUtils.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;
const jwtSecret = 'your-secret-key'; // Replace with your actual JWT secret key

// Hash the password using bcrypt
const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Compare the provided password with the hashed password
const comparePasswords = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};

// Generate a JWT token
const generateToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour
  return token;
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken
};
