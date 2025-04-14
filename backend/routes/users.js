const express=require("express");
const router=express.Router();
const UserModel = require ("../models/UserModel");
const userController=require("../controllers/users");
const passport = require("passport")
const LocalStrategy=require("passport-local")
router.route("/user")
.get(userController.getUserData)
router.route("/signup")
.post(userController.signup)
router.route("/login")
.post(passport.authenticate("local"),userController.login)
router.route("/logout")
.post(userController.logout)
router.route("/subscribe")
.post(userController.saveSubscription)
module.exports=router;