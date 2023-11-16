
// models/EnterpriseModel.js
const db = require('../Database/dbConnection'); // Import your database connection //
const Dictionary = require('../Helpers/Dictionary.js')
const { v4: uuidv4 } = require('uuid');
const GuidGenerator = require('../Helpers/GuidGenerator');
const RetrievalFromJson = require('../Helpers/RetrievalFromJson')
class experienceModel {
    constructor() { }

    async addExperience(userId , ExperienceJSON){
        try {
            const experience = JSON.stringify(ExperienceJSON);
                await db.query("Call db_Experience_AddExperiences(?,?)" , [userId,experience]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getExperiences(userId){
        try {
            const result = await db.query('Select db_Experience_GetCandidateExperience(?)' , [userId]);
            return RetrievalFromJson.retrieve(result[0][0]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }



}




module.exports = new experienceModel();