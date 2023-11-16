const educationModel = require('../Models/education')


exports.addEducation = async(req,res) => {
    const {educationData} = req.body;
    const userId = req.userId;

    await educationModel.addEducation(userId,educationData)
    .then(() => {
        res.status(200).json({message:"Worked Successfully" , success:true})
    })
    .catch(() => {
        res.status(400).json({message:"Something most of happened" , success:false});
    })
}


exports.getEducation = async (req,res) => {
    const userId = req.userId;
    await educationModel.getEducation(userId)
    .then((data) => {
        res.status(200).json({message:"Successfully Fetched" , success:true , data:data})
    })
    .catch((error) => {
        res.status(400).json({message:"Not Worked" , success:false});
    })
}



