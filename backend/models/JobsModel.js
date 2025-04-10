const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        businessId: { type: mongoose.Schema.Types.ObjectId, ref: "LocalBusiness", required: true }, // Reference to Business
        description: { type: String, required: true },
        requirements: { type: [String], required: true }, // Array of requirements
        responsibilities: { type: [String], required: true }, // Array of responsibilities
        salaryRange: { 
            min: { type: Number, required: true }, 
            max: { type: Number, required: true } 
        },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User who posted the job
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model("Job", JobSchema);
