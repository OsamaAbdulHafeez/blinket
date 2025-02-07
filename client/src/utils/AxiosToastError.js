import axios from "axios";
import toast from "react-hot-toast";

export const AxiosToastError = (error) =>{
    toast.error(
        error?.response?.data?.message
    )
}