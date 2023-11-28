const db = require("../Database/dbConnection"); // Import your database connection
const { v4: uuidv4 } = require("uuid");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");
class valuesModel {
  constructor() {}

  /**
   * Get skills by characters.
   *
   * @param {string} str - Search string for skills.
   * @param {number} PageNumber - Page number.
   * @param {number} PageSize - Number of results per page.
   * @returns {Array} - An array of skills matching the search criteria.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async getSkills() {
    try {
      const result = await db.query("SELECT db_GetAllSkills()");
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get certificates by characters.
   *
   * @param {string} str - Search string for certificates.
   * @param {number} PageNumber - Page number.
   * @param {number} PageSize - Number of results per page.
   * @returns {Array} - An array of certificates matching the search criteria.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async getCertificatesByChars(str, PageNumber, PageSize) {
    try {
      const result = await db.query("SELECT db_GetCertificatesByChars(?,?,?)", [
        str,
        PageNumber,
        PageSize,
      ]);
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all perks.
   *
   * @returns {Array} - An array of all perks.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async getAllPerks() {
    try {
      const result = await db.query("SELECT db_GetAllPerks()");
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * Get all supplemental pay information.
   *
   * @returns {Array} - An array of all supplemental pay information.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async getAllSupplementalPay() {
    try {
      const result = await db.query("SELECT db_GetAllSuplementalPay()");
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new valuesModel();
