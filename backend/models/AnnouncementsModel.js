const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  datePosted: { type: Date, default: Date.now }, 
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true }, 
  category: { 
    type: String, 
    enum: ["Business", "Events", "General", "Opportunities"], 
    required: true 
  }, 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

module.exports = Announcement;

