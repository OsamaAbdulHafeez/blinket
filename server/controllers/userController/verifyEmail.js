import { INTERNALERROR, NOTALLOWED, OK } from "../../constants/httpStatus.js"
import { responseMessages } from "../../constants/responseMessages.js"
import UserModel from "../../models/user.model.js"

export const verifyEmail = async(req,res) =>{
    try {
        const {code} = req.body

        const user = await UserModel.findOne({_id:code})

        if(!user){
            return res.status(NOTALLOWED).json({
                message : responseMessages.INVALID_USER,
                error : true,
                success : false
            })
        }
        const updateUSer = await UserModel.updateOne({_id:code},{
            verify_email:true
        })

        return res.status(OK).json({
            message:responseMessages.VERIFY_EMAIL,
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