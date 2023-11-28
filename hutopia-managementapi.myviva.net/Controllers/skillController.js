const skillModel = require("../Models/skill");
const logger = require("../Helpers/Logger");
const skillValidator = require("../Validators/skillValidator");
const loggerHelper = require("../Helpers/LoggerHelper");

exports.getAllSkills = async (req, res) => {
  await skillModel
    .getAllSkills()
    .then((data) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "getAllSkills Have Succesfully Worked"
      );
      res.status(200).json({ message: "Well done", success: true, data: data });
    })
    .catch((error) => {
      loggerHelper.ErrorLogger(
        req.userId,
        "getAllSkills Have Not Been Succesfull",
        error
      );

      res.status(400).json({ message: "Problem", success: false });
    });
};
/**
 * update or ADD perk
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */

exports.updateOrAddSkills = async (req, res) => {
  try {
    const { skillvalues } = req.body;
    const err = skillValidator.validateSkills(req.body);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid input: ${err.message}`,
      });
    }
    const result = await skillModel.updateorAddSkills(skillvalues);
    loggerHelper.SuccessLogger(
      req.userId,
      "updateOrAddSkills Have Succesfully Worked"
    );
    res.status(200).json({
      success: true,
      message: "successfully worked",
    });
  } catch (error) {
    loggerHelper.ErrorLogger(
      req.userId,
      "updateOrAddSkills Have Not Been Succesfull",
      error
    );

    res.status(500).json({
      success: false,
      message: "An error occurred while updating or adding skill.",
    });
  }
};
/**
 *Delete
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.query;
    const err = skillValidator.validateDeletingSkills(req.query);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid Id: ${err.message}`,
      });
    }

    const deleteResult = await skillModel.deleteSkills(id);

    if (deleteResult) {
      res.status(200).json({
        success: true,
        message: "Skill deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Skill not found or unable to delete.",
      });
    }
  } catch (error) {
    logger.error("Error: ", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while deleting Skill.",
    });
  }
};
