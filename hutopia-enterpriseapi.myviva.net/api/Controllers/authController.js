// Import required modules and dependencies
const bcrypt = require("bcrypt");
const saltRounds = 10;
const authModel = require("../Models/auth");
const jwt = require("jsonwebtoken");
const config = require("../Config/config");
const GuidGenerator = require("../Helpers/GuidGenerator");
const loggerHelper = require("../Helpers/LoggerHelper");
const nodemailer = require("../Helpers/NodeMailer");
const authValidator = require("../Validators/authValidator");
const { error } = require("winston");
require("dotenv").config();
const fileHandling = require("../Helpers/FileHandling");

/**
 * Register a user with main information.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.registerMainInfos = async (req, res) => {
  const { email, password } = req.body;

  // Validate Both Email And Password
  const result = authValidator.validateMainInfos(email, password);

  if (true) {
    const hashPass = await bcrypt.hash(password, saltRounds);
    // Hash Password Before Saving in database
    await authModel
      .registerMainInfos(email, hashPass)
      .then(async (userId) => {
        // Token in Header
        const token = jwt.sign({ userId }, process.env.jwtSecret, {
          expiresIn: "12h",
        });
        res.status(200).header("Authorization", `Bearer ${token}`).json({
          success: true,
          message: "Registration has been successful.",
        });
        loggerHelper.SuccessLogger(
          email,
          "RegisterMainInfos Have Succesfully Worked"
        );
      })
      .catch((error) => {
        loggerHelper.ErrorLogger(
          email,
          "RegisterMainInfos Have Not Been Succesfull",
          error
        );
        res
          .status(400)
          .json({ success: false, message: "Email already exists." });
      });
  } else {
    loggerHelper.ErrorLogger(
      email,
      "RegistrationMainInfos Have Been Unsuccesfull due to Validation Error"
    );
    res.status(434).json({ success: false, message: "Validation Error" });
  }
};

/**
 * Register a contact person associated with the user.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.registerContactPerson = async (req, res) => {
  const userId = req.userId;
  const { firstName, lastName, type } = req.body;
  const result = authValidator.validateContactPersons(
    firstName,
    lastName,
    type
  );

  if (true) {
    await authModel
      .registerContactPerson(userId, firstName, lastName, type)
      .then(() => {
        loggerHelper.SuccessLogger(
          userId,
          "registerContactPerson Successfully Inserted Data"
        );
        res.status(200).json({
          success: true,
          message: "registerContactPerson successfully inserted.",
        });
      })
      .catch((error) => {
        loggerHelper.ErrorLogger(
          userId,
          "registerContactPerson unsuccessfully inserted",
          error
        );
        res.status(400).json({ success: false, message: "Failed Miserably" });
      });
  } else {
    loggerHelper.ErrorLogger(
      userId,
      "registerContactPerson unsuccessfully inserted",
      "Validation error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
};

/**
 * Register company information associated with the user.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */

