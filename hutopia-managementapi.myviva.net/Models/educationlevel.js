const db = require("../Database/dbConnection");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");

class educationLevelModel {
  constructor() {}
  /**Get all EducationLevel */
  async getAllEducationLevel() {
    try {
      const result = await db.query("SELECT db_GetAllEducationLevels()");
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**Add or update EducationLevel */
  async updateorAddEducationLevel(jsonData) {
    try {
      const result = await db.query("CALL db_AddOrUpdateEducation(?)", [
        JSON.stringify(jsonData),
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  /**Delete EducationLevel */
  async deleteEducationLevel(id, educationLevel) {
    try {
      const result = await db.query("CALL db_DeleteEducation(?)", [
        id === "delete" ? -1 : id,
        educationLevel,
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new educationLevelModel();
