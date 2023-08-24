// utils/validationUtils.js

const { body, validationResult } = require('express-validator');

// Validate user registration input fields
const validateRegistration = () => {
  return [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ];
};

// Validate user login input fields
const validateLogin = () => {
  return [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
  ];
};

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  handleValidationErrors
};
