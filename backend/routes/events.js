const express=require("express");
const router=express.Router();
const multer = require("multer")
const {storage} = require("../cloudConfig")
const upload = multer({storage});
const EventModel = require ("../models/EventsModel");
const eventController=require("../controllers/events");
router.route("/")
.get(eventController.index)
.post( upload.single('bannerImage'),eventController.createEvent)
router.route("/:id")
.get(eventController.showEvent)
.put(eventController.updateEvent)
.delete(eventController.deleteEvent)
router.route("/:id/reviews")
.post(eventController.submitReview)
.get(eventController.getReviews)
module.exports=router;