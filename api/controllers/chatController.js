import { GoogleGenerativeAI } from "@google/generative-ai";
import { StatusCodes } from "http-status-codes";

const genPrompt = async (prompt) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_APIKEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error in genPrompt:", error);
    throw error;
  }
};

export const sendResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Prompt is required",
      });
    }

    const response = await genPrompt(prompt);

    res.status(StatusCodes.OK).json({ message: "Generated!", text: response });
  } catch (error) {
    console.error("Error generating response:", error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
