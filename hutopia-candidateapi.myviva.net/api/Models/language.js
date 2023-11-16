// models/EnterpriseModel.js
const db = require('../Database/dbConnection'); // Import your database connection //
const Dictionary = require('../Helpers/Dictionary.js')
const { v4: uuidv4 } = require('uuid');
const RetrievalFromJson = require('../Helpers/RetrievalFromJson')
const GuidGenerator = require('../Helpers/GuidGenerator');
class languageModel {
    constructor() { }

    async addLanguage(candidateId , language){
        try {
            await db.query("call db_Languages_AddLanguagesLevel(?,?)" , [candidateId , language])
        } catch (error) {
            throw error;
        }

    }

    
    async getLanguages(candidateId){
        try {
            const result = await db.query("Select db_Languages_GetLanguages(?)" ,[candidateId]);
            return RetrievalFromJson.retrieve(result[0][0]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAllLanguages(){
        try{
            const result = await db.query("select db_GetAllLanguages()");

            return RetrievalFromJson.retrieve(result[0][0]);
        }catch (error){
            console.log(error)
            throw error;
        }
    }

    async getAllProficiency(){
        try{
            const result = await db.query("select db_GetAllProficiency()");
            return RetrievalFromJson.retrieve(result[0][0]);
        }catch (error) {
            throw error;
        }
    }



}




module.exports = new languageModel();