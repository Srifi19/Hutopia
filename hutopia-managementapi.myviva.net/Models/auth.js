const db = require("../Database/dbConnection"); // Import your database connection
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");
const GuidGenerator = require("../Helpers/GuidGenerator");
const { v4: uuidv4 } = require("uuid");

class LoginModel {
  constructor() {}

  /**
   * Register a user with main information.
   *
   * @param {string} email - User's email.
   * @param {string} password - User's password (should be hashed).
   * @returns {Promise<string>} - Resolves to the user's ID if registration is successful.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async createAccount(email, password, roles) {
    try {
      // Generate unique UserNo and UserId
      const UserNo = GuidGenerator.generateRandomId("USR", 12);
      const UserId = uuidv4();

      // Insert a new user into the database (you should hash the password before storing)
      await db.query("CALL db_Create_Management_Account(?, ?, ?, ?, ?)", [
        email,
        UserId,
        UserNo,
        password,
        roles,
      ]);

      return UserId; // Return the user ID if registration is successful
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Authenticate a user by email.
   *
   * @param {string} email - User's email.
   * @returns {Promise<string|null>} - Resolves to the user's ID if authentication is successful, otherwise null.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async loginUser(email) {
    try {
      // Query the database to authenticate the user (you should compare hashed passwords)
      const result = await db.query("SELECT db_Management_Login(?)", [email]);
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a user's password by email.
   *
   * @param {string} email - User's email.
   * @returns {Promise<string|null>} - Resolves to the user's password if found, otherwise null.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async getPassword(email) {
    try {
      const result = await db.query("Select db_GetPassword(?)", [email]);
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a user's password by user ID.
   *
   * @param {string} id - User's ID.
   * @returns {Promise<string|null>} - Resolves to the user's password if found, otherwise null.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async getPasswordById(id) {
    try {
      const result = await db.query("Select db_GetPasswordById(?)", [id]);
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update a user's password.
   *
   * @param {string} userId - User's ID.
   * @param {string} newPassword - User's new password (should be hashed).
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async updatePassword(userId, newPassword) {
    try {
      const result = await db.query("Call db_ResetPassword(?,?)", [
        userId,
        newPassword,
      ]);
      // Check the result of the stored procedure
      // Handle other potential errors here if needed
    } catch (error) {
      // Handle database connection or other unexpected errors here
      throw error;
    }
  }

  /**
   * Forgot password functionality with OTP token.
   *
   * @param {string} userEmail - User's email.
   * @param {string} password - User's new password (should be hashed).
   * @param {string} OTPToken - OTP token for verification.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async forgotPassword(userEmail, password) {
    try {
      await db.query("Call db_forgotPassword(?,?)", [userEmail, password]);
    } catch (error) {
      throw error;
    }
  }

  async verifyPin(email, OTP) {
    try {
      const result = await db.query("Select db_VerifyPin(?,?)", [email, OTP]);
      console.log(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new LoginModel();
