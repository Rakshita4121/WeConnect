require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const cors=require("cors");
const PORT=process.env.PORT || 3002;
const uri=process.env.MONGO_URL;
const app=express();
const session=require("express-session")
const passport = require("passport");
const localStrategy= require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose")
const multer  = require('multer')


const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite: "lax",
        secure: false
    }
}
app.use(session(sessionOptions))
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true, 
    })
);
const User = require("../backend/models/UserModel")
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const events=require("../backend/routes/events");
const organizations=require("../backend/routes/organizations");
const localbusinesses = require("../backend/routes/localbusinesses");
const announcements = require("../backend/routes/announcements")
const news=require("../backend/routes/news")
const users=require("../backend/routes/users")
const registrations=require("../backend/routes/registrations")
const jobs=require("../backend/routes/jobs")
const notifications=require("../backend/routes/notifications")
app.use("/events",events)
app.use("/organizations",organizations)
app.use("/localbusinesses",localbusinesses);
app.use("/news",news)
app.use("/announcements",announcements)
app.use("/auth",users)
app.use("/",registrations)
app.use("/jobs",jobs)
app.use('/notifications', notifications);

app.listen(PORT , ()=>{
    console.log("App Started!")
    mongoose.connect(uri);
    console.log("DB Connected")
})