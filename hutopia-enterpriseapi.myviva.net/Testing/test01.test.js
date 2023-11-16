// api.test.js
const request = require('supertest');
const auth = require('../api/Controllers/authController'); // Import your Express or API app
const job = require('../api/Controllers/jobController');
const app = require('../app')
const {addExperience} = require("../../candidateapi/api/Controllers/experienceController");
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNGY4YjEyZS0wODhiLTRlYjYtYjZlYS0wMjZlZmU5Y2ZhMmQiLCJpYXQiOjE2OTg2NjQ4MTcsImV4cCI6MTY5ODcwODAxN30.K4rEXyT3ajdEiYpERqRgjkP7WINmlSHoHSvsWjIGLn0";

const jobPath = "/api/job/";

describe('API Endpoints', () => {
    describe('Job Endpoints', () => {
        describe('CreateJob', () => {
            it('create a job with valid data', async () => {
                const jsonData = {
                    "JobTitle": "Math Engineer",
                    "WorkPlaceType": "In-person",
                    "JobDescription": "Developing and maintaining software applications",
                    "JobDuties": [
                        "Writing code, debugging, and testing",
                        "Collaborating with team members"
                    ],
                    "JobType": "Full-Time",
                    "Subject": "Computer Sciences",
                    "SubjectLevel": "Intermediate",
                    "amountExperience": 5,
                    "Skills": ["Java", "Python", "C"],
                    "Perks": ["Flexible hours"],
                    "Comments": "This is a great opportunity!",
                    "SalaryFixed": 0,
                    "SalaryRangeFrom": 60000,
                    "SalaryRangeTo": 80000,
                    "SalaryType": "per month",
                    "Currency": "USD",
                    "SupplementalPay": ["Bonuses"],
                    "rangeType": 1
                }
                const response = await request(app)
                    .post(jobPath + "createJob")
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(jsonData);

                expect(response.statusCode).toBe(200);
            }),
                it('create a job with no token', async () => {
                    const jsonData = {
                        "JobTitle": "Math Engineer",
                        "WorkPlaceType": "In-person",
                        "JobDescription": "Developing and maintaining software applications",
                        "JobDuties": [
                            "Writing code, debugging, and testing",
                            "Collaborating with team members"
                        ],
                        "JobType": "Full-Time",
                        "Subject": "Computer Sciences",
                        "SubjectLevel": "Intermediate",
                        "amountExperience": 5,
                        "Skills": ["Java", "Python", "C"],
                        "Perks": ["Flexible hours"],
                        "Comments": "This is a great opportunity!",
                        "SalaryFixed": 0,
                        "SalaryRangeFrom": 60000,
                        "SalaryRangeTo": 80000,
                        "SalaryType": "per month",
                        "Currency": "USD",
                        "SupplementalPay": ["Bonuses"],
                        "rangeType": 1
                    }
                    const response = await request(app)
                        .post(jobPath + "createJob")
                        .send(jsonData)

                    expect(response.statusCode).toBe(401);
                }),
                it('create a job with missing Title', async () => {
                    const jsonData = {
                        "WorkPlaceType": "In-person",
                        "JobDescription": "Developing and maintaining software applications",
                        "JobDuties": [
                            "Writing code, debugging, and testing",
                            "Collaborating with team members"
                        ],
                        "JobType": "Full-Time",
                        "Subject": "Computer Sciences",
                        "SubjectLevel": "Intermediate",
                        "amountExperience": 5,
                        "Skills": ["Java", "Python", "C"],
                        "Perks": ["Flexible hours"],
                        "Comments": "This is a great opportunity!",
                        "SalaryFixed": 0,
                        "SalaryRangeFrom": 60000,
                        "SalaryRangeTo": 80000,
                        "SalaryType": "per month",
                        "Currency": "USD",
                        "SupplementalPay": ["Bonuses"],
                        "rangeType": 1
                    }
                    const response = await request(app)
                        .post(jobPath + "createJob")
                        .set('Authorization', `Bearer ${authToken}`)
                        .send(jsonData)
                    // To Handle Later In Validation
                    expect(response.statusCode).toBe(200);
                })

        })
        describe('GetAllJobs', () => {
                it('GetAllJobsWithToken', async () => {
                    const response = await request(app)
                        .get(jobPath + "GetAllJobsForEnterprise")
                        .set('Authorization', `Bearer ${authToken}`)
                        .send()
                    expect(response.statusCode).toBe(200);
                }),
                    it('GetAllJobsWithoutToken', async () => {
                        const response = await request(app)
                            .get(jobPath + "GetAllJobsForEnterprise")
                            .send()

                        expect(response.statusCode).toBe(401);
                    })
            })
        describe('GetJobDetailedInformations', () => {
            it('GetJobDetailedInformationsValidWithToken', async () => {
                const response = await request(app)
                    .get(jobPath + "GetJobDetailedInformations")
                    .set('Authorization', `Bearer ${authToken}`)
                    .query({jobId: "01d558e9-fe9f-4cd5-addd-152ed4cef891"})
                    .send()

                expect(response.statusCode).toBe(200);
            }),
                it('GetJobDetailedInformationsValidWithoutToken', async () => {
                    const response = await request(app)
                        .get(jobPath + "GetJobDetailedInformations")
                        .query({jobId: "01d558e9-fe9f-4cd5-addd-152ed4cef891"})
                        .send()

                    expect(response.statusCode).toBe(401);
                }),
                it('GetJobDetailedInformationsInValidWithToken', async () => {
                    const response = await request(app)
                        .get(jobPath + "GetJobDetailedInformations")
                        .set('Authorization', `Bearer ${authToken}`)
                        .query({jobId: "01d8e9-fe9f-4cd5-addd-152ed4cef891"})
                        .send()

                    expect(response.statusCode).toBe(400);
                }),
                it('GetJobDetailedInformationsInValidWithoutToken', async () => {
                    const response = await request(app)
                        .get(jobPath + "GetJobDetailedInformations")
                        .query({jobId: "01d558e9-fe-4cd5-addd-152ed4cef891"})
                        .send()

                    expect(response.statusCode).toBe(401);
                })
        })
        describe("Create Job Schedule", () => {
            it('WithTokenWithValidJobId', async () => {
                const jsonData = {
                    "jobId": "01109899-063c-4c55-90a2-b3f74dc57b20",
                    "jobSchedule": {
                        "Monday": {
                            "FromTime": "8:00",
                            "ToTime": "10:00",
                            "BreakTime": "30"
                        },
                        "Tuesday": {
                            "FromTime": "8:00",
                            "ToTime": "12:00",
                            "BreakTime": "40"
                        },
                        "Wednesday": {},
                        "Thursday": {
                            "FromTime": "7:30",
                            "ToTime": "12:30",
                            "BreakTime": "45"
                        },
                        "Friday": {}
                    }
                }
                const response = await request(app)
                    .post(jobPath + "CreateJobSchedule")
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(jsonData)

                expect(response.statusCode).toBe(200);
            }),
                it('withoutTokenWithInvalidJobId', async () => {
                    const jsonData = {
                        "jobId": "01109899-063c-4cs55-90a2-b3f74dc57b20",
                        "jobSchedule": {
                            "Monday": {
                                "FromTime": "8:00",
                                "ToTime": "10:00",
                                "BreakTime": "30"
                            },
                            "Tuesday": {
                                "FromTime": "8:00",
                                "ToTime": "12:00",
                                "BreakTime": "40"
                            },
                            "Wednesday": {},
                            "Thursday": {
                                "FromTime": "7:30",
                                "ToTime": "12:30",
                                "BreakTime": "45"
                            },
                            "Friday": {}
                        }
                    }
                    const response = await request(app)
                        .post(jobPath + "CreateJobSchedule")
                        .send(jsonData)

                    expect(response.statusCode).toBe(401);
                }),
                it('withoutTokenWithvalidJobId', async () => {
                    const jsonData = {
                        "jobId": "01109899-063c-4c55-90a2-b3f74dc57b20",
                        "jobSchedule": {
                            "Monday": {
                                "FromTime": "8:00",
                                "ToTime": "10:00",
                                "BreakTime": "30"
                            },
                            "Tuesday": {
                                "FromTime": "8:00",
                                "ToTime": "12:00",
                                "BreakTime": "40"
                            },
                            "Wednesday": {},
                            "Thursday": {
                                "FromTime": "7:30",
                                "ToTime": "12:30",
                                "BreakTime": "45"
                            },
                            "Friday": {}
                        }
                    }
                    const response = await request(app)
                        .post(jobPath + "CreateJobSchedule")
                        .send(jsonData)

                    expect(response.statusCode).toBe(401);
                }),
                it('withoutTokenWithInvalidJobId', async () => {
                    const jsonData = {
                        "jobId": "01109899-063c-4c55-90a2-b35f74dc57b20",
                        "jobSchedule": {
                            "Monday": {
                                "FromTime": "8:00",
                                "ToTime": "10:00",
                                "BreakTime": "30"
                            },
                            "Tuesday": {
                                "FromTime": "8:00",
                                "ToTime": "12:00",
                                "BreakTime": "40"
                            },
                            "Wednesday": {},
                            "Thursday": {
                                "FromTime": "7:30",
                                "ToTime": "12:30",
                                "BreakTime": "45"
                            },
                            "Friday": {}
                        }
                    }
                    const response = await request(app)
                        .post(jobPath + "CreateJobSchedule")
                        .send(jsonData)

                    expect(response.statusCode).toBe(401);
                })
        })
    });
    describe()


});
