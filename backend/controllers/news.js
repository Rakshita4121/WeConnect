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
              res.status(202).json({message:"News Succesfully Created"})
          }catch(error){
              console.log("error while creating news" , error)
              res.status(500).json({ message: "Error adding news", error: error.message });
          }
      }
}

module.exports =newsController;