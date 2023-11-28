const perkModel = require("../Models/perk");
const logger = require("../Helpers/Logger");
const loggerHelper = require("../Helpers/LoggerHelper");
const perksValidator = require("../Validators/perksValidators");

exports.getAllPerks = async (req, res) => {
  await perkModel
    .getAllPerks()
    .then((data) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "getAllPerks Have Succesfully get"
      );
      res.status(200).json({ message: "Well done", success: true, data: data });
    })
    .catch((error) => {
      loggerHelper.ErrorLogger(
        userId,
        "getAllPerks unsuccessfully getting",
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

exports.updateOrAddPerks = async (req, res) => {
  try {
    const err = perksValidator.validatePerks(req.body);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid input: ${err.details}`,
      });
    }
    const { listvalues } = req.body;

    const result = await perkModel.updateorAddPerks(listvalues);
    loggerHelper.SuccessLogger(
      req.userId,
      "updateOrAddPerks Have Succesfully Worked"
    );
    res.status(200).json({
      success: true,
      message: "successfully worked",
    });
  } catch (error) {
    loggerHelper.ErrorLogger(
      userId,
      "updateOrAddPerks unsuccessfully inserted",
      error
    );
    res.status(500).json({
      success: false,
      message: "An error occurred while updating or adding perk.",
    });
  }
};
/**
 *Delete
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */

exports.deletePerk = async (req, res) => {
  try {
    const { id } = req.query;
    const err = perksValidator.validateDeletingPerks(req.query);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid input: ${err.details}`,
      });
    }
    const deleteResult = await perkModel.deletePerks(id);

    if (deleteResult) {
      res.status(200).json({
        success: true,
        message: "Perk deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Perk not found or unable to delete.",
      });
    }
  } catch (error) {
    logger.error("Error: ", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while deleting perk.",
    });
  }
};
