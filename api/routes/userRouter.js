import express from "express";
import { followUser, getLoggedUser, getUser, searchUser, updateUser } from "../controllers/userController.js";
import { authenticateToken, authorizeUser } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/user/:id",authenticateToken, authorizeUser, getUser);
userRouter.get("/auth", authenticateToken, authorizeUser, getLoggedUser)
userRouter.put("/update", authenticateToken, authorizeUser, updateUser)
userRouter.get("/search/user", authenticateToken, authorizeUser, searchUser)
userRouter.put("/follow/:userId", authenticateToken, authorizeUser, followUser)

export default userRouter;