const db = require("../Database/dbConnection");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");

class enterpriseModel {
  constructor() {}

  async gettAllenterprise(str, PageNumber, PageSize) {
    try {
      const result = await db.query("SELECT db_GetAllEnterprises(?,?,?)", [
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

  async updateSuspend(EnterpriseId) {
    try {
      const result = await db.query("CALL db_Enterprise_Suspend(?)", [
        EnterpriseId,
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateUnsuspend(EnterpriseId) {
    try {
      const result = await db.query("CALL db_Enterprise_Unsuspend(?)", [
        EnterpriseId,
      ]);
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getNumofApplicantAndPorspect() {
    try {
      const result = await db.query(
        "CALL db_Enterprise_GetNumber_APPLICANT_PORSPECT()"
      );
      console.log(result);
      return result[0][0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

module.exports = new enterpriseModel();
