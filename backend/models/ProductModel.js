import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    name_: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true        
    },
    description: {
        type: String
    },
    colors:{
        type: [String] //object or array
    },
    sizes:{
        type: [String] //object or array - how to relate color & array?? - think "variants","inventory" for version2
    },
    images:  {
        type: String,
        required: true
    },
    manufacturer:{
        type: String,
        required: true
    },
    inventory: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    discount: {
        type: Number
    }
    //would like to implement region-availability later, for now let's keep this for later...rn work on working model
})

const ProductModel = mongoose.model("ProductModel", ProductSchema)

export default ProductModel

