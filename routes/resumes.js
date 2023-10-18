const express = require("express");
const Router = express.Router();

const Resume = require("../models/resume");
const Candidate = require("../models/candidate");

//TODO: Validate and review all error status/messages

/*
POST /resume

Functionality: creates a new resume
Usecase: candidate uses to create a new resume from a resume form
*/
Router.post("/", async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.body.candidateId);
        req.body.candidateId = candidate._id;

        res.send(await Resume.create(req.body));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/*
GET: /resume/

Functionality: gets a resume list based upon query
Usecase:
*/
Router.get("/", async (req, res) => {
    try {
        res.send(await Resume.find(req.query));
    } catch (error) {
        res.status(500).send({ error: "Resume retrieval failed" });
    }
});

/*
GET: /resume/id/:_id

Functionality: get a resume by Id
Usecase:
*/
Router.get("/id/:_id", async (req, res) => {
    const { _id } = req.params;
    try {
        const resume = await Resume.findById({ _id });
        if (!resume) {
            return res.status(404).json({ error: `No resume found with ID: ${_id}` });
        }
        res.send(resume);
    } catch (error) {
        res.status(500).send({ error: "Resume retrieval failed" });
    }
});

/*
PUT: /resume/id/:_id

Functionality: updates a resume based on req.body fields
Usecase:
*/
Router.put("/id/:_id", async (req, res) => {
    const { _id } = req.params;

    try {
        let updatedResume = await Resume.findOneAndUpdate({ _id }, req.body, { returnOriginal: false });
        if (!updatedResume) {
            return res.status(404).json({ error: `No resume found with ID: ${_id}` });
        }
        res.send(updatedResume);
    } catch (error) {
        res.status(500).json({
            error: `Resume update failed: ${error.path} - ${error.stringValue} - ${error.messageFormat}`,
        });
    }
});

/*
Type:

Functionality: delets resume based on id
Usecase:
*/
Router.delete("/id/:_id", async (req, res) => {
    const { _id } = req.params;

    try {
        await Resume.findOneAndDelete({ _id });
        res.sendStatus(200); // Send a simple OK if successful
    } catch (error) {
        res.status(500).json({
            error: `Deletion of resume with an id of ${_id} failed`,
        });
    }
});

module.exports = Router;
