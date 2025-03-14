const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default:null }, 
  datePublished: { type: Date, default: Date.now },
  image: { type: String, required: false }, // Optional image URL
  category: { 
    type: String, 
    enum: ["Politics", "Business", "Sports", "Technology", "Health", "Entertainment", "General"], 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const News = mongoose.model("News", NewsSchema);

module.exports = News;
