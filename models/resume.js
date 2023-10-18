const mongoose = require("mongoose");

// Create resume scheme
/*
TODO: Add remaining resume properties
*/
const resumeSchema = new mongoose.Schema(
    {
        candidateId: { type: mongoose.ObjectId, ref: "Candidate", required: true },
        keywords: { type: Array },
        summary: { type: String },
        workHistory: { type: Array },
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Resume", resumeSchema);
