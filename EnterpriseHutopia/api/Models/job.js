
// models/authModel.js

const db = require('../Database/dbConnection'); // Import your database connection
const Dictionary = require('../Helpers/Dictionary')
const { v4: uuidv4 } = require('uuid');


class JobModel {
    constructor() { }


    async CreateJob(userId, Infos) { // Type => Function

        var JobId = uuidv4();

        try {
            const { Skills, Perks, ...rest } = Infos;
           
            
            // Use Promise.all to map the Skills and Perks arrays concurrently
            const mappedSkillsPromises = Skills.map(skill => Dictionary.getIdByNameValue(skill , "Skills").catch((err) => console.log(err)));
            const mappedPerksPromises = Perks.map(perk => Dictionary.getIdByNameValue(perk , "Perks").catch((err) => console.log(err)));
            
    
            // Wait for all promises to resolve using Promise.all
            const mappedSkills = await Promise.all(mappedSkillsPromises);
            const mappedPerks = await Promise.all(mappedPerksPromises);

         
        
            // Create a new object with mapped Skills and Perks arrays
            const mappedInfos = {
                ...rest,
                Skills: mappedSkills,
                Perks: mappedPerks,
            };

            const json = JSON.stringify(mappedInfos);

             const result = await db.query('Call db_Job_CreateJob (?,?,?)', [JobId, userId, json]);
            console.log(result);
            return result;

            
        } catch (error) {
            throw error;
        }

    }


    async GetAllJobsForEnterprise(userId){
        try {
            const result = await db.query('Select db_Enterprise_HomePage_GetAllJobs(?)' , userId);
            const answer = result[0][0]
            for (const key in answer) {
               
                if (key.includes("db_Enterprise")) {                   
                    const pass = JSON.parse(answer[key]);

                    return pass;
                }
            }   
        } catch (error) {
            throw error;
        }
    }


    async GetJobInformations(JobId){
        try {
            const result = await db.query('Select db_Job_GetJobInfo(?)' , JobId);
            const answer = result[0][0];
            
            for (const key in answer) {
               
                if (key.includes("db_Job")) {                   
                    const pass = JSON.parse(answer[key]);

                    return pass;
                }
            }   
        } catch (error) {
            throw error;
        }
    }

    async GetJobDetailedInformations(JobId){
        try {
            const result = await db.query('Select db_Job_GetJobDetailedInfos(?)' , JobId);
            const answer = result[0][0];
            
            for (const key in answer) {
               
                if (key.includes("db_Job")) {                   
                    const pass = JSON.parse(answer[key]);

                    return pass;
                }
            }   
        } catch (error) {
            throw error;
        }
    }
    async CreateJobSchedule(userId, JobId, dataSchedule){
        
        try {
            const jsondata = JSON.stringify(dataSchedule);
            JSON.stringify(jsondata);
            

            const result = await db.query('Call db_Job_CreateJobSchedule(?, ?, ?)' , [userId, JobId, jsondata]);
            const answer = result[0][0];

            
            console.log(result);
            
            for (const key in answer) {
               
                if (key.includes("db_Job")) {                   
                    const pass = JSON.parse(answer[key]);

                    return pass;
                }
            }   
        } catch (error) {
            throw (error);
        }
    }
}





module.exports = new JobModel();