import express from "express"
import { isAdmin, isLogin } from "../controllers/verify.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/isLogin", verifyToken, isLogin)
router.get("/isAdmin", isAdmin)
export default router