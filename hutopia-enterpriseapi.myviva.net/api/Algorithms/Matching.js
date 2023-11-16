const { Worker, isMainThread, parentPort , workerData } = require('worker_threads');
const matchingModel = require('../Models/matching');
const data = workerData;



if(data != null){
    const dataUpdated = JSON.stringify(data)
    matchingModel.MatchingCandidateToJob(data.JobTitle , dataUpdated)
        .then()
        .catch()
}