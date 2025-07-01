import ImageKit from "imagekit"
import dotenv from "dotenv"

dotenv.config()
export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKITPUBLICKEY as string,
    privateKey: process.env.IMAGEKITPRIVATEKEY as string,
    urlEndpoint: process.env.IMAGEKITURL as string
})