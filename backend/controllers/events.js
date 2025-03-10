const mongoose = require("mongoose")
const EventModel=require("../models/EventsModel");

const eventController = {
    index:async (req,res)=>{
        let allevents = await EventModel.find({});
        res.json(allevents);
    },
    showEvent: async(req,res)=>{
        let {id} = req.params;
        let event = await EventModel.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    },
    createEvent : async (req, res) => {
        try {
            const {
                title,
                shortDescription,
                description,
                eventType,
                date,
                time,
                location,
                volunteersNeeded,
                bannerImage,
                registrationPrice,
                status
            } = req.body;
            const newEvent = new EventModel({
                title,
                shortDescription,
                description,
                eventType,
                date,
                time,
                location,
                volunteersNeeded,
                bannerImage,
                registrationPrice,
                status: status || "upcoming"
            });
            const savedEvent = await newEvent.save();
            res.status(201).json({ 
                message: "Event created successfully!", 
                event: savedEvent,
                redirectUrl: "/events"  
            });
        } catch (error) {
            console.error("Error adding event:", error);
            res.status(500).json({ message: "Error adding event", error: error.message });
        }
    },
    updateEvent: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedEvent = await EventModel.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedEvent) {
                return res.status(404).json({ error: "Event not found" });
            }

            res.status(200).json({ message: "Event updated successfully", event: updatedEvent , redirectUrl: `/events/${id}` });
        } catch (error) {
            console.error("Error updating event:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}
module.exports = eventController;