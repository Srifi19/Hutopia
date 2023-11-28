// Import required modules and dependencies
const { json } = require("express");
const db = require("../Database/dbConnection"); // Import your database connection
const GuidGenerator = require("../Helpers/GuidGenerator");
const { v4: uuidv4 } = require("uuid");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");
/**
 * Class for handling user authentication and registration.
 */
class AuthModel {
  constructor() {}

  /**
   * Register a user with main information.
   *
   * @param {string} email - User's email.
   * @param {string} password - User's password (should be hashed).
   * @returns {Promise<string>} - Resolves to the user's ID if registration is successful.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async registerMainInfos(email, password) {
    try {
      // Generate unique UserNo and UserId
      const UserNo = GuidGenerator.generateRandomId("USR", 12);
      const EnterpriseNo = GuidGenerator.generateRandomId("ENT", 12);
      const UserId = uuidv4();
      const EnterpriseId = uuidv4();

      // Insert a new user into the database (you should hash the password before storing)
      await db.query(
        "Call db_User_Register_Enterprise_mainInfos(?,?,?,?,?,?)",
        [email, password, UserId, UserNo, EnterpriseId, EnterpriseNo]
      );

      return UserId; // Return the user ID if registration is successful
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register contact person information associated with the user.
   *
   * @param {string} UserId - User's ID.
   * @param {string} firstName - First name of the contact person.
   * @param {string} lastName - Last name of the contact person.
   * @param {string} type - Type of contact person.
   * @throws {Error} - Throws an error if there's a database query issue.
   */

  async registerContactPerson(UserId, firstName, lastName, type) {
    try {
      await db.query(
        "Call db_User_Register_Enterprise_ContactPerson(?,?,?,?)",
        [UserId, firstName, lastName, type]
      );
    } catch (error) {
      throw error;
    }
  }


    /**
     * Register company information associated with the user.
     *
     * @param {string} UserId - User's ID.
     * @param {string} CompanyName - Name of the company.
     * @param {string} phoneNumber - Company's phone number.
     * @param {string} Website - Company's website URL.
     * @param {string} Industry - Industry of the company.
     * @param {json} Socials - Social media links (as an json).
     * @throws {Error} - Throws an error if there's a database query issue.
     */
    async registerCompanyInfos(UserId, CompanyName, phoneNumber, Website, Industry,linkedin , behance ,instagram,pintrest,picturePath , About) {
        try {
            // Convert Socials to JSON
            await db.query('Call db_User_Register_Enterprise_CompanyInfo(?,?,?,?,?,?,?,?,?,?)', [UserId, CompanyName, phoneNumber, Website, Industry,linkedin , behance ,instagram,pintrest , picturePath , About]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

  /**
   * Register company information associated with the user.
   *
   * @param {string} UserId - User's ID.
   * @param {string} CompanyName - Name of the company.
   * @param {string} phoneNumber - Company's phone number.
   * @param {string} Website - Company's website URL.
   * @param {string} Industry - Industry of the company.
   * @param {json} Socials - Social media links (as an json).
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async registerCompanyInfos(
    UserId,
    CompanyName,
    phoneNumber,
    Website,
    Industry,
    linkedin,
    behance,
    instagram,
    pintrest,
    picturePath
  ) {
    try {
      // Convert Socials to JSON
      await db.query(
        "Call db_User_Register_Enterprise_CompanyInfo(?,?,?,?,?,?,?,?,?,?)",
        [
          UserId,
          CompanyName,
          phoneNumber,
          Website,
          Industry,
          linkedin,
          behance,
          instagram,
          pintrest,
          picturePath,
        ]
      );
    } catch (error) {
      console.log(error);
      throw error;

    }
  }

  /**
   * Register address information associated with the user.
   *
   * @param {string} UserId - User's ID.
   * @param {string} Country - User's country.
   * @param {string} City - User's city.
   * @param {string} postalCode - User's postal code.
   * @param {string} StreetAddress - User's street address.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async registerAddress(UserId, Country, City, postalCode, StreetAddress) {
    try {
      const LocationId = uuidv4();
      await db.query("Call db_User_Register_Enterprise_Address(?,?,?,?,?,?)", [
        LocationId,
        UserId,
        Country,
        City,
        postalCode,
        StreetAddress,
      ]);
    } catch (error) {
      console.log(error);
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
            const result = await db.query('Select db_GetPassword(?)', [email]);
            
            return RetrievalFromJson.retrieve(result[0][0])

        } catch (error) {
            console.log(error)
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
     * Authenticate a user by email.
     *
     * @param {string} email - User's email.
     * @returns {Promise<string|null>} - Resolves to the user's ID if authentication is successful, otherwise null.
     * @throws {Error} - Throws an error if there's a database query issue.
     */
    async loginUser(email) {
        try {
            // Query the database to authenticate the user (you should compare hashed passwords)
            const result = await db.query('SELECT db_Enterprise_Login(?)', [email]);
            return  RetrievalFromJson.retrieve(result[0][0]);
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

  /**
   * Create and return an OTP token for a user by email.
   *
   * @param {string} email - User's email.
   * @returns {Promise<string>} - Resolves to the generated OTP token.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async createOTPToken(email, otp) {
    try {
      await db.query("Call db_CreateOTPToken(?,?)", [email, otp]);
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

module.exports = new AuthModel();