exports.registerCompanyInfos = async (req, res) => {
  const userId = req.userId;
  const {
    CompanyName,
    phoneNumber,
    Website,
    Industry,
    linkedin,
    behance,
    instagram,
    pintrest,
    About
  } = req.body;
  const { image } = req.files;

  const result = authValidator.validateCompanyInfos(
    CompanyName,
    phoneNumber,
    Website,
    Industry,
    linkedin,
    behance,
    instagram,
    pintrest,
    // About
  );
  if (true) {
    const picturePath = await fileHandling
      .uploadPhoto(null, "EnterpriseLogo", image, userId)
      .catch((error) => {
        loggerHelper.ErrorLogger(
          userId,
          "registerCompanyInfos Image upload didnt work",
          error
        );
      });

    await authModel
      .registerCompanyInfos(
        userId,
        CompanyName,
        phoneNumber,
        Website,
        Industry,
        linkedin,
        behance,
        instagram,
        pintrest,
        picturePath,
        About
      )
      .then(() => {
        loggerHelper.SuccessLogger(
          userId,
          "registerCompanyInfos Succesfully Worked"
        );
        res.status(200).json({
          success: true,
          message: "Company information successfully inserted.",
        });
      })
      .catch(() => {
        loggerHelper.ErrorLogger(
          userId,
          "registerCompanyInfos didnt work",
          error
        );
        res.status(400).json({
          success: false,
          message: "Company information unsuccessfully inserted.",
        });
      });
  } else {
    loggerHelper.ErrorLogger(
      userId,
      "registerCompanyInfos didnt work",
      "Validation Error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
};

/**
 * Register address information associated with the user.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.registerAddress = async (req, res) => {
  const userId = req.userId;
  const { Country, City, PostalCode, StreetAddress } = req.body;
  const result = authValidator.validateAddress(
    Country,
    City,
    PostalCode,
    StreetAddress
  );

  if (result.flag === true) {
    await authModel
      .registerAddress(userId, Country, City, PostalCode, StreetAddress)
      .then(() => {
        loggerHelper.SuccessLogger(userId, "registerAddress Succesfull");
        res.status(200).json({
          success: true,
          message: "Address information successfully inserted.",
        });
      })
      .catch((error) => {
        loggerHelper.ErrorLogger(userId, "registerAddress Unsuccesull", error);
        res.status(400).json({
          success: false,
          message: "Something went wrong while inserting address information.",
        });
      });
  } else {
    loggerHelper.ErrorLogger(
      userId,
      "registerAddress Unsuccesull",
      "Validation Error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
};

/**
 * Log in a user.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  const result = authValidator.validateLogin(email, password);
  if (true) {
    // Check if the email exists and retrieve the hashed password
    await authModel
      .getPassword(email)
      .then(async (pass) => {
        // Compare the hashed password with the provided password
        await bcrypt
          .compare(password, pass)
          .then(async (match) => {
            if (match) {
         
              const user = await authModel.loginUser(email);
              console.log(user);
              const userId = user.Id;
              loggerHelper.SuccessLogger(email, `User logged in successfully`);
              const token = jwt.sign({ userId }, process.env.jwtSecret, {
                expiresIn: "12h",
              });
              const step = user.Step
              res.header("Authorization", `Bearer ${token}`);
              res.status(200).json({
                success: true,
                message: "Logging in was successful.",
                data: { token  , step},
              });
            } else {
              loggerHelper.ErrorLogger(
                email,
                "Login Unsuccesull getting password Was Unsucesfull"
              );
              res
                .status(400)
                .json({ success: false, message: "Password Doesnt Match" });
            }
          })
          .catch((error) => {
            loggerHelper.ErrorLogger(
              email,
              "Login Unsuccesull getting password Was Unsucesfull",
                error
            );
            res
              .status(400)
              .json({ success: false, message: "Password Doesnt Match" });
          });
      })
      .catch((error) => {
        loggerHelper.ErrorLogger(
          email,
          "Login Unsuccesull getting password Was Unsucesfull",
          error
        );
        res
          .status(400)
          .json({ success: false, message: "Email Doesnt Exists" });
      });
  } else {
    loggerHelper.ErrorLogger(
      email,
      "Login Unsuccesull Validation Error Match",
      "Validation Error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
  // Log that a login attempt is being made
};

/**
 * Reset a user's password.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.userId;

  const result = authValidator.validateResetPassword(oldPassword, newPassword);
  if (true) {
    // Hash the new password
    const newPass = await bcrypt.hash(newPassword, saltRounds);

    // Get the existing hashed password from the database
    const pass = await authModel.getPasswordById(userId);

    // Compare the hashed old password with the existing hashed password
    const match = await bcrypt.compare(oldPassword, pass);

    if (match) {
      // Update the password in the database with the new hashed password
      await authModel
        .updatePassword(userId, newPass)
        .then(() => {
          loggerHelper.SuccessLogger(userId, "resetPassword Was succesfull");
          res.status(200).json({
            success: true,
            message: "Password has been reset successfully.",
          });
        })
        .catch((error) => {
          loggerHelper.ErrorLogger(userId, "resetPassword Not Working", error);
          res
            .status(500)
            .json({ success: false, message: "Something Went Wrong" });
        });
    } else {
      // match = false => Password Doesnt Match
      loggerHelper.ErrorLogger(
        userId,
        "resetPassword Not Working Doesnt Match",
        "Diesbt Match"
      );
      res
        .status(401)
        .json({ success: false, message: "Password doesn't match." });
    }
  } else {
    loggerHelper.ErrorLogger(
      userId,
      "resetPassword Not Working Due To Validation Error",
      "Validation error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
};

/**
 * Forgot password functionality with OTP token.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const result = authValidator.validateForgotPassword(email, newPassword);
  if (result.flag === true) {
    // Hash the new password

    const newPass = await bcrypt.hash(newPassword, saltRounds);
    await authModel
      .forgotPassword(email, newPass)
      .then(() => {
        loggerHelper.SuccessLogger(email, "forgotPassword workign correcrylt");
        res.status(200).json({
          success: true,
          message: "Password has been reset successfully.",
        });
      })
      .catch((error) => {
        loggerHelper.ErrorLogger(
          email,
          "forgotPassword not working due to Internal Error",
          error
        );
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      });
  } else {
    loggerHelper.ErrorLogger(
      email,
      "forgotPassword not working due to Validation Error",
      "Validation Error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
};

/**
 * Create an OTP token for email verification.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.createOTPToken = async (req, res) => {
  const { email, flag } = req.body;

  const result = authValidator.validateCreateOTPToken(email);

  if (result.flag === true) {
    var otp = GuidGenerator.generateRandomOTP();
    await authModel
      .createOTPToken(email, otp)
      .then(() => {
        const mailOptions = {
          from: {
            address: process.env.mail_from_address,
            name: process.env.MAIL_FROM_NAME,
          },
          to: email, // Recipient's email address
          subject: "OTP Verification", // Email subject
          html: `<!DOCTYPE html>
        <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
        
        <head>
          <title></title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
          <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" type="text/css"><!--<![endif]-->
          <style>
            * {
              box-sizing: border-box;
            }
        
            body {
              margin: 0;
              padding: 0;
            }
        
            a[x-apple-data-detectors] {
              color: inherit !important;
              text-decoration: inherit !important;
            }
        
            #MessageViewBody a {
              color: inherit;
              text-decoration: none;
            }
        
            p {
              line-height: inherit
            }
        
            .desktop_hide,
            .desktop_hide table {
              mso-hide: all;
              display: none;
              max-height: 0px;
              overflow: hidden;
            }
        
            .image_block img+div {
              display: none;
            }
        
            @media (max-width:520px) {
              .desktop_hide table.icons-inner {
                display: inline-block !important;
              }
        
              .icons-inner {
                text-align: center;
              }
        
              .icons-inner td {
                margin: 0 auto;
              }
        
              .mobile_hide {
                display: none;
              }
        
              .row-content {
                width: 100% !important;
              }
        
              .stack .column {
                width: 100%;
                display: block;
              }
        
              .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
              }
        
              .desktop_hide,
              .desktop_hide table {
                display: table !important;
                max-height: none !important;
              }
            }
          </style>
        </head>
        
        <body style="margin: 0; background-color: #fff; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
          <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;">
            <tbody>
              <tr>
                <td>
                  <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d3e8f8;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 500px; margin: 0 auto;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                  <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td class="pad">
                                        <div></div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d3e8f8;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 500px; margin: 0 auto;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: middle; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                  <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td class="pad">
                                        <h1 style="margin: 0; color: #2b2829; direction: ltr; font-family: 'Poppins','Helvetica'; font-size: 42px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">OTP PASSWORD</span></h1>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d3e8f8;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 500px; margin: 0 auto;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                  <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                    <tr>
                                      <td class="pad" style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                        <div style="color:#101112;direction:ltr;font-family:'Poppins','Helvetica';font-size:16px;font-weight:400;letter-spacing:0px;line-height:150%;text-align:center;mso-line-height-alt:24px;">
                                          <p style="margin: 0;">Enter the OTP password provided below in the application to proceed.</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                  <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                    <tr>
                                      <td class="pad">
                                        <div style="color:#101112;direction:ltr;font-family:'Poppins','Helvetica';font-size:48px;font-weight:400;letter-spacing:20px;line-height:150%;text-align:center;mso-line-height-alt:72px;">
                                          <p style="margin: 0;">${otp}</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                    <tbody>
                      <tr>
                        <td>
                          <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 500px; margin: 0 auto;" width="500">
                            <tbody>
                              <tr>
                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                  <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td class="pad" style="vertical-align: middle; color: #9d9d9d; font-family: inherit; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                              <!--[if !vml]><!-->
                                              <table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table><!-- End -->
        </body>
        
        </html>`, // Email body with OTP
        };
        nodemailer.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return false;
          } else {
            console.log("Email sent:", info.response);
            return true;
          }
        });

        res
          .status(200)
          .json({ message: "OTP sent succesfully", success: true });
      })
      .catch((err) => {
        if ((err.sqlMessage = "Email Already Exists")) {
          loggerHelper.ErrorLogger(
            email,
            "createOTPToken didnt work due Email already Exists",
            err
          );
          res
            .status(400)
            .json({ message: "Email Already Exists", success: false });
        } else {
          loggerHelper.ErrorLogger(
            email,
            "createOTPToken didnt work due to System Error",
            err
          );
          res.status(500).json({ message: "System Error", success: false });
        }
      });
  } else {
    loggerHelper.ErrorLogger(
      email,
      "createOTPToken didnt work due to Validation Error",
      "Validation Error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
};

exports.verifyOTPToken = async (req, res) => {
  const { otp, email, flag } = req.body;

  const result = authValidator.validateVerifyOTPToken(otp, email);
  if (result.flag == true) {
    await authModel
      .verifyPin(email, otp)
      .then(async () => {
        loggerHelper.SuccessLogger(
          email,
          "verifyOTPToken pin has been Validated"
        );
        
          await this.registerMainInfos(req, res);
        
      })
      .catch((error) => {
        loggerHelper.ErrorLogger(
          email,
          "verifyOTPToken Problem Occured",
          error
        );
        res.status(400).json({ message: "OTP is Wrong", success: false });
      });
  } else {
    loggerHelper.ErrorLogger(
      email,
      "VerifyOTPToken Validation Error",
      "Validation Error"
    );
    res
      .status(400)
      .json({ success: false, message: result.message, validationError: true });
  }
};
