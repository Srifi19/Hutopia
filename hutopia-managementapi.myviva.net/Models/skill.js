const db = require("../Database/dbConnection");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");

class skillModel {
  constructor() {}
  /**Get all Skills */
  async getAllSkills() {
    try {
      const result = await db.query("SELECT db_GetAllSkills()");
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  /**Add or update Skill */
  async updateorAddSkills(jsonData) {
    try {
      const result = await db.query("CALL db_AddOrUpdateSkills(?)", [
        JSON.stringify(jsonData),
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteSkills(id, skillName) {
    try {
      const result = await db.query("CALL db_DeleteSkill(?)", [
        id === "delete" ? -1 : id,
        skillName,
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = new skillModel();
