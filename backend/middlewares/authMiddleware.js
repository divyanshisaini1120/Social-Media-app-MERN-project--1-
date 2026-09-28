import jwt from "jsonwebtoken" 
import UserModel from "../models/UserModel.js"

const isAuthenticated = async function(req, res, next){
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: "Login required"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findById(decoded.userId).select("-password");
        
        if(!user){
            return res.status(401).json({message: "User not found"})
        }
        req.user = user;
        next();

    }catch(err){
        console.log(err.message);
        return res.status(401).json({message: "Invalid or expired token", error: err.message})
    }
};

export default isAuthenticated;