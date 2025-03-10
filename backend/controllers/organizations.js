const mongoose = require("mongoose")
const OrganizationModel=require("../models/OrganizationsModel");

const organizationController = {
    index:async (req,res)=>{
        let allorganizations = await OrganizationModel.find({});
        res.json(allorganizations);
    },
    showOrganization: async(req,res)=>{
        let {id} = req.params;
        let organization = await OrganizationModel.findById(id);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        res.json(organization);
    },
    createOrganization: async (req, res) => {
        try {
            const newOrganization = new OrganizationModel({
                ...req.body,
                foundedBy: req.body.foundedBy.split(",").map(name => name.trim()), // Convert string to array
            });

            await newOrganization.save();

            res.status(201).json({
                message: "Organization created successfully!",
                organization: newOrganization,
            });
        } catch (error) {
            console.error("Error creating organization:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    updateOrganization : async (req, res) => {
        try {
            const organizationId = req.params.id;
    
            // Convert foundedBy correctly
            const foundedBy = typeof req.body.foundedBy === "string" ? req.body.foundedBy.split(",") : req.body.foundedBy;
    
            const updatedOrganization = await OrganizationModel.findByIdAndUpdate(
                organizationId,
                { ...req.body, foundedBy },
                { new: true }
            );
    
            if (!updatedOrganization) {
                return res.status(404).json({ message: "Organization not found" });
            }
    
            res.json({ message: "Organization updated successfully", organization: updatedOrganization });
        } catch (error) {
            console.error("Error updating organization:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = organizationController;