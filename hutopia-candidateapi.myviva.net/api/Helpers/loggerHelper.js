const logger = require('./Logger');

exports.ErrorLogger = (identification , message , error) => {
    logger.error( identification + "::"+ new Date() + ': ' + message  + ":", error);
}

exports.SuccessLogger = (identification , message) => {
    logger.info(identification + "::" + new Date()+ ": " + message);
}