const mongoose = require("mongoose")

const expenseSchema = mongoose.Schema({
    description: {
        type:String,
        requird: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
}, {timestamps: true})

const Expense = mongoose.model("Expense", expenseSchema)

module.exports = Expense