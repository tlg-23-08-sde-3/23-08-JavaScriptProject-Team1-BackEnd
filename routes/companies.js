const express = require("express");
const Router = express.Router();

const Company = require("../models/company");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");

/*
POST: /company/signup

Functionality: create company on signup
Usecase: on company signup
*/
Router.post("/signup", async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const newCompany = await Company.create(req.body);

        const token = jwt.sign({ _id: newCompany._id, email: newCompany.email }, process.env.JWT_KEY, {
            expiresIn: "1h",
        });

        res.status(200).send({ _id: newCompany._id, email: newCompany.email, token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/*
POST: /company/signin

Functionality: verifies password on login of company & company exists
Usecase: on company signin
*/
Router.post("/signin", async (req, res) => {
    const email = req.body.email;
    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).send({ error: `no company with that email: ${req.body.email}` });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, company.password);
        if (!isValidPassword) {
            return res.status(400).send({ error: "invalid password" });
        }

        const token = jwt.sign({ _id: company._id, email: company.email }, process.env.JWT_KEY, {
            expiresIn: "1h",
        });

        res.status(200).send({ _id: company._id, email: company.email, token: token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/*
GET: /company

Functionality: gets a list of companies based upon queries supplied. If no queries then all companies
Usecase:
*/
Router.get("/", async (req, res) => {
    try {
        const companies = await Company.find(req.query);
        res.send(companies);
    } catch (error) {
        res.status(500).json({ error: "Company retrieval failed" });
    }
});

/*
GET: /company/email/:email

Functionality: gets a company based on email passed in path
Usecase: 
*/
Router.get("/email/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(404).json({ error: `No company found with email: ${email}` });
        }
        res.send(company);
    } catch (error) {
        res.status(500).json({ error: "Company retrieval failed" });
    }
});

/*

*/
Router.put("/email/:email", verifyToken, async (req, res) => {
    const { email } = req.params;

    try {
        let updatedCompany = await Company.findOneAndUpdate({ email }, req.body, { returnOriginal: false });
        if (!updatedCompany) {
            return res.status(404).json({ error: `No company found with email: ${email}` });
        }
        res.send(updatedCompany);
    } catch (error) {
        res.status(500).json({ error: `${error.codeName} - ${error.keyValue.email}` });
    }
});

/*
DELTE: /company/email/:email

Functionality: deletes a single company based upon email
Usecase:
*/
Router.delete("/email/:email", verifyToken, async (req, res) => {
    const { email } = req.params;

    try {
        await Company.findOneAndDelete({ email });
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: "Company deletion failed" });
    }
});

module.exports = Router;
