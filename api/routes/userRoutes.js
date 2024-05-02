import  express  from "express";
import {createUser,signInUser,logOutUser} from '../controllers/userController.js'
import { verifyUser } from "../utils/verifyUser.js";
const router=express.Router()

router.post('/signup',createUser)
router.post('/signin',signInUser)
router.get('/logout',verifyUser,logOutUser)


export default router