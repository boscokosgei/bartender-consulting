const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const solutionsRouter = require('./routes/solutions');
const servicesRouter = require('./routes/services');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bartender_consulting';

app.use(cors());
app.use(express.json());

app.use('/api/solutions', solutionsRouter);
app.use('/api/services', servicesRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
