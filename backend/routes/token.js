const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

// GET / - Generate and return a JWT token with 1-hour expiration
router.get('/', (req, res) => {
  try {
    // Create a JWT with payload identifying anonymous user
    const token = jwt.sign({ user: 'anonymous' }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ message: 'Failed to generate token' });
  }
});

module.exports = router;
