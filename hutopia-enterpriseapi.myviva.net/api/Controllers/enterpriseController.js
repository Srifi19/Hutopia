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

exports.getEnterpriseLocation = async(req,res) => {
  const userId = req.userId;
  const {enterpriseSchedule} = req.body;
  await enterpriseModel.CreateEnterpriseSchedule(userId, enterpriseSchedule)
  .then((data) => {
    res.status(200).json({ message: 'Enterprise Schedule Created' , data:data});
  })
  .catch((err) => {
    res.status(400).json({ message: 'Something Went Wrong' });
  })
}

exports.getEnterpriseInfos = async(req,res) => {
  const userId = req.userId;
  await enterpriseModel.getEnterpriseInfos(userId)
  .then((data) => {
    res.status(200).json({ message: 'Enterprise Succesfully Infos' , success:true , data:data});
  })
  .catch((err) => {
    res.status(400).json({ message: 'Something Went Wrong', success : false });
  })
}







