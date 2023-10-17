const mongoose = require("mongoose");

// Create schema for job postings
/*
TODOs: Add additional properties
*/
const jobSchema = new mongoose.Schema(
    {
        status: { type: String, enum: ["open", "closed"], default: "open" },
        name: { type: String, required: true },
        contents: { type: String, required: true },
        pay: { type: Number },
        keywords: { type: Array },
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Job", jobSchema);
