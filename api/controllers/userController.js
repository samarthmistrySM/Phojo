import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

export const getLoggedUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .populate({
        path: "posts",
        populate: [
          {
            path: "comments",
            populate: {
              path: "user",
              module: "Post",
            },
          },
        ],
      })
      .populate("followers");

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.status(StatusCodes.OK).json({ message: "User Found", user });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    const user = await User.findById(userId)
      .populate({
        path: "posts",
        populate: [
          {
            path: "comments",
            populate: {
              path: "user",
              module: "Post",
            },
          },
        ],
      })
      .populate("followers");

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.status(StatusCodes.OK).json({ message: "User Found", user });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { fullname, username, image } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const updateFields = {};

    if (username) {
      updateFields.username = username;
    }

    if (fullname) {
      updateFields.fullname = fullname;
    }

    if (image) {
      updateFields.dp = image;
    }

    await User.findByIdAndUpdate(userId, updateFields);

    res.status(StatusCodes.OK).json({ message: "User Updated!" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const searchUser = async (req, res) => {
  const query = req.query.query;
  try {
    const users = await User.find({
      username: { $regex: new RegExp(query, "i") },
    });

    res.status(StatusCodes.OK).json({ message: "Users found!", users });
  } catch (error) {
    console.error("Error searching for users:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const followUser = async (req, res) => {
  const fromUserId = req.user.id;
  const toUserId = req.params.userId;

  try {
    const toUser = await User.findById(toUserId);

    if(!toUser){
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const fromUser = await User.findById(fromUserId);

    if(!fromUser){
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    if(toUser.followers.includes(fromUserId)){
      toUser.followers.pull(fromUserId);
      await toUser.save();
      res.status(StatusCodes.OK).json({ message: "Followed!" });
    } else{
      await toUser.followers.push(fromUserId);
      await toUser.save();
      res.status(StatusCodes.OK).json({ message: "Unfollowed!" });
    }
  } catch (error) {
    console.error("Error searching for users:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
}