
const express = require('express');
const bcrypt = require("bcrypt")
const validator = require("validator")
const router = express.Router()
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")


const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY 

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"})
}

router.get("/register", (req, res) => {
    res.render("register")
})




router.post("/", async (req, res) => {
    try{

        const {username, level, studentCode, password} = req.body;
     
        let user = await userModel.findOne({studentCode});
        
      
        if(user) {
            const errorMessage = "Student with the given Code already exist...";
            return res.render('register', { errorMessage }); 
        } 
     
        if(!username || !studentCode || !password){
            const errorMessage = "All fields are required...";
            return res.render('register', { errorMessage });
        }  
     
        if (!studentCode || !validator.isNumeric(studentCode) || studentCode.length !== 10) {
            const errorMessage = "Invalid student code. It must be a 10-digit number.";
            return res.render('register', { errorMessage });
        }
    

     
        if(!validator.isStrongPassword(password)){
            const errorMessage = "Must be a strong password..";
            return res.render('register', { errorMessage });
        }
     
        user = new userModel( {username, studentCode, level, password} ) 

     

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)   
        await user.save()
        // console.log(user)

        const token = createToken(user._id) 
     
        await user.save()
        // res.status(200).json({_id: user._id, username, studentCode, token});
        res.redirect("/");
    } catch (error) {
        console.log(error) 
        
        res.status(500).json(error)
    }

})


module.exports = router;