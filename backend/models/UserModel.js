
import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
    name_:{
        type: String,
        required : true,
        trim: true
        
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true ,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
    // phone: {
    //     type: Number,
    //     trim: true
    // },
    // bio: {
    //     type: String
    // },
    // followers: {
    //     //ids to be stored 
    // },
    // following: {
    //     //ids to be stored 

    // },
    // stories: {
    //     //ids to be stored 
    // },
    // reels: {
    //     //ids to be stored 
    // },
    // posts: {
    //     //ids to be stored 
    // }


}, {timestamps: true}) 

const UserModel = mongoose.model("UserModel", UserSchema)

export default UserModel



