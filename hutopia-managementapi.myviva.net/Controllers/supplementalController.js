const supplementalModel = require("../Models/supplementalpay");
const logger = require("../Helpers/Logger");
const loggerHelper = require("../Helpers/LoggerHelper");
const supplementalPayValidator = require("../Validators/supplementalPayValidator");

exports.getAllSupplementalPay = async (req, res) => {
  try {
    console.log(req);
    await supplementalModel.getAllSupplementalPay().then((data) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "getAllSupplementalPay Have Succesfully Worked"
      );
      res.status(200).json({ message: "Well done", success: true, data: data });
    });
  } catch (error) {
    loggerHelper.ErrorLogger(
      req.id,
      "getAllSupplementalPay Have Not Been Succesfull",
      error
    );
    res.status(400).json({ message: "Problem", success: false });
  }
};
/**
 * update or ADD perk
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */

exports.updateOrAddSupplemental = async (req, res) => {
  try {
    const { supplementalvalues } = req.body;
    const err = supplementalPayValidator.validateSupplementalPay(req.body);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid input: ${err.message}`,
      });
    }

    const result = await supplementalModel.updateorAddSupplemental(
      supplementalvalues
    );
    loggerHelper.SuccessLogger(
      req.userId,
      "updateOrAddSupplemental Have Succesfully Worked"
    );

    res.status(200).json({
      success: true,
      message: "successfully worked",
    });
  } catch (error) {
    loggerHelper.ErrorLogger(
      req.userId,
      "updateOrAddSupplemental Have Not Been Succesfull",
      error
    );

    res.status(500).json({
      success: false,
      message: "An error occurred while updating or adding Supplemental Pay.",
    });
  }
};
/**
 *Delete
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.deleteSupplemental = async (req, res) => {
  try {
    const { id } = req.query;
    const err = supplementalPayValidator.validateDeletingSupplementalPay(
      req.query
    );
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid Id: ${err.message}`,
      });
    }
    const deleteResult = await supplementalModel.deleteSupplemental(id);
    console.log("Delete Result:", deleteResult);

    if (deleteResult) {
      res.status(200).json({
        success: true,
        message: "Supplemental Pay deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Supplemental Pay not found or unable to delete.",
      });
    }
  } catch (error) {
    logger.error("Error: ", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while deleting Supplemental Pay.",
    });
  }
};
