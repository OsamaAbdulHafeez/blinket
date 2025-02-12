import {Router} from "express"
import { auth } from "../middleware/auth.js"
import { addCategory } from "../controllers/categoryController/addCategory.js"

const categoryRouter = Router()

categoryRouter.post('/add-category',auth,addCategory)


export default categoryRouter
