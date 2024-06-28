import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  profilePosts,
  getNotificationNumber,
  savePost,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/search/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/profilePosts", verifyToken, profilePosts);
router.post("/save", verifyToken, savePost);
router.get("/notification", verifyToken, getNotificationNumber);

export default router;