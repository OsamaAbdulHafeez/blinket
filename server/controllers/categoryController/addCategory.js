import {
  CREATED,
  FORBIDDEN,
  INTERNALERROR,
  NOTALLOWED,
} from "../../constants/httpStatus.js";
import { responseMessages } from "../../constants/responseMessages.js";
import CategoryModal from "../../models/category.model.js";

export const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(NOTALLOWED).json({
        message: responseMessages.REQUIRED_FIELD,
        error: true,
        success: false,
      });
    }

    const addcategory = new CategoryModal({
      name,
      image,
    });

    const saveCategory = await addcategory.save();
    if (!saveCategory) {
      return res.status(FORBIDDEN).json({
        message: "Not Created",
        error: true,
        success: false,
      });
    }
    return res.status(CREATED).json({
      message: responseMessages.CREATED_CATEGORY,
      error: false,
      success: true,
      data: saveCategory,
    });
  } catch (error) {
    return res.status(INTERNALERROR).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
