const db = require("../Database/dbConnection");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");

class privatejobModel {
  constructor() {}
  /**Get all privatejob */
  async getAllPrivatejobTitle() {
    try {
      const result = await db.query("SELECT db_GetAllPrivateJobTitle()");
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**Add or update privatejob */
  async updateorAddPrivatejobTitle(jsonData) {
    try {
      const result = await db.query("CALL db_AddOrUpdatePrivateJobTitle(?)", [
        JSON.stringify(jsonData),
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**Delete PrivateJobTitle */
  async deletePrivatejobTitle(id, PrivateJobName) {
    try {
      const result = await db.query("CALL db_DeletePrivateJob(?)", [
        id === "delete" ? -1 : id,
        PrivateJobName,
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new privatejobModel();
