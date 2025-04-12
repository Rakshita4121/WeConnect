const express=require("express");
const router=express.Router();
const multer = require("multer")
const {storage} = require("../cloudConfig")
const upload = multer({storage});
const OrganizationModel = require ("../models/OrganizationsModel");
const organizationController=require("../controllers/organizations");
router.route("/")
.get(organizationController.index)
.post( upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]),organizationController.createOrganization)
router.route("/:id")
.get(organizationController.showOrganization)
.put(organizationController.updateOrganization)
.delete(organizationController.deleteOrganization)
module.exports=router;