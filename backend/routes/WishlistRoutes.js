import { toggleWishlist,  getWishlist } from "../controllers/WishlistController.js";
import  express  from "express"
import isAuthenticated from "../middlewares/authMiddleware.js";

const WishlistRoutes = express.Router()

WishlistRoutes.post("/:id", isAuthenticated, toggleWishlist)
WishlistRoutes.get("/", isAuthenticated, getWishlist) //isAuthenticated only will give  us req.user (for controllers in WishlistController.js)

export default WishlistRoutes;