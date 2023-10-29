const jwt = require("jsonwebtoken");
const user = require("../models/user.models");

  

async function authenticate(req, res, next) {
    try {
        const authorization = req.headers.authorization
        if(!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(400).json({
                message: "Authorization header must start with 'Bearer '",
                status: "failure"
            })
        }
        const token = authorization.substring(7)
        
        const decodedUser = jwt.decode(token)
        
        const foundUser = user.findOne({ _id: decodedUser._id })
          
        req.user = foundUser

      next();
    } catch (error) {
        return res.status(error?.statusCode || 500).send(error?.message || "Unable to authenticate")
    }
}

module.exports = {
authenticate
}



