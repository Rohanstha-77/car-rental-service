import e,{json, Request, Response} from "express";
import cors from "cors"
import dotenv from"dotenv"
import { connectDB } from "./config/db.js";



const app = e()
dotenv.config()
const port = process.env.PORT


app.use(cors())
app.use(json())
connectDB()


app.get('/',)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})