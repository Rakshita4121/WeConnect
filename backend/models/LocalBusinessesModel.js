const mongoose = require("mongoose");

const LocalBusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default:null },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  website: { type: String },
  logo: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});



const LocalBusiness = mongoose.model("LocalBusiness", LocalBusinessSchema);

module.exports = LocalBusiness;
