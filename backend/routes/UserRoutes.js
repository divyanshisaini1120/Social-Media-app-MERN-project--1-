import express from "express"
import { registerUser, loginUser, logoutUser } from "../controllers/UserController.js"

const UserRoutes  = express.Router()

UserRoutes.post("/register", registerUser)
UserRoutes.post("/login", loginUser)
// UserRoutes.post("/logout", isAuthenticated, logoutUser)

export default UserRoutes