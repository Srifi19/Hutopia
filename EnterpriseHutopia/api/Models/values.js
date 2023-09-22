
// models/authModel.js

const db = require('../Database/dbConnection'); // Import your database connection
const Dictionary = require('../Helpers/Dictionary')
const { v4: uuidv4 } = require('uuid');


class ValuesModel {
    constructor() { }


    async GetSkillsByChar(str  , PageNumber , PageSize){
        try {
            const result = await db.query('select db_GetSkillsByChar(?,?,?)' ,[str , PageNumber , PageSize ])
            const answer = result[0][0]
            console.log(result);
            for (const key in answer) {
                
                if (key.includes("db_GetSkillsByChar")) {                   
                    const pass = JSON.parse(answer[key]);

                    return pass;
                }
            }   
        } catch (error) {
           throw error;
        }
    }



    async GetCertificateByChars(str,PageNumber,pageSize){
        try {
            const result = await db.query('select db_GetCertificatesByChars(?,?,?)' ,[str,PageNumber,pageSize])
            const answer = result[0][0]
            
            for (const key in answer) {
               
                if (key.includes("db_GetCertificateByChars")) {  
                    const pass = JSON.parse(answer[key]);
                    return pass;
                }else if(answer[key] === null) return null;
            }   
        } catch (error) {
           throw error;
        }
    }


    async GetAllPerks(){
        try {
            const result = await db.query('select db_GetAllPerks()')
            const answer = result[0][0]
            
            for (const key in answer) {
               
                if (key.includes("db_GetAllPerks")) {  
                    const pass = JSON.parse(answer[key]);
                    return pass;
                }else if(answer[key] === null) return null;
            }

        } catch (error) {
            throw error;
        }

    }

    async GetAllSuplementalPay(){
        try {
            const result = await db.query('select db_GetAllSuplementalPay()')
            const answer = result[0][0]
            console.log(answer);
            for (const key in answer) {
                    
                if (key.includes("db_GetAll")) {  
                    const pass = JSON.parse(answer[key]);
                    
                    return pass;
                }else if(answer[key] === null) return null;
            }

        } catch (error) {
            throw error;
        }

    }



}




module.exports = new ValuesModel();