const valuesModel = require('../Models/values');
const logger = require('../Helpers/Logger')
/**
 * Get skills by characters.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.getSkills = async (req, res) => {

    await valuesModel.getSkills()
        .then((skills) => {
            res.status(200).json({ success: true, message: "Skills successfully fetched", data: skills });

        })
        .catch((err) => {
            logger.error('Error: ', err);
            res.status(500).json({ success: false, message: "An error occurred while fetching skills" });
        })

};

/**
 * Get certificates by characters.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.getCertificatesByChars = async (req, res) => {

    const { string, PageNumber, PageSize } = req.query;
    await valuesModel.getCertificatesByChars(string, PageNumber, PageSize)
        .then((certificates) => {
            res.status(200).json({ success: true, message: "Certificates successfully fetched", data: certificates });
        })
        .catch((err) => {
            logger.error('Error: ', err);
            res.status(500).json({ success: false, message: "An error occurred while fetching certificates" });
        })


};

/**
 * Get all perks.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.getAllPerks = async (req, res) => {


        await valuesModel.getAllPerks()
        .then((perks) => {
            console.log("Hey");
            res.status(200).json({ success: true, message: "Perks successfully fetched", data: perks });
        })
        .catch((err) => {
            logger.error('Error: ', err);
            res.status(500).json({ success: false, message: "An error occurred while fetching perks" });
        })


};



/**
 * Get all supplemental pay information.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.getAllSupplementalPay = async (req, res) => {

    await valuesModel.getAllSupplementalPay()
        .then((supplementalPay) => {
            res.status(200).json({ success: true, message: "Supplemental pay information successfully fetched", data: supplementalPay });
        })
        .catch((err) => {
            logger.error('Error: ', err);
            res.status(500).json({ success: false, message: "An error occurred while fetching supplemental pay information" });
        })

};
