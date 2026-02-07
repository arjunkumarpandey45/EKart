import {v2 as cloudnairy} from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config()
cloudnairy.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
export default cloudnairy