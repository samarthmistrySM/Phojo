import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

import User from "../models/User.js";

export const signUp = async (req, res) => {
  const { username, password, email, fullname } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User({
      username,
      password: hashedPassword,
      email,
      fullname,
    });

    await newUser.save();

    res.status(StatusCodes.CREATED).json({ message: "User created!" });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Email not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(StatusCodes.OK).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};