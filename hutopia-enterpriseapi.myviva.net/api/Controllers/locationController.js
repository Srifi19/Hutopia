const LocationModel = require('../Models/location');

exports.createLocation = async (req,res) => {
    const {postalCode ,country , city ,street} = req.body;
    const userId = req.userId;
   

    await LocationModel.createLocation(userId , postalCode ,country , city ,street)
    .then(() => {
        res.status(200).json({success:true , message:"Succesfully Created"});
    })  
    .catch((err) => {
        res.status(400).json({success:false , message:"Something Occured"});
    })
}


exports.getLocation = async (req,res) => {
    const {locationId} = req.query;
    await LocationModel.getLocation(locationId)
    .then((data) => {
        data = JSON.parse(data);
        res.status(200).json({success:true , message:"Succesfully Fetched" , data});
    })  
    .catch((err) => {
        res.status(400).json({success:false , message:"Something Occured"});
    })
}

exports.getAllLocations = async (req,res) => {
    const userId = req.userId;
    await LocationModel.getAllLocations(userId)
    .then((data) => {
        data = JSON.parse(data);
        res.status(200).json({success:true , message:"Succesfully Fetched" , data});
    })  
    .catch((err) => {
        res.status(400).json({success:false , message:"Something Occured"});
    })
}

exports.updateLocation = async (req,res) => {
    const {postalCode ,country , city ,street} = req.body;
    await LocationModel.updateLocation(postalCode ,country , city ,street)
    .then(() => {
        res.status(200).json({success:true , message:"Succesfully Updated"});
    })  
    .catch((err) => {
        res.status(400).json({success:false , message:"Something Occured"});
    })
}