const AnnouncementModel = require("../models/AnnouncementsModel");
let announcementsController={
    index: async (req, res) => {
        try {
          const { category } = req.query;
          const filter = category && category !== "All" ? { category } : {};
          const announcements = await AnnouncementModel.find(filter)
          res.json(announcements);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch announcements" });
        }
      },
      createAnnouncement: async (req,res)=>{
          try{
              const newAnnouncement=new AnnouncementModel(req.body);
              let savedAnnouncement=await newAnnouncement.save();
              res.status(202).json({message:"Announcement Succesfully Created"})
          }catch(error){
              console.log("error while creating announcement" , error)
              res.status(500).json({ message: "Error adding event", error: error.message });
          }
      }
}

module.exports = announcementsController;