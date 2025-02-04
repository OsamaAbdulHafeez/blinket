import { FORBIDDEN, INTERNALERROR } from "../constants/httpStatus.js";
import jwt from "jsonwebtoken";
import { responseMessages } from "../constants/responseMessages.js";
import { generateAccessToken } from "../../utils/generateAccessToken.js";
export const refreshToken = async (req, res, next) => {
  try {
    const token =
      req.cookies.refreshToken || req?.header?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(FORBIDDEN).json({
        message: responseMessages.PROVIDE_TOKEN,
        error: true,
        success: false,
      });
    }
    const verifyToken = await jwt.verify(
      token,
      process.env.SECRET_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return res.status(UNAUTHORIZED).json({
        message: responseMessages.INVALID_TOKEN,
        error: true,
        success: false,
      });
    }

    const userId = verifyToken.id;

    const accessToken = await generateAccessToken(userId);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    return res.status(OK).json({
      message: responseMessages.REFRESHTOKEN,
      error: false,
      success: true,
      data: {
        accessToken,
      },
    });
  } catch (error) {
    return res.status(INTERNALERROR).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
