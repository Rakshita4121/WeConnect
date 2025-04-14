const AnnouncementModel = require("../models/AnnouncementsModel");
const User = require("../models/UserModel");
const webpush = require("../utils/push");
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
              const users = await User.find({ "subscription.endpoint": { $exists: true } });
    
            const payload = JSON.stringify({
                title: "🎉 New Announcement Added!",
                body: `Don't miss out: ${savedAnnouncement.title}`,
                url: `/announcements/${savedAnnouncement._id}`
            });
    
            users.forEach(user => {
                if (user.subscription) {
                    webpush.sendNotification(user.subscription, payload).catch(err => {
                        console.error("Push error:", err);
                    });
                }
            });
              res.status(202).json({message:"Announcement Succesfully Created"})
          }catch(error){
              console.log("error while creating announcement" , error)
              res.status(500).json({ message: "Error adding event", error: error.message });
          }
      }
}

module.exports = announcementsController;