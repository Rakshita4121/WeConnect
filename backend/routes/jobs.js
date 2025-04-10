const express=require("express");
const router=express.Router();
const jobsController = require("../controllers/jobs");
router.route("/localbusinesses/:id/post-job")
.post(jobsController.postJob)
router.route("/:id")
.get(jobsController.showJob)
router.route("/:id/apply")
.post(jobsController.JobRegister)
router.route("/:id/applications")
.get(jobsController.applications)
 module.exports=router;
