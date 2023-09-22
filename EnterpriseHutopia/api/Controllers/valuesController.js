const valuesModel = require('../Models/values');



exports.GetSkillsByChar = async (req,res) => {
    
    const {string , PageNumber , PageSize} = req.body;
    await valuesModel.GetSkillsByChar(string  , PageNumber , PageSize)
    .then((answer) => {
        res.status(200).json({message: "Succesfully Fetched" , content: answer})
    })
    .catch((err) => res.status(400).json({message: "Error Occured"}))

}

exports.GetCertificateByChars = async (req,res) => {
    
    const {string,PageNumber,PageSize} = req.body;
  
    await valuesModel.GetCertificateByChars(string,PageNumber,PageSize)
    .then((answer) => {
        res.status(200).json({message: "Succesfully Fetched" , content: answer})
    })
    .catch((err) => res.status(400).json({message: "Error Occured"}))

}

exports.GetPerks = async (req,res) =>{
    
  
    await valuesModel.GetAllPerks()
    .then((answer) => {
        res.status(200).json({message: "Succesfully Fetched" , content: answer})
    })
    .catch((err) => res.status(400).json({message: "Error Occured"}))


}

exports.GetAllSuplementalPay = async (req,res) =>{
    
    await valuesModel.GetAllSuplementalPay()
    .then((answer) => {
        res.status(200).json({message: "Succesfully Fetched" , content: answer})
    })
    .catch((err) => res.status(400).json({message: "Error Occured"}))

}