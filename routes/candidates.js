const express = require("express");
const Router = express.Router();

const Candidate = require("../models/candidate");

/*
POST: /candidate/signup

Functionality: creates a candidate based upon candidateSchema
Usecase: On candidate signup
*/
Router.post("/signup", async (req, res) => {
    try {
        const newCandidate = await Candidate.create(req.body);
        res.send(newCandidate);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/*
GET: /candidate/
Functionality: gets candidates based upon query submission.
Usecase: Employer candidate browser

TODO: determine how to query in mongoose case insensitivity. Current case must match for query results
TODO: if used on employer candidate browse. Remove dob from results
*/
Router.get("/", async (req, res) => {
    try {
        const candidates = await Candidate.find(req.query);
        res.send(candidates);
    } catch (error) {
        res.status(500).send({ error: "Candidate retrieval failed" });
    }
});

/*
GET: /candidate/email/
Functionality: gets a single candidate based upon email
Usecase: when candidate selects to view their account

TODO: ?? Remove if. Maybe front end should handle the display no candidate found message if an empty array returned
*/
Router.get("/email/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const candidate = await Candidate.findOne({ email });
        if (!candidate) {
            return res.status(404).json({ error: `No candidate found with email: ${email}` });
        }
        res.send(candidate);
    } catch (error) {
        res.status(500).json({ error: "Candidate retrieval failed" });
    }
});

/*
Update: /candidate/email/
Functionality: updates a candidates account based upon email
Usecase: when candidate decides to edit their account

DONE: Verified unique holds during update > TODO: ensure unique email holds during update. If not add validation middleware
DONE: Type in if satetment > TODO: updates candidate but returns catch error. determine why
*/
Router.put("/email/:email", async (req, res) => {
    const { email } = req.params;

    try {
        let updatedCandidate = await Candidate.findOneAndUpdate({ email }, req.body, { returnOriginal: false });
        if (!updatedCandidate) {
            return res.status(404).json({ error: `No candidate found with email: ${email}` });
        }
        res.send(updatedCandidate);
    } catch (error) {
        res.status(500).json({ error: `${error.codeName} - ${error.keyValue.email}` });
    }
});

/*
Delete: /candidate/email/
Functionality: deletes canidate account based upon email
Usecase: when candidate decides to delete their account

TODO: ??
*/
Router.delete("/email/:email", async (req, res) => {
    const { email } = req.params;

    try {
        await Candidate.findOneAndDelete({ email });
        res.sendStatus(200); // Send a simple OK if successful
    } catch (error) {
        res.status(500).json({ error: `Deletion of account with an email of ${email} failed` });
    }
});

module.exports = Router;
