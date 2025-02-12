import {Router} from "express"
import { auth } from "../middleware/auth.js"
import { uploadImage } from "../controllers/uploadImageController.js"
import upload from "../middleware/multer.js"

const uploadRouter = Router()

uploadRouter.post('/upload-image',auth,upload.single('image'),uploadImage)


export default uploadRouter
