// app.js
const express = require('express');
const app = express();
// const passport = require('./middleware/authentication');
const authRoutes = require('./api/Routes/authRoute');
const bodyParser = require('body-parser');
const jobRoutes = require('./api/Routes/jobRoute');
const applicantRoutes = require('./api/Routes/applicantRoute');
const valueRoutes = require('./api/Routes/valueRoute');
const enterpriseRoutes = require('./api/Routes/enterpriseRoute');
const locationRoutes = require('./api/Routes/locationRoute')
const prospectRoutes = require('./api/Routes/prospectRoute')
const morgan = require('morgan');
const fileupload = require('express-fileupload');
// Middleware


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(fileupload());
// app.use(passport.initialize()); 8iyaret r2yi

// Routes

app.use('/api/applicant' , applicantRoutes);
app.use('/api/job' , jobRoutes);
app.use('/api/location' , locationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/values', valueRoutes);
app.use('/api/enterprise', enterpriseRoutes);
app.use('/api/prospect', prospectRoutes);
module.exports = app;

//https://hutopia-api:81.