const mongoose = require("mongoose");

// Create schema for job postings
/*
TODOs: Add additional properties
*/
const jobSchema = new mongoose.Schema(
    {
        companyId: { type: mongoose.ObjectId, ref: "Company", required: true },
        status: { type: String, enum: ["open", "closed"], default: "open" },
        name: { type: String, required: true },
        contents: { type: String, required: true },
        location: { type: String, required: true },
        pay: { type: String },
        keywords: { type: Array },
        applicants: [{ type: mongoose.ObjectId, ref: "Candidate" }],
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Job", jobSchema);
