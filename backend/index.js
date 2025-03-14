require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const PORT=process.env.PORT || 3002;
const uri=process.env.MONGO_URL;
const app=express();
const session=require("express-session")
const sessionOptions={  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default:null }, 

    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite: "none"
    }
}
app.use(session(sessionOptions))
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true, 
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const events=require("../backend/routes/events");
const organizations=require("../backend/routes/organizations");
const localbusinesses = require("../backend/routes/localbusinesses");
app.use("/events",events)
app.use("/organizations",organizations)
app.use("/localbusinesses",localbusinesses);
app.use("/news",news)
app.use("/announcements",announcements)
app.listen(PORT , ()=>{
    console.log("App Started!")
    mongoose.connect(uri);
    console.log("DB Connected")
})