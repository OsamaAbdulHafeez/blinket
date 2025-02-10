import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { logoutUser } from "../controllers/userController/logoutUser.js";
import { registerNewUser } from "../controllers/userController/registerNewUser.js";
import { verifyEmail } from "../controllers/userController/verifyEmail.js";
import { loginUser } from "../controllers/userController/loginUser.js";
import { uploadAvatar } from "../controllers/userController/uploadAvatar.js";
import { updateUser } from "../controllers/userController/updateUser.js";
import upload from "../middleware/multer.js";
import { forgotPassword } from "../controllers/userController/forgotPassword.js";
import { forgotPasswordOtpVerify } from "../controllers/userController/forgotPasswordOtpVerify.js";
import { resetPassword } from "../controllers/userController/resetPassword.js";
import { refreshToken } from "../controllers/userController/refreshToken.js";
import { userDetail } from "../controllers/userController/userDetail.js";

const userRouter = Router()

userRouter.post("/register",registerNewUser)
userRouter.post("/verify-email",verifyEmail)
userRouter.post("/login",loginUser)
userRouter.get("/logout",auth,logoutUser)
userRouter.put("/upload-avatar",auth,upload.single('avatar'),uploadAvatar)
userRouter.put("/update",auth,updateUser)
userRouter.put("/forgot-password",forgotPassword)
userRouter.post("/forgot-password-otp-verify",forgotPasswordOtpVerify)
userRouter.put("/reset-password",resetPassword)
userRouter.post('/refresh-token',refreshToken)
userRouter.get('/user-details',auth,userDetail)

export default userRouter