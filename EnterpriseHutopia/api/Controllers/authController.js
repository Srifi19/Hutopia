// Import required modules and dependencies
const bcrypt = require('bcrypt');
const saltRounds = 10;
const authModel = require('../Models/auth');
const jwt = require('jsonwebtoken');
const config = require('../Config/config');
const Dictionary = require('../Helpers/Dictionary');

// Registration
exports.registerMainInfos = async (req, res) => {
  const { email, password } = req.body;
  
  // Hash the user's password using bcrypt
  const hashPass = await bcrypt.hash(password, saltRounds);

  // Call the registerMainInfos function from authModel to register the user's main information
  await authModel.registerMainInfos(email, hashPass)
    .then((userId) => {
      if (userId != null) {
        // Generate a JWT token upon successful registration
        const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: '12h' });

        // Set the Authorization header and respond with a success message
        res.header('Authorization', `Bearer ${token}`).status(200).json({ message: "Registration Has Been Successful" });
      } else {
        res.status(400).json({ message: "Email Already Exists!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
};

// ... (other registration functions and their explanations) ...

// Login
exports.login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var match = false;
  var cont = true;

  // Check if the email exists and retrieve the hashed password
  console.log(await Dictionary.getNameByIdType(102));
  console.log(await Dictionary.getNameByIdValue(10010001));

  const pass = await authModel.getPassword(email)
    .catch((error) => {
      if (error.sqlMessage === 'Email Not Found') {
        cont = false;
        res.status(401).json({ message: "Email Not Found" });
      } else {
        cont = false;
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

  if (cont == true) {
    // Compare the hashed password with the provided password
    match = await bcrypt.compare(password, pass);

    if (match) {
      await authModel.loginUser(email)
        .then((userId) => {
          if (userId != null) {
            // Generate a JWT token upon successful login
            const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: '12h' });
            res.header('Authorization', `Bearer ${token}`);
            res.status(200).json({ message: "Logging Has Been Successful" });
          } else {
            res.status(400).json({ message: "Unhandled Error" });
          }
        })
        .catch((error) => {
          res.status(500).json({ message: 'Internal Server Error' });
        });
    } else {
      res.status(401).json({ message: "Password Doesn't Match" });
    }
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.userId;
  
  try {
    // Verify and decode the token
    if (userId == null) {
      res.status(401).json({ message: "Unauthorized" });
    }

    // Hash the new password
    const newPass = await bcrypt.hash(newPassword, saltRounds);

    // Get the existing hashed password from the database
    let continueBool;
    const pass = await authModel.getPasswordById(userId)
      .catch((error) => {
        if (error.sqlMessage === 'User Not Found') {
          continueBool = false;
          res.status(401).json({ message: "User Not Found" });
        } else {
          continueBool = false;
          res.status(500).json({ message: 'Internal Server Error' });
        }
      });

    if (continueBool == true) {
      // continueBool the hashed old password with the existing hashed password
      const match = await bcrypt.compare(oldPassword, pass);

      if (match) {
        // Update the password in the database with the new hashed password
        const success = await authModel.updatePassword(userId, newPass);

        if (success) {
          res.status(200).json({ message: "Password Has Been Reset Successfully" });
        } else {
          res.status(400).json({ message: "Something Went Wrong" });
        }
      } else {
        res.status(401).json({ message: "Password Doesn't Match" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { OTP, email, password } = req.body;
  
  // Hash the new password
  const newPass = await bcrypt.hash(password, saltRounds);

  await authModel.forgotPassword(email, newPass, OTP)
    .then(() => {
      res.status(200).json({ message: "Password Has Been Reset" });
    }).catch((error) => {
      res.status(400).json({ message: "Invalid OTP token" });
    });
};

// Create OTP Token
exports.createOTPToken = async (req, res) => {
  const { email } = req.body;

  await authModel.createOTPToken(email)
    .then((otp) => {
      // Generate an OTP and send it via email (currently commented out)
      res.status(200).json({ message: "OTP Send Successfully", otp });
    }).catch((error) => {
      res.status(400).json({ message: "Invalid Email" });
    });
};

