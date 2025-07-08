import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { addCar, changeToOwner, checkCarAvailability, deleteCar, getOwnerCars } from "../controller/owner.controller.js";
import upload from "../middleware/multer.js";
const router = express.Router();
router.post("/change-role", authMiddleware, changeToOwner);
router.post("/add-car", upload.single("image"), authMiddleware, addCar);
router.get("/cars", authMiddleware, getOwnerCars);
router.get("/toggle-car", authMiddleware, checkCarAvailability);
router.delete("/delete", authMiddleware, deleteCar);
export default router;
//# sourceMappingURL=admin.route.js.map