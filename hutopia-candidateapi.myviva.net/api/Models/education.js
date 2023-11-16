
// models/EnterpriseModel.js
const db = require('../Database/dbConnection'); // Import your database connection //
const Dictionary = require('../Helpers/Dictionary.js')
const { v4: uuidv4 } = require('uuid');
const RetrievalFromJson = require('../Helpers/RetrievalFromJson')
const GuidGenerator = require('../Helpers/GuidGenerator');
class educationModel {
    constructor() { }

    async addEducation(userId , EducationJSON){
        try {
            const education = JSON.stringify(EducationJSON);
            await db.query("Call db_Education_AddEducation(?,?)" , [userId,education]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getEducation(userId){
        try {
            const result = await db.query('Select db_Education_GetCandidateEducation(?)' , [userId]);
            return RetrievalFromJson.retrieve(result[0][0]);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}




module.exports = new educationModel();