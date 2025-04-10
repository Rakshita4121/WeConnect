const express=require("express");
const router=express.Router();
const registrationController=require("../controllers/registrations");
router.route("/events/:id/register-volunteer")
.post(registrationController.volunteerRegistration)
module.exports=router;