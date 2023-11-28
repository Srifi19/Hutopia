const authModel = require("../Models/auth");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRound = 10;
const fileHandling = require("../Helpers/FileHandling")
const loggerHelper = require("../Helpers/loggerHelper");


exports.registerMainInfos = async (req, res) => {
  const { email, password } = req.body;
    console.log(req.body)
  const hashedPass = await bcrypt.hash(password,saltRound);
  await authModel
    .registerMainInfos(email, hashedPass)
    .then((userId) => {
      const token = jwt.sign({ userId }, process.env.jwtSecret, {
        expiresIn: "12h",
      });
      res.header("Authorization", `Bearer ${token}`);
      res.status(200).json({
        success: true,
        message: "Logging in was successful.",
        data: { token },
      });
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({success:false ,message:"Email Already Exists"});
    });
};

exports.registerPersonalInfos = async (req, res) => {
    const userId = req.userId;
    console.log(req.body)
    console.log(userId);
    const {firstName ,lastName ,gender } = req.body; //dob
    const picturePath = null;
    if(false){
        const {photoPath} = req.files;
        const picturePath = await fileHandling
            .uploadPhoto(null, "CandidatePhoto", photoPath, userId)
            .catch((error) => {
                loggerHelper.ErrorLogger(
                    userId,
                    "registerCompanyInfos Image upload didnt work",
                    error
                );
            });
    }
   
    const dob = new Date();



    await authModel.registerPersonalInfos(userId , firstName,lastName,picturePath,dob,gender)
    .then(() => {
        res.status(200).json({message:"Infos Entered Successfully" , success:true});
    })
    .catch(() => {
        res.status(400).json({message:"Error Occurred" , success:false});
    })
};

exports.registerProfessionalInfos = async (req, res) => {

    const userId = req.userId;
    console.log(userId);
    console.log(req.body)
    const {professionalTitle,preferedJob,country,town} = req.body; // postalCode , StreetAddress bio
    if(false){
        console.log(req.files);
        const {cvPath} = req.files;

        const picturePath = await fileHandling
            .uploadPhoto(null, "CandidateCV", cvPath, userId)
            .catch((error) => {
                loggerHelper.ErrorLogger(
                    userId,
                    "registerCompanyInfos Image upload didnt work",
                    error
                );
            });
    }

    const picturePath = null;
    await authModel.registerProfessionalInfos(userId , professionalTitle,null,preferedJob,country,town,null,null,picturePath)
    .then(() => {
        res.status(200).json({message:"Infos Entered Succesfully" , success:true});
    })
    .catch(() => {
        res.status(400).json({message:"Error Occured" , success:false});
    })

};
