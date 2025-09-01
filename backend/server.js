// Load environment variables from .env file into process.env
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Import API route handlers
const tokenRoutes = require('./routes/token');      // JWT token generation route
const itunesRoutes = require('./routes/itunes');    // iTunes API proxy routes

// Mount API routes under their respective paths
// These must be registered before serving static files to avoid conflicts
app.use('/api/token', tokenRoutes);
app.use('/api/itunes', itunesRoutes);

// Serve the static files built by the frontend (React app)
// Serves files from frontend/dist directory relative to backend folder
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all handler: for any routes not handled by above,
// serve the frontend's index.html to enable client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Set the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the Express server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

