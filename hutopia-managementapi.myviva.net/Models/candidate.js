const db = require("../Database/dbConnection");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");

class candidateModel {
  constructor() {}
  /**Get all Candidates */
  /**

   *
   * @param {number} PageNumber - Page number.
   * @param {number} PageSize - Number of results per page.
   * @returns {Array} - An array of skills matching the search criteria.
   * @throws {Error} - Throws an error if there's a database query issue.
   */
  async getAllCandidate(str, PageNumber, PageSize) {
    try {
      const result = await db.query("SELECT db_GetAllCandidates(?,?,?)", [
        str,
        PageNumber,
        PageSize,
      ]);

      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
module.exports = new candidateModel();
