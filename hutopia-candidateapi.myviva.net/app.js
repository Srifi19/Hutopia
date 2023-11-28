// app.js
const express = require("express");
const app = express();
// const passport = require('./middleware/authentication');
const bodyParser = require("body-parser");

const authRoute = require("./api/Routes/authRoute");
const educationRoute = require("./api/Routes/educationRoute");
const experienceRoute = require("./api/Routes/experienceRoute");
const languageRoute = require("./api/Routes/languageRoute");
const skillRoute = require("./api/Routes/skillRoute");

const morgan = require("morgan");
const fileupload = require("express-fileupload");
const initializeFirebase = require("./receiving-message");
// Middleware

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(fileupload());
// app.use(passport.initialize());

// app.use(async (req, res, next) => {
//   try {
//     const firebaseApp = await initializeFirebase.initializeFirebase();
//     // const database = firebaseApp.database();
//     // console.log("Database reference:", database);
//     req.firebaseApp = firebaseApp; // Attach the Firebase app instance to the request object

//     next();
//   } catch (error) {
//     console.error("Error initializing Firebase:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// Routes

app.use("/api/auth", authRoute);
app.use("/api/education", educationRoute);
app.use("/api/experience", experienceRoute);
app.use("/api/skill", skillRoute);
app.use("/api/language", languageRoute);
module.exports = app;

//https://hutopia-api:81.
