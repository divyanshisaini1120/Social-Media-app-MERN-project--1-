import WishlistModel from "../models/WishlistModel.js";

export const toggleWishlist = async function(req, res){
    try{
        console.log("TOGGLE WISHLIST CONTROLLER HIT");
        const productid = req.params.id;
        const userid = req.user._id

        if(!productid){
            return res.status(400).json({message: "Product id is required"})
        }
        const exists = await WishlistModel.findOne({productid, userid})
        // if(exists.length > 0){
        //     return res.status(400).json("Product is already in your wishlist")
        // }
        if (exists) {

            // remove from wishlist
            await WishlistModel.findByIdAndDelete(exists._id) 
            return res.status(200).json({message: "Product removed from wishlist!", wishlisted: false})
            //added "wishlisted" attribute because makes it easier for frontend to know if wishlist  added then -> colored heart else not colored! 

       } else {

            // add to wishlist
            const newwishlist = await WishlistModel.create({
                userid,
                productid
            }) 
            console.log("CREATED WISHLIST:", newwishlist);
            return res.status(201).json({message: "Product added to wishlist!", wishlisted: true})
  

        }  
    }catch(err){
        
        console.log(err.message)
        return res.status(500).json({message: "Internal server error. Error updating wishlist", error: err.message})
    }
}

export const getWishlist = async function(req, res){
    try{
        const userid = req.user._id;
        console.log("LOGGED IN USER:", userid);

        const wishlist = await WishlistModel.find({ userid });

        console.log("WISHLIST:", wishlist);
        
        return res.status(200).json({wishlist})

    }catch(err){
        console.log(err.message)
        return res.status(500).json({message: "Internal server  error", error: err.message})
    }
}


