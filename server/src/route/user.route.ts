import express from "express";
import { getUserData, logIn, register } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);
router.get("/data", authMiddleware, getUserData);

export default router;
