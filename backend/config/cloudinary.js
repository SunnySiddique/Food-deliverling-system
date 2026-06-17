import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: envVariables.CLOUDINARY_NAME,
  api_key: envVariables.CLOUDINARY_API_KEY,
  api_secret: envVariables.CLOUDINARY_API_SECRET,
});

export default cloudinary;
