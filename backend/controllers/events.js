const mongoose = require("mongoose")
const EventModel=require("../models/EventsModel");
const Review = require("../models/ReviewsModel")
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
                status,organizedBy
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
                status: status || "upcoming",
                organizedBy
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
    },
    deleteEvent: async (req,res)=>{
        try{
            const {id} = req.params;
            const deletedEvent = await EventModel.findByIdAndDelete(id);
            if(!deletedEvent){
                return res.status(404).json({ error: "Event not found" });
            }
            res.status(200).json({ message: "Event deleted successfully" });
        }catch(err){
            res.status(500).json({ error: "Internal Server Error" });
        }
        
    },
    submitReview : async (req, res) => {
        try {
          const { rating, comment, eventId, userId } = req.body;
      
          if (!rating || !comment || !eventId || !userId) {
            return res.status(400).json({ message: "All fields are required" });
          }
      
          const newReview = new Review({
            rating,
            comment,
            eventId,
            userId
          });
      
          await newReview.save();
          res.status(201).json({ message: "Review submitted successfully!" });
      
        } catch (error) {
          console.error("Error submitting review:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      },
      getReviews:async (req, res) => {
        const eventId = req.params.id;
        try {
          const reviews = await Review.find({ eventId }).populate("userId", "name");
          res.status(200).json(reviews);
        } catch (err) {
          res.status(500).json({ message: "Error fetching reviews", error: err });
        }
      }
}
module.exports = eventController;