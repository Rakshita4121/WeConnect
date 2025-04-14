const mongoose = require("mongoose")
const OrganizationModel=require("../models/OrganizationsModel");
const User = require("../models/UserModel");
const webpush = require("../utils/push");
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
            const { files, body } = req;
    
            const newOrganization = new OrganizationModel({
                ...body,
                foundedBy: body.foundedBy.split(",").map(name => name.trim()),
    
                // Save Cloudinary image details
                logo: files.logo ? {
                    url: files.logo[0].path,
                    filename: files.logo[0].filename
                } : undefined,
    
                image: files.image ? {
                    url: files.image[0].path,
                    filename: files.image[0].filename
                } : undefined
            });
    
            await newOrganization.save();
            const users = await User.find({ "subscription.endpoint": { $exists: true } });
    
            const payload = JSON.stringify({
                title: "🎉 New Organization Added!",
                body: `Don't miss out: ${newOrganization.name}`,
                url: `/organizations/${newOrganization._id}`
            });
    
            users.forEach(user => {
                if (user.subscription) {
                    webpush.sendNotification(user.subscription, payload).catch(err => {
                        console.error("Push error:", err);
                    });
                }
            });
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
    },
    deleteOrganization: async (req,res)=>{
        try{
            const {id} = req.params;
            const deletedOrganization = await OrganizationModel.findByIdAndDelete(id);
            if(!deletedOrganization){
                return res.status(404).json({ error: "Organization not found" });
            }
            res.status(200).json({ message: "Organization deleted successfully" });
        }catch(err){
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = organizationController;