const express = require("express")
const Authenticate = require("../middlewares/auth")
const category = express.Router()
const Category = require("../schemas/categorySchema")

category.get("/", (req, res)=>{
    res.send(req.originalUrl)
})

// Current logged in users categories
category.get("/my", Authenticate, async (req, res)=>{
    const {_id} = req.user
    try {
        const categories = await Category.find({userId: _id})
        res.status(200).json({categories})   
    } catch (error) {
        res.status(500)._construct({error})
    }
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
category.delete("/remove/:cid", Authenticate, async (req, res)=>{
    const {_id} = req.user
    const cid = req.params.cid
    try {
        const category = await Category.findOneAndDelete({_id:cid, userId: _id})    
        if(category){
            res.status(200).json({message:"DELETED"})
        }
        else{
            res.status(404).json({message:"Category NOT Found"})
        }
    } catch (error) {
        res.status(500).json({error})
    }
})

// Update category title
category.put("/update", Authenticate, async (req, res)=>{
    const uid = req.user._id
    const {_id, title} = req.body
    console.log(req.body, uid)
    try {
        const updatedCategory = await Category.findOneAndUpdate({
            _id:_id,userId:uid
        }, 
        {
            title: title
        }, 
        {
            new:true
        });
        res.status(200).json({updatedCategory})    
    } catch (error) {
        res.status(500).json({error})
    }
})



module.exports = category