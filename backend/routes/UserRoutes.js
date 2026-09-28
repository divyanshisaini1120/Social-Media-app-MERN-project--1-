import express from "express"
import { registerUser, loginUser, logoutUser, getme } from "../controllers/UserController.js"
import isAuthenticated from "../middlewares/authMiddleware.js"

const UserRoutes  = express.Router()

UserRoutes.post("/register", registerUser)
UserRoutes.post("/login", loginUser)
UserRoutes.post("/logout", isAuthenticated, logoutUser)
UserRoutes.get("/me", isAuthenticated, getme)

export default UserRoutes