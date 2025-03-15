const express=require("express");
const router=express.Router();
const AnnouncementModel = require ("../models/AnnouncementsModel");
const announcementsController=require("../controllers/announcements");
router.route("/")
.get(announcementsController.index)
.post(announcementsController.createAnnouncement);
module.exports=router;