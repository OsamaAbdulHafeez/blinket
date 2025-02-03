import { FORBIDDEN, INTERNALERROR, NOTALLOWED, OK } from "../../constants/httpStatus.js"
import { responseMessages } from "../../constants/responseMessages.js"
import UserModel from "../../models/user.model.js"
import { sendEmail } from "../../config/sendEmail.js"
import bcryptjs from "bcryptjs"
import verifyEmailTemplate from "../../utils/verifyEmailTemplate.js"
import { generateAccessToken } from "../../utils/generateAccessToken.js"
import { generateRefreshToken } from "../../utils/generateRefreshToken.js"

export const logoutUser = async(req,res) =>{
    try {

        const cookieOptions={
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }

        res.clearCookie('accessToken',cookieOptions)
        res.clearCookie('refreshToken',cookieOptions)
        const userId = req.userId
        const removeRefreshToken = await UserModel.findByIdAndUpdate({_id:userId},{
            refresh_token:""
        })
        return res.status(OK).json({
            message:responseMessages.LOGOUT_USER,
            error:false,
            success:true,
        })

    } catch (error) {
        return res.status(INTERNALERROR).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}