import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoute from "./route/user.route.js";
import adminRoute from "./route/admin.route.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
connectDB();
app.use('/api/user', userRoute);
app.use("/api/role", adminRoute);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map