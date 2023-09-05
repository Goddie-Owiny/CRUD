const express = require("express")


    const deleteUser = async (req, res) =>{
        const { id } = req.params;
        const user = await User.findByAndDelete(id);
        if(!user) {
            return res.status(400).json("User not found");
        }
        res.status(200).json("User deleted Successfully");
        res.redirect("/register");
    }





module.exports = deleteUser;