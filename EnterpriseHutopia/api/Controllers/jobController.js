const bcrypt = require('bcrypt');
const db = require('../Database/dbConnection');
const jobModel = require('../Models/job')
const jwt = require('jsonwebtoken');
const config = require('../Config/config');


exports.CreateJob = async (req, res) => { 
    const userId = req.userId;
    const Infos = req.body;
    
    await jobModel.CreateJob(userId, Infos)
      .then(() => {
        res.status(200).json({ message: 'Succesfully Inserted' });
      })
      .catch((err) => {
        res.status(400).json({ message: 'Something Went Wrong' });
      })
  }

  
exports.GetAllJobsForEnterprise = async (req,res) => {
  const userId = req.userId;

  await jobModel.GetAllJobsForEnterprise(userId)
  .then((result) => {
    res.status(200).json({ message: 'Succesfully Fetched' , content : result});
  })
  .catch((err) => {
    res.status(400).json({ message: 'Something Went Wrong' });
  })

}

exports.GetJobInformations = async (req,res) => {
  const {jobId} = req.body;
  console.log(jobId);
  await jobModel.GetJobInformations(jobId)
  .then((result) => {
    res.status(200).json({ message: 'Succesfully Fetched' , content : result});
  })
  .catch((err) => {
    res.status(400).json({ message: 'Something Went Wrong' });
  })
}

exports.GetJobDetailedInformations = async (req,res) => {
  const {jobId} = req.body;
  console.log(jobId);
  await jobModel.GetJobDetailedInformations(jobId)
  .then((result) => {
    res.status(200).json({ message: 'Succesfully Fetched' , content : result});
  })
  .catch((err) => {
    res.status(400).json({ message: 'Something Went Wrong' });
  })
}


exports.CreateJobSchedule = async (req,res) => {
  const {jobId, jobSchedule} = req.body;
  const userId = req.userId;
  console.log(jobId);
  await jobModel.CreateJobSchedule(userId, jobId, jobSchedule)
  .then((result) => {
    res.status(200).json({ message: 'Schedule Created' , content : result});
  })
  .catch((err) => {
    res.status(400).json({ message: 'Something Went Wrong' });
  })
}