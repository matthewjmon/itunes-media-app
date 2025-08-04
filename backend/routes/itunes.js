const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

router.post('/search', (req, res) => {
  // Extract token from Authorization header: "Bearer <token>"
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    jwt.verify(token, SECRET);
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  const { term, media } = req.body;

  if (!term) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  axios.get('https://itunes.apple.com/search', {
    params: {
      term,
      media: media || 'all',
      limit: 20,
    },
  })
  .then(response => {
    res.json(response.data.results);
  })
  .catch(error => {
    console.error('iTunes API error:', error.message);
    res.status(500).json({ message: 'Failed to fetch from iTunes API' });
  });
});

module.exports = router;

