const express=require("express");
const router=express.Router();
const NewsModel = require("../models/NewsModel");
const newsController=require("../controllers/news");
router.route("/")
.get(newsController.index)
.post(newsController.createNews);
module.exports=router;