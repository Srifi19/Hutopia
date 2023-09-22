const enterpriseModel = require('../Models/enterprise');


exports.CreateEnterpriseSchedule = async (req,res) => {
  const {enterpriseSchedule} = req.body;
  const userId = req.userId;

  await enterpriseModel.CreateEnterpriseSchedule(userId, enterpriseSchedule)
  .then((result) => {
    res.status(200).json({ message: 'Enterprise Schedule Created'});
  })
  .catch((err) => {
    res.status(400).json({ message: 'Something Went Wrong' });
  })
}

