import { INTERNALERROR, NOTALLOWED, OK } from "../../constants/httpStatus.js"
import { responseMessages } from "../../constants/responseMessages.js"
import UserModel from "../../models/user.model.js"
import { sendEmail } from "../../config/sendEmail.js"
import bcryptjs from "bcryptjs"
import verifyEmailTemplate from "../../utils/verifyEmailTemplate.js"

export const registerNewUser = async(req,res) =>{
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password){
            return res.status(NOTALLOWED).json({
                message : responseMessages.REQUIRED_NAME_EMAIL_PASSWORD,
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({email})
        if(user){
            return res.status(NOTALLOWED).json({
                message : responseMessages.USER_EXIST,
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password:hashpassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailURI = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`

        const verifyEmail = await sendEmail({
            sendTo:email,
            subject:'verify Email from blinket',
            html: verifyEmailTemplate({
                name,
                url: verifyEmailURI
            })
        })

        return res.status(OK).json({
            message:responseMessages.USER_CREATED,
            error:false,
            success:true,
            data:save
        })

    } catch (error) {
        return res.status(INTERNALERROR).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}