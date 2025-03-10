const express=require("express");
const router=express.Router();
const EventModel = require ("../models/EventsModel");
const eventController=require("../controllers/events");
router.route("/")
.get(eventController.index)
.post(eventController.createEvent)
router.route("/:id")
.get(eventController.showEvent)
.put(eventController.updateEvent)
module.exports=router;