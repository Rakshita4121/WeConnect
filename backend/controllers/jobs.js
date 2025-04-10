const mongoose = require("mongoose");
const Job = require("../models/JobsModel");
const LocalBusiness = require("../models/LocalBusinessesModel")
const JobRegistration = require("../models/JobRegistrationModel")

const jobsController={
    postJob:async (req, res) => {
        try {
            const { title, description, requirements, responsibilities, salaryRange, businessId, postedBy } = req.body;
    
            // Create a new job document
            const newJob = new Job({
                title,
                description,
                requirements,
                responsibilities,
                salaryRange,
                businessId,
                postedBy,
            });
    
            // Save job in database
            const savedJob = await newJob.save();
    
            // Push job ID into LocalBusiness collection
            await LocalBusiness.findByIdAndUpdate(
                businessId,
                { $push: { jobs: savedJob._id } },
                { new: true }
            );
    
            res.status(201).json({ message: "Job posted successfully!", job: savedJob });
        } catch (error) {
            console.error("Error posting job:", error);
            res.status(500).json({ message: "Failed to post job", error: error.message });
        }
    },
    showJob: async (req, res) => {
        try {
            let { id } = req.params;
            let job = await Job.findById(id).populate("businessId"); // Populate business details
            if (!job) {
                return res.status(404).json({ message: "Job not found" });
            }
            res.json(job);
        } catch (error) {
            console.error("Error fetching job details:", error);
            res.status(500).json({ message: "Failed to fetch job details" });
        }
    },
    JobRegister:async (req, res) => {
        try {
            const { jobId, businessId, userId, name, email, mobileNo } = req.body;
    
            // Validate that the job exists
            const jobExists = await Job.findById(jobId);
            if (!jobExists) {
                return res.status(404).json({ message: "Job not found" });
            }
    
            // Check if the user has already applied for this job
            const existingApplication = await JobRegistration.findOne({ userId, jobId });
            if (existingApplication) {
                return res.status(400).json({ message: "You have already applied for this job." });
            }
    
            // Store job application
            const newApplication = new JobRegistration({
                jobId,
                businessId,
                userId,
                name,
                email,
                mobileNo
            });
    
            await newApplication.save();
    
            res.status(201).json({ message: "Application submitted successfully!" });
        } catch (error) {
            console.error("Error submitting job application:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    applications:async (req, res) => {
        try {
          const jobId = req.params.id;
          const applications = await JobRegistration.find({ jobId });
          res.json(applications);
        } catch (error) {
          console.error("Error fetching job applications:", error);
          res.status(500).json({ message: "Internal server error" });
        }
    },
}
module.exports= jobsController;