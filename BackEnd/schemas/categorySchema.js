const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trip: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category