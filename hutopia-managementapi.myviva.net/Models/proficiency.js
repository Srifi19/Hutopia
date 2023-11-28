const db = require("../Database/dbConnection");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");

class proficiencyModel {
  constructor() {}
  /**Get all proficiency */
  async getAllProficiency() {
    try {
      const result = await db.query("SELECT db_GetAllProficiency()");
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**Add or update Proficiency */
  async updateorAddProficiency(jsonData) {
    try {
      const result = await db.query("CALL db_AddOrUpdateProficiency(?)", [
        JSON.stringify(jsonData),
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  /**Delete Proficiency */
  async deleteProficiency(id, proficiencyLevel) {
    try {
      const result = await db.query("CALL db_DeleteProficiency(?)", [
        id === "delete" ? -1 : id,
        proficiencyLevel,
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = new proficiencyModel();
