const NewsModel = require("../models/NewsModel");
const User = require("../models/UserModel");
const webpush = require("../utils/push");
let newsController={
    index: async (req, res) => {
        try {
          const { category } = req.query;
          const filter = category && category !== "All" ? { category } : {};
          const news = await NewsModel.find(filter)
          res.json(news);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch news" });
        }
      },
      createNews: async (req,res)=>{
          try{
            const file = req.file;
            let url=req.file.path
            let filename=req.file.filename
            if (!file) {
                console.log(file)
                console.log(req.body)
              return res.status(400).json({ message: "image is required" });
            }
        
              const newNews=new NewsModel(req.body);
              newNews.image={url,filename}
              let savedNews=await newNews.save();
              const users = await User.find({ "subscription.endpoint": { $exists: true } });
    
              const payload = JSON.stringify({
                  title: "🎉 New News Added!",
                  body: `Don't miss out: ${savedNews.headline}`,
                  url: `/news/${savedNews._id}`
              });
      
              users.forEach(user => {
                  if (user.subscription) {
                      webpush.sendNotification(user.subscription, payload).catch(err => {
                          console.error("Push error:", err);
                      });
                  }
              });
              res.status(202).json({message:"News Succesfully Created"})
          }catch(error){
              console.log("error while creating news" , error)
              res.status(500).json({ message: "Error adding news", error: error.message });
          }
      }
}

module.exports =newsController;