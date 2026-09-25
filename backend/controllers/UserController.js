import User from "../models/UserModel.js"
import bcrypt from "bcrypt"
import validateUser from "../../utils/validation.js"
import generateToken from "../../utils/generateToken.js"


const  cookieOptions = {
    secure: false,
    samesite: "none", //for github codespaces - it considers both ports as different domains - hence "lax" won't work
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export const registerUser  = async function(req, res){
    try{
        const {username, name_, email, password} =  req.body

        //using validateUser function from utils
        const isValid = validateUser(username, name_, email,  password)

        if(!isValid.isValid){
            return res.status(400).json({"message": isValid.message})
        }

        //check username-email unique 
        const usernameExists = await User.findOne({username: username.trim()}) 
        if(usernameExists){
            return res.status(400).json({"message": "username already exists"})
        }
        const emailExists = await User.findOne({email: email.trim().toLowerCase()})
        if(emailExists){
            return res.status(400).json({"message": "email already exists"})
        }
        
        //bcrypt  password
        let password_bcrypted = await bcrypt.hash(password, 10) 

        //new user
        let newUser = await User.create({
            name_,
            username,
            email,
            password: password_bcrypted
            
        })
        //generate jwt token
        const token = await generateToken(newUser._id)
        res.cookie("token", token, cookieOptions);

        res.status(201).json({
            message: "User Registration successful!",
            user: {
                _id: newUser._id,
                name_: newUser.name_,
                username: newUser.username,
                email: newUser.email
            }
        });

    }catch(err){
        console.log(`Server internal error: ${err.message}`) 
        return res.status(500).json({
            message:  "Internal Server Error",
            error: err.message
        });
    }

};

export const loginUser = async (req, res) =>{
    try{
        const {email, password} = req.body

        //check both exists
        if(!email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        //verify email
        if(!EMAIL_REGEX.test(email)){
            return res.status(400).json({
                message:  "email is invalid"
            })
        }
        //check email exists
        const userfound = await User.findOne({email: email.trim().toLowerCase()})
        if(!emailexits){
            return res.status(400).json({
                message: "email not found"
            })
        }
        //verify password
        // const password_bcrypted = await bcrypt.hash(password) ---no need to write this when bcrypt.compare
    
        const password_verified = await bcrypt.compare(password, userfound.password)

        if(!password_verified){
            return res.status(400).json({
                message: "invalid password"
            })
        }

        //create and return token
        const token = await generateToken(userfound._id);
        res.cookie("token",token, cookieOptions)

        //successful  return 
        res.status(201).json({
            message: "Login successful!",
            user: {
                _id: userfound._id,
                name: userfound.name,
                username: userfound.username,
                email: userfound.email
            }
        });

}catch(err){
        console.log(err.message)
        return res.status(500).json({message:"Internal server error", error: err.message})
    }
}

export const logoutUser = (req, res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        samesite: "none"
    }) 
    return res.status(201).json({message: "Logged out successfully!"})
}




