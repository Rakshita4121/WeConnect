const express=require("express");
const router=express.Router();
const OrganizationModel = require ("../models/OrganizationsModel");
const organizationController=require("../controllers/organizations");
router.route("/")
.get(organizationController.index)
.post(organizationController.createOrganization)
router.route("/:id")
.get(organizationController.showOrganization)
.put(organizationController.updateOrganization)
.delete(organizationController.deleteOrganization)
module.exports=router;