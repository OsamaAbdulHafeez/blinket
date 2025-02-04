import { INTERNALERROR, NOTALLOWED, OK } from "../../constants/httpStatus.js";
import { responseMessages } from "../../constants/responseMessages.js";
import UserModel from "../../models/user.model.js";
import bcryptjs from "bcryptjs"
export const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(NOTALLOWED).json({
        message: responseMessages.REQUIRED_EMAIL_PASSWORD_CONFIRM,
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(NOTALLOWED).json({
        message: responseMessages.INVALID_USER,
        error: true,
        success: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(NOTALLOWED).json({
        message: responseMessages.PASSWORD_CONFIRMPASSWORD_NOTSAME,
        error: true,
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);
    const updatePassword = await UserModel.findOneAndUpdate(user._id,{
        password: hashpassword
    })

    return res.status(OK).json({
      message: responseMessages.PASSWORD_UPDATE,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(INTERNALERROR).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
