const db = require('../Database/dbConnection'); // Import your database connection
const Dictionary = require('../Helpers/Dictionary');
const { v4: uuidv4 } = require('uuid');
const RetrievalFromJson = require('../Helpers/RetrievalFromJson')
/**
 * Model for managing job-related database operations.
 */
class JobModel {
    constructor() { }

    /**
     * Create a new job entry in the database.
     *
     * @param {string} userId - User ID associated with the job.
     * @param {object} Infos - Job information.
     * @returns {Promise<any>} A promise that resolves with the result of the database operation.
     * @throws {Error} - Throws an error if there's a database query issue.
     */
    async CreateJob(userId, Infos) {
        try {
            const JobId = uuidv4();
            const { Skills, Perks, ...rest } = Infos;
            // Create a new object with mapped Skills and Perks arrays
            const json = JSON.stringify(Infos);
            await db.query('Call db_Job_CreateJob (?,?,?)', [JobId, userId,json]);
            Infos.jobId = JobId;
            return Infos;

        } catch (error) {
           console.log(error);
           throw error;
        }
    }

    /**
     * Get all jobs associated with an enterprise user.
     *
     * @param {string} userId - User ID of the enterprise.
     * @returns {Promise<any>} A promise that resolves with the list of jobs.
     * @throws {Error} - Throws an error if there's a database query issue.
     */
    async GetAllJobsForEnterprise(userId) {
        try {
            const result = await db.query('Select db_Enterprise_HomePage_GetAllJobs(?)', userId);
            const RetrievalFromJson = require('../Helpers/RetrievalFromJson')
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get job information by Job ID.
     *
     * @param {string} JobId - Job ID.
     * @returns {Promise<any>} A promise that resolves with the job information.
     * @throws {Error} - Throws an error if there's a database query issue.
     */
    async GetJobInformations(JobId) {
        try {
            const result = await db.query('Select db_Job_GetJobInfo(?)', JobId);
            const RetrievalFromJson = require('../Helpers/RetrievalFromJson')
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get detailed job information by Job ID.
     *
     * @param {string} JobId - Job ID.
     * @returns {Promise<any>} A promise that resolves with detailed job information.
     * @throws {Error} - Throws an error if there's a database query issue.
     */
    async GetJobDetailedInformations(JobId) {
        try {
            const result = await db.query('Select db_Job_GetJobDetailedInfos(?)', JobId);
            const RetrievalFromJson = require('../Helpers/RetrievalFromJson')
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create a job schedule for a specific job.
     *
     * @param {string} userId - User ID associated with the schedule.
     * @param {string} JobId - Job ID for which the schedule is created.
     * @param {object} dataSchedule - Job schedule information.
     * @returns {Promise<any>} A promise that resolves with the result of the database operation.
     * @throws {Error} - Throws an error if there's a database query issue.
     */
    async CreateJobSchedule(userId, JobId, dataSchedule) {
        try {
            const jsondata = JSON.stringify(dataSchedule);

            const result = await db.query('Call db_Job_CreateJobSchedule(?, ?, ?)', [userId, JobId, jsondata]);
            const RetrievalFromJson = require('../Helpers/RetrievalFromJson')
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = new JobModel();
