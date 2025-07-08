import userModel from "../models/user.model.js";
import fs from "fs";
import { imagekit } from "../config/imageKit.js";
import { carModel } from "../models/car.js";
export const changeToOwner = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(400).json({ success: false, message: "User not found" });
            return;
        }
        await userModel.findByIdAndUpdate(userId, { role: "admin" });
        res.json({ success: true, message: "Now you can list cars" });
    }
    catch (error) {
        console.log("error while changing user to owner", error);
    }
};
//api to list car
export const addCar = async (req, res) => {
    try {
        const userId = req.user?._id;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;
        if (!imageFile) {
            res.status(400).json({ success: false, error: "Image file missing" });
            return;
        }
        const filerBuffer = fs.readFileSync(imageFile?.path);
        const response = await imagekit.upload({
            file: filerBuffer,
            fileName: imageFile?.originalname,
            folder: "/cars",
        });
        const optimizedImageUrl = imagekit.url({
            path: response?.filePath,
            transformation: [
                { width: "1280" },
                { quality: "auto" },
                { format: "webp" }
            ]
        });
        await carModel.create({ ...car, owner: userId, image: optimizedImageUrl });
        res.json({ success: true, message: "carr added succesfully" });
    }
    catch (error) {
        console.log("error while adding car", error);
    }
};
//appi to list owner cars
export const getOwnerCars = async (req, res) => {
    try {
        const userId = req.user?._id;
        const cars = await carModel.find({ owner: userId });
        if (!cars) {
            res.json({ sucess: false, message: "no car deatil found" });
            return;
        }
        res.json({ sucess: true, message: cars });
    }
    catch (error) {
        console.log("error while getting owners car details", error);
    }
};
// api to toggle car availabilty
export const checkCarAvailability = async (req, res) => {
    try {
        const userId = req.user?._id;
        const carId = req.body?.carId;
        const cars = await carModel.findById(carId);
        if (cars?.owner.toString() !== String(userId)) {
            res.status(403).json({ success: false, message: "Unauthorized" });
            return;
        }
        cars.isAvailable = !cars.isAvailable;
        await cars.save();
        res.json({ sucess: true, message: cars });
    }
    catch (error) {
        console.log("error while getting owners car details", error);
    }
};
// api to delete car
export const deleteCar = async (req, res) => {
    try {
        const userId = req.user?._id;
        const carId = req.body?.carId;
        const cars = await carModel.findById(carId);
        if (cars?.owner.toString() !== String(userId)) {
            res.status(403).json({ success: false, message: "Unauthorized" });
            return;
        }
        cars.isDeleted = true;
        cars.isAvailable = false;
        await cars.save();
        res.json({ sucess: true, message: "car removed" });
    }
    catch (error) {
        console.log("error while getting owners car details", error);
    }
};
//  API to get Dashbord data
export const getDashboardData = async (req, res) => {
    try {
        const user = req.user;
        const userId = user?._id;
        const role = user?.role;
        if (role !== "owner") {
            res.json({ sucess: false, message: "unauthorize" });
            return;
        }
        const cars = await carModel.find({ owner: userId });
    }
    catch (error) {
        console.log("Error from Dashboard Api", error);
        res.json({ sucess: false, message: error });
    }
};
//# sourceMappingURL=owner.controller.js.map