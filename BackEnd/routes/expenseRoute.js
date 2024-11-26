const express = require("express")
const Authenticate = require("../middlewares/auth")
const Expense = require("../schemas/expenseSchema")
const Category = require("../schemas/categorySchema")
const mongoose = require("mongoose")
const expense = express.Router()

expense.get("/", (req, res)=>{
    res.send(req.originalUrl)
})

// Create new expense for loggedIn user
expense.post("/new", Authenticate, async (req, res)=>{
    const uid = req.user._id
    const {description, amount, categoryId} = req.body
    // Steps
    // Find the userId associated with categoryId from Categories collection
    // Frequently need to find userId using categoryId from categories collection. Index creation is suggested. But default index based on _id is sufficient.
    try {
        const userWithCategory = await Category.find({userId: uid, _id: categoryId}, {userId: 1})
        // If the userId associated with categoryId is matched with loggedIn userId (uid)
        console.log(userWithCategory)
        if(userWithCategory.length>0)
        {
            // Then perform insert operation successfully
            const newExpense = await Expense.create({description, amount, categoryId, userId: uid})
            res.status(201).json({newExpense})
        }
        else{
            // Else show invalid category or user error message
            res.status(400).json({error: "Invalid user or categoryId"})
        }    
    } catch (error) {
        res.status(500).json({error})
    }
    
})

// Logged in user's last 30 days expenses
expense.get("/lastmonth", Authenticate, async (req, res)=>{
    const monthAgo = new Date()
    monthAgo.setDate(monthAgo.getDate()-30)

    try {
        const expenses = await Expense.find({
            userId: req.user._id,
            createdAt: {$gte: monthAgo}
        })
        res.status(200).json({expenses})    
    } catch (error) {
        res.status(500).json({error})
    }

})

// Logged in user's specific category expenses
expense.get("/categorywise/:cid", Authenticate, async (req, res)=>{
    const {cid} = req.params
    const uid = req.user._id
    try {
        const expenses = await Expense.find({userId: uid, categoryId: cid})
        res.status(200).json({expenses})    
    } catch (error) {
        res.status(500).json({error})
    }
})

// Logged in user's expenses within date range
expense.get("/daterange/:from/:to", Authenticate, async (req, res)=>{
    const {from, to} = req.params
    const uid = req.user._id
    try {
        const expenses = await Expense.find({userId:uid, createdAt: {$gte: new Date(from), $lte: new Date(to)}})
        res.status(200).json({expenses})
    } catch (error) {
        res.status(500).json({error})
    }
})

// Delete specific expense
expense.delete("/delete/:eid", Authenticate, async (req, res)=>{
    const uid = req.user._id
    const {eid} = req.params
    try {
        const expense = await Expense.findOneAndDelete({_id: eid})
        if(expense){
            res.status(200).json({message: "DELETED"})
        }
        else{
            res.status(404).json({message: "Expense NOT FOUND"})
        }   
    } catch (error) {
        res.status(500).json({error})
    }

})

// Update expense description, date, amount, category etc.
expense.put("/update", Authenticate, async (req, res)=>{
    const uid = req.user._id
    const {_id, categoryId, description, amount, createdAt, userId} = req.body
    try {
        const updatedExpense = await Expense.findOneAndUpdate(
            {
                _id: _id,
                userId: uid
            },
            {
                categoryId: new mongoose.Types.ObjectId(categoryId), description, amount
            },
            {
                new: true
            }
        )
        res.status(200).json({updatedExpense})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
    
})

module.exports = expense