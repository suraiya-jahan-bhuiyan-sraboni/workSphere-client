import axios from "axios";
import { Meta } from "react-router";
import { toast } from "sonner";

export const uploadToCloudinary = async (file) => {
    if (!file) throw new Error("No file provided");
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
            data
        );
        return res.data.secure_url;
    } catch (err) {
        toast.error("Cloudinary upload error:", err);
        return null;
    }
};
