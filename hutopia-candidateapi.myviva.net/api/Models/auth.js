
// models/EnterpriseModel.js
const db = require('../Database/dbConnection'); // Import your database connection //
const Dictionary = require('../Helpers/Dictionary.js')
const { v4: uuidv4 } = require('uuid');
const GuidGenerator = require('../Helpers/GuidGenerator');
class authModel {
    constructor() { }


    async registerMainInfos(email , pass){
        try {
            const userId = uuidv4();
            const userNo = GuidGenerator.generateRandomId("USR" , 12);
            const candidateNo = GuidGenerator.generateRandomId("CAN" , 12);
            await db.query("Call db_User_Register_Candidates_MainInfos(?,?,?,?,?)" ,[email,pass , userId ,userNo,candidateNo])
            return userId;
            
        } catch (error) {
            console.log(error);
            throw error;
        }      
    }

    async registerPersonalInfos(userId,firstName,lastName,photoPath,dob,gender){
        try {
            await db.query("Call db_User_Register_Candidate_PersonalInfo(?,?,?,?,?,?)" , [userId,firstName,lastName,photoPath,dob,gender])
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async registerProfessionalInfos(userId,professionalTitle,bio,preferedJob,country,town,streetAddress,postalCode,cvPath){
        try {
            await db.query("Call db_User_Register_Candidate_ProfessionalInfo(?,?,?,?,?,?,?,?,?)" , [userId,professionalTitle,bio,preferedJob,country,town,streetAddress,postalCode,cvPath]);
        } catch (error) {
            console.log(error);
           throw error; 
        }
    }


}




module.exports = new authModel();