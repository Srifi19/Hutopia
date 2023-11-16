const ApplicantModel = require('../Models/applicant');



exports.GetAllApplicants = async (req , res) => {

    const {jobId} = req.body;
    await ApplicantModel.GetAllApplicants(jobId)
    .then((result) => {
        res.status(200).json({message: "All Works" , content : result});
    })
    .catch((err) => {
        res.status(400).json({message: "Not Wo"});
    })

};








