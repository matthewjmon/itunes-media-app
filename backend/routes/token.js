const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Secret key for signing JWT, loaded from environment variables
const SECRET = process.env.JWT_SECRET;

// Route: GET /api/token
// Purpose: Generate a new JWT token for API authorization with 1-hour expiry
router.get('/', (req, res) => {
  try {
    // Create a JWT token with a payload identifying the user as 'anonymous'
    // The token expires in 1 hour to limit validity
    const token = jwt.sign({ user: 'anonymous' }, SECRET, { expiresIn: '1h' });
    
    // Send the generated token as JSON response
    res.json({ token });
  } catch (error) {
    // Log any errors during token generation for debugging
    console.error('Error generating token:', error);
    
    // Respond with HTTP 500 Internal Server Error if token generation fails
    res.status(500).json({ message: 'Failed to generate token' });
  }
});

// Export the router to be used in server.js
module.exports = router;

