const proficiencyModel = require("../Models/proficiency");
const logger = require("../Helpers/Logger");
const loggerHelper = require("../Helpers/LoggerHelper");

const proficiencyValidator = require("../Validators/proficiencyValidator");
exports.getAllProficiency = async (req, res) => {
  await proficiencyModel
    .getAllProficiency()
    .then((data) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "getAllProficiency Have Succesfully Worked"
      );
      res.status(200).json({ message: "Well done", success: true, data: data });
    })
    .catch((error) => {
      loggerHelper.ErrorLogger(
        req.userId,
        "getAllProficiency Have Not Been Succesfull",
        error
      );

      res.status(400).json({ message: "Problem", success: false });
    });
};
/**
 * update or ADD Proficiency
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */

exports.updateOrAddProficiency = async (req, res) => {
  try {
    const { proficiencyvalues } = req.body;
    const err = proficiencyValidator.validateProficiency(req.body);
    console.log(err);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid input: ${err.message}`,
      });
    }
    const result = await proficiencyModel.updateorAddProficiency(
      proficiencyvalues
    );
    loggerHelper.SuccessLogger(
      req.userId,
      "updateOrAddProficiency Have Succesfully Worked"
    );
    res.status(200).json({
      success: true,
      message: "successfully worked",
    });
  } catch (error) {
    loggerHelper.ErrorLogger(
      req.userId,
      "updateOrAddSupplemental unsuccessfully inserted",
      error
    );

    res.status(500).json({
      success: false,
      message: "An error occurred while updating or adding proficiency.",
    });
  }
};
/**
 *Delete
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.deleteProficiency = async (req, res) => {
  try {
    const { id } = req.query;
    const err = proficiencyValidator.validateDeletingProficiency(req.query);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid Id: ${err.message}`,
      });
    }
    const deleteResult = await proficiencyModel.deleteProficiency(id);

    if (deleteResult) {
      res.status(200).json({
        success: true,
        message: "Proficiency deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Proficiency not found or unable to delete.",
      });
    }
  } catch (error) {
    logger.error("Error: ", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while deleting Proficiency.",
    });
  }
};
