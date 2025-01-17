import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
} from "../controllers/postController.js";
import { authenticateToken, authorizeUser } from "../middlewares/auth.js";

const postRouter = express.Router();

postRouter.get("/", authenticateToken, authorizeUser, getPosts);
postRouter.post("/", authenticateToken, authorizeUser, createPost);
postRouter.delete("/delete/:postId", authenticateToken, authorizeUser, deletePost);

export default postRouter;
