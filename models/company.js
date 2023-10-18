const mongoose = require("mongoose");

// Create company schema
/*
TODO: Add additonal properties address, phone number, etc
*/
const companySchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        locations: { type: Array, required: true },
        industries: { type: Array },
        jobs: [{ type: mongoose.ObjectId, ref: "Job" }],
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Company", companySchema);
