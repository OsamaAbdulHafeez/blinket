import { INTERNALERROR, OK } from "../../constants/httpStatus.js";
import { responseMessages } from "../../constants/responseMessages.js";
import UserModel from "../../models/user.model.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, mobile, password } = req.body;
    let hashpassword

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      hashpassword = await bcryptjs.hash(password, salt);
    }
    const updateUser = await UserModel.updateOne(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(mobile && { mobile: mobile }),
        ...(password && { password: hashpassword }),
      }
    );

    return res.status(OK).json({
      message: responseMessages.UPDATED,
      error: false,
      success: true,
      data: updateUser,
    });
  } catch (error) {
    return res.status(INTERNALERROR).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
