import express from "express";
import { sendResponse } from "../controllers/chatController.js";
import { authenticateToken, authorizeUser } from "../middlewares/auth.js";

const chatRouter = express.Router();

chatRouter.post("/",authenticateToken, authorizeUser, sendResponse);

export default chatRouter;