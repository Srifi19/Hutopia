const appManagement = require("./app");

const http = require("http");
const PORT = process.env.PORT || 81;
const os = require("os");
const managementServer = http.createServer(appManagement);

managementServer.listen(81, () => {
  console.log(`HTTP Server is running on port 81`);
});
