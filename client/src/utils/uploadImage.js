import summary from "@/common/summaryAPI";
import Axios from "./Axios";
import { AxiosToastError } from "./AxiosToastError";

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const response = await Axios({
      ...summary.upload_image,
      data: formData,
    });

    return response;
  } catch (error) {
    AxiosToastError(error);
  }
};
