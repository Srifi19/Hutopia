const appEnterprise = require('./app');

//const appCandidate = require('./enterpriseapi/app');
const http = require("http")
const PORT = process.env.PORT || 81;
const os = require('os');
const enterpriseServer = http.createServer(appEnterprise);
  
enterpriseServer.listen(81, () => {
  console.log(`HTTP Server is running on port 81`);
  
}); 


