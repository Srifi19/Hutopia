const db = require("../Database/dbConnection");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");

class supplementalModel {
  constructor() {}

  /**Get all SupplementalPay */
  async getAllSupplementalPay() {
    try {
      const result = await db.query("SELECT db_GetAllSuplementalPay()");
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateorAddSupplemental(jsonData) {
    try {
      console.log(jsonData, "innn");
      const result = await db.query("CALL db_UpdateOrAddSupplementalPay(?)", [
        JSON.stringify(jsonData),
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteSupplemental(id, supplementalName) {
    try {
      const result = await db.query("CALL db_DeleteSupplementalPay(?)", [
        id === "delete" ? -1 : id,
        supplementalName,
      ]);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = new supplementalModel();
