const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  address: { type: String, required: true },
  website: { type: String },
  logo: { type: String }, // URL of the image
  foundedBy: [{ type: String }], // Array of founder names
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isNonProfit: { type: Boolean, required: true }, // True for NGOs, False for businesses
  eventsOrganized: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]
});

module.exports = mongoose.model("Organization", OrganizationSchema);
