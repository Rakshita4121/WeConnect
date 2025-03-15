const NewsModel = require("../models/NewsModel");
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
              const newNews=new NewsModel(req.body);
              let savedNews=await newNews.save();
              res.status(202).json({message:"News Succesfully Created"})
          }catch(error){
              console.log("error while creating news" , error)
              res.status(500).json({ message: "Error adding news", error: error.message });
          }
      }
}

module.exports =newsController;