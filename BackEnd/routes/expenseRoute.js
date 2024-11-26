const express = require("express")
const expense = express.Router()

expense.get("/", (req, res)=>{
    res.send(req.originalUrl)
})

// Create new expense for loggedIn user
expense.post("/new", (req, res)=>{
    res.send(req.originalUrl)
})

// Logged in user's last 30 days expenses
expense.get("/lastmonth", (req, res)=>{
    res.send(req.originalUrl)
})

// Logged in user's specific category expenses
expense.get("/category/:cid", (req, res)=>{
    res.send(req.originalUrl)
})

// Logged in user's expenses within date range
expense.get("/daterange/:from/:to", (req, res)=>{
    res.send(req.originalUrl)
})

// Delete specific expense
expense.delete("/delete/:eid", (req, res)=>{
    res.send(req.originalUrl)
})

// Update expense description, date, amount, category etc.
expense.put("/update", (req, res)=>{
    res.send(req.originalUrl)
})

module.exports = expense