const express = require("express")
const jwt = require("jsonwebtoken")
const {JWT_KEY} = require("../constants/appConstants")
const User = require("../schemas/userSchema")
const Authenticate = require("../middlewares/auth")
const user = express.Router()

user.get("/", (req, res)=>{
    res.send(req.originalUrl)
})

user.get("/profile", Authenticate, async (req, res, next)=>{
    const {_id, name, email} = req.user
    try {
        const user = await User.findOne({_id: _id}, {password: 0})
        res.status(200).json({user})        
    } catch (error) {
        res.status(500).json({error})
    }
})

user.post("/signup", async (req, res)=>{
    const {name, email, password} = req.body
    try {
        const user = await User.create({name, email, password})    
        res.status(201).json({message: "User Created Successfully", user: user})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

user.post("/login", async (req, res)=>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email, password})
        const data = {_id: user._id, email: user.email, name: user.name}
        token = jwt.sign(data, JWT_KEY, {expiresIn: "15m"})
        res.status(200).json({token: token})
    } catch (error) {
         res.status(500).json({error:error})   
    }
})

module.exports = user