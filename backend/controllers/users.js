const User = require("../models/UserModel");

const userController = {
    signup:async (req, res) => {
        try {
          const { name,username,email, password ,mobile,role} = req.body;
          const user = new User({name, username , email ,mobile,role });
          await User.register(user, password);
          res.status(200).json({ message: "User registered successfully" });
        } catch (error) {
             res.status(500).json({ message: error.message });
        }
      },
      login: async (req,res)=> {
        res.json({ message: "Logged in", user: req.user });
      },
      getUserData :  (req, res) => {
        res.json(req.user || null);
      },
      logout: async (req,res)=>{
        req.logout((err) => {
            if (err) return res.status(500).json({ message: "Logout failed" });
            res.json({ message: "Logged out" });
          });
      }
}

module.exports = userController;