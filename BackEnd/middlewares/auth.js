const jwt = require("jsonwebtoken")
const { JWT_KEY } = require("../constants/appConstants")

function Authenticate(req, res, next){
    
    try {
        const authorization = req.headers.authorization
        const token = authorization.split(" ")[1]
        const decoded = jwt.verify(token, JWT_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({error: "INVALID TOKEN"})
    }
    
   
}

module.exports = Authenticate