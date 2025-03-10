require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const PORT=process.env.PORT || 3002;
const uri=process.env.MONGO_URL;
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const events=require("../backend/routes/events");
const organizations=require("../backend/routes/organizations");
app.use("/events",events)
app.use("/organizations",organizations)

app.listen(PORT , ()=>{
    console.log("App Started!")
    mongoose.connect(uri);
    console.log("DB Connected")
})