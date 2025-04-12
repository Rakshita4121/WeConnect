const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true }, // New short description field
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  address: { type: String, required: true },
  website: { type: String },
  logo: {url:String,
    filename:String },
  image: {url:String,
    filename:String }, // New image field
  foundedBy: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isNonProfit: { type: Boolean, required: true },
  eventsOrganized: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
});

module.exports = mongoose.model("Organization", OrganizationSchema);
