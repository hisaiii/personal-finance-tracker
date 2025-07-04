import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile,folderName = "general") => {
  const formData = new FormData();

  // Append image file to form data
  formData.append("image", imageFile);
  formData.append("folder", folderName);

// FormData  used for uploading files and sending multipart/form-data
  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // ✅ required for file upload
        },
      }
    );

    return response.data; // ✅ return response to caller
  } catch (error) {
    console.error("Error uploading the image:", error);
    throw error; // 🔁 rethrow to handle it in the calling function
  }
};

export default uploadImage;
