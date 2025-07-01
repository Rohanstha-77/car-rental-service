import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();
export const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKITPUBLICKEY,
    privateKey: process.env.IMAGEKITPRIVATEKEY,
    urlEndpoint: process.env.IMAGEKITURL
});
//# sourceMappingURL=imageKit.js.map