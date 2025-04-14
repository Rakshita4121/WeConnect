const mongoose = require("mongoose")
const LocalBusinessModel=require("../models/LocalBusinessesModel");
const User = require("../models/UserModel");
const webpush = require("../utils/push");
const businesess=[
    {
      name: "Green Earth Initiative",
      description: "A dedicated organization focused on environmental conservation and sustainability.",
      shortDescription: "Committed to saving the planet through eco-friendly initiatives.",
      contactEmail: "info@greenearth.org",
      contactPhone: "+1-555-111222",
      address: "123 Green Street, Eco City, USA",
      website: "https://greenearth.org",
      logo: "https://source.unsplash.com/150x150/?green,logo",
      image: "https://source.unsplash.com/400x300/?nature",
      foundedBy: ["Alice Green", "Bob Blue"],
      isNonProfit: true,
      eventsOrganized: []
    },
    {
      name: "Tech for All",
      description: "An organization dedicated to making technology accessible to everyone.",
      shortDescription: "Bridging the digital divide through education and innovation.",
      contactEmail: "contact@techforall.com",
      contactPhone: "+1-555-333444",
      address: "456 Tech Road, Silicon Valley, USA",
      website: "https://techforall.com",
      logo: "https://source.unsplash.com/150x150/?tech,logo",
      image: "https://source.unsplash.com/400x300/?technology",
      foundedBy: ["John Tech", "Mira Innovate"],
      isNonProfit: false,
      eventsOrganized: []
    },
    {
      name: "Health & Hope",
     
      description: "A community organization focused on improving public health and providing medical aid.",
      shortDescription: "Empowering communities with health and hope.",
      contactEmail: "support@healthhope.org",
      contactPhone: "+1-555-555666",
      address: "789 Wellness Ave, Caretown, USA",
      website: "https://healthhope.org",
      logo: "https://source.unsplash.com/150x150/?health,logo",
      image: "https://source.unsplash.com/400x300/?health",
      foundedBy: ["Dr. Hope", "Nurse Care"],
      isNonProfit: true,
      eventsOrganized: []
    }
  ]
  
const localbusinessController ={
    index:async (req,res)=>{
        let allbusinesses = await LocalBusinessModel.find({});
        res.json(allbusinesses);
    },
    showBusiness: async (req, res) => {
        try {
            const { id } = req.params;
            
            // Populate jobs along with business details
            const business = await LocalBusinessModel.findById(id)
                .populate("jobs") // ✅ Fetch all jobs associated with this business
                .exec();

            if (!business) {
                return res.status(404).json({ message: "Business not found" });
            }

            res.json(business);
        } catch (error) {
            console.error("Error fetching business details:", error);
            res.status(500).json({ message: "Failed to fetch business details" });
        }
    },
    createBusiness: async (req, res) => {
        try {
            const {
                name,
                shortDescription,
                description,
                contactEmail,
                contactPhone,
                website,
                address,
                ownerId
            } = req.body;
            console.log("Files received:", req.files);

            // Extract uploaded files
            const logoFile = req.files?.logo?.[0];
            const imageFiles = req.files?.images || [];
    
            // Format the logo and images according to schema
            const logo = logoFile ? {
                url: logoFile.path,
                filename: logoFile.filename
            } : null;
    
            const images = imageFiles.map(file => ({
                url: file.path,
                filename: file.filename
            }));
    
            const newBusiness = new LocalBusinessModel({
                name,
                shortDescription,
                description,
                contactEmail,
                contactPhone,
                website,
                address,
                ownerId,
                logo,
                images
            });
    
            await newBusiness.save();
            const users = await User.find({ "subscription.endpoint": { $exists: true } });
    
            const payload = JSON.stringify({
                title: "🎉 New Business Added!",
                body: `Don't miss out: ${newBusiness.name}`,
                url: `/localbusinesses/${newBusiness._id}`
            });
    
            users.forEach(user => {
                if (user.subscription) {
                    webpush.sendNotification(user.subscription, payload).catch(err => {
                        console.error("Push error:", err);
                    });
                }
            });
    
            res.status(202).json({
                message: "Local Business created successfully!",
                business: newBusiness
            });
    
        } catch (error) {
            console.error("Error creating business:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    
    updateBusiness: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedBusiness = await LocalBusinessModel.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedBusiness) {
                return res.status(404).json({ error: "Business not found" });
            }
            res.status(200).json({ message: "Business updated successfully", event: updatedBusiness});
        } catch (error) {
            console.error("Error updating Business:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    deleteBusiness: async (req,res)=>{
        try{
            const {id} = req.params;
            const deletedBusiness = await LocalBusinessModel.findByIdAndDelete(id);
            if(!deletedBusiness){
                return res.status(404).json({ error: "Business not found" });
            }
            res.status(200).json({ message: "Business deleted successfully" });
        }catch(err){
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    add : async (req,res)=>{
        await LocalBusinessModel.insertMany(businesess);
        res.send("added")
    }

}
module.exports=localbusinessController;