const express = require("express")
const bcrypt = require("bcrypt")
const validator = require("validator")
const router = express.Router()
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");


const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY 

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"}) 
}

router.get("/register", (req, res) => {
    res.render("register")
})



router.post("/", async (req, res) => {
    try{

        const {username, password, level, studentCode} = req.body;
     
        let user = await userModel.findOne({studentCode});
     
        if(user) return res.status(400).json("User with the give studentCode already exist...");
     
        if(!username || !studentCode || !password) return res.status(400).json("All fields are required...");
     
     
        if(!validator.isNumeric(studentCode))
        return res.status(400).json("Email must be valid...");
     
        if(!validator.isStrongPassword(password))
        return res.status(400).json("Must be a strong password..");
     
        user = new userModel( {username, studentCode, level, password} )  

     

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)    
        const token = createToken(user._id) 
        await user.save()
        // console.log(user)
 
     
        await user.save()
        // res.status(200).json({_id: user._id, username, studentCode, token});
        res.redirect("/login");
    } catch (error) {
        console.log(error) 
        
        res.status(500).json(error) 
    }

})


    


module.exports = router;