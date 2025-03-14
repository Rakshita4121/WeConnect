const express=require("express");
const router=express.Router();
const LocalBusinessesModel = require("../models/LocalBusinessesModel")
const localbusinessController = require("../controllers/localbusinesses");
router.route("/")
.get(localbusinessController.index)
.post(localbusinessController.createBusiness)
router.route("/:id")
.get(localbusinessController.showBusiness)
.put(localbusinessController.updateBusiness)
module.exports = router;