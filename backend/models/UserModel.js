const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, 
    mobile: { type: Number, required: true },
    role: { type: String, required: true },
    subscription: {
        endpoint: String,
        keys: {
            p256dh: String,
            auth: String
        }
    }
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);
module.exports = User;
