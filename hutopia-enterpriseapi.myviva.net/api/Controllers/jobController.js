const bcrypt = require("bcrypt");
const db = require("../Database/dbConnection");
const jobModel = require("../Models/job");
const jwt = require("jsonwebtoken");
const config = require("../Config/config");
const logger = require("../Helpers/Logger");
const Matching = require("../Algorithms/Matching");
const { Worker, workerData, parentPort } = require("worker_threads");
/**
 * Create a new job entry.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.CreateJob = async (req, res) => {
  const userId = req.userId;
  const Infos = req.body;
  await jobModel
    .CreateJob(userId, Infos)
    .then(async (result) => {
      res
        .status(200)
        .json({ success: true, message: "Job successfully created." });
    })
    .catch((error) => {
      logger.error("Error: ", error);
      res
        .status(400)
        .json({
          success: false,
          message: "Something went wrong while creating the job.",
        });
    });
};

/**
 * Get all jobs associated with an enterprise user.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.GetAllJobsForEnterprise = async (req, res) => {
  const userId = req.userId;

  try {
    const data = await jobModel.GetAllJobsForEnterprise(userId);
    res
      .status(200)
      .json({
        success: true,
        message: "Jobs successfully fetched.",
        data: data,
      });
  } catch (error) {
    logger.error("Error: ", error);
    res
      .status(400)
      .json({
        success: false,
        message: "Something went wrong while fetching jobs.",
      });
  }
};

/**
 * Get job information by Job ID.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.GetJobInformations = async (req, res) => {
  const { jobId } = req.query;

  try {
    const result = await jobModel.GetJobInformations(jobId);
    res
      .status(200)
      .json({
        success: true,
        message: "Job information successfully fetched.",
        content: result,
      });
  } catch (error) {
    logger.error("Error: ", error);
    res
      .status(400)
      .json({
        success: false,
        message: "Something went wrong while fetching job information.",
      });
  }
};

/**
 * Get detailed job information by Job ID.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.GetJobDetailedInformations = async (req, res) => {
  const { jobId } = req.query;

  try {
    const result = await jobModel.GetJobDetailedInformations(jobId);
    // Parse the "Skills" field to get an actual JSON array
    result.Skills = JSON.parse(result.Skills);
    res.status(200).json({
      success: true,
      message: "Detailed job information successfully fetched.",
      content: result,
    });
  } catch (error) {
    logger.error("Error: ", error);
    res.status(400).json({
      success: false,
      message: "Something went wrong while fetching detailed job information.",
    });
  }
};

/**
 * Create a job schedule for a specific job.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */

exports.CreateJobSchedule = async (req, res) => {
  const { jobId, jobSchedule } = req.body;
  const userId = req.userId;

  await jobModel
    .CreateJobSchedule(userId, jobId, jobSchedule)
    .then(() => {
      res
        .status(200)
        .json({ success: true, message: "Job schedule created successfully." });
    })
    .catch((error) => {
      logger.error("Error: ", error);
      res
        .status(400)
        .json({
          success: false,
          message: "Something went wrong while creating job schedule.",
        });
    });
};

/**
 * Create a job schedule for a specific job.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
