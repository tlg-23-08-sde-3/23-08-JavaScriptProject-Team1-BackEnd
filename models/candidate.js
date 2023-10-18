const mongoose = require("mongoose");

// Create schema for candidates
/*
TODO: ???
*/
const candidateSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String },
        password: { type: String, required: true },
        dob: { type: Date, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        skills: { type: Array },
        favorites: { type: Array },
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Candidate", candidateSchema);
