// app.js
const express = require("express");
const app = express();
const morgan = require("morgan");
const loginRoutes = require("./Routes/authRoute");

const perkRoutes = require("./Routes/perkRoute");
const skillRoutes = require("./Routes/skillRoute");
const supplementalRoutes = require("./Routes/supplementalRoute");
const certificateRoutes = require("./Routes/certificateRoute");
const proficiencyRoutes = require("./Routes/proficiencyRoute");
const educationLevelRoutes = require("./Routes/educationlevelRoutes");
const privateJobRoutes = require("./Routes/privateJobtitleRoute");
const candidateRoutes = require("./Routes/candidateRoute");
const enterpriseRoutes = require("./Routes/enterpriseRoute");
const jobRoutes = require("./Routes/jobRoute");
app.use(express.json());

app.use("/api/perk", perkRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/supplementalpay", supplementalRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/proficiency", proficiencyRoutes);
app.use("/api/educationlevel", educationLevelRoutes);
app.use("/api/privatejob", privateJobRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/enterprise", enterpriseRoutes);
app.use("/api/job", jobRoutes);

app.use("/api/auth", loginRoutes);

// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms")
// );

module.exports = app;
