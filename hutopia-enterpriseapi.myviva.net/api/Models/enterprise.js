
// models/EnterpriseModel.js
const db = require('../Database/dbConnection'); // Import your database connection //
const Dictionary = require('../Helpers/Dictionary')
const RetrievalFromJson = require('../Helpers/RetrievalFromJson')

class EnterpriseModel {
    constructor() { }

    async CreateEnterpriseSchedule(userId, dataSchedule){
        
        try {
            const jsondata = JSON.stringify(dataSchedule);
            JSON.stringify(jsondata);

            const result = await db.query('Call db_Enterprise_CreateEnterpriseSchedule(?, ?)' , [userId, jsondata]);
           return RetrievalFromJson.retrieve(result[0][0])
        } catch (error) {
            throw (error);
        }
    }


    async getEnterpriseLocation(userId){
        try {
            const result = await db.query("Select db_Enterprise_GetLocation(?)" , userId);


            return RetrievalFromJson.retrieve(result[0][0])
        } catch (error) {
            throw error;
        }
    }

    async getEnterpriseInfos(userId){
        try {
            const result = await db.query("Select db_Enterprise_GetInfos(?)" , userId);
            return RetrievalFromJson.retrieve(result[0][0])
        } catch (error) {
            throw error;
        }

        
    }

}




module.exports = new EnterpriseModel();