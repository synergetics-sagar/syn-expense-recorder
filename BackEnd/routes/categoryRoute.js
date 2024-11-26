const express = require("express")
const Authenticate = require("../middlewares/auth")
const category = express.Router()
const Category = require("../schemas/categorySchema")

category.get("/", (req, res)=>{
    res.send(req.originalUrl)
})

// Current logged in users categories
category.get("/my", (req, res)=>{
    res.send(req.originalUrl)
})

// Create new category for logged in user
category.post("/new", Authenticate, async (req, res)=>{
    const {title} = req.body
    const userId = req.user._id
    try {
        const category = await Category.create({title, userId})
        res.status(201).json({message: "CATEGORY CREATED SUCCESSFULLY"})
    } catch (error) {
        res.status(500).json({error})
    }
    
})

// Delete category if there is no expense associated with it
category.delete("/remove", (req, res)=>{
    res.send(req.originalUrl)
})

// Update category title
category.put("/update", (req, res)=>{
    res.send(req.originalUrl)
})



module.exports = category