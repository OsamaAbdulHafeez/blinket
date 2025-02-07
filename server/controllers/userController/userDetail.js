import { FORBIDDEN, INTERNALERROR, NOTALLOWED, OK } from "../../constants/httpStatus.js"
import { responseMessages } from "../../constants/responseMessages.js"
import UserModel from "../../models/user.model.js"
import { sendEmail } from "../../config/sendEmail.js"
import bcryptjs from "bcryptjs"
import verifyEmailTemplate from "../../utils/verifyEmailTemplate.js"
import { generateAccessToken } from "../../utils/generateAccessToken.js"
import { generateRefreshToken } from "../../utils/generateRefreshToken.js"

export const userDetail = async(req,res) =>{
    try {
        const userId = req.userId

        const user = await UserModel.findById(userId).select('-password -refresh_token')

        if(!user){
            return res.status(NOTALLOWED).json({
                message : responseMessages.INVALID_USER,
                error : true,
                success : false
            })
        }

        return res.status(OK).json({
            message:responseMessages.USER_DETAILS,
            error:false,
            success:true,
            data:user
        })

    } catch (error) {
        return res.status(INTERNALERROR).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}