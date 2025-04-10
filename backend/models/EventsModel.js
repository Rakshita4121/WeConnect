const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    eventType: { type: String, enum: ['community', 'organization'], required: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: null }, 
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    volunteersNeeded: { type: Number, default: 0 },
    volunteerRegistrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VolunteerRegistration' }],
    bannerImage: { type: String }, 
    registrationPrice: { type: Number, default: 0 }, 
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'canceled'], default: 'upcoming' },
    organizedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
