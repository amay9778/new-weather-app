const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Add CORS

dotenv.config();

const app = express();
const port = 4000;

app.use(cors()); 
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/api', weatherRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});