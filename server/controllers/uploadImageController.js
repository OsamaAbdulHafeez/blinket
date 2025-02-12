import {
  CREATED,
  FORBIDDEN,
  INTERNALERROR,
  NOTALLOWED,
} from "../constants/httpStatus.js";

export const uploadImage = async (req, res) => {
  try {
    const file = req.file

    console.log(file)
    
  } catch (error) {
    return res.status(INTERNALERROR).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
