import multer from "multer";
import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import "dotenv/config";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})


const storageCloud =  new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        
        folder:"cloud-upload", 
        public_id: (req,file) => file.originalname.split(".")[0]
    }
})


const cloudUploader = multer({storage: storageCloud})

export default cloudUploader
