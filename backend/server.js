const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import files
const journalRoutes = require('./routes/journal');
const userRoutes = require('./routes/user');

require('dotenv').config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const http = require('http').createServer(app);

// Routes
app.use(userRoutes);
app.use(journalRoutes);

mongoose
  .connect(
    'mongodb+srv://analyst_view:AnalystView101@cluster0.srfj1.mongodb.net/AnalystView?retryWrites=true&w=majority',
    { useUnifiedTopology: true },
  )
  .then(() => {
    http.listen(process.env.PORT || 3001);
    console.log('Mongo Connected!!');
  })
  .catch((err) => {
    console.log(err);
  });
