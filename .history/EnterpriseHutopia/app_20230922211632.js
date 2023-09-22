// app.js
const express = require('express');
const app = express();
// const passport = require('./middleware/authentication');
const authRoutes = require('./api/Routes/authRoute');
const bodyParser = require('body-parser');
const jobRoutes = require('./api/Routes/jobRoute');
const valueRoutes = require('./api/Routes/valueRoute');
const enterpriseRoutes = require('./api/Routes/enterpriseRoute');

// Middleware

app.use(express.json());
app.use(bodyParser.json());


// Routes
app.use('/api/job' , jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/values', valueRoutes);
app.use('/api/enterprise', enterpriseRoutes);
module.exports = app;