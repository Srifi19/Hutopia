// models/authModel.js

const db = require('../Database/dbConnection'); // Import your database connection
const { v4: uuidv4 } = require('uuid');
const RetrievalFromJson = require('../Helpers/RetrievalFromJson')
class LocationModel {
    constructor() { }


    async createLocation(userId , postalCode ,country , city ,street) {
 
        const LocationId = uuidv4();
      
        try {
            await db.query("Call db_Location_AddLocation(?,?,?,?,?,?)" , [LocationId,userId , postalCode ,country , city ,street]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async getLocation(LocationId){
        try {
            const result = await db.query("Select db_Location_GetLocationById(?)" , [LocationId]);
            return RetrievalFromJson.retrieve(result[0][0])

        } catch (error) {
            throw error;
        }
    }

    async getAllLocations(userId){
        try {
            const result = await db.query("select db_Location_GetAllLocations(?)" , [userId]);
            return RetrievalFromJson.retrieve(result[0][0])
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async updateLocation(LocationId , postalCode ,country , city ,street){
        try {
            await db.query("Call db_Location_UpdateLocation(?,?,?,?,?)" , [LocationId , postalCode ,country , city ,street]);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new LocationModel();
