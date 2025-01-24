import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user").populate("comments.user");
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
  const { caption, image} = req.body;
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const newPost = await Post.create({
      caption,
      image,
      user,
    });

    user.posts.push(newPost._id);
    await user.save();
    res.status(StatusCodes.CREATED).json({ message: "Post Uploaded" });
  } catch (error) {
    console.error("Error uploading post:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Post not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if (post.user.toString() != user._id) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User Unauthorized" });
    }

    await Post.findByIdAndDelete(postId);
    await user.posts.pull(postId);
    await user.save();

    res.status(StatusCodes.OK).json({ message: "Post Deleted!" });
  } catch (error) {
    console.error("Error uploading post:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const likeDisLikePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User Unauthorized" });
    }

    if (post.likes.includes(userId)) {
      post.likes.pull(userId);
      await post.save();
      res.status(StatusCodes.OK).json({ message: "👍 Post Liked!" });
    } else {
      post.likes.push(userId);
      await post.save();
      res.status(StatusCodes.OK).json({ message: "👎 Post DisLiked!" });
    }
  } catch (error) {
    console.error("Error liking post:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const createComment = async (req, res) => {
  const {comment, postId} = req.body;
  const userId = req.user.id;
  
  try {
    const post = await Post.findById(postId)

    if(!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User Unauthorized" });
    }

    const newComment = {
      CommentText: comment,
      user: user._id,
      CommentLikes: []
    }

    post.comments.push(newComment);
    await post.save();
    res.status(StatusCodes.OK).json({ message: "Comment Posted!" });

  } catch (error) {
    console.error("Error posting comment:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
}