const express=require("express");
const router=express.Router();
const multer = require("multer")
const {storage} = require("../cloudConfig")
const upload = multer({storage});
const NewsModel = require("../models/NewsModel");
const newsController=require("../controllers/news");
router.route("/")
.get(newsController.index)
.post( upload.single('image'),newsController.createNews);
module.exports=router;