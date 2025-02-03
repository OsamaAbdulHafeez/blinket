import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { logoutUser } from "../controllers/userController/logoutUser.js";
import { registerNewUser } from "../controllers/userController/registerNewUser.js";
import { verifyEmail } from "../controllers/userController/verifyEmail.js";
import { loginUser } from "../controllers/userController/loginUser.js";
import { uploadAvatar } from "../controllers/userController/uploadAvatar.js";
import upload from "../middleware/multer.js";

const userRouter = Router()

userRouter.post("/register",registerNewUser)
userRouter.post("/verify-email",verifyEmail)
userRouter.post("/login",loginUser)
userRouter.get("/logout",auth,logoutUser)
userRouter.get("/upload-avatar",auth,upload.single('avatar'),uploadAvatar)

export default userRouter