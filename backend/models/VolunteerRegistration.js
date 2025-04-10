const mongoose = require('mongoose');

const VolunteerRegistrationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VolunteerRegistration', VolunteerRegistrationSchema);
