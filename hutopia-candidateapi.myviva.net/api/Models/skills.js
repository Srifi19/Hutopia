
// models/EnterpriseModel.js
const db = require('../Database/dbConnection'); // Import your database connection //
const Dictionary = require('../Helpers/Dictionary.js')
const RetrievalFromJson = require('../Helpers/RetrievalFromJson');
const { v4: uuidv4 } = require('uuid');
const GuidGenerator = require('../Helpers/GuidGenerator');
class skillModel {
    constructor() { }

    async addSkills(candidateId , skills){
        try {
            console.log(skills)
            await db.query("call db_Skill_AddSkillProficiency(?,?)" , [candidateId , skills])
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async getSkills(candidateId){
        try {
            const result = await db.query("Select db_Skill_GetCandidateSkills(?)" ,[candidateId]);
            return RetrievalFromJson.retrieve(result[0][0]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllSkills(){
        try{
            const result = await db.query("Select db_GetAllSkills()");
            return RetrievalFromJson.retrieve(result[0][0])
        }catch (error){
            throw error;
        }
    }



}




module.exports = new skillModel();