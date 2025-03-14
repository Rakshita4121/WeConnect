const mongoose = require("mongoose")
const LocalBusinessModel=require("../models/LocalBusinessesModel");

const localbusinessController ={
    index:async (req,res)=>{
        let allbusinesses = await LocalBusinessModel.find({});
        res.json(allbusinesses);
    },
    showBusiness: async(req,res)=>{
        let {id} = req.params;
        let business = await LocalBusinessModel.findById(id);
        if (!business) {
            return res.status(404).json({ message: "business not found" });
        }
        res.json(business);
    },
    createBusiness: async (req,res)=>{
        try{
            let newbusiness = new LocalBusinessModel(req.body);
            await newbusiness.save()
            res.status(202).json({
                message: "Local Business created successfully!",
                business: newbusiness,
            });
        }catch(error){
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
    }

}
module.exports=localbusinessController;