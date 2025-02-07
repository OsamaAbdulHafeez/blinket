import {FORBIDDEN, INTERNALERROR, UNAUTHORIZED,} from "../constants/httpStatus.js"
import jwt from "jsonwebtoken"
import { responseMessages } from "../constants/responseMessages.js"
export const auth = async(req,res,next) =>{
    try {
        const token = req.cookies.accessToken || req?.header?.authorization?.split(" ")[1]
        console.log(token,"token")
        if(!token){
            return res.status(FORBIDDEN).json({
                message : responseMessages.PROVIDE_TOKEN,
                error : true,
                success : false
            })
        }
        const decode = await jwt.verify(token,process.env.SECRET_ACCESS_TOKEN)
        if(!decode){
            return res.status(UNAUTHORIZED).json({
                message : responseMessages.INVALID_TOKEN,
                error : true,
                success : false
            })
        }

        req.userId = decode.id
        next()
    } catch (error) {
        return res.status(INTERNALERROR).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}