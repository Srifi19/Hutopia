const candidateModel = require("../Models/candidate");
const logger = require("../Helpers/Logger");
const loggerHelper = require("../Helpers/LoggerHelper");

exports.getAllCandidate = async (req, res) => {
  const { str, PageNumber, PageSize } = req.query;

  await candidateModel
    .getAllCandidate(str, PageNumber, PageSize)
    .then((candidates) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "getAllCandidate Have Succesfully Worked"
      );
      res
        .status(200)
        .json({ message: "Well done", success: true, data: candidates });
    })
    .catch((error) => {
      loggerHelper.ErrorLogger(
        req.userId,
        "getAllCandidate unsuccessfully getting",
        error
      );
      res.status(400).json({ message: "Problem", success: false });
    });
};
