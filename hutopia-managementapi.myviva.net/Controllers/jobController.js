const JobModel = require("../Models/job");
const loggerHelper = require("../Helpers/LoggerHelper");

exports.getAllJobs = async (req, res) => {
  const { PageNumber, PageSize } = req.query;

  await JobModel.getAllJobs(PageNumber, PageSize)
    .then((data) => {
      loggerHelper.SuccessLogger(
        req.userId,
        "getAllJobs Have Succesfully Worked"
      );
      res.status(200).json({ message: "Well done", success: true, data: data });
    })
    .catch((error) => {
      loggerHelper.ErrorLogger(
        req.userId,
        "getAllJobs unsuccessfully getting",
        error
      );
      res.status(400).json({ message: "Problem", success: false });
    });
};
