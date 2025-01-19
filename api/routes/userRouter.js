import express from "express";
import { getLoggedUser, getUser } from "../controllers/userController.js";
import { authenticateToken, authorizeUser } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/user/:id", getUser);
userRouter.get("/auth", authenticateToken, authorizeUser, getLoggedUser)

export default userRouter;