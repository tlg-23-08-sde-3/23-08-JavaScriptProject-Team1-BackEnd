const express = require("express");
const Router = express.Router();

const Job = require("../models/job");
const Company = require("../models/company");

const verifyTokenTest = require("../middlewares/verifyTokenTest");

//TODO: Validate and review all error status/messages

/*
POST /job

Functionality: creates a new job
Usecase: employer uses to create a new job from a job form
*/
Router.post("/", verifyTokenTest, async (req, res) => {
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

   if (Object.keys(req.query).length > 0) {
      console.log(req.query);

      const query = {};

      // Check if keywords are provided in the query
      if (req.query.keywords) {
         query["keywords"] = {
            $elemMatch: { $regex: new RegExp(req.query.keywords, "i") },
         };
      }

      if (req.query.location) {
         query["location"] = { $regex: new RegExp(req.query.location, "i") };
      }

      if (req.query.name) {
         query["name"] = { $regex: new RegExp(req.query.name, "i") };
      }

      try {
         const foundJob = await Job.find(query)
         .collation({ locale: "en", strength: 2 }) // case insensitive match
         .exec();

         res.send(foundJob);
      } catch (error) {
         res.status(500).send({ error: "Job retrieval failed" });
      }
   } else {
      try {
         res.send(await Job.find());
      } catch (error) {
         res.status(500).send({ error: "Job retrieval failed" });
      }
   }

});

/*
GET: /job/id/:_id

Functionality: get a job by Id
Usecase:
*/
Router.get("/id/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        const job = await Job.findById({ _id });
        if (!job) {
            return res.status(404).json({ error: `No job found with ID: ${_id}` });
        }
        res.send(job);
    } catch (error) {
        res.status(500).send({ error: "Job retrieval failed" });
    }
});

/*
GET: /job/company/:companyId

Functionality: get all jobs based upon companyId
Usecase:
*/
Router.get("/company/:companyId", async (req, res) => {
    try {
        let { companyId } = req.params;

        const company = await Company.findById(companyId);
        companyId = company._id;
        const jobs = await Job.find({ companyId }).exec();
        res.send(jobs);
    } catch (error) {
        res.status(500).send({ error: "Job retrieval failed" });
    }
});

/*
PUT: /job/id/:_id

Functionality: updates a job posting based on req.body fields
Usecase:
*/
Router.put("/id/:_id", verifyTokenTest, async (req, res) => {
    const { _id } = req.params;

    try {
        let updatedJob = await Job.findOneAndUpdate({ _id }, req.body, {
            returnOriginal: false,
        });
        if (!updatedJob) {
            return res.status(404).json({ error: `No job found with ID: ${_id}` });
        }
        res.send(updatedJob);
    } catch (error) {
        res.status(500).json({
            error: `Job update failed: ${error.path} - ${error.stringValue} - ${error.messageFormat}`,
        });
    }
});

/*
Type:

Functionality:
Usecase:
*/
Router.delete("/id/:_id", verifyTokenTest, async (req, res) => {
    const { _id } = req.params;

    try {
        await Job.findOneAndDelete({ _id });
        res.sendStatus(200); // Send a simple OK if successful
    } catch (error) {
        res.status(500).json({
            error: `Deletion of job with an id of ${_id} failed`,
        });
    }
});

module.exports = Router;
