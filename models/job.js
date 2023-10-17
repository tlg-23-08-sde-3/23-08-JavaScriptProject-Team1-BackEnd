const mongoose = require("mongoose");

// Create schema for job postings
/*
TODOs: Add additional properties
*/
const jobSchema = new mongoose.Schema({
    status: { type: String, enum: ["open", "closed"], default: "open" },
    pay: { type: Number, required: true },
});
