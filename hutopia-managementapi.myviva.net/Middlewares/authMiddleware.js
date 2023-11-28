const Config = require("../Config/config");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.userId;
    next();
  });
};

exports.refreshToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    const userId = decoded.userId;
    if (err) {
      if (err.name === "TokenExpiredError") {
        const newToken = jwt.sign({ userId }, process.env.jwtSecret, {
          expiresIn: "12h",
        });
        res
          .setHeader("Authorization", `Bearer ${newToken}`)
          .status(201)
          .json({ message: "Token Refreshed Succesfully" });
      } else {
        res.status(403).json({ message: "Token Is Invalid" });
      }
    }
    const newToken = jwt.sign({ userId }, process.env.jwtSecret, {
      expiresIn: "12h",
    });
    res
      .setHeader("Authorization", `Bearer ${newToken}`)
      .status(201)
      .json({ message: "Token Refreshed Succesfully" });
  });
};
