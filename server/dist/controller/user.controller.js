import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !password || !email) {
            res.json({ success: false, message: "Fill all the fileds" });
            return;
        }
        const ifUserExists = await userModel.findOne({ email });
        if (ifUserExists) {
            res.json({ success: false, message: "user already exist" });
            return;
        }
        const hasedPassword = await bcrypt.hash(password, 10);
        const insertUser = await userModel.create({ name, email, password: hasedPassword });
        const token = generateToken(insertUser._id.toString());
        res.json({ success: true, token });
    }
    catch (error) {
        console.log("error while register", error);
    }
};
export const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({ sucess: false, message: "user not found" });
            return;
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.json({ sucess: false, message: "invaild email or password" });
            return;
        }
        const token = generateToken(user._id.toString());
        res.json({ sucess: true, token });
    }
    catch (error) {
        console.log("error  in login", error);
    }
};
export const getUserData = (req, res) => {
    try {
        res.json({ success: true, message: req.user });
    }
    catch (error) {
        console.log("error  in login", error);
    }
};
//# sourceMappingURL=user.controller.js.map