const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    username: {type: String, required: true,  minlength: 3, maxlength: 32},

    level: {type: String, required: true},
        
    studentCode: {type: String, required: true, minlength: 8, maxlength: 15},
    
    password: {type: String, required: true, minlength: 6, maxlength: 100},
    },
    {
    timestamps: true,
});

userSchema.plugin(passportLocalMongoose, { usernameField: "studentCode" })

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
  


