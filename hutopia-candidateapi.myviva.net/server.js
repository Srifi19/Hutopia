const appCandidate = require('./app');
//const appCandidate = require('./enterpriseapi/app');
const http = require("http")
const PORT = process.env.PORT || 81;
const os = require('os');
const candidateServer = http.createServer(appCandidate);
  
candidateServer.listen(82, () => {
  console.log(`HTTP Server is running on port 82`);

}); 
