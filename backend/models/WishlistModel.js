import mongoose from "mongoose"

const WishlistSchema = new mongoose.Schema({
      userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
      },
      productid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductModel",
        required: true
      }
    }, {
      timestamps: true      
});

WishlistSchema.index(
  {userId: 1, productId: 1},
  {unique: true}
)

const WishlistModel = new mongoose.model("WishlistModel", WishlistSchema)

export default WishlistModel