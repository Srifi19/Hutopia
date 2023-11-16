const experienceModel = require('../Models/experience')


exports.addExperience = async(req,res) => {
    const {experienceData} = req.body;
    const userId = req.userId;

    await experienceModel.addExperience(userId,experienceData)
    .then(() => {
        res.status(200).json({message:"Worked Successfully" , success:true})
    })
    .catch(() => {
        res.status(400).json({message:"Something most of happened" , success:false});
    })
}

exports.getExperience = async (req,res) => {
    const userId = req.userId;
    await experienceModel.getExperiences(userId)
    .then((data) => {
        res.status(200).json({message:"Successfully Fetched" , success:true , data:data})
    })
    .catch((error) => {
        res.status(400).json({message:"Not Worked" , success:false});
    })
}

