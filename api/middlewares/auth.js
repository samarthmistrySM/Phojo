import { StatusCodes } from "http-status-codes";
import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Not Authorized!");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Access Denied!");
    }

    req.user = decode;
    next();
  });
};

export const authorizeUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};