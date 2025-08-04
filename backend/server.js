require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const itunesRoutes = require('./routes/itunes');
const tokenRoutes = require('./routes/token');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/itunes', itunesRoutes);
app.use('/api/token', tokenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

