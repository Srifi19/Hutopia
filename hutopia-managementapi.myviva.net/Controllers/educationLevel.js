const educationLevelModel = require("../Models/educationlevel");
const loggerHelper = require("../Helpers/LoggerHelper");
const logger = require("../Helpers/Logger");
const educationlevelValidator = require("../Validators/educationlevelValidator");

exports.getAlleducationLevel = async (req, res) => {
  await educationLevelModel
    .getAllEducationLevel()
    .then((data) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "getAlleducationLevel Have Succesfully get"
      );
      res.status(200).json({ message: "Well done", success: true, data: data });
    })
    .catch((error) => {
      loggerHelper.ErrorLogger(
        req.userId,
        "getAlleducationLevel unsuccessfully getting",
        error
      );
      res.status(400).json({ message: "Problem", success: false });
    });
};
/**
 * update or ADD educationLevel
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */

exports.updateOrAddeducationLevel = async (req, res) => {
  try {
    const { educationvalues } = req.body;

    const err = educationlevelValidator.validateEducationLevel(req.body);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid input: ${err.message}`,
      });
    }

    const result = await educationLevelModel.updateorAddEducationLevel(
      educationvalues
    );
    loggerHelper.SuccessLogger(
      req.userId,
      "updateOrAddeducationLevel Have Succesfully Worked"
    );
    res.status(200).json({
      success: true,
      message: "successfully worked",
    });
  } catch (error) {
    loggerHelper.ErrorLogger(
      req.userId,
      "updateOrAddeducationLevel unsuccessfully inserted",
      error
    );
    res.status(500).json({
      success: false,
      message: "An error occurred while updating or adding education level.",
    });
  }
};
/**
 *Delete
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.deleteeducationLevel = async (req, res) => {
  try {
    const { id } = req.query;
    const err = educationlevelValidator.validateDeletingEducationLevel(
      req.query
    );
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid Id: ${err.message}`,
      });
    }

    const deleteResult = await educationLevelModel.deleteEducationLevel(id);

    if (deleteResult) {
      res.status(200).json({
        success: true,
        message: "education Level deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "education Levelnot found or unable to delete.",
      });
    }
  } catch (error) {
    logger.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while education Level Proficiency.",
    });
  }
};
