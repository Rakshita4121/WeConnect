const express=require("express");
const router=express.Router();
const LocalBusinessesModel = require("../models/LocalBusinessesModel")
const localbusinessController = require("../controllers/localbusinesses");
router.route("/")
.get(localbusinessController.index)
.post(localbusinessController.createBusiness)
router.route("/add")
.get(localbusinessController.add)
router.route("/:id")
.get(localbusinessController.showBusiness)
.put(localbusinessController.updateBusiness)
.delete(localbusinessController.deleteBusiness)
module.exports = router;