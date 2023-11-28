const db = require("../Database/dbConnection");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");
class JobModel {
  constructor() {}

  /**Get all jobs */
  async getAllJobs(PageNumber, PageSize) {
    try {
      const result = await db.query("SELECT db_GetAllJob(?,?)", [
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
module.exports = new JobModel();
