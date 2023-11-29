
const db = require('../Database/dbConnection'); // Import your database connection
const { v4: uuidv4 } = require('uuid');
const RetrievalFromJson = require('../Helpers/RetrievalFromJson')
class ProspectModel {
    constructor() { }

    async getAllProspects(jobId){
        try {
            
            const result = await db.query("Select db_prospects_GetAllProspects(?)" , [jobId])
            return RetrievalFromJson.retrieve(result[0][0])
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = new ProspectModel();
