
// models/EnterpriseModel.js
const db = require('../Database/dbConnection'); // Import your database connection //
const Dictionary = require('../Helpers/Dictionary')
const RetrievalFromJson = require('../Helpers/RetrievalFromJson')

class ApplicantModel {
    constructor() { }

    async GetAllApplicants(jobId) {
        try {
            const result = await db.query("Select db_Matching_ByJob_GetAllApplicants(?)", [jobId]);
            RetrievalFromJson.retrieve(result)
        } catch (error) {
            console.log(error);
        }
    }

}




module.exports = new ApplicantModel();