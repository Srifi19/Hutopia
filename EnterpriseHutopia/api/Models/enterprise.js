
// models/EnterpriseModel.js
const db = require('../Database/dbConnection'); // Import your database connection //
const Dictionary = require('../Helpers/Dictionary')


class EnterpriseModel {
    constructor() { }

    async CreateEnterpriseSchedule(userId, dataSchedule){
        
        try {
            const jsondata = JSON.stringify(dataSchedule);
            JSON.stringify(jsondata);

            console.log(jsondata);

            const result = await db.query('Call db_Enterprise_CreateEnterpriseSchedule(?, ?)' , [userId, jsondata]);
            const answer = result[0][0];

            
            console.log(result);
            
            for (const key in answer) {
               
                if (key.includes("db_Enterprise")) {                   
                    const pass = JSON.parse(answer[key]);

                    return pass;
                }
            }   
        } catch (error) {
            throw (error);
        }
    }

}




module.exports = new EnterpriseModel();