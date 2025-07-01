import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { addCar, changeToOwner } from "../controller/owner.controller.js";
import upload from "../middleware/multer.js";
const router = express.Router();
router.post("/change-role", authMiddleware, changeToOwner);
router.post("/add-car", upload.single("image"), authMiddleware, addCar);
export default router;
//# sourceMappingURL=admin.route.js.map