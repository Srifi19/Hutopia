const prospectModel = require('../Models/prospect')

exports.getAllProspects = async(req,res) => {
    const {jobId} = req.query;


    await prospectModel.getAllProspects(jobId)
    .then((data) => {
        console.log(data);
        res.status(200).json({message:"Successfully" , success:true , data:data});
    })
    .catch(()=>{
        res.status(400).json({message:"noy Successfully" , success:false});
    })
}

