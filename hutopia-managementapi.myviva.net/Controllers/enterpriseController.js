const enterpriseModel = require("../Models/enterprise");
const loggerHelper = require("../Helpers/LoggerHelper");

exports.getAllEnterprise = async (req, res) => {
  const { str, PageNumber, PageSize } = req.query;

  await enterpriseModel
    .gettAllenterprise(str, PageNumber, PageSize)
    .then((enterprise) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "gettAllenterprise Have Succesfully get"
      );
      res
        .status(200)
        .json({ message: "Well done", success: true, data: enterprise });
    })
    .catch((error) => {
      loggerHelper.ErrorLogger(
        req.userId,
        "gettAllenterprise unsuccessfully inserted",
        error
      );
      res.status(400).json({ message: "Problem", success: false });
    });
};

exports.updateSuspend = async (req, res) => {
  try {
    const { EnterpriseId } = req.query;
    console.log(EnterpriseId);
    const result = await enterpriseModel.updateSuspend(EnterpriseId);
    loggerHelper.SuccessLogger(
      req.userId,
      "updateSuspend Have Succesfully Worked"
    );
    res.status(200).json({
      success: true,
      message: "successfully updated",
    });
  } catch (error) {
    loggerHelper.ErrorLogger(
      req.userId,
      "updateOrAddPerks unsuccessfully inserted",
      error
    );
    res.status(500).json({
      success: false,
      message: "An error occurred while updating SuspendFlag.",
    });
  }
};
exports.updateUnSuspend = async (req, res) => {
  try {
    const { EnterpriseId } = req.query;
    console.log(EnterpriseId);
    const result = await enterpriseModel.updateUnsuspend(EnterpriseId);
    loggerHelper.SuccessLogger(
      req.userId,
      "update UnSuspend Have Succesfully Worked"
    );

    res.status(200).json({
      success: true,
      message: "successfully updated",
    });
  } catch (error) {
    loggerHelper.ErrorLogger(
      req.userId,
      "updateUnSuspend unsuccessfully inserted",
      error
    );
    res.status(500).json({
      success: false,
      message: "An error occurred while updating SuspendedFlag.",
    });
  }
};

exports.getNumofApplicantAndPorspect = async (req, res) => {
  await enterpriseModel
    .getNumofApplicantAndPorspect()
    .then((enterprise) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "getNumofApplicantAndPorspect Have Succesfully get"
      );
      res
        .status(200)
        .json({ message: "Well done", success: true, data: enterprise });
    })
    .catch((error) => {
      loggerHelper.ErrorLogger(
        req.userId,
        "getNumofApplicantAndPorspect unsuccessfully inserted",
        error
      );
      res.status(400).json({ message: "Problem", success: false });
    });
};
