const privatejobModel = require("../Models/privateJobtitle");
const logger = require("../Helpers/Logger");
const loggerHelper = require("../Helpers/LoggerHelper");
const privateJobTitleValidator = require("../Validators/privateJobTitleValidator");

exports.getAllPrivateJobTitle = async (req, res) => {
  await privatejobModel
    .getAllPrivatejobTitle()
    .then((data) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "getAllPrivateJobTitle Have Succesfully Worked"
      );
      res.status(200).json({ message: "Well done", success: true, data: data });
    })
    .catch((error) => {
      loggerHelper.ErrorLogger(
        req.userId,
        "getAllPrivateJobTitle unsuccessfully inserted",
        error
      );
      res.status(400).json({ message: "Problem", success: false });
    });
};
/**
 * update or ADD perk
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */

exports.updateOrAddPrivateJobTitle = async (req, res) => {
  try {
    const { jobprivatevalues } = req.body;
    const err = privateJobTitleValidator.validatePrivateJobTitle(req.body);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid input: ${err.message}`,
      });
    }

    const result = await privatejobModel.updateorAddPrivatejobTitle(
      jobprivatevalues
    );
    loggerHelper.SuccessLogger(
      req.userId,
      "updateOrAddPrivateJobTitle Have Succesfully Worked"
    );

    res.status(200).json({
      success: true,
      message: "successfully worked",
    });
  } catch (error) {
    loggerHelper.ErrorLogger(
      req.userId,
      "updateOrAddPrivateJobTitle unsuccessfully inserted",
      error
    );
    res.status(500).json({
      success: false,
      message: "An error occurred while updating or adding PrivateJob.",
    });
  }
};
/**
 *Delete
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */

exports.deletePrivateJobTitle = async (req, res) => {
  try {
    const { id } = req.query;
    const err = privateJobTitleValidator.validateDeletingPrivateJobtitle(
      req.query
    );
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid Id: ${err.message}`,
      });
    }

    const deleteResult = await privatejobModel.deletePrivatejobTitle(id);

    if (deleteResult) {
      res.status(200).json({
        success: true,
        message: "PrivateJob deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "PrivateJob not found or unable to delete.",
      });
    }
  } catch (error) {
    logger.error("Error: ", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while deleting PrivateJob.",
    });
  }
};
