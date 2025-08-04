const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

router.get('/', (req, res) => {
  try {
    // Create a token with payload (can be minimal)
    const token = jwt.sign({ user: 'anonymous' }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ message: 'Failed to generate token' });
  }
});

module.exports = router;
