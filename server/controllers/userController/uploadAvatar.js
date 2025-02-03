import { INTERNALERROR, OK } from "../../constants/httpStatus.js";
import { responseMessages } from "../../constants/responseMessages.js";
import UserModel from "../../models/user.model.js";
import { uploadImageCloudinary } from "../../utils/uploadImageCloudinary.js";

export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.userId
    const image = req.file;

    const uplaod = await uploadImageCloudinary(image);
    const uploadUser = await UserModel.findByIdAndUpdate({_id:userId},{
        avatar:uplaod?.url
    })

    return res.status(OK).json({
      message: responseMessages.UPLOAD_AVATAR,
      error: false,
      success: true,
      data: {
        _id:userId,
        avatar:uploadUser.avatar
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
