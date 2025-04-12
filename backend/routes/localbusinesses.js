const express=require("express");
const router=express.Router();
const multer = require("multer")
const {storage} = require("../cloudConfig")
const upload = multer({storage});
const LocalBusinessesModel = require("../models/LocalBusinessesModel")
const localbusinessController = require("../controllers/localbusinesses");
router.route("/")
.get(localbusinessController.index)
.post(upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 3 }
  ]), localbusinessController.createBusiness)
router.route("/add")
.get(localbusinessController.add)
router.route("/:id")
.get(localbusinessController.showBusiness)
.put(localbusinessController.updateBusiness)
.delete(localbusinessController.deleteBusiness)
module.exports = router;