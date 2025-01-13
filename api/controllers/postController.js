import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Posts not found!" });
    }
    res.status(StatusCodes.OK).json({ message: "Post Found!", posts });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const createPost = async (req, res) => {
  const { caption, image, userId } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const newPost = Post.create({
      caption,
      image,
      user,
    });

    user.posts.push(newPost);
    await user.save();
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};
