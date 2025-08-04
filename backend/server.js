require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const itunesRoutes = require('./routes/itunes');
const tokenRoutes = require('./routes/token');

// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route handlers
app.use('/api/itunes', itunesRoutes);
app.use('/api/token', tokenRoutes);

const PORT = process.env.PORT || 5000;

// Start server and listen on specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

