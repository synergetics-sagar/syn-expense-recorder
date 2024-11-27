const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json")
const mongoose = require("mongoose")
const {PORT, LOCAL_DB_URL} = require("./constants/appConstants")
const user = require("./routes/userRoute")
const expense = require("./routes/expenseRoute")
const category = require("./routes/categoryRoute")
const app = express()

// Adding Middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json()) // Getting JSON Body with POST Request

// Adding Routes
app.use("/user", user)
app.use("/expense", expense)
app.use("/category", category)

mongoose.connect(LOCAL_DB_URL).then(()=>console.log(`CONNECTED TO DATABASE`)).catch(err=>console.log(err))


// Default request for testing server initialization
app.get("/", (req, res)=>{
    res.send(`Hello From HTTP Server Running on PORT: ${PORT}`)
})

// Handling 404
app.use((req, res, next)=>{
    res.status(404).send("<h1>404 - PAGE NOT FOUND!</h1>")
})

// Global Server Side Error Handler
app.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).send("<h1>500 - Internal Server Error</h1>")
})

// Server listening on PORT
app.listen(PORT, ()=>{
    console.log(`SERVER STARTED ON http://localhost:${PORT}`)
    console.log(`Swagger Docs available on http://localhost:${PORT}/api-docs`)
})