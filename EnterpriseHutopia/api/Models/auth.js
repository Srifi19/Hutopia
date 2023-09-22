// Import required modules and dependencies
const db = require('../Database/dbConnection'); // Import your database connection
const GuidGenerator = require('../Helpers/GuidGenerator');

const { v4: uuidv4 } = require('uuid');

// Create a class for authentication-related operations
class AuthModel {
    constructor() { }

    // Register a user with main information
    async registerMainInfos(email, password) {
        try {
            // Generate unique UserNo and UserId
            var UserNo = GuidGenerator.generateRandomId("USR", 6);
            var EnterpriseNo = GuidGenerator.generateRandomId("ENT", 6);
            var UserId = uuidv4();
            var EnterpriseId = uuidv4();

            // Insert a new user into the database (you should hash the password before storing)
            const result = await db.query('Call db_User_Register_Enterprise_mainInfos(?,?,?,?,?,?)', [email, password, UserId, UserNo, EnterpriseId, EnterpriseNo]);

            return UserId; // Return the user ID if registration is successful   
        } catch (error) {
            throw error;
        }
    }

    // Register contact person information associated with the user
    async registerContactPerson(UserId, firstName, lastName, type) {
        try {
            const result = await db.query('Call db_User_Register_Enterprise_ContactPerson(?,?,?,?)', [UserId, firstName, lastName, type]);
            console.log(result);
            return;
        } catch (error) {
            throw error;
        }
    }

    // Register company information associated with the user
    async registerCompanyInfos(UserId, CompanyName, phoneNumber, Website, Industry, Socials) {
        try {
            // Convert Socials to JSON
            var json = JSON.stringify(Socials);
            const result = await db.query('Call db_User_Register_Enterprise_CompanyInfo(?,?,?,?,?,?)', [UserId, CompanyName, phoneNumber, Website, Industry, json]);
            console.log(result);
        } catch (error) {
            throw error;
        }
    }

    // Register address information associated with the user
    async registerAddress(UserId, Country, City, postalCode, StreetAddress) {
        try {
            const result = await db.query('Call db_User_Register_Enterprise_Address(?,?,?,?,?)', [UserId, Country, City, postalCode, StreetAddress]);
            return;
        } catch (error) {
            throw error;
        }
    }

    // Get a user's password by email
    async getPassword(email) {
        try {
            const result = await db.query('Select db_GetPassword(?)', [email]);

            if (result.length > 0) {
                var response = result[0][0];
                let pass = null;

                // Loop through the response to extract the password
                for (const key in response) {
                    if (key.includes("db_GetPassword")) {
                        pass = response[key];
                        break;
                    }
                }
                return pass; // Return the user's password if found
            }
        } catch (error) {
            throw (error);
        }
    }

    // Get a user's password by user ID
    async getPasswordById(id) {
        try {
            const result = await db.query('Select db_GetPasswordById(?)', [id]);
            if (result.length > 0) {
                var response = result[0][0];
                let pass = null;

                // Loop through the response to extract the password
                for (const key in response) {
                    if (key.includes("db_GetPasswordById")) {
                        pass = response[key];
                        break;
                    }
                }
                return pass; // Return the user's password if found
            }
        } catch (error) {
            throw error;
        }
    }

    // Authenticate a user by email
    async loginUser(email) {
        try {
            // Query the database to authenticate the user (you should compare hashed passwords)
            const result = await db.query('SELECT db_Enterprise_Login(?)', [email]);

            if (result.length > 0) {
                var response = result[0][0];
                let userId = null;

                // Loop through the response to extract the user ID
                for (const key in response) {
                    if (key.includes("db_Enterprise_Login")) {
                        userId = response[key];
                        break;
                    }
                }
                return userId; // Return the user ID if authentication is successful
            }
            return null; // Return null if authentication fails
        } catch (error) {
            throw error;
        }
    }

    // Update a user's password
    async updatePassword(userId, newPassword) {
        try {
            const result = await db.query("Call db_ResetPassword(?,?)", [userId, newPassword]);
            // Check the result of the stored procedure
            return true; // Return true if the password is updated successfully
            // Handle other potential errors here if needed
        } catch (error) {
            // Handle database connection or other unexpected errors here
            return false;
        }
    }

    // Forgot password functionality with OTP token
    async forgotPassword(userEmail, password, OTPToken) {
        try {
            const result = await db.query("Call db_forgotPassword(?,?,?)", [userEmail, OTPToken, password]);
            return true; // Return true if the password is updated successfully
        } catch (error) {
            throw error;
        }
    }

    // Create and return an OTP token for a user by email
    async createOTPToken(email) {
        try {
            const otp = GuidGenerator.generateRandomOTP();
            await db.query("Call db_CreateOTPToken(?,?)", [email, otp]);
            return otp; // Return the generated OTP token
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthModel();
