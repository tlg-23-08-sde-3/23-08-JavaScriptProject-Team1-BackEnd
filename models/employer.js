const mongoose = require("mongoose");

// Create employer schema
/*
TODO: Add additonal properties address, phone number, etc
*/
const employerSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    jobPosts: { type: Array },
});

module.exports = mongoose.model("Employer", employerSchema);
