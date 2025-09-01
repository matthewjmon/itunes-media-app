const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

// Secret key for verifying JWT tokens, loaded from environment variables
const SECRET = process.env.JWT_SECRET;

// POST /api/itunes/search
// Purpose: Search the iTunes API for media items based on user-provided term and media type
router.post('/search', (req, res) => {
  // Extract JWT token from the Authorization header ("Bearer <token>")
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];

  // Reject the request if no token was provided
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  // Verify the token is valid and not expired
  try {
    jwt.verify(token, SECRET);
  } catch (error) {
    // Respond with 403 Forbidden if token is invalid or expired
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  // Extract search parameters from request body
  const { term, media } = req.body;

  // Validate the search term is present
  if (!term) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  // Make a GET request to the iTunes Search API with query parameters
  axios.get('https://itunes.apple.com/search', {
    params: {
      term,           // search keyword(s)
      media: media || 'all',  // media type (default to 'all' if not provided)
      limit: 20,      // limit number of results returned
    },
  })
  .then(response => {
    // Send back the results array from the iTunes API response to the frontend
    res.json(response.data.results);
  })
  .catch(error => {
    // Log the error and respond with a 500 Internal Server Error if the iTunes API call fails
    console.error('iTunes API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch from iTunes API' });
  });
});

// Export the router to be mounted in the main server
module.exports = router;



