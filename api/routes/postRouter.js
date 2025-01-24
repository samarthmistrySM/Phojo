import express from "express";
import {
  createComment,
  createPost,
  deletePost,
  getPosts,
  likeDisLikePost,
} from "../controllers/postController.js";
import { authenticateToken, authorizeUser } from "../middlewares/auth.js";

const postRouter = express.Router();

postRouter.get("/", authenticateToken, authorizeUser, getPosts);
postRouter.post("/", authenticateToken, authorizeUser, createPost);
postRouter.delete("/delete/:postId", authenticateToken, authorizeUser, deletePost);
postRouter.put("/like/:postId", authenticateToken, authorizeUser, likeDisLikePost);
postRouter.post("/comment", authenticateToken, authorizeUser, createComment);
export default postRouter;
