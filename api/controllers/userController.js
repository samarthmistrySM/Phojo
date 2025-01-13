import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

export const getUser = async (req, res) => {
  
  try {
    const userId = req.params.id;
    console.log(userId);
    
    const user = await User.findById(userId);

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