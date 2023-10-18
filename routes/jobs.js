const express = require("express");
const Router = express.Router();

const Job = require("../models/job");
const Company = require("../models/company");
const { findById } = require("../models/company");

/*
POST /job

Functionality: creates a new job
Usecase: employer uses to create a new job from a job form
*/
Router.post("/", async (req, res) => {
    try {
        const company = await Company.findById(req.body.companyId);
        req.body.companyId = company._id;

        const newJob = await Job.create(req.body);
        res.send(newJob);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/*
GET: /job/

Functionality: gets a job list based upon query
Usecase:
*/
Router.get("/", async (req, res) => {
    try {
        res.send(await Job.find(req.query));
    } catch (error) {
        res.status(500).send({ error: "Job retrieval failed" });
    }
});

/*
GET: /job/id/:_id

Functionality: get a job by Id
Usecase:
*/

/*
Type:

Functionality:
Usecase:
*/

/*
Type:

Functionality:
Usecase:
*/

module.exports = Router;
