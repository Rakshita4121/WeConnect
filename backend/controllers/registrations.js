const mongoose = require("mongoose");
const VolunteerRegistration = require("../models/VolunteerRegistration");
const Event = require("../models/EventsModel"); // ✅ Correct import

const registrationController = {
    volunteerRegistration: async (req, res) => {
        try {
            const { id } = req.params; // Event ID
            const { userId, name, email, mobileNo } = req.body; // Volunteer Data

            // Check if event exists
            let event = await Event.findById(id);
            if (!event) return res.status(404).json({ message: "Event not found" });

            // Check if user has already registered
            const existingRegistration = await VolunteerRegistration.findOne({ eventId: id, userId });
            if (existingRegistration) {
                return res.status(400).json({ message: "You have already registered!" });
            }

            // Check if volunteer slots are full
            if (event.volunteerRegistrations.length >= event.volunteersNeeded) {
                return res.status(400).json({ message: "Volunteer limit reached!" });
            }

            // Create a new Volunteer Registration
            const volunteer = new VolunteerRegistration({
                userId,
                eventId: id,
                name,
                email,
                mobileNo
            });

            // Save the volunteer registration
            await volunteer.save();

            // Add volunteer registration ID to event collection
            event.volunteerRegistrations.push(volunteer._id);
            await event.save();

            res.status(200).json({ message: "Successfully registered as a volunteer!", volunteer });
        } catch (error) {
            console.error("Error registering volunteer:", error);
            res.status(500).json({ message: "Server error, please try again!" });
        }
    }
};

module.exports = registrationController;
