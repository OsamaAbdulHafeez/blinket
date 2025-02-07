import { FORBIDDEN, INTERNALERROR, NOTALLOWED, OK } from "../../constants/httpStatus.js"
import { responseMessages } from "../../constants/responseMessages.js"
import UserModel from "../../models/user.model.js"
import { sendEmail } from "../../config/sendEmail.js"
import bcryptjs from "bcryptjs"
import verifyEmailTemplate from "../../utils/verifyEmailTemplate.js"
import { generateAccessToken } from "../../utils/generateAccessToken.js"
import { generateRefreshToken } from "../../utils/generateRefreshToken.js"

export const loginUser = async(req,res) =>{
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(NOTALLOWED).json({
                message : responseMessages.REQUIRED_EMAIL_PASSWORD,
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(NOTALLOWED).json({
                message : responseMessages.INVALID_USER,
                error : true,
                success : false
            })
        }

        if(user.status !== "Active"){
            return res.status(NOTALLOWED).json({
                message : responseMessages.ACCOUNT_NOT_ACTIVE,
                error : true,
                success : false
            })
        }

        const checkPassword = await bcryptjs.compare(password,user.password)

        const loginUser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date: new Date()
        })

        if(!checkPassword){
            return res.status(FORBIDDEN).json({
                message : responseMessages.WRONG_PASSWORD,
                error : true,
                success : false
            }) 
        }
        
        const accessToken = await generateAccessToken(user._id)
        const refreshToken = await generateRefreshToken(user._id)

        const cookieOptions={
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }

        res.cookie('accessToken',accessToken,cookieOptions)
        res.cookie('refreshToken',refreshToken,cookieOptions)

        return res.status(OK).json({
            message:responseMessages.LOGIN_SUCCESSFULLY,
            error:false,
            success:true,
            data:{
                accessToken,
                refreshToken
            }
        })

    } catch (error) {
        return res.status(INTERNALERROR).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}