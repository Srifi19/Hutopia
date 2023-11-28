const CertificatesModel = require("../Models/certificates");
const logger = require("../Helpers/Logger");
const loggerHelper = require("../Helpers/LoggerHelper");

const certificatesValidator = require("../Validators/certificatesValidator");

exports.getAllCertificates = async (req, res) => {
  await CertificatesModel.getAllCertificates()
    .then((data) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "getAllCertificates Have Succesfully Worked"
      );
      res.status(200).json({ message: "Well done", success: true, data: data });
    })
    .catch((error) => {
      loggerHelper.ErrorLogger(
        req.userId,
        "getAllCertificates unsuccessfully getting",
        error
      );
      res.status(400).json({ message: "Problem", success: false });
    });
};

/**
 * Update or add certificates
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.updateOrAddCertificates = async (req, res) => {
  try {
    const { id, CertificateName, Provider, linkofCertificate, Price } =
      req.body;
    const err = certificatesValidator.validateCertificates(req.body);
    console.log(err);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid input: ${err.message}`,
      });
    }

    const result = await CertificatesModel.updateorAddCertificates(
      id,
      CertificateName,
      Provider,
      linkofCertificate,
      Price
    );

    loggerHelper.SuccessLogger(
      req.userId,
      "updateOrAddCertificates Have Succesfully worked"
    );
    res.status(200).json({
      success: true,
      message: "Certificates successfully.",
    });
  } catch (error) {
    loggerHelper.ErrorLogger(
      req.userId,
      "updateOrAddCertificates unsuccessfully inserted",
      error
    );
    res.status(500).json({
      success: false,
      message: "An error occurred while updating or adding certificates.",
    });
  }
};
/**
 *Delete
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.deleteCertificates = async (req, res) => {
  try {
    const { id } = req.query;

    const err = certificatesValidator.validateDeletingCertificate(req.query);
    if (err.flag == false) {
      return res.status(400).json({
        success: false,
        message: `Invalid Id: ${err.details}`,
      });
    }

    const deleteResult = await CertificatesModel.deleteCertificates(id);
    console.log(deleteResult);

    if (deleteResult) {
      res.status(200).json({
        success: true,
        message: "Certificate deleted successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Certificate not found or unable to delete.",
      });
    }
  } catch (error) {
    logger.error("Error: ", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting certificate.",
    });
  }
};
