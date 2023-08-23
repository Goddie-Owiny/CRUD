const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport")
const router = express.Router();


const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};




router.post("/", async (req, res) => {
    try {
        const { studentCode, password, name } = req.body;  

        const user = await userModel.findOne({ studentCode });

        if (!user) {
            return res.status(400).json("Invalid student code or password...");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json("Invalid student code or password");
        }

        const token = createToken(user._id);

        // You can also redirect here, but make sure you send the token or user data to the frontend
        // res.status(200).json({ _id: user._id, name: user.name, studentCode, token });
        res.redirect("/")
        console.log(`Logged in as ${name}`);
    } catch (error) { 
        console.log(error);
        // res.status(500).json("An error occurred during login");    
    }
});




module.exports = router;