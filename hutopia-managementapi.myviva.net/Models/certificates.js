const db = require("../Database/dbConnection");
const RetrievalFromJson = require("../Helpers/RetrievalFromJson");
class CertificatesModel {
  constructor() {}

  /**Get all certificates */
  async getAllCertificates() {
    try {
      const result = await db.query("SELECT db_GetAllCertificates()");
      return RetrievalFromJson.retrieve(result[0][0]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**Add or update certificate */
  async updateorAddCertificates(
    id,
    CertificateName,
    Provider,
    linkofCertificate,
    Price
  ) {
    try {
      const result = await db.query(
        "CALL db_AddOrUpdateCertificate(?, ?, ?, ?,?)",
        [id, CertificateName, Provider, linkofCertificate, Price]
      );
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**Delete certificate */
  async deleteCertificates(id) {
    try {
      const result = await db.query("CALL db_DeleteCertificate(?)", [id]);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = new CertificatesModel();
