const db = require("../Database/dbConnection");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");
class PerkModel {
  constructor() {}
  /**Get all Perks */
  async getAllPerks() {
    try {
      const result = await db.query("SELECT db_GetAllPerks()");
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  /**Add or update perk */
  async updateorAddPerks(arr) {
    try {
      const [result] = await db.query(
        "CALL db_UpdateOrAddPerks(?, @operationResult)",
        [JSON.stringify(arr)]
      );
      const [output] = await db.query(
        "SELECT @operationResult AS operationResult"
      );
      const operationResult = output[0].operationResult;

      console.log(operationResult);

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deletePerks(id, perkName) {
    try {
      const result = await db.query("CALL db_DeletePerk(?)", [
        id === "delete" ? -1 : id,
        perkName,
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new PerkModel();
